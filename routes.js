//Importing Modules
const express = require('express');
const studentController = require('./controllers/student.controller');


const router = express.Router();

//All the routes
router.post('/', studentController.createStudent);
router.get('/all',studentController.getStudents);
router.get('/:rollno',studentController.getByRollNo);
router.delete('/:rollno',studentController.deleteByRollNo);
router.get('/getBysubject/:subject',studentController.getBySubject);
router.put('/update/:rollno',studentController.updateName);

const routes = (app) => {

  app.use('/students', router);
  app.get('/', (req, res) => {
    return res.send({ message: "Students Database Up & Running!"});
  }) 
}

//Exporting router
module.exports = routes;