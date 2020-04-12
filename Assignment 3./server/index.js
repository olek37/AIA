const express = require('express')
var fs = require('fs');
const app = express()
const port = 3000

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  fs.readFile(__dirname + '/Guitars.html', 'utf8', function(err, text){
    res.send(text);
  });
})
app.listen(port)