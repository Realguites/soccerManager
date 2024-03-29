exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.increments();
        table.string('nome', 60).notNullable();
        table.string('email', 120).unique().notNullable();
        table.string('senha', 60).notNullable();
        table.timestamps(true, true);
    })
};

exports.down = (knex) => knex.schema.dropTable('usuarios'); //quando só tem uma linha não precisa do return