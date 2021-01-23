const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = express();
const port = 3000;

// Provide location for public files
app.use(express.static(__dirname + '/views'));

// Use bodyParser from express to parse the POST body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/***************************************************************
*   @param {string} url The URL entered by the user
*
*   Returns the URL with http:// added if not already present
*
****************************************************************/
function addHttp(url){
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

/***************************************************************
*   @param {string} url The absolute URL requested to be scraped
*
*   Returns the header of the webpage at the given URL
*
****************************************************************/
async function scrapeURL(url){
  const response = await fetch(url);
  const site_txt = await response.text();
  const site_dom = await new JSDOM(site_txt);
  return(site_dom.window.document.querySelector("title").textContent);
}

function updateView(title){
  console.log(title);
}

async function executeSearch(url){
  const title = await scrapeURL(url);
  updateView(title);
}

app.get('/', function(req, res) {
  res.render('index.html');
})

app.post('/searchURL', function(req, res){
  const http_url = addHttp(req.body.url);
  console.log(http_url);
  try {
     executeSearch(http_url);
     //scrapeURL(http_url);
  }
  catch{

  }
})

app.listen(port, function() {
  console.log('Titlebot application is listening at http://localhost:' + port);
})
