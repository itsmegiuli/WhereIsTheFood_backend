const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authentication = require('./authentication');
const ensureAuth = require('./auth-middleware');
const favorites = require('./favorites');
const data = require('./data');
const app = express();         //comment to be deleted: importing express
const port = 4000;            // comment to be deleted: changed so there's no conflict with react

const favoritesDataStore = {};


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Trying this")); // comment to be deleted: and line to be deleted!

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

app.get('/get-category', (req, res) => {
   try {
      const points = req.query.points;
      const result = data.mapPointsToCategory(points);
      res.send(result);
   } catch (err) {
      res.status(400).send({ "error": err.message });
   }
});

app.get('/favorites', ensureAuth,  (req, res) => {
   try {
      const favoriteCategoryNames = favorites.getFavoriteCategoriesForUser(req.user.username);
      const mappedCategories = data.getCategoriesByName(favoriteCategoryNames);
      res.send(mappedCategories);
   } catch (err) {
      res.status(400).send({ "error": err.message });
   }
});

app.put('/favorites', ensureAuth,  (req, res) => {
   try {
      const categoryName = req.body.categoryName;
      console.log(req.body)
      favorites.addCategoryToFavorites(req.user.username, categoryName);
      res.send({success: true});
   } catch (err) {
      res.status(400).send({ "error": err.message });
   }
});

app.delete('/favorites/:categoryName', ensureAuth,  (req, res) => {
   try {
      const categoryName = req.params.categoryName;
      favorites.removeCategoryFromFavorites(req.user.username, categoryName);
      res.send({success: true});
   } catch (err) {
      res.status(400).send({ "error": err.message });
   }
});

app.listen(port, () => console.log(`Express started on port ${port}`));