const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authentication = require('./authentication');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sign-up', (req, res) => {
   const { username, password } = req.body;
   try {
      authentication.handleSingUp(username, password);
      res.send({ "success": true });
   } catch (err) {
      res.send({ "error": err.message });
   }
});

app.post('/sign-in', (req, res) => {
   const { username, password } = req.body;
   try {
      const token = authentication.handleSignIn(username, password);
      res.send({ "success": true, "token": token });
   } catch (err) {
      res.status(400).send({ "error": err.message });
   }
});

app.listen(port, () => console.log(`Express started on port ${port}`));