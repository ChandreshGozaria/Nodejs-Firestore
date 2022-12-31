const { Router } = require('express');
const controllers = require('../controllers/students');
const { studentDatavalidation } = require('../middleware/students');

const { body, validationResult } = require('express-validator');

const router = Router();

router.get('/', controllers.getAllStudents);
router.get('/:docid', controllers.getStudentByDocId);
router.post('/',studentDatavalidation, controllers.createStudents);
router.put('/:docid', studentDatavalidation, controllers.updateStudentByDocId);
router.delete('/:docid', controllers.deleteStudentByDocId);



module.exports = router;