this["JST"] = this["JST"] || {};

Handlebars.registerPartial("activity", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifComment || (depth0 && depth0.ifComment) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.activities : depth0)) != null ? stack1.action : stack1),{"name":"ifComment","hash":{"value":"comment"},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div><p><strong>"
    + alias2(alias1((depth0 != null ? depth0.user : depth0), depth0))
    + "</strong></p><div class=\"posted_comment_content\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</div><p> at "
    + alias2(alias1((depth0 != null ? depth0.timestamp : depth0), depth0))
    + "</p></div><hr>";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div><span><strong>"
    + alias2(alias1((depth0 != null ? depth0.user : depth0), depth0))
    + "</strong><span> "
    + alias2(alias1((depth0 != null ? depth0.action : depth0), depth0))
    + " this card to "
    + alias2(alias1((depth0 != null ? depth0.list : depth0), depth0))
    + " at <span>"
    + alias2(alias1((depth0 != null ? depth0.timestamp : depth0), depth0))
    + "</span></div><hr>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"card_activities\"><div class=\"activities_header\"><h3>Activity</h3></div><div class=\"all_activities\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div> ";
},"useData":true}));

Handlebars.registerPartial("checklist", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div><h3>Title: "
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</h3><a href=\"\">Delete...</a>"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.checklists : depth0)) != null ? stack1.todos : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<a href=\"\" class=\"add_checklist_todo_placeholder\">Add an item...</a><form action=\"\" method=\"\" placeholder=\"Add an item...\" autocomplete=\"off\" class=\"invisible card_add_todo_form\"><input class=\"new_todo_name\" name=\"title\" autofocus><div><a href=\"\" class=\"submit_new_checklist_todo submit_menu_info selected\"><div>Add</div></a><i class=\"icon-cancel\"></i><a href=\"\" class=\"get_more_options\"><span>...</span></a></div></form></div>";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.todos : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p class=\"checklist_todo\">todo title: "
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"card_checklists\">";
  stack1 = ((helper = (helper = helpers.checklists || (depth0 != null ? depth0.checklists : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"checklists","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.checklists) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div> ";
},"useData":true}));

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
    + "</div><a class=\"menu_button\" href=\"\"><div class=\"members\">Add Members</div></a></div><hr><div class=\"section\"><a href=\"\"><div class=\"board_color_thumbnail\">Change Background</div></a><a href=\"\"><div class=\"filter\">Filter Cards</div></a></div><hr><div class=\"section\"><div class=\"activities\">Activity</div>"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><hr></div>";
},"useData":true});

this["JST"]["board"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"board-wrapper\"><div class=\"board-main-content\"><div id=\"board_nav\"><div id=\"board_settings\"><h1>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1><div id=\"privacy_status\"><span id=\"privacy\"></span><i class=\"icon-star\"></i><span>Private</span></div></div><div id=\"open_board_menu\"><span>...</span><a href=\"#\">Show Menu</a></div></div><div id=\"board\"><div id=\"board_canvas\"></div></div></div></div>";
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
    var helper;

  return "<span><i class=\"icon-comment\" title=\"Comments\"></i>"
    + container.escapeExpression(((helper = (helper = helpers.cardComments || (depth0 != null ? depth0.cardComments : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"cardComments","hash":{},"data":data}) : helper)))
    + "</span>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<i class=\"icon-attachment\"></i>";
},"14":function(container,depth0,helpers,partials,data) {
    return "<span title=\"Checklist items\"><i class=\"icon-checkbox\"></i></span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<p>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p><div class=\"card_icons\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<!--"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cardComments : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<!--"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attachments : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.checklists : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["JST"]["delete"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"delete_card_popup card_menu_popup\"><div class=\"card_menu_popup_header\"><h5>Delete Card?</h5><i class=\"icon-cancel\"></i></div><hr><p>All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.</p><div class=\"submit_info_button warning delete_confirmation\">Delete</div></div></div>";
},"useData":true});

