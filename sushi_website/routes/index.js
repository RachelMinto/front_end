var path = require("path");
// var FoodItems = require(path.resolve(path.dirname(__dirname), "routes/sushi_node"));
var file_path = path.resolve(path.dirname(__dirname), "data/food_items.json")
var data = [{"title":"Sashimi salad","description":"Organic greens topped with fresh sashimi, wasabi soy vinaigrette.","price":"12.00","id":1,"image":"/images/sashimi-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Chirashi sushi","description":"Sushi bar variety with sushi rice.","price":"21.00","id":2,"image":"/images/chirashi-sushi.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":3,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":4,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":5,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":6,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":7,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":8,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}},{"title":"Seaweed salad","description":"A nice seaweed salad.","price":"17.00","id":9,"image":"/images/seaweed-salad.jpg","nutrition":{"Protein":"2.3138","Fat (total)":"0.6041","Carbohydrate:":"0.6041","Energy (kj)":"7.5314","Energy (kcal)":"1.8000","Sugar":"0.3114"}}]


/* GET home page. */
module.exports = function(router) {
  router.get('', function(req, res, next) {
    res.render('index', {     //res.render(view [, locals] [, callback])  view is .jade
      food_items: data
    });
  });
};

