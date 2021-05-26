const knex = require("../database/dbConfig");
module.exports = {

    // index: listagem
    //store/create :inclusao
    //update: atualziação
    //show: retornar 1 registro
    //destroy: exclusão

    async destroy(req, res) {
        const id = req.params.id;

        const palpites = await knex('palpites')
            .where({ id })
            .del()
        res.status(200).json(palpites);
    },


    async index(req, res) {
        const palpites = await knex("palpites").orderBy("palpite.id", "asc");
        res.status(200).json(palpites);
    },


    async store(req, res) {
        const { partida_id, palpite } = req.body;
        //validação para os campos

        if (!partida_id || !palpite) {
            res.status(400).json({ erro: "Campos incompletos!" })
            return
        }
        try {
            const novo = await knex("palpites").insert({ partida_id, palpite });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }
    },


};