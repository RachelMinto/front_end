this["JST"] = this["JST"] || {};

this["JST"]["add_list_placeholder"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"/board/lists\", method=\"post\"><input type=\"text\" placeholder=\"Add a list...\" class=\"add_button\"></form>";
},"useData":true});

this["JST"]["add_list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrapper\"><form action=\"/board/lists\", method=\"post\"><input type=\"text\" placeholder=\"Add a list...\"><a href=\"\"><button type=\"submit\" id=\"add_new_list\">Save</button></a><a href=''><div id=\"cancel_add_list\">X</div></a></form></div>";
},"useData":true});

this["JST"]["board_menu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.verb || (depth0 != null ? depth0.verb : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"verb","hash":{},"data":data}) : helper)))
    + "this card to "
    + alias4(((helper = (helper = helpers.list || (depth0 != null ? depth0.list : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"board_menu\"><div class=\"section\"><h2>Menu</h2><a href=\"\" id=\"close_menu\">X</a></div><hr><div class=\"section\"><div class=\"initials\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.initials : stack1), depth0))
    + "</div><a class=\"menu_button\" href=\"\"><div class=\"members\">Add Members</div></a></div><hr><div class=\"section\"><a href=\"\"><div class=\"board_color_thumbnail\">Change Background</div></a><a href=\"\"><div class=\"filter\">Filter Cards</div></a><a href=\"\"><div class=\"powerups\">Power-Ups</div></a><a href=\"\"><div class=\"stickers\">Stickers</div></a><a href=\"\"><div class=\"more\">More</div></a></div><hr><div class=\"section\"><div class=\"activities\">Activity</div>"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><hr></div>";
},"useData":true});

this["JST"]["board"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"board_nav\"><div id=\"board_settings\"><h1>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1><img src=\"/images/star.png\" id=\"star\"><div id=\"privacy_status\"><span id=\"privacy\"></span><span>Private</span></div></div><div id=\"open_board_menu\"><span>...</span><a href=\"#\">Show Menu</a></div></div><div id=\"board_canvas\"></div>";
},"useData":true});

this["JST"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<span>s</span>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<span>dd</span>";
},"5":function(container,depth0,helpers,partials,data) {
    return "<span>des</span>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<span>com</span>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<span>att</span>";
},"11":function(container,depth0,helpers,partials,data) {
    return "<span>cl</span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<a href=\"\"><p>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p><div class=\"card_icons\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribe : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attachments : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.checklist : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></a>";
},"useData":true});

this["JST"]["editCardMenu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.verb || (depth0 != null ? depth0.verb : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"verb","hash":{},"data":data}) : helper)))
    + "this card to "
    + alias4(((helper = (helper = helpers.list || (depth0 != null ? depth0.list : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"wrapper\"><div class=\"card_content\"><div class=\"card_title_info\"><h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3><p>in list <a href=\"\">"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</a></p></div><div class=\"card_description\"><p>Description<a href=\"\"><span>Edit</span></a></p>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><div class=\"card_comments\"><h3>Add Comment</h3><form><textarea placeholder=\"Write a comment...\"></textarea><div class=\"comment_option_icons\"></div><a href=\"\"><div class=\"send_comment\">Send</div></a></form></div><div class=\"card_activities\"><h3>Activity</h3><a href=\"\">Hide Details</a>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.activities : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div> </div><div class=\"card_action_menu\"><div class=\"card_add_menu\"><a href=\"#\" class=\"menu_button\"><div class=\"members\">Members</div></a><a href=\"#\" class=\"menu_button\"><div class=\"labels\">Labels</div></a> <a href=\"#\" class=\"menu_button\"><div class=\"checklist\">Checklist</div></a><a href=\"#\" class=\"menu_button\"><div class=\"due_date\">Due Date</div></a><a href=\"#\" class=\"menu_button\"><div class=\"attachment\">Attachment</div></a></div><div class=\"card_actions_menu\"><a href=\"#\" class=\"menu_button\"><div class=\"move_card\">Move</div></a><a href=\"#\" class=\"menu_button\"><div class=\"label_card\">Copy</div></a> <a href=\"#\" class=\"menu_button\"><div class=\"subscribe_card\">Subscribe</div></a><a href=\"#\" class=\"menu_button\"><div class=\"archive_card\">Archive</div></a><a href=\"#\">Share and more...</a></div></div></div>";
},"useData":true});

this["JST"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"header\"><div id=\"board_info\"><div><img src=\"/images/sprite.png\"><span>Boards</span><input type=\"text\" class=\"search\"></div></div><div class=\"logo\"><span><a href=\"#\"><img src=\"/images/header-logo-2x.png\"></a></span></div><div id=\"account_info\"><div id=\"create\">+</div><div id=\"profile_settings\"><span class=\"wrapper\">"
    + alias4(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initials","hash":{},"data":data}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</span></div><div id=\"trello_info\"><img src=\"/images/information.png\"</div><div id=\"notifications\"><img src=\"/images/bell.png\"</div></div></div>";
},"useData":true});

this["JST"]["list_edit_name"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"text\" class=\"list-header-name\" spellcheck=\"false\" dir=\"auto\" maxlength=\"512\" placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "\" style=\"overflow: hidden; word-wrap: break-word; height: 24px;\">";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<a href=\"#\"><div class=\"list_header\"><h3>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3><a href=\"\"><span>...</span></a></div></a><ul></ul><a href=\"\" id=\"add_card\">Add a card...</a>";
},"useData":true});