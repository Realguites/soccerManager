exports.up = function(knex) {
    return knex.schema.createTable('clubes', function(table) {
        table.increments();
        table.string('nome', 80).notNullable();
        table.string('foto', 200).notNullable();
        table.integer('divisao', 4).notNullable();
        table.boolean('destaque').notNullable().default(false);

        table.timestamps(true, true);
    })
};

exports.down = (knex) => knex.schema.dropTable('clubes'); //quando só tem uma linha não precisa do return