var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var app = express();

app.use(cookieSession({
  secret: 'session'
}))
.use(function(req, res, next) {
  if (typeof(req.session.todo) == 'undefined') {
      req.session.todo = [];
      }
      next();
})
.get('/todolist', function(req, res) {
    res.render('list.ejs', {todo: req.session.todo});
  })
.post('/todolist/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodolist != '') { //id input
      req.session.todo.push(req.body.newtodolist);
    }
    res.redirect('/todolist');
  })
.get('/todolist/supprimer/:n', function(req, res, next) {
  if (req.params.n != '') {
    req.session.todo.splice(req.params.n, 1);
  }
  res.redirect('/todolist');
  })
.use(function(req, res, next) {
  res.redirect('/todolist');
})

.listen(8080);
