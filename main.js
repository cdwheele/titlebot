const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const JSDOM = require("jsdom").JSDOM;
const path = require('path');
const app = express();
const port = 3000;

// Provide location for public files
app.use(express.static(__dirname + "\\public"));
app.set('views', __dirname + "\\public\\views");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


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

app.get('/', function(req, res) {
  res.render('index.html');
});

app.post('/searchURL', async function(req, res){
  const http_url = addHttp(req.body.url);
  let error_msg = "";
  console.log(http_url);

  try {
    const title = await scrapeURL(http_url);
    const json_title = {'title' : title, 'error_msg' :error_msg};
    res.render('index.html', json_title);
  }
  catch(e){
    error_msg = "Invald URL entered";
    console.log("error", e);
    const json_title = {'title' : '', 'error_msg' :error_msg};
    res.render('index.html', json_title);
  }
});

app.listen(port, function() {
  console.log('Titlebot application is listening at http://localhost:' + port);
});
