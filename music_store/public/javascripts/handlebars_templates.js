this["JST"] = this["JST"] || {};

this["JST"]["albums"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : {}, alias3=helpers.helperMissing, alias4="function";

  return "<img src=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.album : depth0)) != null ? stack1.cover : stack1), depth0))
    + "\" /><h2>"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2><h3>"
    + alias1(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</h3><p>"
    + alias1(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"date","hash":{},"data":data}) : helper)))
    + "</p><p>$"
    + alias1((helpers.format_price || (depth0 && depth0.format_price) || alias3).call(alias2,(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</p><a class=\"button\" href=\"#\">Add to cart</a>";
},"useData":true});

this["JST"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Albums</h1><ul></ul><footer><a class=\"button\" href=\"/albums/new\">Add an album</a></footer>";
},"useData":true});

this["JST"]["new_album"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"/albums\" method=\"post\"><h1>Add Album</h1><fieldset><dl><dt><label>Title</label></dt><dd><input type=\"text\" name=\"title\" /></dd><dt><label>Artist</label></dt><dd><input type=\"text\" name=\"artist\" /></dd><dt><label>Date</label></dt><dd><input type=\"date\" name=\"date\" /></dd><dt><label>Cover</label></dt><dd><input type=\"url\" name=\"cover\" /></dd><dt><label>Price</label></dt><dd><input type=\"text\" name=\"price\" /></dd></dl></fieldset><fieldset class=\"actions\"><input type=\"submit\" value=\"Create\" /></fieldset></form>";
},"useData":true});