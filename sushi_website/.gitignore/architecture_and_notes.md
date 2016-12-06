.gitignore

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
  Create general page layout in index.jade

  Create layout.jade file:

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


  Set up handlebars template for index
  Get grunt working for handlebars
  Create basic styl
  Create jasmine test suite
  Create view of individual food item on click
  Create add to cart methods
  Create cart view functionality for index and food_item views
  Create Cart View
  Make destroy functionality for cart view
  Add functionality for food_item view to go previous and next

  Add pushState and history functionality
  Make into single page app instead of individual pages


