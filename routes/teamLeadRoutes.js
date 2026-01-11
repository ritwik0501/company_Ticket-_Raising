const express = require('express');
const router = express.Router();

const teamLeadController = require('../controller/teamleadController');
const { authenticateToken } = require('../middleware/auth');
const {
  teamLeadOnly,
  teamLeadOwnsAssignment
} = require('../middleware/rbac');
const { loadAssignment } = require('../middleware/loadassignment');


router.get(
  '/team-lead/assignments',
  authenticateToken,
  teamLeadOnly,
  (req, res) => teamLeadController.getMyAssignments(req, res)
);


router.patch(
  '/team-lead/assignments/:assignmentId/status',
  authenticateToken,
  loadAssignment,           
  teamLeadOnly,
  teamLeadOwnsAssignment,    
  (req, res) => teamLeadController.updateStatus(req, res)
);

module.exports = router;
