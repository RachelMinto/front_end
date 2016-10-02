var inventory;

(function() {
  inventory = {
    last_id: 0,
    collection: [],
    setDate: function() {
      var currentDate = new Date();
      $('#order_date').html(currentDate.toUTCString());
    },
    cacheTemplate: function() {
      $li = $('#inventory_item').remove();
      this.template = $li.html();
    },
    add: function() {
      this.last_id++;      
      var item = {
        id: this.last_id,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);
      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        };
      });
      return found_item;
    },
    findID: function($item) {
      return +$item.find("input[type=hidden]").val();
    },    
    update: function($item) {
      var id = this.findID($item),
          item = this.get(id);

      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },
    updateItem: function(e) {
      var $item = this.findParent(e);

      this.update($item);
    },
    findParent: function(e) {
      return $(e.target).closest("tr");
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();

      this.remove(this.findID($item));
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));
      $('#inventory').append($item);
    },
    bindEvents: function() {
      $("#add_item").on("click", this.newItem.bind(this));
      $('#inventory').on("click", "a.delete", this.deleteItem.bind(this));
      $('#inventory').on("blur", ":input", this.updateItem.bind(this));

    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

$(inventory.init.bind(inventory));
