exports.up = function(knex) {
    return knex.schema.createTable('palpites', function(table) {
        table.increments();
        table.integer('partida_id').notNullable().unsigned();
        table.foreign('partida_id')
            .references('partida.id')
            .onDelete('restrict') // ao apagar ele não apaga todo mundo que faz refrencia a FK
            .onUpdate('cascade')
        table.string('palpite', 80).notNullable();
        table.timestamps(true, true);
    })
};

exports.down = (knex) => knex.schema.dropTable('palipites'); //quando só tem uma linha não precisa do return