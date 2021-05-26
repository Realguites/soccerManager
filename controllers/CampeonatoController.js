const knex = require("../database/dbConfig");
module.exports = {

    // index: listagem
    //store/create :inclusao
    //update: atualziação
    //show: retornar 1 registro
    //destroy: exclusão


    async index(req, res) {
        //const carros = await knex("carros").orderBy("id", "desc");
        const campeonatos = await knex("campeonato")
            .orderBy("campeonato.nome", "asc");

        res.status(200).json(campeonatos);
    },

    async store(req, res) {
        // faz a destruição do objeto req.body
        const { nome } = req.body;


        //validação para os campos

        if (!nome) {
            res.status(400).json({ erro: "Campos incompletos" })
            return
        }
        try {
            const novo = await knex("campeonato").insert({ nome });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }
    },


};