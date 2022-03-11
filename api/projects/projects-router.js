// Write your "projects" router here!
const router = require('express').Router();
const Project = require('./projects-model');
const { validateID, validateBody } = require('./projects-middleware');

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(next)
});

router.get('/:id', validateID, (req, res, next) => {
    res.json(req.project);
    
 })


router.post('/', validateBody, (req, res, next) => {
  Project.insert(req.body)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(next)
});

router.put('/:id', validateID, validateBody, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(projects => {
      res.json(projects);
    })
    .catch(next)
});

router.delete('/:id', validateID, (req, res, next) => {
  Project.remove(req.params.id)
    .then(projects => {
      res.json(projects);
    })
    .catch(next)
});

router.get('/:id/actions', validateID, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then(projects => {
      res.json(projects);
    })
    .catch(next)

});


router.use((err, req, res, next) => {
    res.status(500).json({
      message: `error: ${err.message}`,
      stack: err.stack,
    });
  });



module.exports = router;