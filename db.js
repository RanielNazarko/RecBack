const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SUA_SENHA',
    database: 'biblioteca'
})

db.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar:', erro.message)
        return
    }

    console.log('Banco de dados conectado!')
})

module.exports = db
