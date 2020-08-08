const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const user = { ...req.body }

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  const newUser = await User.add(user);

  res.status(201).json({
    status: 'success',
    message: 'You signed up successfully.'
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid username or password.'
    })
  }

  const found = await User.findBy(username);

  if (found && bcrypt.compareSync(password, found.password)) {
    req.session.user = found;
    res.status(201).json({
      status: 'success',
      message: `Welcome, ${found.username}.`
    })
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid username or password.'
    })
  }
})

exports.protect = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ 
      status: 'fail',
      message: "You're not authorized." 
    })
  }
}