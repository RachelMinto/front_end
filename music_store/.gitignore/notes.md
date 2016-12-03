Set up the Express application.
From the root directory of your project, run express .
Ensure you have Nodemon installed globally (or run npm install -D nodemon), modify the package.json start command to use Nodemon.
  "start": "nodemon ./bin/www"

npm install (installs all dependencies);

npm start

Set up Bower and Grunt

bower init
bower install -S jquery backbone handlebars
npm install -D grunt
npm install -D  grunt-bower-concat grunt-contrib-uglify

touch /Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "public/javascripts/vendor/all.js": ["public/javascripts/vendor/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/vendor/all.js",
        dependencies: {
          "underscore": "jquery",
          "backbone": "underscore"
        }
      }
    }
  });

  [
    "grunt-bower-concat",
    "grunt-contrib-uglify"
  ].forEach(function(task) {
    grunt.loadNpmTasks(task)
  });

  grunt.registerTask("default", ["bower_concat", "uglify"]);
};

Run grunt to check for errors. If troubleshooting, run grunt task individually by calling it by name (grunt handlebars) and add a --verbose flag to it. 

rm routes/users/js (*unless you need this route)
Remove corresponding require statement route in app.js and from the use statements.

Create some placeholder albums JSON data.
  mkdir data
  cd data
  create albums.json file with content here

Use the path and fs modules built-in to Node to read in albums from the JSON file.
Note: Node path API normalizes the file path so that you can access it even if you move it.
Modify index.js to be:

var express = require('express');
var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/albums.json");
var router = express.Router();

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    albums: getAlbums() 
  });
});

module.exports = router;


*****

Run server with npm start to check content.
Update index.jade if you want to render the content. Eg.
extends layout

block content
  h1 Albums
  ul
    each album in albums
      li
        img(src="#{album.cover}")
        h2= album.title
        h3= album.artist
        p= album.date
        p $#{album.price}
        a.button(href="#") Add to cart

****

Install the Stylus module and use the Express connect middleware in app.js to use it.
  npm install -S stylus
  Add to app.js: 
    var stylus = require("stylus");
    var nib = require("nib")
    app.use(stylus.middleware({
      src: path.join(__dirname, "public"),   // pulls in any stylus files in the public directory
      compile: function(str, p) {
        return stylus(str).set("filename", p).use(nib());  //nib has functions that handle cross-browser code in css
      }
    }));

  npm install -S nib
  npm start to check for errors

  touch public/stylesheets/application.styl
    -add any stylus you'd like

  Change layout.jade to link to application.css
  Add whitespace reset file to public/javascripts
  touch public/javascripts/mixins.styl

  Add following to application.styl
    @import "whitespace-reset.css"
    @import "mixins" // check for errors as you go. Problems with this file may mean the application.css file isn't found.

Create a views/_mixins.jade file
    mixin stylesheet_link_tag(src)
      link(rel='stylesheet' href='/stylesheets/#{src}.css')

    mixin javascript_include_tag(src, ...reset)
      script(type="text/javascript" src="/javascripts/#{src}.js")
      each file in rest
        script(type="text/javascript" scr="javascripts/#{file}.js")

Add to layout.jade:  include /_mixins
  -modify link tags in layout.jade to be +stylesheet_link_tag("application")

Since we now have absolute path, need to modify express in app.js

Add to app.js before error handlers: app.locals.basedir = path.join(__dirname, 'views');

touch views/new.jade
begin new.jade with:
  extend layout

  block content
    {all html here...}

touch routes/albums.js

var path = require("path");
var fs = require("fs");
var express = require("express");
var router = express.Router();
var file_path = path.resolve(path.dirname(__dirname), "data/albums.json");

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

router.get("/albums/new", function(req, res) {
  res.render("new");
});

module.exports = router;


*** npm start. If fails, make sure you've exported the router.

Add new route to app.js:
  app.use('/', albums);
  var albums = require('./routes/albums');