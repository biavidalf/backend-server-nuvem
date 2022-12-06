const mongoose = require('mongoose');

const Professor = mongoose.model('Professor', {
    matricula: Number,
    nome: String,
    email: String,
    telefone: String,
    senha: String,
    formacao: String,
    turmas: [String]
})

module.exports = Professor;