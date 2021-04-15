const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(401).json({ error: 'unauthorized' });
    // return next(res.json({ error: 'unauthorized' }));
  }
  return next();
};

export default authorize;
