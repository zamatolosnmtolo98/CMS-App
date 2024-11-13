// middlewares/validationMiddleware.js
const validateContactData = (req, res, next) => {
    const { contactFullName, contactEmail, clientId } = req.body;
  
    // Basic validation checks
    if (!contactFullName || !contactEmail || !clientId) {
      return res.status(400).json({ message: 'Full name, email, and client ID are required' });
    }
  
    // Simple email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(contactEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    next(); // Proceed to the controller if validation passes
  };
  
  module.exports = { validateContactData };
  