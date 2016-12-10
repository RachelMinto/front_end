var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/food_items.json")

function nextID() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id + 1;
}

function getFoodItems() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

function writeFoodItems(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

module.exports = {
  get: function() {
    return getFoodItems();
  },
  set: function(foodItem) {
    var foodItems = getFoodItems();
    foodItem.id = nextID();
    foodItems.push(foodItem);
    writeFoodItems({ last_id: foodItem.id, data: foodItem });
  },
  getLastID() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  }
}

