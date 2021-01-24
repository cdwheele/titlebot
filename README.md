# Title Bot
Title Bot is a web application which allows the user to submit a URL using a web form, and returns to them the title of the webpage located at the URL. This implementation has a Node backend and uses Express for the Webserver. The frontend is developed in HTML, CSS and JS and utilizes the bootstrap library.

# Pulling image from Dockerhub

# Building the container
```$ docker build -t titlebot .```  
```$ docker run -p 3000:3000 titlebot```

After running the container, navigate to ```localhost:3000``` in the browser to view the application.

# Packages
The following packages were used in this project:  

- ejs: Frontend rendering of variables returned with .render().
- es6-promise: Added support for Promises.
- express: Create a web server.
- isomorphic-fetch: Provides a fetch method allowing the user to send REST requests to an endpoint.
- jsdom: Parse HTML into a DOM.
