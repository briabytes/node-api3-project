const Users = require('../users/users-model');

const logger = (req, res, next) => {
  console.log(
    `Method: ${req.method}, 
    URL: ${req.url}, 
    Timestamp: ${new Date()}`
  );
  next();
}

const validateUserId = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    if(!user) {
      console.log('user not found');
      res.status(404).json({
        message: 'user not found'
      });
    }else {
      console.log(user);
      req.user = user
      next();
    }
  }catch(error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
}

const validateUser = (req, res, next) => {
  const changes = req.body
    if(!changes) {
      console.log('missing data');
      res.status(400).json({
        message: 'missing user data'
      });
    }if(!changes.name) {
      console.log('missing name');
      res.status(400).json({
        message: 'missing required name field'
      });
    }else {
        console.log(changes);
        next();
    }
}

const validatePost = (req, res, next) => {
  const validPost = req.body
  if(!validPost) {
    console.log('missing user data');
    res.status(400).json({
      message: 'missing user data'
    });
  }if(!validPost.text || !validPost.user_id) {
    console.log('missing text and/or user_id')
    res.status(400).json({
      message: 'missing required text or user_id fields'
    });
  }else {
    console.log(validPost);
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
