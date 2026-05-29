const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middleware/file.middleware');

const router = express.Router();

/**
 * @route POST /api/interview/generate-report
 * @desc Generate new  interview report based on user  self descrition , resume pdf and job description
 * @access private
 */

router.post('/',authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
router.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
router.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
router.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


module.exports = router;