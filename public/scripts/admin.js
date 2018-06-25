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
  constructor()
  {
    this.add_class_menu = new JTIC_Single_Dropdown_Menu("750", "ms", "0", "ms", "px", "15px", "add-class-button", "remove-class-button", "add-class-form-container", [new_class_form], []);
    this.add_class_menu.student_add_button_active = false;
    this.add_class_menu.$class_name_element;
    this.add_class_menu.$class_name_error;
    this.add_class_menu.radio_button_array = [];
    this.add_class_menu.$class_type_error;
    this.add_class_menu.$general_credentials_error;
    this.add_student_menu;
    this.bind_class_menu_click_events();
  }

  bind_class_menu_click_events()
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
          this.add_student_menu = new JTIC_Cummulative_Menu(
            "750", "ms", "0", "ms", "px", "15px", ["750", "ms", "0", "ms", "px", "0px"], "add-student-button", "students-box", "js-student-box", "remove-student", add_student_mini_field, [this.add_class_menu]
          );
          console.log(this.add_student_menu);
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
              this.add_class_menu.radio_button_array = [];
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
          this.add_class_menu.$class_name_element = $("input#class-name");
          this.add_class_menu.$class_name_error = $("span#class-name-warning");
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
    this.add_student_menu.item_box_array[box_index].$confirm_student_button = this.add_student_menu.item_box_array[box_index].$widget_body.find("button.confirm-student-info");
    this.add_student_menu.item_box_array[box_index].$search_existing_student_field = this.add_student_menu.item_box_array[box_index].$widget_body.find("input.existing-student-input");
    this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element = this.add_student_menu.item_box_array[box_index].$widget_body.find("span.existing-student-warning");
    this.add_student_menu.item_box_array[box_index].$search_existing_student_button = this.add_student_menu.item_box_array[box_index].$widget_body.find("button.search-student");
    //this.add_student_menu.item_box_array[box_index].$new_student_name_and_password_container = this.add_student_menu.item_box_array[box_index].$widget_body.find("div.new-student-info");
    this.add_student_menu.item_box_array[box_index].$student_name_input_element = this.add_student_menu.item_box_array[box_index].$widget_body.find("input.student-name-input");
    this.add_student_menu.item_box_array[box_index].$name_error_element = this.add_student_menu.item_box_array[box_index].$widget_body.find("span.name-warning");
    this.add_student_menu.item_box_array[box_index].$student_password_input_element = this.add_student_menu.item_box_array[box_index].$widget_body.find("input.student-password-input");
    this.add_student_menu.item_box_array[box_index].$password_error_element = this.add_student_menu.item_box_array[box_index].$widget_body.find("span.password-warning");
    this.add_student_menu.item_box_array[box_index].$confirmed_existing_student_name_credentials;
    this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials;
    this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials;
    this.add_student_menu.item_box_array[box_index].existing_student_mode = false;
    this.add_student_menu.item_box_array[box_index].confirm_mode = false;
    this.add_student_menu.item_box_array[box_index].$search_existing_student_button.on("click",
      function(event)
      {
        var box_index = this.add_student_menu.get_item_box_number($(event.target).closest("div.js-student-box").attr("id"));
        transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", true);
        transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", false);
        transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", false);
        this.add_student_menu.item_box_array[box_index].$student_name_input_element.val("");
        this.add_student_menu.item_box_array[box_index].$student_password_input_element.val("");
        if(!this.add_student_menu.item_box_array[box_index].confirm_mode)
        {
          var potential_student_name = this.add_student_menu.item_box_array[box_index].$search_existing_student_field.val()
          if(potential_student_name !== "")
          {
            user_2D_array.then(
              function(array)
              {
                var user_type = get_student_or_admin(potential_student_name, array);
                if(user_type === "Student")
                {
                  this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element.text("Student '" + potential_student_name + "' found! Click 'Add to Class'.");
                  this.add_student_menu.item_box_array[box_index].existing_student_mode = true;
                }
                else
                {
                  this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element.text("Student '" + potential_student_name + "' not found.");
                  transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "red", true);
                }
              }.bind(this)
            );
          }
          else
          {
            this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element.text("Please enter an existing user.");
            transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "red", true);
          }
        }
      }.bind(this)
    );
    this.add_student_menu.item_box_array[box_index].$confirm_student_button.on("click",
      function(event)
      {
        var box_index = this.add_student_menu.get_item_box_number($(event.target).closest("div.js-student-box").attr("id"));
        if(this.add_student_menu.item_box_array[box_index].existing_student_mode)
        {
          this.manage_existing_student_box_state(box_index);
        }
        else
        {
          this.manage_new_student_box_state(box_index, false);
        }
      }.bind(this)
    );
  }

  manage_existing_student_box_state(box_index)
  {
    switch(this.add_student_menu.item_box_array[box_index].confirm_mode)
    {
      case false:
        var student_username = this.add_student_menu.item_box_array[box_index].$search_existing_student_field.val();
        this.add_student_menu.item_box_array[box_index].$confirmed_existing_student_name_credentials = $("<span>" + student_username +"</span>");
        this.add_student_menu.item_box_array[box_index].$search_existing_student_field.val("");
        this.add_student_menu.item_box_array[box_index].$search_existing_student_field.replaceWith(this.add_student_menu.item_box_array[box_index].$confirmed_existing_student_name_credentials);
        this.add_student_menu.item_box_array[box_index].$search_existing_student_button.css("visibility", "hidden");
        this.add_student_menu.item_box_array[box_index].$student_name_input_element.val("").attr("disabled", true);
        this.add_student_menu.item_box_array[box_index].$student_password_input_element.val("").attr("disabled", true);
        transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        this.update_add_to_class_button(box_index);
        this.add_student_menu.item_box_array[box_index].confirm_mode = true;
        break;

      case true:
        this.add_student_menu.item_box_array[box_index].$confirmed_existing_student_name_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$search_existing_student_field);
        this.add_student_menu.item_box_array[box_index].$search_existing_student_button.css("visibility", "visible");
        this.add_student_menu.item_box_array[box_index].$student_name_input_element.attr("disabled", false);
        this.add_student_menu.item_box_array[box_index].$student_password_input_element.attr("disabled", false);
        this.update_add_to_class_button(box_index);
        this.add_student_menu.item_box_array[box_index].confirm_mode = false;
        this.add_student_menu.item_box_array[box_index].existing_student_mode = false;
    }
  }

  manage_new_student_box_state(box_index, global_proof_check_bool)
  {
    switch(this.add_student_menu.item_box_array[box_index].confirm_mode)
    {
      case false:
        var username_valid_characters = " AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789~!#$%^&*}{'-_=+|";
        var password_valid_characters = " AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789~!@#$%^&*()_-+=}{][:;><?/|";
        var student_username = this.add_student_menu.item_box_array[box_index].$student_name_input_element.val();
        var student_password = this.add_student_menu.item_box_array[box_index].$student_password_input_element.val();
        var student_username_populated = (student_username !== "");
        var student_password_required_length = (student_password.length > 5);
        var student_username_valid_characters = true;
        var student_password_valid_characters = true;
        var invalid_username_character;
        var invalid_password_character;
        for(let i = 0; i < student_username.length; i++)
        {
          if(username_valid_characters.indexOf(student_username[i]) === -1)
          {
            student_username_valid_characters = false;
            invalid_username_character = student_username[i];
            break;
          }
        }
        for(let i = 0; i < student_password.length; i++)
        {
          if(password_valid_characters.indexOf(student_password[i]) === -1)
          {
            student_password_valid_characters = false;
            invalid_password_character = student_password[i];
            break;
          }
        }
        if(student_username_populated && student_password_required_length && student_username_valid_characters && student_password_valid_characters)
        {
          if(!global_proof_check_bool)
          {
            this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials = $("<span>" + student_username + "</span>");
            this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials = $("<span>" + student_password + "</span>");
            this.add_student_menu.item_box_array[box_index].$student_name_input_element.replaceWith(this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials);
            this.add_student_menu.item_box_array[box_index].$student_password_input_element.replaceWith(this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials);
            this.add_student_menu.item_box_array[box_index].$search_existing_student_field.val("").attr("disabled", true);
            this.add_student_menu.item_box_array[box_index].$search_existing_student_button.removeClass("blue-to-green-button");
            this.add_student_menu.item_box_array[box_index].$search_existing_student_button.addClass("not-allowed");
            this.update_add_to_class_button(box_index);
            this.add_student_menu.item_box_array[box_index].confirm_mode = true;
          }
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", false);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", false);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(student_username_populated && student_password_required_length && !student_username_valid_characters && !student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Invalid character: ' " + invalid_username_character + " '");
          this.add_student_menu.item_box_array[box_index].$password_error_element.text("Invalid character: ' " + invalid_password_character + " '");
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(student_username_populated && student_password_required_length && !student_username_valid_characters && student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Invalid character: ' " + invalid_username_character + " '");
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", false);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(student_username_populated && student_password_required_length && student_username_valid_characters && !student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$password_error_element.text("Invalid character: ' " + invalid_password_character + " '");
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", false);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(!student_username_populated && student_password_required_length && student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Please enter a username.");
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", false);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(!student_username_populated && student_password_required_length && !student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Please enter a username.");
          this.add_student_menu.item_box_array[box_index].$password_error_element.text("Invalid character: ' " + invalid_password_character + " '");
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(student_username_populated && !student_password_required_length && student_username_valid_characters)
        {
          if(student_password.length === 0)
          {
            this.add_student_menu.item_box_array[box_index].$password_error_element.text("Please enter a password.");
          }
          else
          {
            this.add_student_menu.item_box_array[box_index].$password_error_element.text("Password must exceed 5 characters.");
          }
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", false);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(student_username_populated && !student_password_required_length && !student_username_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Invalid character: ' " + invalid_username_character + " '");
          if(student_password.length === 0)
          {
            this.add_student_menu.item_box_array[box_index].$password_error_element.text("Please enter a password.");
          }
          else
          {
            this.add_student_menu.item_box_array[box_index].$password_error_element.text("Password must exceed 5 characters.");
          }
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        else if(!student_username_populated && !student_password_required_length)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Please enter a username.");
          if(student_password.length === 0)
          {
            this.add_student_menu.item_box_array[box_index].$password_error_element.text("Please enter a password.");
          }
          else
          {
            this.add_student_menu.item_box_array[box_index].$password_error_element.text("Password must exceed 5 characters.");
          }
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, "red", true);
          transition_error_messages(this.add_student_menu.item_box_array[box_index].$search_existing_student_error_element, "green", false);
        }
        break;

      case true:
        if(!global_proof_check_bool)
        {
          this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$student_name_input_element);
          this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$student_password_input_element);
          this.add_student_menu.item_box_array[box_index].$search_existing_student_field.attr("disabled", false);
          this.add_student_menu.item_box_array[box_index].$search_existing_student_button.removeClass("not-allowed");
          this.add_student_menu.item_box_array[box_index].$search_existing_student_button.addClass("blue-to-green-button");
          this.update_add_to_class_button(box_index);
          this.add_student_menu.item_box_array[box_index].confirm_mode = false;
        }
    }
  }

  update_add_to_class_button(box_index)
  {
    if(!this.add_student_menu.item_box_array[box_index].confirm_mode)
    {
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.removeClass("STEM-blue-background").removeClass("blue-to-green-button");
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.addClass("STEM-pink-background").addClass("pink-to-orange-button");
      var width_to_keep = this.add_student_menu.item_box_array[box_index].$confirm_student_button.css("width");
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.text("Edit");
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.css("width", width_to_keep);
    }
    else
    {
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.removeClass("STEM-pink-background").removeClass("pink-to-orange-button");
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.addClass("STEM-blue-background").addClass("blue-to-green-button");
      this.add_student_menu.item_box_array[box_index].$confirm_student_button.text("Add to Class");
    }
  }

  async collect_student_credentials()
  {
    var valid = await this.proof_check_class_menu();
    if(valid)
    {
      var i = 0;
      var class_type = document.querySelector("input[name = 'course_type']:checked").id;
      $("*").off("click");
      var processing_students_notification = new Info_Box(
        "Jr Tech Notification: Creating Students", "Processing: Jr Tech is currently processing your new student accounts. Note - This may take a while.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has created your students.", true, "admin.html"
      );
      this.setup_student(i, class_type, processing_students_notification);
    }
    console.log(valid);
  }

  async proof_check_class_menu()
  {
    var classes_data = await get_data(FIREBASE_DATABASE.child("Users/Students"));
    var class_already_exists = false;
    var class_name_filled = false;
    var class_type_complete = false;
    var student_credentials_complete = true;
    if(this.add_class_menu.$class_name_element.val() === "")
    {
      this.add_class_menu.$class_name_error.text("Please enter a class name.");
      transition_error_messages(this.add_class_menu.$class_name_error, "red", true);
    }
    else
    {
      class_name_filled = true;
      for(var class_name in classes_data)
      {
        if(class_name === this.add_class_menu.$class_name_element.val() && this.add_class_menu.$class_name_element.val() !== "All Students")
        {
          this.add_class_menu.$class_name_error.text("The class: '" + class_name + "' already exists.");
          transition_error_messages(this.add_class_menu.$class_name_error, "red", true);
          class_already_exists = true;
        }
        else if(this.add_class_menu.$class_name_element.val() === "All Students")
        {
          this.add_class_menu.$class_name_element.val("");
          this.add_class_menu.$class_name_error.text("Please enter a class name.");
          transition_error_messages(this.add_class_menu.$class_name_error, "red", true);
          class_already_exists = true;
        }
      }
      if(!class_already_exists)
      {
        transition_error_messages(this.add_class_menu.$class_name_error, "red", false);
      }
    }
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
      transition_error_messages(this.add_class_menu.$class_type_error, "red", true);
    }
    else
    {
      transition_error_messages(this.add_class_menu.$class_type_error, "red", false);
    }
    i = 0;
    if(this.add_student_menu.item_box_array.length > 0)
    {
      while(i < this.add_student_menu.item_box_array.length)
      {
        if(!this.add_student_menu.item_box_array[i].confirm_mode)
        {
          for(let j = i; j < this.add_student_menu.item_box_array.length; j++)
          {
            this.manage_new_student_box_state(j, true);
          }
          student_credentials_complete = false;
          break
        }
        i++;
      }
    }
    else
    {
      student_credentials_complete = false;
    }
    if(!class_type_complete || !student_credentials_complete || !class_name_filled || class_already_exists)
    {
      transition_error_messages(this.add_class_menu.$general_credentials_error, "red", true);
      return false;
    }
    else
    {
      return true;
    }
  }

  setup_student(box_index, class_type, notification_box)
  {
    //NOTE: Always keep an eye on what is occuring in .onAuthStateChanged() in main code! See order of events here:
    FIREBASE_AUTHENTICATION.signOut(); //1) User is signed out first and the auth state is changed! See the .onAuthStateChanged() in the main code.
    var class_name = this.add_class_menu.$class_name_element.val();
    if(box_index < this.add_student_menu.item_box_array.length)
    {
      if(!this.add_student_menu.item_box_array[box_index].existing_student_mode)
      {
        var username = this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials.text();
        var password = this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials.text();
        FIREBASE_AUTHENTICATION.createUserWithEmailAndPassword(convert_username_to_dummy_email(username), password).then( //2) Next a student is created with username and password.
          function()
          {
            //alert("CREATE ACCOUNT");
            FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(username), password).then( //3) User is signed in after account is fully created.
              function()
              {
                //alert("SIGN IN");
                //console.log("BOX INDEX:" + box_index.toString());
                this.populate_new_student_database(FIREBASE_AUTHENTICATION.currentUser.uid, username, class_name, class_type);
                this.setup_student(box_index + 1, class_type, notification_box);
              }.bind(this)
            ).catch(
              function(error)
              {
                alert("An error has occured.");
                console.log(error);
              }
            );
          }.bind(this)
        ).catch(
          function(error)
          {
            alert("An error has occured. This account already exists!");
            console.log(error);
          }
        );
      }
      else
      {
        user_2D_array.then(
          function(array)
          {
            var username = this.add_student_menu.item_box_array[box_index].$confirmed_existing_student_name_credentials.text();
            var index_of_username = array[0].indexOf(username);
            var student_id_to_add = array[2][index_of_username]
            this.add_existing_student_to_new_class(student_id_to_add, username, class_name, class_type);
            this.setup_student(box_index + 1, class_type, notification_box);
          }.bind(this)
        );
      }
    }
    else
    {
      var admin_username = window.localStorage.getItem("Username");
      var admin_password = window.localStorage.getItem("Password");
      //alert("Signing in admin!");
      //FIREBASE_AUTHENTICATION.signOut(); //4) Once the recursion has reached the base case of the item_box_array's length, log out of which ever student is logged in.
      FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(admin_username), admin_password).then(
        function()
        {
          notification_box.firebase_mode_confirm_completion();
          //document.location.href = "admin.html";
        }
      ).catch( //5)Re-sign in as admin!
        function(error)
        {
          alert("An error has occured. This account already exists!");
          console.log(error);
        }
      );
    }
  }

  populate_new_student_database(new_student_id, username, class_name, class_type)
  {
    var student_database_reference = FIREBASE_DATABASE.child("Users/Students");
    student_database_reference.child(class_name + "/" + new_student_id).set(username);
    var student_id_reference = student_database_reference.child("All Students/" + new_student_id);
    student_id_reference.child("Account Type").set("Student");
    student_id_reference.child("Name").set(username);
    student_id_reference.child("Classes/0").set(class_type);
  }

  add_existing_student_to_new_class(student_id, username, class_name, class_type)
  {
    var student_database_reference = FIREBASE_DATABASE.child("Users/Students");
    student_database_reference.child(class_name + "/" + student_id).set(username);
    var student_classes_reference = student_database_reference.child("All Students/" + student_id + "/Classes");
    var student_data = get_data(student_classes_reference);
    student_data.then(
      function(classes)
      {
        for(var class_number in classes)
        {
          //console.log(class_number);
          var new_class_number = (parseInt(class_number) + 1).toString();
          if(classes[class_number] !== class_type)
          {
            if(classes[new_class_number] === undefined)
            {
              student_classes_reference.child(new_class_number).set(class_type);
            }
          }
          else
          {
            break;
          }
        }
      }
    );
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ MAIN CODE --------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");
var user_2D_array = organize_all_users(DATABASE_ADMIN_BRANCH, DATABASE_STUDENT_BRANCH.child("All Students"));
var admin = new Admin_User();
FIREBASE_AUTHENTICATION.onAuthStateChanged(
  function(JTIC_user)
  {
    if(JTIC_user)
    {
      console.log(JTIC_user);
      //alert("1LOGGED IN AS: " + JTIC_user.uid);
    }
    else
    {
      //alert("LOGGED OUT");
    }
  }
);
