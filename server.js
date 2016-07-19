var express = require('express'),
   config = require('./server/configure'),
   mongoose = require('mongoose'),
    app = express();
app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
  app = config(app);
//app.get('/', function(req,res) {
//  res.send('Hello World');
//});

mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connection.on('open', function() {
console.log('Mongoose connected.');
});
var server = app.listen(app.get('port'), function() {
  console.log('Server up: http://localhost:' + app.get('port'));
});
