const DepartmentAssignment = require('../model/ComplianceModel');

class DepartmentAssignmentRepository {
  async findById(assignmentId) {
    return DepartmentAssignment.findById(assignmentId);
  }

  async assignTeamLead(assignmentId, teamLeadId) {
    return DepartmentAssignment.findByIdAndUpdate(
      assignmentId,
      {
        assigned_team_lead_id: teamLeadId,
        status: 'Assigned to Team Lead'
      },
      { new: true }
    );
  }

  async getAssignmentsByDepartment(department, branch = null) {
    const query = { department };

    if (department === 'Marketing') {
      query.branch = branch;
    }

    return DepartmentAssignment.find(query).sort({ createdAt: 1 });
  }
}

module.exports = new DepartmentAssignmentRepository();
