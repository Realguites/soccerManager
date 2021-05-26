exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('campeonato').del()
        .then(function() {
            // Inserts seed entries
            return knex('campeonato').insert([
                { nome: 'Gauchão' },
                { nome: 'Serie A' },
                { nome: 'Copa do Brasil' }

            ]);
        });
};