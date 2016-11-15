var ProductModel = Backbone.Model.extend({
  setDatetime: function() {
    var date = new Date(this.get("date"));
    var datetime = formatDatetime(date);

    this.set("datetime", datetime);
  },
  setDateFormatted: function() {
    var date = new Date(this.get("date"));
    var dateFormatted = formatDate(date);

    this.set("date_formatted", dateFormatted);
  },
  initialize: function() {
    this.setDatetime();
    this.setDateFormatted();
  }
});
var product = new ProductModel(product_json);

var templates = {};

$('[type="text/x-handlebars"]').each(function() {
  var $template = $(this);
  templates[$template.attr("id")] = Handlebars.compile($template.html());
});

renderProduct();
renderForm();

$("form").on("submit", function(e) {
  e.preventDefault();
  var inputs = $(this).serializeArray();
  var date = new Date();
  var attrs = {};

  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });
  attrs.datetime = formatDatetime(date);
  attrs.date_formatted = formatDate(date);
  attrs.date = date.valueOf();
  product.set(attrs);
  renderProduct();
})

function formatDatetime(date) {
  var datetime = moment().format();
  return datetime;
}

function formatDate(date) {
  var date = moment().format('MMMM Do YYYY, h:mm:ss a');
  return date;
}

function renderProduct() {
  $("article").html(templates.product(product.toJSON()));
}

function renderForm() {
  $("fieldset").html(templates.form(product.toJSON()));
}