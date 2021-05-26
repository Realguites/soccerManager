exports.up = function(knex) {
    return knex.schema.createTable('partida', function(table) {
        table.increments();
        table.integer('gols1').unsigned();
        table.integer('gols2').unsigned();
        //cria campo de relacionamento com a tabela clube
        table.integer('clube1_id').notNullable().unsigned();
        table.foreign('clube1_id')
            .references('clubes.id')
            .onDelete('restrict') // ao apagar ele não apaga todo mundo que faz refrencia a FK
            .onUpdate('cascade') // em cascade ele faz pra todo mundo que possui a referencia para a FK 
            //cria automaticamente os campos de hora de inserção e update
            //cria campo de relacionamento com a tabela clube
        table.integer('clube2_id').notNullable().unsigned();
        table.foreign('clube2_id')
            .references('clubes.id')
            .onDelete('restrict') 
            .onUpdate('cascade') 
        table.integer('campeonato_id').notNullable().unsigned();
        table.foreign('campeonato_id')
            .references('campeonato.id')
            .onDelete('restrict') 
            .onUpdate('cascade') 
        table.integer('estadio_id').notNullable().unsigned();
        table.foreign('estadio_id')
            .references('estadio.id')
            .onDelete('restrict') 
            .onUpdate('cascade') 
        table.timestamps(true, true);
    })
};

exports.down = (knex) => knex.schema.dropTable('partida'); //quando só tem uma linha não precisa do return