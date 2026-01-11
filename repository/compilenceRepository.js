const Ticket = require('../model/ticketmodel');
const DepartmentAssignment = require('../model/ComplianceModel');

class ComplianceRepository {
  /**
   * Find ticket by ID
   */
  async findTicketById(ticketId) {
    return Ticket.findById(ticketId);
  }

  /**
   * Update ticket status
   */
  async updateTicketStatus(ticketId, status) {
    return Ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );
  }

  /**
   * Create department assignments
   */
  async createDepartmentAssignments(assignments) {
    return DepartmentAssignment.insertMany(assignments);
  }

  /**
   * Check if assignments already exist for ticket
   * (prevents duplicate approval)
   */
  async hasAssignments(ticketId) {
    const count = await DepartmentAssignment.countDocuments({
      ticket_id: ticketId
    });
    return count > 0;
  }

  /**
   * Get tickets waiting for compliance review
   */
  async getComplianceQueue() {
    return Ticket.find({
      status: 'In Compliance Review'
    }).sort({ createdAt: 1 });
  }
}

module.exports = new ComplianceRepository();
