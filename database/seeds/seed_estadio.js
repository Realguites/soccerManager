exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('estadio').del()
        .then(function() {
            // Inserts seed entries
            return knex('estadio').insert([
                { nome: 'Maracanã' },
                { nome: 'Arena do Grêmio' },
                { nome: 'Beira-Rio' }

            ]);
        });
};