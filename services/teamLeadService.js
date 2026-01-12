const DepartmentAssignment = require('../model/ComplianceModel');
const Ticket = require('../model/ticketmodel');

class TeamLeadService {
  async getMyAssignments(teamLeadId) {

    return DepartmentAssignment.find({
      assigned_team_lead_id: teamLeadId
    }).populate('ticket_id')             
    .populate('assigned_manager_id')   
    .sort({ createdAt: 1 });
  }

  async updateAssignmentStatus(assignment, newStatus) {
    const allowedStatuses = [
      'In Progress',
      'Waiting for Client',
      'Resolved'
    ];

    if (!allowedStatuses.includes(newStatus)) {
      throw new Error('Invalid status update');
    }

    assignment.status = newStatus;

    if (newStatus === 'Resolved') {
      assignment.resolved_at = new Date();
    }

    await assignment.save();

    // 🔥 AUTO SYNC TICKET STATUS
    const unresolvedCount = await DepartmentAssignment.countDocuments({
      ticket_id: assignment.ticket_id,
      status: { $ne: 'Resolved' }
    });

    if (unresolvedCount === 0) {
      await Ticket.findByIdAndUpdate(
        assignment.ticket_id,
        { status: 'Ready to Close' }
      );
    }

    return assignment;
  }
}

module.exports = new TeamLeadService();
