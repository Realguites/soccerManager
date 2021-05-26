const knex = require("../database/dbConfig");
module.exports = {

    // index: listagem
    //store/create :inclusao
    //update: atualziação
    //show: retornar 1 registro
    //destroy: exclusão


    async index(req, res) {
        //const carros = await knex("carros").orderBy("id", "desc");
        const partidas = await knex("partida")
            .innerJoin("clubes as c1", "partida.clube1_id", "=", "c1.id")
            //.innerJoin("clubes as c2", "partida.clube2_id", "=", "c2.id")
            .innerJoin("estadio", "partida.estadio_id", "=", "estadio.id")
            .innerJoin("campeonato", "partida.campeonato_id", "=", "campeonato.id")
            .orderBy("partida.id", "desc");

        res.status(200).json(partidas);
    },

    

    async store(req, res) {
        // faz a destruição do objeto req.body
        const { clube1_id, clube2_id, campeonato_id, estadio_id } = req.body;


        //validação para os campos

        if (!clube1_id || !clube2_id || !campeonato_id || !estadio_id) {
            res.status(400).json({ erro: "Campos incompletos!" })
            return
        }
        try {
            const novo = await knex("partida").insert({ clube1_id, clube2_id, campeonato_id, estadio_id });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }
    },

    async update(req, res){
        const {id, gols1, gols2 } = req.body;

        if (!id || !gols1 || !gols2) {
            res.status(400).json({ erro: "Campos incompletos!" })
            return
        }
         try {
            const novo = await knex('partida').where({id}).update({gols1,gols2});
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }


    }


};