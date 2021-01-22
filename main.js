const express = require('express')
const app = express()
const port = 3000

// Provide location for public files
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
  res.render('index.html')
})

app.get('/search', function(req, res){

})

app.listen(port, function() {
  console.log('Titlebot application is listening at http://localhost:${port}')
})
