const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8081;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userDataFile = path.join(__dirname, 'users.json');

function readUserData() {
  if (!fs.existsSync(userDataFile)) {
    return [];
  }
  const data = fs.readFileSync(userDataFile);
  return JSON.parse(data);
}

function writeUserData(data) {
  fs.writeFileSync(userDataFile, JSON.stringify(data, null, 2));
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();
  if (users.find(user => user.username === username)) {
    return res.status(400).send('User already exists');
  }
  users.push({ username, password });
  writeUserData(users);
  res.send('Registration successful! Please login now.');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.cookie('auth', 'true', { path: '/' });
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

function authMiddleware(req, res, next) {
  if (req.cookies.auth === 'true') {
    next();
  } else {
    res.redirect('/login');
  }
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/blog/:slug', (req, res, next) => {
  const slug = req.params.slug;
  const articlePath = path.join(__dirname, 'src', 'blog', `${slug}.md`);
  if (fs.existsSync(articlePath)) {
    const articleData = fs.readFileSync(articlePath, 'utf-8');
    const privacy = articleData.match(/privacy:\s*(\w+)/);
    if (privacy && privacy[1] === 'private') {
      return authMiddleware(req, res, next);
    }
  }
  next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
