const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const JSDOM = require("jsdom").JSDOM;
const path = require('path');
const app = express();
const port = 3000;

// Provide location for public files
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/public/views");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Initialize global history lists
var title_history = [];
var url_history = [];

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

/***************************************************************
*   @param {string} url The absolute URL requested to be scraped
*   @param {string} title The title found at the requested URL
*
*   Modifies globals url_history and title_history. Max length
*   of arrays are set to 10.
*
****************************************************************/
function genHistory(url, title){
  if (url_history.length >= 5 && title_history.length >= 5){
    url_history.shift();
    title_history.shift();
  }
  url_history.push(url);
  title_history.push(title);
  console.log(url_history);
  console.log(title_history);
}

/***************************************************************
*   @param {string} title The title found at the requested URL
*   @param {string} error The error message returned (if any)
*
*   Returns a json of all data to send to frontend.
*
****************************************************************/
function buildJSON(title, error){
  return {
    'title' : title,
    'error_msg' : error,
    'title_history' : title_history,
    'url_history' : url_history
  }
}

app.get('/', function(req, res) {
  res.render('index.html');
});

app.post('/searchURL', async function(req, res){
  const http_url = addHttp(req.body.url);
  let error_msg = "";
  console.log(http_url);
  try {
    const title = await scrapeURL(http_url);
    genHistory(http_url, title);
    json = buildJSON(title, error_msg);
    res.render('index.html', json);
  }
  catch(e){
    error_msg = "Invald URL entered";
    console.log("error", e);
    const title = '';
    json = buildJSON(title, error_msg);
    res.render('index.html', json);
  }
});

app.listen(port, function() {
  console.log('Titlebot application is listening at http://localhost:' + port);
});
