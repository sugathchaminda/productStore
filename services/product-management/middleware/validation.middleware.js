const validation = (validate) => (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};

export default validation;
