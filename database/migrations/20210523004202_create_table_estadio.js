exports.up = function(knex) {
    return knex.schema.createTable('estadio', function(table) {
        table.increments();
        table.string('nome', 80).notNullable();

        table.timestamps(true, true);
    })
};

exports.down = (knex) => knex.schema.dropTable('estadio'); //quando só tem uma linha não precisa do return