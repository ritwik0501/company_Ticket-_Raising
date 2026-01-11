const complianceRepo = require('../repository/compilenceRepository');
const Ticket = require('../model/ticketmodel');
const DepartmentAssignment = require('../model/ComplianceModel');
class ComplianceService {
  async approveTicket(ticketId, departments, complianceUserId) {
    const ticket = await complianceRepo.findTicketById(ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    if (ticket.status !== 'In Compliance Review') {
      throw new Error('Ticket is not in compliance review');
    }

    // Prevent double approval
    const alreadyAssigned = await complianceRepo.hasAssignments(ticketId);
    if (alreadyAssigned) {
      throw new Error('Departments already assigned for this ticket');
    }
    console.log("departments",departments);

    const assignments = departments.map(dep => ({
      ticket_id: ticket._id,
      department: dep.name,
      branch: dep.name === 'Marketing' ? dep.branch : null,
      assigned_manager_id: null,
      assigned_team_lead_id: null,
      status: 'Not Assigned'
    }));
    console.log("assignments",assignments);
    await complianceRepo.createDepartmentAssignments(assignments);

    await complianceRepo.updateTicketStatus(ticket._id, 'In Resolution');

    return { ticketId: ticket._id };
  }

  async getComplianceQueue() {
    return complianceRepo.getComplianceQueue();
  }

  async closeTicket(ticketId) {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // 🔒 Must be ready to close
    if (ticket.status !== 'Ready to Close') {
      throw new Error('Ticket is not ready to close');
    }

    // 🔍 Safety check (extra protection)
    const unresolvedCount = await DepartmentAssignment.countDocuments({
      ticket_id: ticket._id,
      status: { $ne: 'Resolved' }
    });

    if (unresolvedCount > 0) {
      throw new Error('All department assignments are not resolved');
    }

    // ✅ Final closure
    ticket.status = 'Closed';
    ticket.closedAt = new Date();

    await ticket.save();

    return ticket;
  }


}

module.exports = new ComplianceService();
