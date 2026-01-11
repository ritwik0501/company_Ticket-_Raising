const DepartmentAssignment = require('../model/ComplianceModel');

const loadAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await DepartmentAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found'
      });
    }

    req.assignment = assignment; 
    next();
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid assignment id'
    });
  }
};

module.exports = { loadAssignment };
