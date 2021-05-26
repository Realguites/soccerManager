const knex = require("../database/dbConfig");
module.exports = {

    // index: listagem
    //store/create :inclusao
    //update: atualziação
    //show: retornar 1 registro
    //destroy: exclusão


    async filtro(req, res) {
        const { busca } = req.params
        console.log(busca)
        const clubes = await knex("clubes").select().where('clubes.nome', busca)
        if (clubes.length > 0) {
            return res.json(clubes);

        } else {
            return res.json({ msg: "Nenhum registro encontrado!" })
        }
    },


    async show(req, res) {

        const {id} = req.body
        const destaques = await knex("clubes").where({id});

        res.status(200).json(destaques);
    },

    async destaque(req, res) {
         const destaques = await knex("clubes").where('destaque','=',true)
             .orderBy("id", "asc");

         res.status(200).json(destaques);
     },

     async destacar(req, res) {
        const {id} = req.body;
        if (!id) {
            res.status(400).json({ erro: "Campos incompletos!" })
            return
        }
        try {
            const dest = await knex("clubes").where({id});
            if(dest[0].destaque){
                
                novo = await knex('clubes').where({id}).update({destaque:false});
                res.status(201).json({ msg:"Clube " + dest[0].nome + " agora NÃO é mais destaque!!!"});

            }else{

                novo = await knex('clubes').where({id}).update({destaque:true});
                res.status(201).json({ msg:"Clube " + dest[0].nome + " agora é destaque!!!"});

            }
  
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }

    },

    async index(req, res) {
        const clubes = await knex("clubes").orderBy("clubes.id", "asc");
        res.status(200).json(clubes);
    },

    async estatisticasMandante(req,res){
        
        const est = await knex.select('clubes.nome')
            .sum('partida.gols1')
            .from('partida')
            .innerJoin('clubes', 'clubes.id', 'partida.clube1_id')
            .groupBy('clubes.nome')
        res.status(200).json(est);
    },
    async estatisticasVisitante(req,res){
        
        const est = await knex.select('clubes.nome')
            .sum('partida.gols2')
            .from('partida')
            .innerJoin('clubes', 'clubes.id', 'partida.clube2_id')
            .groupBy('clubes.nome')
        res.status(200).json(est);
    },


    async store(req, res) {
        // faz a destruição do objeto req.body
        const { id, nome, divisao, destaque, foto } = req.body;


        //validação para os campos

        if (!id || !nome || !divisao || !destaque || !foto) {
            res.status(400).json({ erro: "Campos incompletos!" })
            return
        }
        try {
            const novo = await knex("clubes").insert({ id, nome, divisao, destaque, foto });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erros: error.message });
        }
    },


};