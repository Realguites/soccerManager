// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: 'freedb.tech',
            user: 'freedbtech_realguites',
            password: '12345678+',
            database: 'freedbtech_trabalho'
        },
        migrations: {
            tableName: 'migrations',
            directory: 'database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        }

    }

};