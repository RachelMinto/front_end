A Quick Note On Event-Driven Architecture
I’m a follower of the philosophy that a backbone.js application is an event-driven application that responds to changes in the state of our models. That is to say we don’t want to have our views manipulating themselves and referencing / controlling each other directly. Rather, we want to have our views call methods on our models that manipulate the state of our models. In response to the state of our models changing, our application does things. This could be updating some visual element, routing to a new hash fragment, and/or anything else we can do in a web page.

.gitignore

About routers:
  app.js defines what routes are accepted. It sets the variables for routes files that are in public directory, and then says app.use('/', index), where index was a variable for a routes file.

  The routes files can then further define from the submitted base route, if desired, using get, post, etc. Here the data path name is specified, 

Page flow:
Layout Jade must include routing file. 

Routes
/ && /#
/#/menu/{{id}}
/#/checkout

Models
food_item

Views
  cart
  index
  checkout
  food_item

Collections
  food_items
  cart_items

Handlebar templates
  cart_contents
  food_item
  index
  checkout


ALL PAGES:
SUSHI HEADER [which includes shopping cart/# items]
  content (changes)
footer

content
  if checkout: only checkout

  if cart: cart view at top
  either index or food_item views

Models
  {"title":"Chirashi sushi","description":"Sushi bar variety with sushi rice.","price":"21.00","id":1,"image":"http://placehold.it/300x300","nutrition":"{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}"}

Collections
  food_items
    model: food_item
    comparator: id
  cart_items
    model: not listed.
    functions:
      setTotal
      setQuantity
      getTotal
      getQuantity
      addItem
      destroy
      update

Views
  cart
    <div id="cart"> 
      <ul>
        {{each cart_items}}
        <li>
          <figure>
            {{image}}
          </figure>
          <figcaption>
            {{quantity}}x{{price}}
          </figcaption>
        </li>
        {{/each}}
      </ul>
      <div id="cart_summary"> <!-- need id? -->
        <p>Your Shopping Cart</p>
        <p>{{total}}</p>
        <a href="#">Empty Cart</a>
        <button type="submit">Checkout</button>
      </div>
    </div>
  index
    <ul>
      {{#each food_items}}
      <li>
        <img src="{{image}}" />
        <h2>{{title}}</h2>
        <p>{{price}}</p>
        <button type="submit">Add to Cart</button>
      </li>
      {{/each}}
    </ul>
  food_item
  <div id="food_item">
    <div class="previous">
    </div>
    <div>
      <img src="{{image}}" />
      <div>
        <h2>{{title}}</h2>
        <p>{{description}}</p>
        <div>
          <div>{{price}}</div>
          <button type="submit">Add to Cart</button>
        </div>
      </div>
      <table>
        <th colspan="2">Nutritiional Information</th>
        {{#each nutrition}}
        <tr>
          <td>{{@key}}</td>
          <td>{{this}}</td>
        </tr>
        {{/each}}
      </table>
    </div>
    <div class="next">
    </div>    
  </div>
  checkout


History & State

Local Storage

To answer before coding:
  How does the app.js know about the cart?
    -I don't think it has to. Just the two views need to be able to listen to the cart_collection. Cart should be a div that when inactive is hidden or else empty, and active status is triggered by total in the collection.
  Take care of hover effects
    -before element with rgba background and an image.



Order of Creation
  ~Set up express, bower, grunt~
  ~Create dummy data/food_items.json~
  ~Use the path and fs modules to read in JSON file. (Modify index.js)
  ~Run server with npm start to check content.
  ~Create general page layout in index.jade
  ~Create layout.jade file:

  doctype html
  html
    head
      title Music Store
      link(href="https://fonts.googleapis.com/css?family=Droid+Sans" rel="stylesheet")    
      +stylesheet_link_tag("application")
      +javascript_include_tag("vendor/all")
      +javascript_include_tag("handlebars_templates")
    body
      header
        #cart

      main
        block content

      script(type="text/javascript" src="/javascripts/application.js")        


  ~Set up handlebars template for index
  ~Get grunt working for handlebars
  ~touch public/javascripts/application.js
  ~mkdir public/javascripts/views
  ~mkdir public/javascripts/models
  ~mkdir public/javascripts/collections
  ~touch public/javascripts/views/index.js
  ~touch public/javascripts/models/food_item.js  
      var FoodItem = Backbone.Model.extend({});
  ~touch public/javascripts/collections/food_items.js  
      var FoodItems = Backbone.Collection.extend({
        model: FoodItem
        });
  ~include those js files in the layout.jade file.
  ~Add block scripts at the end to allow for inclusion of scripts on a per-page basis
  ~include bower-concatenated file public/javascripts/vendor/all.js

  Add app.locals.basedir = path.join(__dirname, 'views'); to app.js

  Connect up application.styl by installing jade (package.json, npm install, app.js)

  Create FoodItemView:
  var FoodItemView = Backbone.View.extend({
    tagName: "li"
  });

  Add to index.jade:
    script(type="text/javascript").
    App.food_items = new FoodItems(!{JSON.stringify(food_items)});


At this point you can inspect elements and will see the json data in the script tag.
It is available to App at App.food_items

Create template and view content:
  Remove from index.jade:
        img(src="#{food_item.image}")
        h2= food_item.title
        h3= food_item.description
        p $#{food_item.price}
        a.button(href="#") Add to cart

  Create handlebars template for food_item
  run grunt handlebars

  Add to the FoodItemView your template, and render and initialize methods

  Updated index.jade:
    extends layout

    block content
      ul

      block scripts
        script(type="text/javascript").
          App.food_items = new FoodItems(!{JSON.stringify(food_items)});

Add to application.js:
  init: function() {
    this.renderFoodItems();
  },


Make sure backbone models and views are connected. \
  -view contains backreference for the model.
  -App passes model into view.

  Create jasmine test suite

  npm install jasmine-node -S
  npm install request -S

  Add to package.json
  "test": "jasmine-node spec --autotest --color --watch ."

  mkdir spec
  subl spec/route_spec.js
  Create a test
  eg .
  var request = require("request");
  var base_url = "http://localhost:3000/"

  describe('Sushi App', function() {
    describe("GET /", function() {
      it("returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });   
    });
  });

  Run 2 terminals, both npm test and npm start

  On click of food_item, render FoodItemView for that model.
  -Create a page at localhost:3000/#/menu/1
  -Create a handlebars template for menu item
  -Figure out how to connect that view to a particular model.
  -Grab id on click
  -remove index view and render individual view

  Create add to cart methods
  Create cart view functionality for index and food_item views
  Create Cart View
  Make destroy functionality for cart view
  Add functionality for food_item view to go previous and next

  Add pushState and history functionality. Create backbone router.
  Make into single page app instead of individual pages


