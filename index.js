const express = require('express')
const db = require('./db')
const app = express()

// Permite receber dados em JSON
app.use(express.json())

// Rota para cadastrar livros
app.post('/livros', (req, res) => {
    const { titulo, autor } = req.body

    if (!titulo || !autor) {
        return res.status(400).json({mensagem: 'Informe o titulo e o autor do livro!'})
    }

    const sql = 'INSERT INTO livros (titulo, autor) VALUES (?, ?)'

    db.query(sql, [titulo, autor], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({mensagem: 'Erro ao cadastrar livro!'})
        }
        return res.status(201).json({mensagem: 'Livro cadastrado com sucesso!', id: resultado.insertId, titulo: titulo, autor: autor})
    })
})


// Rota para listar todos os livros
app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM livros'
    db.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({mensagem: 'Erro ao buscar livros!'})
        }
        return res.status(200).json({mensagem: 'Livros encontrados com sucesso!', livros: resultado})
    })
})

const PORTA = 3000;

app.listen(PORTA, () => {console.log(`Servidor rodando na porta ${PORTA}`)})
