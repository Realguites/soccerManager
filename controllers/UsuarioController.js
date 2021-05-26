const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const knex = require("../database/dbConfig");

module.exports = {

    // index: listagem
    //store/create :inclusao
    //update: atualziação
    //show: retornar 1 registro
    //destroy: exclusão


   async index(req, res){
        const usuarios = await knex("usuarios");
          
        res.status(200).json(usuarios);
    },

    async store(req, res){
        // faz a destruição do objeto req.body
        const {nome, email, senha} = req.body;
    

    //validação para os campos

        if(!nome || !email || !senha){
            res.status(400).json({erro: "Enviar nome, email e senha do usuário!"})
            return 
        }

        //testa se o email já foi cadastrado
        try{
            const dados = await knex("usuarios").where({email});
            //if(dados.length == 1)
            if(dados.length){
                res.status(400).json({erro: "Email já cadastrado"});
                return;
            }
        }catch(error){
            res.status(400).json({erros:error.message});
        }



        //gera um hash da senha a ser salvo no banco
        const hash = bcrypt.hashSync(senha, 10);

        try{
            const novo = await knex("usuarios").insert({nome, email, senha : hash}); // o campo senha recebe hash
            res.status(201).json({id:novo[0]});
        }catch(error){
            res.status(400).json({erros:error.message});
        }
    },
    async login(req, res) {
        // faz a destruição do objeto req.body
        const { nome, email, senha } = req.body;


        //validação para os campos

        if (!email || !senha) {
            res.status(400).json({ erro: "Enviar email e senha do usuário!" })
            return
        }

        //testa se o email já foi cadastrado
        try {
            const dados = await knex("usuarios").where({ email });
            //if(dados.length == 1)
            if (dados.length == 0) {
                res.status(400).json({ erro: "Login ou senha incorretos!!!" });
                return;
            }

            if (bcrypt.compareSync(senha, dados[0].senha)) {
                const token = jwt.sign({
                    usuarios_id: dados[0].id,
                    usuario_nome:dados[0].nome
                }, process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                )

                res.status(200).json({ msg: "Ok!!!" , token})

            } else {
                res.status(400).json({ erro: "Login ou senha incorretos!!!" })
            }

        } catch (error) {
            res.status(400).json({ erros: error.message });
        }



        //gera um hash da senha a ser salvo no banco
        const hash = bcrypt.hashSync(senha, 10);

        try {
            const novo = await knex("usuarios").insert({ nome, email, senha: hash }); // o campo senha recebe hash
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }
    }

    
};