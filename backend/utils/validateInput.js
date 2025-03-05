const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

module.exports = { validateEmail, validatePhone };
