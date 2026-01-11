const assignmentService = require('../services/departmentAssignmentService');

class DepartmentAssignmentController {
  /**
   * GET /manager/assignments
   */
  async getManagerAssignments(req, res) {
    try {
      const assignments = await assignmentService.getManagerAssignments(req.user);

      res.status(200).json({
        count: assignments.length,
        assignments
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  /**
   * POST /manager/assignments/:assignmentId/assign
   */
  async assignTeamLead(req, res) {
    try {
      const { assignmentId } = req.params;
      const { teamLeadId } = req.body;

      if (!teamLeadId) {
        return res.status(400).json({
          message: 'teamLeadId is required'
        });
      }

      const assignment = await assignmentService.assignTeamLead(
        assignmentId,
        teamLeadId,
        req.user
      );

      res.status(200).json({
        message: 'Team lead assigned successfully',
        assignment
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new DepartmentAssignmentController();