this["JST"]["editCardMenu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"archived_header\">This card is archived.</div>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Labels</p><div class=\"card_item_labels_display\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<span class=\"label_"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.color : depth0), depth0))
    + "\"></span>";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>Description<a href=\"\" class=\"edit_card_description\"><span>Edit</span></a></p><p class=\"card_description_text\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>";
},"8":function(container,depth0,helpers,partials,data) {
    return "<a href=\"\" class=\"edit_card_description\"><span>Edit the description...</span></a>";
},"10":function(container,depth0,helpers,partials,data) {
    return "<hr><div class=\"menu_button delete_card_warning\"><i class=\"icon-delete\"></i>Delete</div><div class=\"menu_button unarchive_card\"><i class=\"icon-unarchive\"></i>Send to board</div>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<div class=\"menu_button archive_card\"><i class=\"icon-archive\"></i>Archive</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"wrapper edit_card_menu_wrapper\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.archived : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"card_content_header\"><div class=\"card_title_info\"><div class=\"card_title_placeholder\"><h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3></div><div class=\"invisible new_card_title_input\"><input type=\"text\" id=\"new_card_name\" name=\"new_card_name\" autofocus spellcheck=\"false\" dir=\"auto\" maxlength=\"512\" value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" style=\"overflow: hidden; word-wrap: break-word; height: 24px;\"></div></div><p>in list <a href=\"\">"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</a></p></div><i class=\"icon-cancel\"></i><div class=\"card_content\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"card_description\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "</div><div class=\"invisible edit_card_description_popover\"><p>Description</p><form autocomplete=\"off\" method=\"\" action=\"\"><textarea class=\"card_description_input\" style=\"overflow: hidden; word-wrap: break-word; resize: none; height: 108px;\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea><a href=\"\" class=\"add_description submit_info_button\">Save</a><a href=\"\" class=\"cancel_submission close_card_edit_description\">X</a></form></div>"
    + ((stack1 = container.invokePartial(partials.checklist,depth0,{"name":"checklist","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"card_comments\"><h3>Add Comment</h3><form autocomplete=\"off\"><textarea placeholder=\"Write a comment...\" class=\"comment_input\"></textarea><div class=\"send_comment_wrapper\"><div class=\"send_comment submit_info_button\">Send</div></div></form></div>"
    + ((stack1 = container.invokePartial(partials.activity,depth0,{"name":"activity","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div><div class=\"card_action_menu\"><div class=\"card_add_menu\"><h3>Add</h3><!--<a href=\"#\" class=\"menu_button\"><div class=\"members\">Members</div></a> --><div class=\"menu_button labels\"><i class=\"icon-label\"></i>Labels</div><!--<div class=\"menu_button checklist\"><i class=\"icon-checkbox\"></i>Checklist</div><div class=\"edit_card_popup wrapper card_menu_popup add_checklist_popup invisible\"><h5>Add Checklist</h5><form name=\"add_checklist\" autocomplete=\"off\"><label for=\"checklist_title_input\">Title<input type=\"text\" placeholder=\"Checklist\" id=\"checklist_title_input\" name=\"checklist_title_input\"></label><a href=\"\"><div class=\"submit_info_button add_checklist selected\">Add</div></a></form></div>--><!--<a href=\"#\" class=\"menu_button\"><div class=\"attachment\">Attachment</div></a> --></div><div class=\"card_actions_menu\"><h3>Actions</h3><div class=\"menu_button move_card\"><i class=\"icon-move\"></i>Move</div><div class=\"menu_button label_card\"><i class=\"icon-copy\"></i>Copy</div> <div class=\"menu_button subscribe_card\"><i class=\"icon-subscribe\"></i>Subscribe</div>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.archived : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "</div></div></div>";
},"usePartial":true,"useData":true});

this["JST"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"full_page\"><div id=\"header\"><div id=\"board_info\"><div id=\"search_input_wrapper\"><input type=\"text\" id=\"search_input\" name=\"search_input\" spellcheck=\"false\" dir=\"auto\" value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" style=\"overflow: hidden; word-wrap: break-word;\"><i class=\"icon-search\"></i></div></div><div class=\"logo\"><span><a href=\"#\"><img src=\"/images/header-logo-2x.png\"></a></span></div><div id=\"account_info\"><div id=\"profile_settings\"><span class=\"wrapper\">"
    + alias4(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initials","hash":{},"data":data}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</span></div><i id=\"trello_info\" class=\"icon-info\"></i><i id=\"notifications\" class=\"icon-bell\"></i></div></div></div>";
},"useData":true});

this["JST"]["labels"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"edit_card_popup wrapper card_menu_popup add_label_popup\"><div class=\"card_menu_popup_header\"><h5>Labels</h5><i class=\"icon-cancel\"></i></div><hr><ul><li><span class=\"card_label label_green\" data-color=\"green\">"
    + alias4(((helper = (helper = helpers.label_green_text || (depth0 != null ? depth0.label_green_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_green_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_yellow\" data-color=\"yellow\">"
    + alias4(((helper = (helper = helpers.label_yellow_text || (depth0 != null ? depth0.label_yellow_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_yellow_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_orange\" data-color=\"orange\">"
    + alias4(((helper = (helper = helpers.label_orange_text || (depth0 != null ? depth0.label_orange_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_orange_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_red\" data-color=\"red\">"
    + alias4(((helper = (helper = helpers.label_red_text || (depth0 != null ? depth0.label_red_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_red_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_purple\" data-color=\"purple\">"
    + alias4(((helper = (helper = helpers.label_purple_text || (depth0 != null ? depth0.label_purple_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_purple_text","hash":{},"data":data}) : helper)))
    + "</span></li><li><span class=\"card_label label_blue\" data-color=\"blue\">"
    + alias4(((helper = (helper = helpers.label_blue_text || (depth0 != null ? depth0.label_blue_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_blue_text","hash":{},"data":data}) : helper)))
    + "</span></li></ul></div>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"icon-subscribe\"></i>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"list_content_wrapper wrapper\"><a href=\"#\" class=\"list_title_header\"><div class=\"list_header\"><h3 class=\"list_title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<i class=\"icon-ellipsis\"></i></div></a><div class=\"invisible new_list_title_input\"><input type=\"text\" id=\"new_list_name\" name=\"new_list_name\" autofocus spellcheck=\"false\" dir=\"auto\" maxlength=\"512\" value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" style=\"overflow: hidden; word-wrap: break-word; height: 24px;\"></div><a href=\"\" class=\"get_more_options\"><i class=\"ellipsis\"></i></a><ul class=\"list_container\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></ul><div class=\"add_card_composer invisible\"><form action=\"/board/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/items\", method=\"post\" class=\"addCardForm\" autocomplete=\"off\"><input class=\"card\" id=\"new_card_name\" name=\"title\" autofocus><div><a href=\"\" class=\"submit_new_card\"><div>Add</div></a><i class=\"icon-cancel\"></i><a href=\"\" class=\"get_more_options\"><span>...</span></a></div></form></div><a href=\"\" class=\"add_card submit_info_button\">Add a card...</a></div><div class=\"wrapper card_menu_popup list_options_popup invisible\"><h5>List Actions</h5><i class=\"icon-cancel\"></i><hr><div class=\"list_options_add_card\">Add Card...</div><div class=\"list_options_subscribe\">Subscribe</div><hr></div>";
},"useData":true});

this["JST"]["move"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</option>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<option value=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.inc || (depth0 && depth0.inc) || alias2).call(alias1,(data && data.index),{"name":"inc","hash":{},"data":data}))
    + "</option>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=helpers.blockHelperMissing, buffer = 
  "<div class=\"move_card_popup card_menu_popup\"><div class=\"card_menu_popup_header\"><h5>Move Card</h5><i class=\"icon-cancel\"></i></div><hr><div class=\"all_lists_dropdown_placeholder setting menu_button\"><span class=\"label\">List</span><span class=\"value\">"
    + alias4(((helper = (helper = helpers.list || (depth0 != null ? depth0.list : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list","hash":{},"data":data}) : helper)))
    + "</span><!-- <label>List</label> --><select class=\"list_select_options\" name=\"list_select_options\">";
  stack1 = ((helper = (helper = helpers.lists || (depth0 != null ? depth0.lists : depth0)) != null ? helper : alias2),(options={"name":"lists","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.lists) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</select></div><div class=\"all_positions_dropdown_placeholder setting menu_button\"><span class=\"label\">Position</span><span class=\"position_value\">"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</span><!--<label>Position</label>--><select class=\"position_select_options\" name=\"position_select_options\">";
  stack1 = ((helper = (helper = helpers.cards || (depth0 != null ? depth0.cards : depth0)) != null ? helper : alias2),(options={"name":"cards","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.cards) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select></div><div class=\"submit_info_button selected move_submission\">Move</div></div></div>";
},"useData":true});

this["JST"]["popup"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});