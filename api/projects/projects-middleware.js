// add middlewares here related to projects

   
const Project = require('./projects-model');

const validateID = (req, res, next) => {
  Project.get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json({ message: `could not be retrieved with ${req.params.id}`});
      } else {
          req.project = project;
          next();
      }
    })
    .catch(err => console.log(err))
};

const validateBody = (req, res, next) => {
  const { name, description, completed } = req.body;

  if (!name || !description || !completed  == null   ) {
    res.status(400).json({ message: 'Required field is missing' });
  } else {
    next();
  }
};



module.exports = 
{
    validateID,
    validateBody

};