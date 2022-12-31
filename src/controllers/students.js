const admin = require('../database/index')
const { validationResult } = require('express-validator');

const db = admin.firestore();

// Get all students
const getAllStudents = async (req, res) => {
    try {

        const getStudents = await db.collection('Students');
        const students = await getStudents.get();
        let responseArr = [];

        students.forEach(doc => {
            responseArr.push(doc.data());
        })

        res.status(200).send(responseArr);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get student by docid
const getStudentByDocId = async (req, res) => {
    try {


        const getStudent = await db.collection('Students').doc(req.params.docid);
        const student = await getStudent.get();

        if (!student.data()) {
            return res.status(404).send('Student not exist.')
        }

        res.status(200).send(student.data());
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Create student
const createStudents = async (req, res) => {
    try {
        const { student_name, student_dob, student_gender, student_email, student_phone } = req.body;
        const studentInfo = {
            student_name,
            student_dob,
            student_gender,
            student_email,
            student_phone
        };

        // express validator 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Do not allow future dates code
        let ToDate = new Date();
        ToDate.toLocaleString();
        ToDate.setDate(ToDate.getDate() - 1);
        if (new Date(student_dob).getTime() > ToDate) {
            return res.status(400).send('Please select valid DOB.')
        }

        // Check Unique) email
        const getStudents = db.collection('Students');
        const students = await getStudents.get();
        let isExsist;
        students.forEach(doc => {
            if (student_email === doc.data().student_email) {
                isExsist = true
            }
        })
        if (isExsist) {
            return res.status(400).send('Email address already taken');
        }

        // mobile number 
        let number = parseInt(student_phone, 10);
        if (isNaN(number)) {
            return res.status(400).send('Phone number must be a number only.');
        }

        // Insert student
        const student = await db.collection('Students').add(studentInfo);
        res.status(200).send(student);

    } catch (error) {
        return res.status(400).send(error.message);
    }
}

// Update student
const updateStudentByDocId = async (req, res) => {
    try {

        const getStudent = await db.collection('Students').doc(req.params.docid);
        const student = await getStudent.get();
      
        if (!student.data()) {
            return res.status(404).send('Student not exist.')
        }

        // express validator 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Do not allow future dates code
        let ToDate = new Date();
        ToDate.toLocaleString();
        ToDate.setDate(ToDate.getDate() - 1);
        if (new Date(req.body.student_dob).getTime() > ToDate) {
            return res.status(400).send('Please select valid DOB.')
        }

        // Check Unique) email
        const getStudents = db.collection('Students');
        const students = await getStudents.get();
        let isExsist;
        students.forEach(doc => {
            if (req.body.student_email === doc.data().student_email) {
                isExsist = true
            }
        })

        if (isExsist && req.body.student_email != student.data().student_email ) {
            return res.status(400).send('Email address already taken');
        }

        // mobile number 
        let number = parseInt(req.body.student_phone, 10);
        if (isNaN(number)) {
            return res.status(400).send('Phone number must be a number only.');
        }

        const updateStudent = await db.collection('Students').doc(req.params.docid).update(req.body)
        res.status(200).send(updateStudent);

    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete student data
const deleteStudentByDocId = async (req, res) => {
    try {

        const getStudent = await db.collection('Students').doc(req.params.docid);
        const student = await getStudent.get();
      
        if (!student.data()) {
            return res.status(404).send('Student not exist.')
        }

        const deleteStudent = await db.collection('Students').doc(req.params.docid).delete();
        res.status(200).send(deleteStudent);

        

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllStudents,
    getStudentByDocId,
    createStudents,
    updateStudentByDocId,
    deleteStudentByDocId
}
