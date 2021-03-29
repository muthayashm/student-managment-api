//Importing Modules
const { Student } = require('../models');

//Creating a new Student
const createStudent = async (req, res) => {
  console.log('CREATING NEW STUDENT');

  const { rollNo, name, className, subjects } = req.body;
  let statusCode;
  let statusMessage;

  try{
    const student = new Student({ rollNo, name, className, subjects});
    await student.save();
    statusCode = 200;
    statusMessage = 'New student created successfully';
  }catch(err){
    console.log('Error occured: ', err);
    statusCode = 400;
    statusMessage = 'Bad request, Try Again';
  }

  res.status(statusCode).send(statusMessage);
}

const getStudents = async(req, res) => {
    console.log("Getting All students");
    let statusCode;
    let message;

    const pageNo = parseInt(req.query.page);
    const pageSize = parseInt(req.query.limit);

    const sortOn = req.query.sorton;
    const sortOrder = req.query.order;

    try {
      if(pageNo && pageSize && sortOn && sortOrder){  //Get with Pagination & Sorting
        console.log("PAGE: "+pageNo+", PAGE_SIZE: "+pageSize);
        console.log("SORT-ON: "+sortOn+", ORDER: "+sortOrder);

        const skip = (pageNo - 1) * pageSize;
        //message = await Student.find({}).skip(skip).limit(pageSize);
        if(sortOn == "rollno" && sortOrder == "asc"){
          message = await Student.find({}).sort({"rollNo":1}).skip(skip).limit(pageSize);
        }else if(sortOn == "rollno" && sortOrder == "desc"){
          message = await Student.find({}).sort({"rollNo":-1}).skip(skip).limit(pageSize);
        }else if(sortOn == "name" && sortOrder == "asc"){
          message = await Student.find({}).sort({"name":1}).skip(skip).limit(pageSize);
        }else if(sortOn == "name" && sortOrder == "desc"){
          message = await Student.find({}).sort({"name":-1}).skip(skip).limit(pageSize);
        }

      }else if(pageNo && pageSize){ //Get with Pagination
        console.log("PAGE: "+pageNo+", PAGE_SIZE: "+pageSize);

        const skip = (pageNo - 1) * pageSize;
        message = await Student.find({}).skip(skip).limit(pageSize);

      }else if(sortOn && sortOrder){  //Get With SortOn and SortOrder
        console.log("SORT-ON: "+sortOn+", ORDER: "+sortOrder);
      
        if(sortOn == "rollno" && sortOrder == "asc"){
          message = await Student.find({}).sort({"rollNo":1});
        }else if(sortOn == "rollno" && sortOrder == "desc"){
          message = await Student.find({}).sort({"rollNo":-1});
        }else if(sortOn == "name" && sortOrder == "asc"){
          message = await Student.find({}).sort({"name":1});
        }else if(sortOn == "name" && sortOrder == "desc"){
          message = await Student.find({}).sort({"name":-1});
        }

      }else{  //Normal Get
        message = await Student.find({});
      }
      statusCode = 200;
    } catch(err) {
      console.log('Error occured:', err);
      statusCode = 400;
      message = 'Bad request, Try Again'
    }

    res.status(statusCode).json(message);
}

const getByRollNo = async(req,res) => {
  console.log("Getting by Roll No");
  let statusCode;
  let message;

  const { rollno } = req.params;

  try{
    const data = await Student.find({ rollNo : rollno});
    statusCode = 200
    message = data

  }catch(err){
    console.log('Error occured: ', err)
    statusCode = 400
    message = 'Bad request, Try Again'
  }

  res.status(statusCode).send(message);

}

const deleteByRollNo = async(req,res) => {
  console.log("Delete by Roll No");
  let stausCode;
  let message;

  const { rollno } = req.params;

  try{
    await Student.deleteOne({rollNo : rollno});
    statusCode = 200
    message = 'Student record deleted'
  }catch(err){
    console.log('Error occured: ', err)
    statusCode = 400
    message = 'Bad request, Try Again'
  }

  res.status(statusCode).send(message);
}

const getBySubject = async (req, res) => {
  console.log("Getting by Subject");
  let stausCode;
  let message;

  const {subject} = req.params;

  try{
    const data = await Student.find({subjects : subject})
    statusCode = 200
    message = data
  }catch(err){
    console.log('Error occured: ', err)
    statusCode = 400
    message = 'Bad request, Try Again'
  }

  res.status(statusCode).send(message);
}

const updateName = async (req, res) => {
  console.log("Update by Rollno");

  let statusCode;
  let message;

  const rollno = req.params.rollno;

  const name = req.body.name;
  const className = req.body.class;
  const subjects = req.body.subjects;

  try{
    let student = await Student.findOne({rollNo:rollno});
    
    if(name){
      student.name = name;
    }

    if(className){
      student.className = className;
    }

    if(subjects){
      student.subjects = subjects;
    }

    await student.save()
    statusCode = 200
    message = "Details updated";
  }catch(err){
    console.log('Error occured: ', err)
    statusCode = 400
    message = 'Bad request, Try Again'
  }

  res.status(statusCode).send(message);
}

//Exporting Student controller
module.exports = {
  createStudent,
  getStudents,
  getByRollNo,
  deleteByRollNo,
  getBySubject,
  updateName,
}