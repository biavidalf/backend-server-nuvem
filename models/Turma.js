const mongoose = require('mongoose');

const Turma = mongoose.model('Turma', {
    codigo: String,
    disciplina: {id: String, nome: String},
    professor: {id: String, nome: String},
    atividades: [
        {
            titulo: String, 
            descricao: String, 
            notaMax: Number,
            prazo: Date,
            etapa: String,
            instancias: [
                {
                    alunoId: Number, 
                    nota: Number, 
                    isEntregue: Boolean
                }
            ]
        }
    ]
})

module.exports = Turma;