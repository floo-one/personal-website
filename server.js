const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Add this line
const app = express();
const port = 8081;

app.use(cors()); // Add this line
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// File to store user data
const userDataFile = path.join(__dirname, 'users.json');

// Helper function to read user data
function readUserData() {
  if (!fs.existsSync(userDataFile)) {
    return [];
  }
  const data = fs.readFileSync(userDataFile);
  return JSON.parse(data);
}

// Helper function to write user data
function writeUserData(data) {
  fs.writeFileSync(userDataFile, JSON.stringify(data, null, 2));
}

// Registration route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log('Registering user:', { username, password });
  const users = readUserData();

  if (users.find(user => user.username === username)) {
    return res.status(400).send('User already exists');
  }

  users.push({ username, password });
  writeUserData(users);

  res.send('Registration successful! Please login now.');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt with:', { username, password });
  const users = readUserData();

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.cookie('auth', 'true', { path: '/' });
    res.send('Login successful');
  } else {
    console.log('Invalid credentials for:', { username });
    res.status(401).send('Invalid credentials');
  }
});

// Middleware to check authentication
function authMiddleware(req, res, next) {
  console.log('Checking auth for', req.path);
  if (req.cookies.auth === 'true') {
    next();
  } else {
    console.log('Not authenticated, redirecting to /blog');
    res.redirect('/blog'); // Redirect to login page if not authenticated
  }
}

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Protect all /blog content except the login page
app.use('/blog', (req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') {
    next(); // Allow access to login page
  } else {
    authMiddleware(req, res, next); // Protect other blog content
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
