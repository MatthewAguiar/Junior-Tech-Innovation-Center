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

class Admin_User
{
  constructor(add_class_menu_array, add_student_menu_array)
  {
    this.add_class_menu = new Normal_Menu(add_class_menu_array[0], add_class_menu_array[1], add_class_menu_array[2], add_class_menu_array[3], []);
    this.add_class_menu.student_add_button_active = false;
    this.add_student_menu;
    this.add_class_menu.$menu_expand_handle.on("click",
      function()
      {
        if(!this.add_class_menu.student_add_button_active)
        {
          this.add_student_menu = new Normal_Menu(add_student_menu_array[0], add_student_menu_array[1], add_student_menu_array[2], add_student_menu_array[3], [this.add_class_menu]);
          this.add_class_menu.student_add_button_active = true;
          this.add_class_menu.$menu_collapse_handle.on("click",
            function()
            {
              this.add_class_menu.$widget_body.on("transitionend",
                function(event)
                {
                  //console.log(event.target.id);
                  if(event.target.id === this.add_class_menu.$widget_body.attr("id"))
                  {
                    this.add_class_menu.student_add_button_active = false;
                  }
                }.bind(this)
              );
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }
}

//TODO: PUT IN DIFFERENT FILE!
class Dropdown_Widget
{
  constructor(widget_body_id, widget_content, array_of_parents)
  {
    this.$widget_body = $('#' + widget_body_id);
    this.widget_content = widget_content;
    this.array_of_parents = array_of_parents;
    this.widget_content_show = false;
    this.expanded = false;
    this.expanded_height = 0;
  }

  manage_widget_state(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units, padding)
  {
    if(!this.widget_content_show && !this.expanded)
    {
      this.$widget_body.append(this.widget_content);
      this.widget_content_show = true;
    }
    if(!this.expanded)
    {
      this.$widget_body.off("transitionend");
      this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, units, padding);
      this.expanded = true;
    }
    else
    {
      this.collapse_widget_contents(fixed_collapse_height_bool, fixed_collapsed_height, units, padding);
      this.expanded = false;
    }
  }

  expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, units, padding)
  {
    if(fixed_expanded_height_bool === true)
    {
      this.expanded_height = fixed_expanded_height + padding;
    }
    else
    {
      var current_height = this.$widget_body.height();
      this.expanded_height = this.$widget_body.css("height", "auto").height() + padding;
      this.$widget_body.height(current_height);
    }
    var expand_height = this.expanded_height.toString() + units;
    this.$widget_body.css("height", expand_height);
    //console.log(current_height);
    //console.log(expanded_height);
    //console.log(typeof expanded_height);
    }

  collapse_widget_contents(fixed_collapse_height_bool, fixed_collapsed_height, units, padding)
  {
    if(fixed_collapse_height_bool)
    {
      var fixed_collapsed_height = fixed_collapsed_height.toString() + units;
      this.$widget_body.css("height", fixed_collapsed_height);
    }
    else
    {
      this.$widget_body.css("height", "0px");
    }
  }

  expand_parent_widgets()
  {
    for(let i = 0; i < this.array_of_parents.length; i++)
    {
      let expand_height = this.array_of_parents[i].expanded_height + this.expanded_height;
      this.array_of_parents[i].expand_widget_contents(true, expand_height, "px", 0);
    }
  }

  collapse_parent_widgets()
  {
    for(let i = 0; i < this.array_of_parents.length; i++)
    {
      let collapse_height = this.array_of_parents[i].expanded_height - this.expanded_height;
      this.array_of_parents[i].collapse_widget_contents(true, collapse_height, "px", 0);
      this.array_of_parents[i].expanded_height = collapse_height;
    }
  }
}

class Normal_Menu extends Dropdown_Widget
{
  constructor(menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content, array_of_parent_menus)
  {
    super(menu_body_id, menu_content, array_of_parent_menus);
    this.$menu_expand_handle = $('#' + menu_expand_handle_id);
    this.$menu_collapse_handle;
    this.children_exist = false;
    this.expand_handle_active = true;
    this.$menu_expand_handle.on("click",
      function()
      {
        if(this.expand_handle_active)
        {
          this.manage_widget_state(false, 0, false, 0, "px", 15);
          this.expand_handle_active = false;
          if(this.array_of_parents.length > 0)
          {
            this.expand_parent_widgets();
          }
          this.$menu_collapse_handle = $('#' + menu_collapse_handle_id);
          this.$menu_collapse_handle.on("click",
            function()
            {
              if(!this.expand_handle_active)
              {
                this.manage_widget_state(false, 0, false, 0, "px", 0);
                if(this.array_of_parents.length > 0)
                {
                  this.collapse_parent_widgets();
                }
                this.$widget_body.on("transitionend",
                  function(event)
                  {
                    //console.log(event.target.id);
                    if(event.target.id === this.$widget_body.attr("id"))
                    {
                      this.$widget_body.children().remove();
                      this.widget_content_show = false;
                    }
                  }.bind(this)
                );
                this.expand_handle_active = true;
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }
}

class Cummulative_Menu extends Dropdown_Widget
{
  constructor(menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content, array_of_parent_menus)
  {
    super(menu_body_id, menu_content, array_of_parent_menus);

  }
}
/*
class Folder extends Dropdown_Widget
{
  constructor(folder_expand_handle_id, folder_collapse_handle_id, folder_body_id, folder_content_id, arrow_id)
  {
    super(folder_expand_handle_id, folder_collapse_handle_id, folder_body_id, folder_content_id);
    this.arrow = $folder_handlebar.find($(arrow_id));
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
}*/

/*
class Menu_Button
{
  constructor(button_id)
  {
    this.button = document.getElementById(button_id);
    this.button_jQuery_selector = "#" + button_id;
    this.active = true;
  }

  update_button_status()
  {
    if(this.active === false)
    {
      $(this.button_jQuery_selector).removeClass("blue-to-green-button");
      $(this.button_jQuery_selector).addClass("not-allowed");
    }
  }
}*/
