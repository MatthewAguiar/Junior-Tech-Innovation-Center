/*
Jr. Tech Innovation Center (JTIC): ADMINISTRATOR PAGE JAVASCRIPT
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


var add_class_widget = new Menu($("div.add-class-form-container"), new_class_form, "form#new-class-form", null);
var add_class_button = new Add_New_Button(document.getElementById("add-class-button"));
var add_student_widget;
var add_student_button;

var $folder_button = $("h4.folder-arrow");
$folder_button.on("click",
  function()
  {
    //console.log(document.location);
    var $folder_id = $(this).attr("id");
    switch($folder_id)
    {
      case "class2018":
        classes_folder.transition_folder_dropdown_arrow();
        classes_folder.manage_widget_content(false, 0, false, 0, "px", 15);
        break;
    }
    //console.log($folder_handlebar);
    //console.log(gamemaker_project_folder.expanded);
    //console.log(html_5_game_folder.expanded);
    //console.log($folder_handlebar.attr("id"));
    //transition_folder_dropdown_arrow($folder_handlebar.find(".expand-arrow"));
  });

add_class_button.button.addEventListener("click",
  function()
  {
    if(add_class_button.active === true)
    {
      add_class_widget.manage_widget_content(false, 0, false, 0, "px", 15);
      add_class_widget.expanded = false;
      add_class_button.active = false;
      add_class_button.update_button_status();
      add_student_widget = new Dropdown_Widget($("div.students-box"), add_new_student_mini_field, "div.students-box", []);
      add_class_widget.child_widget = add_student_widget;
      add_student_button = new Add_New_Button(document.getElementById("add-student-button"));
      add_student_button.button.addEventListener("click",
        function()
        {
          add_student_widget.manage_widget_content(false, 0, false, 0, "px", 15);
          add_class_widget.expand_HTML_element_contents(false, 0, true, add_class_widget.expanded_height + add_student_widget.expanded_height, "px", 0);
          //console.log(add_class_widget.expanded_height);
          //console.log(add_student_widget.expanded_height);
        }
      );
    }
  }
);
