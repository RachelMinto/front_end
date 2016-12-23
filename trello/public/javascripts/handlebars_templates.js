this["JST"] = this["JST"] || {};

this["JST"]["add_list_placeholder"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"text\" class=\"add_list_placeholder add_button\" placeholder=\"Add a list...\"><div class=\"wrapper invisible add_list_input_field\"><form action=\"/board/lists\", method=\"post\" name=\"add_list_form\"><input type=\"text\" placeholder=\"Add a list...\" id=\"add_list_name_input\" name=\"title\"><a href=\"\"id=\"add_new_list\"><button type=\"submit\">Save</button></a><a href=''><div id=\"cancel_add_list\">X</div></a></form></div>";
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

  return "<div id=\"board_menu\"><div class=\"section\"><h2>Menu</h2><a href=\"#\" id=\"close_menu\">X</a></div><hr><div class=\"section\"><div class=\"initials\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.initials : stack1), depth0))
    + "</div><a class=\"menu_button\" href=\"\"><div class=\"members\">Add Members</div></a></div><hr><div class=\"section\"><a href=\"\"><div class=\"board_color_thumbnail\">Change Background</div></a><a href=\"\"><div class=\"filter\">Filter Cards</div></a><a href=\"\"><div class=\"powerups\">Power-Ups</div></a><a href=\"\"><div class=\"stickers\">Stickers</div></a><a href=\"\"><div class=\"more\">More</div></a></div><hr><div class=\"section\"><div class=\"activities\">Activity</div>"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><hr></div>";
},"useData":true});

this["JST"]["board"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"board_nav\"><div id=\"board_settings\"><h1>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1><img src=\"/images/star.png\" id=\"star\"><div id=\"privacy_status\"><span id=\"privacy\"></span><i class=\"icon-star\"></i><span>Private</span></div></div><div id=\"open_board_menu\"><span>...</span><a href=\"#\">Show Menu</a></div></div><div id=\"board\"><div id=\"board_canvas\"></div></div>";
},"useData":true});

this["JST"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"card_item_labels_display\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\"label_"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.color : depth0), depth0))
    + "\"></span>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<span><i class=\"icon-subscribe\"></i></span>";
},"6":function(container,depth0,helpers,partials,data) {
    return "<i class=\"icon-duedate\"></i>";
},"8":function(container,depth0,helpers,partials,data) {
    return "<span><i class=\"icon-description\" title=\"This card has a description.\"></i></span>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span><i class=\"icon-comment\" title=\"Comments\"></i>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<i class=\"icon-attachment\"></i>";
},"14":function(container,depth0,helpers,partials,data) {
    return "<span title=\"Checklist items\"><i class=\"icon-checkbox\"></i></span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<a href=\"\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<p>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p><div class=\"card_icons\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<!--"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<!--"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attachments : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.checklist : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></a>";
},"useData":true});

