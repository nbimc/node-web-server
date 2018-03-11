const express = require('express');
const fs = require('fs');

var app = express();

// adding middleware functionality
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log .');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //res.send('<h1>The test response is working!</h1>');
  res.send({
    name: 'Noam',
    likes: [
      'biking',
      'cities'
    ]
  })
});

app.get('/about', (req, res) => {
  res.send('About Page!')
});


app.listen(3010, () => {
  console.log('Server is up');
});
