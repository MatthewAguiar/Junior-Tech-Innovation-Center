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
    this.add_class_menu.radio_button_array = [];
    this.add_class_menu.$class_type_error;
    this.add_class_menu.$general_credentials_error;
    this.add_student_menu;
    this.bind_class_menu_click_events(add_student_menu_array);
  }

  bind_class_menu_click_events(add_student_menu_array)
  {
    this.add_class_menu.$menu_expand_handle.on("click",
      function()
      {
        if(!this.add_class_menu.student_add_button_active)
        {
          for(let i = 0; i < $("input:radio").length; i++)
          {
            this.add_class_menu.radio_button_array.push($("input:radio").eq(i));
          }
          this.add_student_menu = new Cummulative_Menu(add_student_menu_array[0], add_student_menu_array[1], add_student_menu_array[2], add_student_menu_array[3], add_student_menu_array[4],
                                                       add_student_menu_array[5],  [this.add_class_menu]);
          this.add_student_menu.$menu_expand_handle.on("click",
            function()
            {
              this.bind_student_box_click_events();
            }.bind(this)
          );
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
          this.add_class_menu.$create_class_button = $("button#create-class-button");
          this.add_class_menu.$class_type_error = $("span#class-type-warning");
          this.add_class_menu.$general_credentials_error = $("span#incorrect-credentials-warning");
          this.add_class_menu.$create_class_button.on("click",
            function()
            {
              this.collect_student_credentials();
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  bind_student_box_click_events()
  {
    var box_index = this.add_student_menu.item_box_array.length - 1;
    this.add_student_menu.item_box_array[box_index].$confirm_student_button = this.add_student_menu.item_box_array[box_index].$item_box.find("button.confirm-student-info");
    this.add_student_menu.item_box_array[box_index].$student_name_input_element = this.add_student_menu.item_box_array[box_index].$item_box.find("input.student-name-input");
    this.add_student_menu.item_box_array[box_index].$name_error_element = this.add_student_menu.item_box_array[box_index].$item_box.find("span.name-warning");
    this.add_student_menu.item_box_array[box_index].$student_password_input_element = this.add_student_menu.item_box_array[box_index].$item_box.find("input.student-password-input");
    this.add_student_menu.item_box_array[box_index].$password_error_element = this.add_student_menu.item_box_array[box_index].$item_box.find("span.password-warning");
    this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials;
    this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials;
    this.add_student_menu.item_box_array[box_index].confirm_mode = false;
    this.add_student_menu.item_box_array[box_index].$confirm_student_button.on("click",
      function(event)
      {
        var box_index = this.add_student_menu.get_item_box_number($(event.target).closest("div.js-student-box").attr("id"));
        this.manage_student_box_state(box_index);
      }.bind(this)
    );
  }

  manage_student_box_state(box_index)
  {
    switch(this.add_student_menu.item_box_array[box_index].confirm_mode)
    {
      case false:
        if(this.add_student_menu.item_box_array[box_index].$student_name_input_element.val() !== "" && this.add_student_menu.item_box_array[box_index].$student_password_input_element.val() !== "")
        {
          this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials = $("<span>" + this.add_student_menu.item_box_array[box_index].$student_name_input_element.val() + "</span>");
          this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials = $("<span>" + this.add_student_menu.item_box_array[box_index].$student_password_input_element.val() + "</span>");
          this.add_student_menu.item_box_array[box_index].$student_name_input_element.replaceWith(this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials);
          this.add_student_menu.item_box_array[box_index].$student_password_input_element.replaceWith(this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials);
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.removeClass("STEM-blue-background").removeClass("blue-to-green-button");
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.addClass("STEM-pink-background").addClass("pink-to-orange-button");
          var width_to_keep = this.add_student_menu.item_box_array[box_index].$confirm_student_button.css("width");
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.text("Edit");
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.css("width", width_to_keep);
          this.add_student_menu.item_box_array[box_index].$name_error_element.css("visibility", "hidden").css("color", "transparent");
          this.add_student_menu.item_box_array[box_index].$password_error_element.css("visibility", "hidden").css("color", "transparent");
          this.add_student_menu.item_box_array[box_index].confirm_mode = true;
        }
        else if(this.add_student_menu.item_box_array[box_index].$student_name_input_element.val() === "" && this.add_student_menu.item_box_array[box_index].$student_password_input_element.val() === "")
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.css("visibility", "visible").css("color", "red");
          this.add_student_menu.item_box_array[box_index].$password_error_element.css("visibility", "visible").css("color", "red");
        }
        else if(this.add_student_menu.item_box_array[box_index].$student_name_input_element.val() !== "" && this.add_student_menu.item_box_array[box_index].$student_password_input_element.val() === "")
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.css("visibility", "hidden").css("color", "transparent");
          this.add_student_menu.item_box_array[box_index].$password_error_element.css("visibility", "visible").css("color", "red");
        }
        else
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.css("visibility", "visible").css("color", "red");
          this.add_student_menu.item_box_array[box_index].$password_error_element.css("visibility", "hidden").css("color", "transparent");
        }
        break;

      case true:
        this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$student_name_input_element);
        this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$student_password_input_element);
        this.add_student_menu.item_box_array[box_index].$confirm_student_button.removeClass("STEM-pink-background").removeClass("pink-to-orange-button");
        this.add_student_menu.item_box_array[box_index].$confirm_student_button.addClass("STEM-blue-background").addClass("blue-to-green-button");
        this.add_student_menu.item_box_array[box_index].$confirm_student_button.text("Add to Class");
        this.add_student_menu.item_box_array[box_index].confirm_mode = false;
    }
  }

  collect_student_credentials()
  {
    var valid = this.proof_check_class_menu();
  }

  proof_check_class_menu()
  {
    var class_type_complete = false;
    var student_credentials_complete = true;
    var i = 0;
    while(i < this.add_class_menu.radio_button_array.length)
    {
      if(this.add_class_menu.radio_button_array[i].is(":checked"))
      {
        class_type_complete = true;
      }
      i++;
    }
    if(!class_type_complete)
    {
      this.add_class_menu.$class_type_error.css("visibility", "visible").css("color", "red");
    }
    i = 0;
    while(i < this.add_student_menu.item_box_array.length)
    {
      if(!this.add_student_menu.item_box_array[i].confirm_mode)
      {
        for(let j = i; j < this.add_student_menu.item_box_array.length; j++)
        {
          this.manage_student_box_state(j);
        }
        student_credentials_complete = false;
        break
      }
      i++;
    }
    if(!class_type_complete || !student_credentials_complete)
    {
      this.add_class_menu.$general_credentials_error.css("visibility", "visible").css("color", "red");
      return false;
    }
    else
    {
      return true;
    }
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ MAIN CODE --------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
var admin = new Admin_User(["add-class-button", "remove-class-button", "add-class-form-container", new_class_form],
                           ["add-student-button", "remove-student", "students-box", "js-student-box", "remove-student", add_student_mini_field]);
