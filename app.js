const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/login', (req, res, next) => {
  res.redirect('/');
});

app.post('/contact', (req, res, next) => {
  res.redirect('/');
});


app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {0
    console.log(`App listening at port: ${port}`)
  }
});
