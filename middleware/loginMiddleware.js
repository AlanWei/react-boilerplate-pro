const adminJson = {
  id: 1,
  name: 'Admin',
  authorities: 'admin',
};
const userJson = {
  id: 2,
  name: 'User',
  authorities: 'user',
};

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'admin' && req.body.password === '123') {
      res.status(200).json(adminJson);
    } else if (req.body.username === 'user' && req.body.password === '123') {
      res.status(200).json(userJson);
    } else {
      res.status(400).json({ error: 'wrong password' });
    }
  } else {
    next();
  }
};
