module.exports = {
    apps: [
        {
            name: 'spss-api',
            script: 'dist/src/main.js',
            cwd: '/var/www/spss.com/spss',
            exec_mode: 'fork',
            // instances: '2',
            autorestart: false,
            watch: false,
            max_memory_restart: '500M',
            env: {
                DB_HOST: "localhost",
                DB_PORT: 3307,
                DB_USER: "admin",
                DB_PASS: "admin@localhost",
                DB_DIALECT: "mariadb",
                DB_NAME_TEST: "spss",
                DB_NAME_DEVELOPMENT: "spss",
                DB_NAME_PRODUCTION: "spss",
                JWT_ACCESS_KEY: "202f071a165d96bee42bcede7e6eb03fc3c5ca03c304d27f550467ee02436c1e",
                JWT_REFRESH_KEY: "7a93b1c69dea8861fcb896b3ec3fe84d974560754aa6375cd45e09e4c551c1f9",
                ACCESS_TOKEN_EXPIRATION: "1000h",
                REFRESH_TOKEN_EXPIRATION: "7d"
            },
        }
    ]
};
  