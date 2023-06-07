const Login = require('../models/user');  

exports.getEditLogin = (req, res, next) => { // -----this called in routes
  res.render('admin/edit-login', {
    pageTitle: 'LOGIN',
    path: '/admin/signup',
    editing: false
  });
};

exports.postAddLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  Login.create({
    username: username,
    password: password,
    phoneNumber: phoneNumber
  })
    .then(result => {
      console.log('Created Login');
      res.redirect('/'); // Redirect to the desired page after successful creation
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditLogin = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.loginId;
  Login.findByPk(prodId)
    .then(login => {
      if (!login) {
        return res.redirect('/');
      }
      res.render('admin/edit-login', {
        pageTitle: 'Edit Login',
        path: '/admin/edit-login',
        editing: editMode,
        login: login
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
};

exports.postEditLogin = (req, res, next) => {
  const prodId = req.body.loginId;
  const updatedUsername = req.body.username;
  const updatedPassword = req.body.password;
  const updatedPhoneNumber = req.body.phoneNumber;

  Login.findByPk(prodId)
    .then(login => {
      if (!login) {
        return res.redirect('/');
      }
      login.username = updatedUsername;
      login.password = updatedPassword;
      login.phoneNumber = updatedPhoneNumber;
      return login.save();    
    })


    .then(result => {
      console.log('Updated Login');
      res.redirect('/admin/login');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
};

exports.getLogins = (req, res, next) => {
  Login.findAll()
    .then(logins => {
      res.render('admin/logins', {
        logins: logins,
        pageTitle: 'Admin Logins',
        path: '/admin/logins'
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
};

exports.postDeleteLogin = (req, res, next) => {
  const prodId = req.body.loginId;
  Login.findByPk(prodId)
    .then(login => {
      if (!login) {
        return res.redirect('/');
      }
      return login.destroy();
    })
    .then(result => {
      console.log('Deleted Login');
      res.redirect('/admin/logins');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
};
