const router = require('express').Router();
const Aluno = require('../models/Aluno');
const Professor = require('../models/Professor');
const Turma = require('../models/Turma');

router.route('/aluno')
    .get(async (req, res) => {
    try {
        const query = {};

        if(req.query.curso){
          query["curso.id"] = req.query.curso;
        }
        if(req.query.semestre){
          query.semestre = req.query.semestre;
        }
        if(req.query.turma){
          query.turmas = req.query.turma;
        }

        let alunos;
        if(req.query.count == 'true'){
          alunos = await Aluno.count(query);
        }else{
          alunos = await Aluno.find(query);
        }
        
        
        res.status(200).json(alunos);
      } catch (error) {
        res.status(500).json({error});
      }
  })
  .post(async (req, res) => {
    const aluno = req.body;
    
    if(!aluno){
      res.status(422).json({error: 'Dados obrigatório'});
      return
    }

    const alunoNoBanco = await Aluno.findOne({matricula: req.body.matricula});
    
    if(alunoNoBanco){
      res.status(422).json({error: 'Matrícula inserida já encontrada no banco'});
      return
    }

    try {
      await Aluno.create(aluno);
      res.status(201).json({message: 'Aluno cadastrado.'});
    } catch (error) {
      res.status(500).json({error});
    }
  })

router.route('/aluno/:matricula')
  .get(async (req, res) => {
    let matricula = req.params.matricula;
    
    try {
        const aluno = await Aluno.findOne({matricula});

        if(!aluno){
            res.status(422).json({message: 'Aluno nao encontrado'});
            return
        }

        res.status(200).json(aluno);
      } catch (error) {
        res.status(500).json({error});
    }
  })
  .put(async (req, res) => {
    let matricula = req.params.matricula;
    
    try {
        const aluno = await Aluno.findOne({matricula});

        if(!aluno){
            res.status(422).json({message: 'Aluno nao encontrado'});
            return
        }

        let fields = {};

        for(let key in req.body){
          fields[key] = req.body[key];
        }
        console.log(fields);

        let alunoUpdated = await Aluno.findOneAndUpdate({matricula}, fields, {new: true});

        res.status(200).json({alunoUpdated});
      } catch (error) {
        res.status(500).json({error});
    }
  })
  .delete(async (req, res) => {
    // Deletar um artigo baseado no id
    let matricula = req.params.matricula;
    
    try {
      const aluno = await Aluno.findOne({matricula});

        if(!aluno){
            res.status(422).json({message: 'Aluno nao encontrado'});
            return
        }

        await Aluno.deleteOne({matricula});

        res.status(200).json({message: 'Aluno deletado'});
      } catch (error) {
        res.status(500).json({error});
    }
  })

/* ROTAS - PROFESSOR */
router.route('/professor')
  .get(async (req, res) => {
    try {
      const professores = await Professor.find();
      res.status(200).json(professores);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(async (req, res) => {
    const professor = req.body;

    if (!professor) {
      res.status(422).json({ error: 'Dados obrigatório' });
      return;
    }

    const professorNoBanco = await Professor.findOne({matricula: req.body.matricula});
    
    if(professorNoBanco){
      res.status(422).json({error: 'Matrícula inserida já encontrada no banco'});
      return
    }

    try {
      await Professor.create(professor);
      res.status(201).json({ message: 'Professor cadastrado.' });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/professor/:matricula')
  .get(async (req, res) => {
    let matricula = req.params.matricula;
    
    try {
        const professor = await Professor.findOne({matricula});

        if(!professor){
            res.status(422).json({message: 'Professor nao encontrado'});
            return
        }

        res.status(200).json(professor);
      } catch (error) {
        res.status(500).json({error});
    }
  })
  .delete(async (req, res) => {
    // Deletar um artigo baseado no id
    let matricula = req.params.matricula;
    
    try {
      const professor = await Professor.findOne({matricula});

        if(!professor){
            res.status(422).json({message: 'Professor nao encontrado'});
            return
        }

        await Professor.deleteOne({matricula});

        res.status(200).json({message: 'Professor deletado'});
      } catch (error) {
        res.status(500).json({error});
    }
  })


/* ROTAS - TURMA */
router.route('/turma')
    .get(async (req, res) => {
    try {
        let filter = {};

        if(req.body.codigos){
          let codigos = req.body.codigos.map((codigo) => {return {codigo}});
          filter = {
            $or: codigos
          }
          console.log(filter);
        }

        if(req.query.professor){
          filter["professor.id"] = req.query.professor;
        }

        const turmas = await Turma.find(filter);
        res.status(200).json(turmas);
      } catch (error) {
        res.status(500).json({error});
      }
  })
  .post(async (req, res) => {
    const turma = req.body;
    
    if(!turma){
      res.status(422).json({error: 'Dados obrigatório'});
      return
    }

    const turmaNoBanco = await Turma.findOne({codigo: req.body.codigo});
    
    if(turmaNoBanco){
      res.status(422).json({error: 'Código de turma inserida já encontrada no banco'});
      return
    }

    try {
      await Turma.create(turma);
      res.status(201).json({message: 'Turma cadastrado.'});
    } catch (error) {
      res.status(500).json({error});
    }
  })

router.route('/turma/:codigo')
  .get(async (req, res) => {
    let codigo = req.params.codigo;
    
    try {
        const turma = await Turma.findOne({codigo});

        if(!turma){
            res.status(422).json({message: 'Turma nao encontrada'});
            return
        }

        res.status(200).json(turma);
      } catch (error) {
        res.status(500).json({error});
    }
  })
  .put(async (req, res) => {
    let codigo = req.params.codigo;
    
    try {
        const turma = await Turma.findOne({codigo});

        if(!turma){
            res.status(422).json({message: 'Turma nao encontrada'});
            return
        }

        let fields = {};

        for(let key in req.body){
          if(key == 'atividade'){
            fields['$push'] = {atividades: req.body[key]}
            console.log('fields: ' + fields);
          }else{
            fields[key] = req.body[key];
          }
        }
        console.log(fields);

        let turmaUpdated = await Turma.findOneAndUpdate({codigo}, fields, {new: true});

        res.status(200).json({turmaUpdated});
      } catch (error) {
        res.status(500).json({error});
    }
  })
  .delete(async (req, res) => {
    // Deletar um artigo baseado no id
    let codigo = req.params.codigo;
    
    try {
      const turma = await Turma.findOne({codigo});

        if(!turma){
            res.status(422).json({message: 'Turma nao encontrada'});
            return
        }

        await Turma.deleteOne({codigo});

        res.status(200).json({message: 'Turma deletada'});
      } catch (error) {
        res.status(500).json({error});
    }
  })
module.exports = router;
