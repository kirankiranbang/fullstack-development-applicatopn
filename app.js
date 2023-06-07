const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database'); // Import the Sequelize instance
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'signupfolder')));

// Set up Sequelize models and sync with the database
sequelize
  .sync()
  .then(() => {
    console.log('MySQL database synced');
  })
  .catch((error) => {
    console.error('Error syncing MySQL database:', error);
  });

app.get('/admin/login', (req, res) => {
  console.log("URL: http://localhost:4000/admin/login is in your app.js");
  res.sendFile(path.join(__dirname, 'signupfolder', 'signup.html'));
});


//fetch data one by one from database
//http://localhost:4000/signup/1...n
app.get('/signup/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await User.findByPk(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Error fetching user');
  }
});








//fetch from database all data
//http://localhost:4000/signup-data


app.get('/signup-data', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

app.post('/signup', async (req, res) => {
  const { username, password, phoneNumber } = req.body;

  try {
    const newUser = await User.create({
      username: username,
      password: password,
      phoneNumber: phoneNumber,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});




//data is deleted in backend
app.delete('/signup/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedUser = await User.destroy({ where: { id: id } });

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
});

app.use(errorController.get404);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
