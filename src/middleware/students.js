const { body } = require('express-validator');

const studentDatavalidation = [

    // student name
    body('student_name')
    .notEmpty()
    .withMessage('Student name is required.')
    .isString()
    .withMessage('Student name must in string.')
    .isLength({ max: 100 })
    .withMessage('Name max length is 100'),
    
    // student dob
    body('student_dob')
    .notEmpty()
    .withMessage('Student DOB is required.')
    .isDate()
    .withMessage('Please insert valid date.'),
    
    // student gender
    body('student_gender')
    .isString()
    .withMessage('Student gender must in string.')
    .notEmpty()
    .withMessage('Student gender field is required.')
    .isIn(['Male','Female','Other'])
    .withMessage('Select only from Male, Female and Other only.'),

    // student email
    body('student_email')
    .isString()
    .withMessage('Student email must in string.')
    .notEmpty()
    .withMessage('Student email is required.')
    .isEmail()
    .withMessage('Enter valid email.'),

    // student phone
    body('student_phone')
    .isString()
    .withMessage('Student phone must in string.')
    .notEmpty()
    .withMessage('Student phone is required.')
    .isLength({ min: 10, max: 10 })
    .withMessage('phone length is 10'),
]

module.exports = { studentDatavalidation }