this["JST"]["editCardMenu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>Description<a href=\"\" class=\"edit_card_description\"><span>Edit</span></a></p><p class=\"card_description_text\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<a href=\"\" class=\"edit_card_description\"><span>Edit the description...</span></a>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
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
    + "</a></p></div><div class=\"card_description\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div><div class=\"invisible edit_card_description_popover\"><p>Description</p><form autocomplete=\"off\" method=\"\" action=\"\"><textarea class=\"card_description_input\" style=\"overflow: hidden; word-wrap: break-word; resize: none; height: 108px;\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea><a href=\"\" class=\"add_description submit_info_button\">Save</a><a href=\"\" class=\"cancel_submission close_card_edit_description\">X</a></form></div><div class=\"card_comments\"><h3>Add Comment</h3><form autocomplete=\"off\"><textarea placeholder=\"Write a comment...\" class=\"comment_input\"></textarea><div class=\"comment_option_icons\"></div><a href=\"\"><div class=\"send_comment\">Send</div></a></form></div><div class=\"card_activities\"><h3>Activity</h3><a href=\"\">Hide Details</a>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.activities : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div> </div><div class=\"card_action_menu\"><div class=\"card_add_menu\"><h3>Add</h3><!--<a href=\"#\" class=\"menu_button\"><div class=\"members\">Members</div></a> --><a href=\"#\" class=\"menu_button\"><div class=\"labels\">Labels</div></a> <div class=\"edit_card_popup wrapper label_menu invisible\"><h5>Labels</h5><i class=\"icon-close\"></i><hr><!--<input type=\"text\" placeholder=\"Search labels...\" name=\"search_labels\" id=\"card_search_labels\"> --><ul><li><span class=\"card_label label_green\">"
    + alias4(((helper = (helper = helpers.label_green_text || (depth0 != null ? depth0.label_green_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_green_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_yellow\">"
    + alias4(((helper = (helper = helpers.label_yellow_text || (depth0 != null ? depth0.label_yellow_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_yellow_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_orange\">"
    + alias4(((helper = (helper = helpers.label_orange_text || (depth0 != null ? depth0.label_orange_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_orange_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_red\">"
    + alias4(((helper = (helper = helpers.label_red_text || (depth0 != null ? depth0.label_red_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_red_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_purple\">"
    + alias4(((helper = (helper = helpers.label_purple_text || (depth0 != null ? depth0.label_purple_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_purple_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_blue\">"
    + alias4(((helper = (helper = helpers.label_blue_text || (depth0 != null ? depth0.label_blue_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_blue_text","hash":{},"data":data}) : helper)))
    + "</span></li></ul></div><a href=\"#\" class=\"menu_button\"><div class=\"checklist\">Checklist</div></a><div class=\"edit_card_popup wrapper label_menu invisible\"><h5>Add Checklist</h5><form name=\"add_checklist\" autocomplete=\"off\"><label for=\"checklist_title_input\">Title<input type=\"text\" placeholder=\"Checklist\" name=\"checklist_title_input\"></label><a href=\"\"><div class=\"submit_info_button add_checklist\">Add</div></a></form></div><a href=\"#\" class=\"menu_button\"><div class=\"due_date\">Due Date</div></a><!--<a href=\"#\" class=\"menu_button\"><div class=\"attachment\">Attachment</div></a> --></div><div class=\"card_actions_menu\"><h3>Actions</h3><a href=\"#\" class=\"menu_button\"><div class=\"move_card\">Move</div></a><a href=\"#\" class=\"menu_button\"><div class=\"label_card\">Copy</div></a> <a href=\"#\" class=\"menu_button\"><div class=\"subscribe_card\">Subscribe</div></a><a href=\"#\" class=\"menu_button\"><div class=\"archive_card\">Archive</div></a><a href=\"#\">Share and more...</a></div></div></div>";
},"useData":true});

this["JST"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"header\"><div id=\"board_info\"><div><div id=\"search_input_placeholder\"><i class=\"icon-search\"></i></div><input type=\"text\" class=\"invisible\" id=\"search_input\"></div></div><div class=\"logo\"><span><a href=\"#\"><img src=\"/images/header-logo-2x.png\"></a></span></div><div id=\"account_info\"><div id=\"profile_settings\"><span class=\"wrapper\">"
    + alias4(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initials","hash":{},"data":data}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</span></div><i id=\"trello_info\" class=\"icon-info\"></i><i id=\"notifications\" class=\"icon-bell\"></i></div></div>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#\" class=\"list_title_header\"><div class=\"list_header\"><h3 class=\"list_title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3></div></a><div class=\"invisible new_list_title_input\"><input type=\"text\" id=\"new_list_name\" name=\"new_list_name\" spellcheck=\"false\" dir=\"auto\" maxlength=\"512\" placeholder=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" style=\"overflow: hidden; word-wrap: break-word; height: 24px;\"></div><a href=\"\" class=\"get_more_options\"><span>...</span></div><ul class=\"list_container\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></ul><div class=\"add_card_composer invisible\"><form action=\"/board/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/items\", method=\"post\" class=\"addCardForm\" autocomplete=\"off\"><input class=\"card\" id=\"new_card_name\" name=\"title\" autofocus><div><a href=\"\" class=\"submit_new_card\"><div>Add</div></a><span>X</span><a href=\"\" class=\"get_more_options\"><span>...</span></a></div></form></div><a href=\"\" class=\"add_card submit_info_button\">Add a card...</a>";
},"useData":true});