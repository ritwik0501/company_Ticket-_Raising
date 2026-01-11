const express = require('express');
const router = express.Router();

const assignmentController = require('../controller/departmentAssignmentController');
const { authenticateToken } = require('../middleware/auth');
const { loadAssignment } = require('../middleware/loadassignment');
const {
  managerOnly,
  managerOwnsDepartment,
  marketingBranchGuard
} = require('../middleware/rbac');


router.get(
  '/manager/assignments',
  authenticateToken,
  managerOnly,
  (req, res) =>
    assignmentController.getManagerAssignments(req, res)
);

router.post(
  '/manager/assignments/:assignmentId/assign',
  authenticateToken,
  loadAssignment,
  managerOnly,
  managerOwnsDepartment,
  marketingBranchGuard,
  (req, res) =>
    assignmentController.assignTeamLead(req, res)
);

module.exports = router;
