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
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ ADMIN CLASS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Admin_User
{
  constructor(add_class_menu_array, add_student_menu_array)
  {
    this.add_class_menu = new Single_Dropdown_Menu(add_class_menu_array[0], add_class_menu_array[1], add_class_menu_array[2], add_class_menu_array[3], []);
    this.add_class_menu.student_add_button_active = false;
    this.add_student_menu;
    this.add_class_menu.$menu_expand_handle.on("click",
      function()
      {
        if(!this.add_class_menu.student_add_button_active)
        {
          this.add_student_menu = new Cummulative_Menu(add_student_menu_array[0], add_student_menu_array[1], add_student_menu_array[2], add_student_menu_array[3], add_student_menu_array[4],
                                                       add_student_menu_array[5],  [this.add_class_menu]);
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
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ MAIN CODE --------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
var admin = new Admin_User(["add-class-button", "remove-class-button", "add-class-form-container", new_class_form],
                           ["add-student-button", "remove-student", "students-box", "js-student-box", "remove-student", add_student_mini_field]);
