exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('clubes').del()
        .then(function() {
            // Inserts seed entries
            return knex('clubes').insert([
                { nome: 'Grêmio', divisao: 1, foto: 'https://id.pinterest.com/pin/49539664630838718/', destaque: true },
                { nome: 'Inter', divisao: 1, foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/604px-Escudo_do_Sport_Club_Internacional.svg.png', destaque: false },
                { nome: 'Juventude', divisao: 1, foto: 'https://upload.wikimedia.org/wikipedia/ro/thumb/c/cd/Juventude_logo.svg/220px-Juventude_logo.svg.png', destaque: false },
                { nome: 'Caxias', divisao: 2, foto: '', destaque: false },
                { nome: 'Pelotas', divisao: 0, foto: '', destaque: false },
                { nome: 'Brasil', divisao: 2, foto: '', destaque: false },
                { nome: 'Canguçuense', divisao: 0, foto: '', destaque: false },
                { nome: 'Novo Hamburgo', divisao: 4, foto: '', destaque: false },
                { nome: 'Cruzeiro', divisao: 2, foto: '', destaque: false },
                { nome: 'São Paulo', divisao: 1, foto: '', destaque: false },
                { nome: 'Athlético', divisao: 1, foto: '', destaque: false },
                { nome: 'Palmeiras', divisao: 1, foto: '', destaque: false },
                { nome: 'Corinthians', divisao: 1, foto: '', destaque: false },
                { nome: 'Coritiba', divisao: 1, foto: '', destaque: false },


            ]);
        });
};