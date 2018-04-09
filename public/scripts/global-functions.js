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
  return username_lower_case_format + "@jrtechinnovation.org";
}

//TODO: PUT IN DIFFERENT FILE!
class Dropdown_Widget
{
  constructor($widget, inner_html, jQuery_selector, child_widget)
  {
    this.$widget = $widget;
    this.html = inner_html;
    this.content_jQuery_selector = jQuery_selector;
    this.child_widget = child_widget;
    this.$widget_content = null;
    this.widget_content_show = false;
    this.expanded = false;
    this.expanded_height = 0;
  }

  manage_widget_content(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units, padding)
  {
    if(!this.expanded)
    {
      this.$widget.off("transitionend");
    }
    if(!this.widget_content_show && !this.expanded)
    {
      this.$widget.append(this.html);
      this.$widget_content = $(this.content_jQuery_selector).children();
      this.widget_content_show = true;
    }
    else if(this.expanded)
    {
      var content_remove = this.$widget_content;
      this.$widget.on("transitionend", function(){
        content_remove.remove();
        this.widget_content_show = false;
      }.bind(this));
    }
    this.expand_HTML_element_contents(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units, padding);
  }

  expand_HTML_element_contents(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units, padding)
  {
    if(!this.expanded)
    {
      if(fixed_expanded_height_bool === true)
      {
        this.expanded_height = fixed_expanded_height + padding;
      }
      else
      {
        var current_height = this.$widget.height();
        this.expanded_height = this.$widget.css("height", "auto").height() + padding;
        this.$widget.height(current_height);
      }
      var expand_height = this.expanded_height.toString() + units;
      this.$widget.css("height", expand_height);
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
  constructor($folder_handlebar, arrow_jQuery_selector, $folder_widget, inner_html, widget_jQuery_selector, child_widget)
  {
    super($folder_widget, inner_html, widget_jQuery_selector, child_widget);
    this.arrow = $folder_handlebar.find(arrow_jQuery_selector);
  }

  folder_dropdown()
  {
    this.transition_folder_dropdown_arrow();
    this.manage_widget_content(false, 0, false, 0, "px", 15);
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

class Menu extends Dropdown_Widget
{
  contructor($root_menu_widget, inner_html, jQuery_selector, child_widget)
  {

  }
}

class Add_New_Button
{
  constructor(DOM_button)
  {
    this.button = DOM_button;
    this.jQuery_selector = "#" + DOM_button.id;
    this.active = true;
  }

  update_button_status()
  {
    if(this.active === false)
    {
      $(this.jQuery_selector).removeClass("blue-to-green-button");
      $(this.jQuery_selector).addClass("not-allowed");
    }
  }
}
