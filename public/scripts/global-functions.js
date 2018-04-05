/*
Jr. Tech Innovation Center (JTIC): GLOBAL JAVASCRIPT FUNCTIONS
Copyright (C) 2018 Matthew Aguiar

  Jr. Tech's Mission:
  Jr. Tech is a non-profit STEM organization and its mission is to provide young, 4th - 12th grade students,
  with an opportunity to begin building their Science, Technology, Engineering and Mathematical skills for future success
  in STEM related fields. Some of Jr. Tech's technological classes include, "Introduction to Computer Game Programming and Development with GameMaker-Studio 1.4",
  "Introduction to Computer Programming and Algorithms with Python", "Introduction to C++ Game Programming" and even "Introduction to Artificial Intelligence".

  What is JTIC?
  JTIC is a website that serves to help Jr. Tech STEM students innovate, create and save their work for later access from anywhere.
  It also gives computer game programming and development students a chance to publish their games on their own webpages to play from anywhere and show their friends.
*/

function convert_username_to_dummy_email(username)
{
  var username_lower_case_format = username.toLowerCase().replace(" ", "-");
  //console.log(username_lower_case_format + "@jr-tech-innovation.org");
  return username_lower_case_format + "@gmail.com";
}

//TODO: PUT IN DIFFERENT FILE!
class Dropdown_Widget
{
  constructor($widget, $widget_content)
  {
    this.$widget = $widget;
    this.$widget_content = $widget_content;
    this.expanded = false;
  }

  expand_HTML_element_contents(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units, padding)
  {
    if(!this.expanded)
    {
      this.$widget.append(this.$widget_content);
      var current_height = this.$widget.height();
      if(fixed_expanded_height_bool === true)
      {
        var expanded_height = fixed_expanded_height;
      }
      else
      {
        var expanded_height = this.$widget.css("height", "auto").height() + padding;
        this.$widget.height(current_height);
      }
      expanded_height = expanded_height.toString() + units;
      this.$widget.css("height", expanded_height);
      this.$widget.off("transitionend");
      this.expanded = true;
      //console.log(current_height);
      //console.log(expanded_height);
      //console.log(typeof expanded_height);
    }
    else
    {
      if(!fixed_collapse_height_bool)
      {
        this.$widget.css("height", "0px");
        let content_remove = this.$widget_content;
        this.$widget.on("transitionend", function(){
          content_remove.remove();
        });
      }
      else
      {
        var fixed_collapsed_height = fixed_collapsed_height.toString() + units;
        this.$widget.css("height", fixed_collapsed_height);
      }
      this.expanded = false;
    }
  }
}

class Folder extends Dropdown_Widget
{
  constructor($folder_arrow, $folder_widget)
  {
    super($folder_widget, $folder_widget.children());
    this.arrow = $folder_arrow;
  }
  transition_folder_dropdown_arrow()
  {
    if(!this.expanded)
    {
      this.arrow.removeClass("compressed");
      this.arrow.addClass("expanded");
    }
    else
    {
      this.arrow.removeClass("expanded");
      this.arrow.addClass("compressed");
    }
  }
}

var gamemaker_project_folder = new Folder($("h4#gamemaker-folder").find(".expand-arrow"), $("h4#gamemaker-folder").next());
var html_5_game_folder = new Folder($("h4#html-5-games-folder").find(".expand-arrow"), $("h4#html-5-games-folder").next());
//console.log(gamemaker_project_folder.folder);
//console.log(gamemaker_project_folder);
var $folder_button = $("h4.folder-arrow");
$folder_button.on("click",
  function()
  {
    var $folder_handlebar = $(this).attr("id");
    //console.log($folder_handlebar);
    switch($folder_handlebar)
    {
      case "gamemaker-folder":
        gamemaker_project_folder.transition_folder_dropdown_arrow();
        gamemaker_project_folder.expand_HTML_element_contents(false, 0, false, 0, "px", 15);
        break;

      case "html-5-games-folder":
        html_5_game_folder.transition_folder_dropdown_arrow();
        html_5_game_folder.expand_HTML_element_contents(false, 0, false, 0, "px", 15);
    }
    //console.log(gamemaker_project_folder.expanded);
    //console.log(html_5_game_folder.expanded);
    //console.log($folder_handlebar.attr("id"));
    //transition_folder_dropdown_arrow($folder_handlebar.find(".expand-arrow"));
  });
