var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

var authData = {
  email:'pilsa0327@gmail.com',
  password:'111111',
  nickname:'pilsa'
}

router.get('/login', function(request, response){
  var title = 'WEB - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  response.send(html);
});

router.post('/login_process', function(request, response){
  var post = request.body;
  var email = post.email;
  var password = post.pwd;
  if(email === authData.email && password === authData.password){
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    request.session.save(function(err){
      response.redirect('/');
    });
  } else {
    response.send('Who?');
  }   
});

router.get('/logout', function(request, response){
  request.session.destroy(function(err){
  response.redirect('/');
  })
});
  module.exports = router;