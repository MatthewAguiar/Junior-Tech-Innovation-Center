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
  constructor(admin_firebase_id, admin_data, admin_nodes)
  {
    this.admin_firebase_id = admin_firebase_id;
    this.admin_data = admin_data;
    this.admin_nodes = admin_nodes;
    this.add_class_menu = new JTIC_Single_Dropdown_Menu("750", "ms", "0", "ms", "px", "15px", "add-class-button", "remove-class-button", "add-class-form-container", [new_class_form], []);
    this.adobe_creative_portfolio_options_folder = new JTIC_Folder("750", "ms", "0", "ms", "px", "15px", "adobe-arrow", "adobe-themes-folder", [adobe_creative_portfolio_folder_contents], []);
    this.add_class_menu.student_add_button_active = false;
    this.add_class_menu.$class_name_element;
    this.add_class_menu.$class_name_error;
    this.add_class_menu.radio_button_array = [];
    this.add_class_menu.$class_type_error;
    this.add_class_menu.$general_credentials_error;
    this.add_student_menu;
    this.classes_folder_array = [];
    //this.$right_subconsole = $("section#right-subconsole").find("div.sub-console-content-inner-liner");
    this.bind_class_menu_click_events();
    this.append_class_folders();
    this.bind_adobe_creative_portfolio_events();
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
        "Jr Tech Notification: Creating Students", "Processing: Jr Tech is currently processing your new student accounts. Note - This may take a while.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has created your students.", false, true, "admin.html"
      );
      this.setup_student(i, class_type, processing_students_notification);
    }
    console.log(valid);
  }

  async proof_check_class_menu()
  {
    var classes_data = await get_data(FIREBASE_DATABASE.child("Users/Students"), false);
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
      var admin_username = this.admin_data["Name"];
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
    FIREBASE_DATABASE.child("Users/Administrators/" + this.admin_firebase_id + "/Classes/" + class_name + '/' + new_student_id).set(username);
    var student_id_reference = FIREBASE_DATABASE.child("Users/Students/All Students/" + new_student_id);
    student_id_reference.child("Account Type").set("Student");
    student_id_reference.child("Name").set(username);
    student_id_reference.child("Classes/0").set(class_type);
    student_id_reference.child("Instructors/0").set(this.admin_firebase_id);
    student_id_reference.child("Date of Creation").set(DATE);
  }

  add_existing_student_to_new_class(student_id, username, class_name, class_type)
  {
    FIREBASE_DATABASE.child("Users/Administrators/" + this.admin_firebase_id + "/Classes/" + class_name + '/' + student_id).set(username);
    var student_reference = FIREBASE_DATABASE.child("Users/Students/All Students/" + student_id);
    var student_data = get_data(student_reference, false);
    student_data.then(
      function(student)
      {
        for(var class_number in student["Classes"])
        {
          //console.log(class_number);
          var new_class_number = (parseInt(class_number) + 1).toString();
          if(student["Classes"][class_number] !== class_type)
          {
            if(student["Classes"][new_class_number] === undefined)
            {
              student_reference.child("Classes/" + new_class_number).set(class_type);
            }
          }
          else
          {
            break;
          }
        }
        for(var instructor_number in student["Instructors"])
        {
          var new_instructor_number = (parseInt(instructor_number) + 1).toString();
          if(student["Instructors"][instructor_number] !== this.admin_firebase_id)
          {
            if(student["Instructors"][instructor_number] === undefined)
            {
              student_reference.child("Instructors/" + new_instructor_number).set(this.admin_firebase_id);
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

  append_class_folders()
  {
    if(this.admin_nodes.hasChild("Classes"))
    {
      var class_counter = 0;
      for(var admin_class in this.admin_data["Classes"])
      {
        $("section#left-subconsole div.sub-console-content-inner-liner").append(class_folder);
        $("div.class-folder").eq(class_counter).attr("id", "class-" + class_counter.toString());
        var $folder_arrow = $("div#class-" + class_counter.toString()).find(".folder-arrow");
        $folder_arrow.attr("id", "folder-arrow-" + class_counter.toString());
        var $name_tag = $folder_arrow.find("span.name-tag");
        $name_tag.text(admin_class);
        this.classes_folder_array.push(new JTIC_Folder(
          "750", "ms", "0", "ms", "px", "15px", $folder_arrow.attr("id"), "classes-container", [class_folder_content], []
        ));
        this.classes_folder_array[class_counter].class = admin_class;
        this.classes_folder_array[class_counter].student_clickbox_array = [];
        this.classes_folder_array[class_counter].$folder_expand_collapse_handle.on("click",
          function(event)
          {
            var folder_number = global_get_object_number($(event.target).closest("div.class-folder").attr("id"));
            if(!this.classes_folder_array[folder_number].main_code_expanded)
            {
              this.classes_folder_array[folder_number].main_code_expanded = true;
              var student_number = 0;
              for(var student in this.admin_data["Classes"][this.classes_folder_array[folder_number].class])
              {
                //this.classes_folder_array[folder_number].$widget_body.find("ul.students-list").append(student_clickbox_content);
                this.classes_folder_array[folder_number].$widget_body.find("ul.students-list").append(student_clickbox_content);
                this.classes_folder_array[folder_number].student_clickbox_array.splice(student_number, 0, new JTIC_Clickbox(
                  "750", "ms", "0", "ms", "px", "5px", this.classes_folder_array[folder_number].$widget_body.find("li.folder-item").eq(student_number), [student_clickbox_remove_button],
                  student_number, [this.classes_folder_array[folder_number]]
                ));
                student_number++;
              }
              this.classes_folder_array[folder_number].expand_widget_contents(false, 0, "15px");
            }
          }.bind(this)
        );
        class_counter++;
      }
    }
  }

  add_student_clickboxes(class_to_add_to)
  {
    var students_in_class = this.admin_data["Classes"][admin_class].length;
    let i = 0;
    while(i < students_in_class)
    {
      $("div#class-" + class_counter).find("ul.students-list").append(student_clickbox_content);
      i++;
    }
  }

  bind_adobe_creative_portfolio_events()
  {
    this.adobe_creative_portfolio_options_folder.$folder_expand_collapse_handle.on("click",
      function()
      {
        if(!this.adobe_creative_portfolio_options_folder.main_code_expanded)
        {
          this.arrange_portfolio_themes();
          this.adobe_creative_portfolio_options_folder.main_code_expanded = true;
          this.adobe_creative_portfolio_options_folder.$rgb_picker = this.adobe_creative_portfolio_options_folder.$widget_body.find("input#font-theme");
          this.adobe_creative_portfolio_options_folder.$color_box = this.adobe_creative_portfolio_options_folder.$widget_body.find("rect#color-rectangle");
          this.adobe_creative_portfolio_options_folder.$color_box.attr("width", $("svg#color-svg").css("width")).attr("height", $("svg#color-svg").css("height"));
          this.adobe_creative_portfolio_options_folder.$add_theme_from_web_field = this.adobe_creative_portfolio_options_folder.$widget_body.find("input#theme-url");
          this.adobe_creative_portfolio_options_folder.$add_theme_from_web_button = this.adobe_creative_portfolio_options_folder.$widget_body.find("button#add-from-web-button");
          this.adobe_creative_portfolio_options_folder.$web_theme_error = this.adobe_creative_portfolio_options_folder.$widget_body.find("span#theme-error");
          this.adobe_creative_portfolio_options_folder.$upload_from_PC = this.adobe_creative_portfolio_options_folder.$widget_body.find("input#image-upload-button-selector");
          this.adobe_creative_portfolio_options_folder.$upload_from_PC_error = this.adobe_creative_portfolio_options_folder.$widget_body.find("span#upload-theme-error");
          this.adobe_creative_portfolio_options_folder.rgb_ready = false;
          this.adobe_creative_portfolio_options_folder.$rgb_picker.on("keyup",
            function(event)
            {
              var current_value = this.adobe_creative_portfolio_options_folder.$rgb_picker.val();
              var valid_rgb_format = this.rgb_format_parser(current_value);
              if(valid_rgb_format)
              {
                var valid_rgb_values = this.rgb_check_values(current_value);
                if(valid_rgb_values)
                {
                  this.adobe_creative_portfolio_options_folder.$rgb_picker.css("background-color", "rgb(152,251,152)");
                  this.adobe_creative_portfolio_options_folder.$color_box.css("fill", "rgb(" + current_value + ')');
                  this.adobe_creative_portfolio_options_folder.rgb_ready = true;
                }
                else
                {
                  this.adobe_creative_portfolio_options_folder.$rgb_picker.css("background-color", "rgb(240, 128, 128)");
                  this.adobe_creative_portfolio_options_folder.rgb_ready = false;
                }
              }
              else
              {
                this.adobe_creative_portfolio_options_folder.$rgb_picker.css("background-color", "rgb(240, 128, 128)");
                this.adobe_creative_portfolio_options_folder.rgb_ready = false;
              }
            }.bind(this)
          );
          this.adobe_creative_portfolio_options_folder.$add_theme_from_web_button.on("click",
            function()
            {
              if(!this.adobe_creative_portfolio_options_folder.rgb_ready)
              {
                this.adobe_creative_portfolio_options_folder.$web_theme_error.text("rgb value not valid.");
                transition_error_messages(this.adobe_creative_portfolio_options_folder.$web_theme_error, "red", true);
              }
              else
              {
                var file_path = this.adobe_creative_portfolio_options_folder.$add_theme_from_web_field.val();
                verify_web_image_path(file_path,
                  async function(path_exists)
                  {
                    if(path_exists)
                    {
                      transition_error_messages(this.adobe_creative_portfolio_options_folder.$web_theme_error, "red", false);
                      var save_theme_info_box = new Info_Box(
                        "Jr Tech Notification: Saving Theme", "Processing: Jr Tech is saving your theme so your students may use it in their portfolio.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has stored your project.", false, true, "admin.html"
                      );
                      this.add_adobe_theme_data_to_database(this.adobe_creative_portfolio_options_folder.$rgb_picker.val(), "Web", file_path, null)
                      setTimeout(
                        function()
                        {
                          save_theme_info_box.firebase_mode_confirm_completion();
                        }, 3000
                      );
                    }
                    else
                    {
                      this.adobe_creative_portfolio_options_folder.$web_theme_error.text("Photo does does not exist at URL.");
                      transition_error_messages(this.adobe_creative_portfolio_options_folder.$web_theme_error, "red", true);
                    }
                  }.bind(this)
                );
              }
            }.bind(this)
          );
          this.adobe_creative_portfolio_options_folder.$upload_from_PC.on("change",
            function(event)
            {
              var file = event.target.files[0];
              var valid_file_extension = check_file_extension(file.name, [".jpeg", ".jpg", ".png", ".bmp", ".gif"]);
              if(valid_file_extension && this.adobe_creative_portfolio_options_folder.rgb_ready)
              {
                var save_theme_info_box = new Info_Box(
                  "Jr Tech Notification: Saving Theme", "Processing: Jr Tech is saving your theme so your students may use it in their portfolio.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has stored your project.", false, true, "admin.html"
                );
                var storage_reference = "Administrators/" + this.admin_firebase_id + "/Adobe-Creative-Portfolio-Themes/";
                this.add_adobe_theme_photo_to_storage(storage_reference, file).then(
                  function(storage_url)
                  {
                    this.add_adobe_theme_data_to_database(this.adobe_creative_portfolio_options_folder.$rgb_picker.val(), "Storage", storage_url, file.name);
                    setTimeout(
                      function()
                      {
                        save_theme_info_box.firebase_mode_confirm_completion();
                      }, 3000
                    );
                  }.bind(this)
                );
              }
              else if(!this.adobe_creative_portfolio_options_folder.rgb_ready)
              {
                this.adobe_creative_portfolio_options_folder.$upload_from_PC.val("");
                this.adobe_creative_portfolio_options_folder.$upload_from_PC_error.text("rgb value not valid.");
                transition_error_messages(this.adobe_creative_portfolio_options_folder.$upload_from_PC_error, "red", true);
              }
              else
              {
                this.adobe_creative_portfolio_options_folder.$upload_from_PC.val("");
                this.adobe_creative_portfolio_options_folder.$upload_from_PC_error.text("Non-valid image format.");
                transition_error_messages(this.adobe_creative_portfolio_options_folder.$upload_from_PC_error, "red", true);
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  arrange_portfolio_themes()
  {
    if(this.admin_nodes.hasChild("Adobe-Creative-Portfolio-Themes"))
    {
      $(current_themes_field).insertAfter(this.adobe_creative_portfolio_options_folder.$widget_body.find("fieldset#current-themes > legend"));
      this.adobe_creative_portfolio_options_folder.$themes_container = this.adobe_creative_portfolio_options_folder.$widget_body.find("ul#themes-list");
      var all_themes = this.admin_data["Adobe-Creative-Portfolio-Themes"];
      for(var theme in all_themes)
      {
        this.adobe_creative_portfolio_options_folder.$themes_container.append(theme_box);
        var $list_item = this.adobe_creative_portfolio_options_folder.$themes_container.find("li.theme").eq(theme);
        $list_item.attr("id", theme);
        var $image_remove_button = $list_item.find("button.remove");
        var $image_object = $list_item.find("img.theme-image");
        $image_object.attr("src", all_themes[theme]["File Path"]);
        $list_item.on("mouseenter",
          function()
          {
            var $remove_theme_button_object = $(this).find("button.theme-remove");
            $remove_theme_button_object.css("visibility", "visible");
          }
        );
        $list_item.on("mouseleave",
          function()
          {
            var $remove_theme_button_object = $(this).find("button.theme-remove");
            $remove_theme_button_object.css("visibility", "hidden");
          }
        );
        $list_item.on("click",
          function()
          {
            var $original_image_overlay = $(this).find("div.overlay");
            var $original_image_remove_button = $(this).find("button.remove");
            $original_image_overlay.css("visibility", "hidden");
            $original_image_remove_button.css("visibility", "hidden");
            $("body").prepend("<div id = 'window-overlay'></div>");
            $("body").prepend(expanded_theme_container);
            var $screen_overlay = $("#window-overlay");
            var $original_image_object = $(this).find("img.theme-image");
            var theme_image_url = $original_image_object.attr("src");
            $screen_overlay.css("background-color");
            $screen_overlay.css("background-color", "black");
            var $expanded_theme_container = $("div#expanded-theme");
            var $expanded_theme_container_relative_content = $expanded_theme_container.find("div#expanded-theme-relative-position");
            $original_image_object.css("visibility", "hidden");
            $expanded_theme_container_relative_content.css("width", $original_image_object.css("width")).css("height", $original_image_object.css("height"));
            $expanded_theme_container_relative_content.append("<img id = 'preview-theme' src = '" + theme_image_url + "' />");
            var global_offsets = $original_image_object.offset();
            $expanded_theme_container.css("top", (parseInt(global_offsets.top) - $original_image_object.height()).toString() + "px").css("left", global_offsets.left);
            $expanded_theme_container.addClass("large-theme-preview");
            setTimeout(
              function()
              {
                $expanded_theme_container.css("top", "50%").css("left", "50%").css("transform", "translate(-50%, -50%)").css("width", ($expanded_theme_container.width() * 8).toString() + "px").css("height", ($expanded_theme_container.height() * 8).toString() + "px");
                $expanded_theme_container_relative_content.css("width", "100%").css("height", "100%");
              }, 1
            );
            $expanded_theme_container_relative_content.prepend("<button class = 'remove remove-expanded'>X</button>");
            var preview_theme_offsets = $expanded_theme_container.offset();
            $("button.remove-expanded").css("top", "-10px").css("right", "-10px");
            $("button.remove-expanded").on("click",
              function()
              {
                $expanded_theme_container.css("top", (parseInt(global_offsets.top) - $original_image_object.height()).toString() + "px").css("left", global_offsets.left).css("transform", "translate(0%, 0%)");
                $expanded_theme_container_relative_content.css("width", $original_image_object.css("width")).css("height", $original_image_object.css("height"));
                $("#window-overlay").css("background-color", "transparent");
                $(this).remove();
                $expanded_theme_container.on("transitionend",
                  function()
                  {
                    $original_image_overlay.css("visibility", "visible");
                    $original_image_object.css("visibility", "visible");
                    $(this).remove();
                  }
                );
                $("#window-overlay").on("transitionend",
                  function()
                  {
                    $(this).remove();
                  }
                );
              }
            );
          }
        );
        $image_remove_button.on("click",
          function(event)
          {
            event.stopPropagation();
            var theme_number = $(event.target).closest("li.theme").attr("id");
            var web_or_storage = this.get_location_type(theme_number);
            if(web_or_storage === "Web")
            {
              this.remove_adobe_theme_data_from_database(theme_number);
            }
            else
            {
              var file_name = this.admin_data["Adobe-Creative-Portfolio-Themes"][theme_number]["File Name"];
              console.log(file_name);
              this.remove_adobe_theme_photo_from_storage("Administrators/" + this.admin_firebase_id + "/Adobe-Creative-Portfolio-Themes/" + file_name).then(
                function()
                {
                  this.remove_adobe_theme_data_from_database(theme_number);
                }.bind(this)
              );
            }
          }.bind(this)
        );
      }
      this.adobe_creative_portfolio_options_folder.expand_widget_contents(false, 0, "15px");
    }
  }

  async add_adobe_theme_photo_to_storage(storage_reference, file)
  {
    await FIREBASE_STORAGE.ref(storage_reference + file.name).put(file);
    return await FIREBASE_STORAGE.ref(storage_reference + file.name).getDownloadURL();
  }

  remove_adobe_theme_photo_from_storage(storage_reference)
  {
    return new Promise(
      function(resolve, reject)
      {
        FIREBASE_STORAGE.ref(storage_reference).delete().then(
          function()
          {
            resolve("OK");
          }
        ).catch(
          function(error)
          {
            console.log(error);
            reject(error);
          }
        );
      }
    );
  }

  add_adobe_theme_data_to_database(rgb_scheme, save_type, file_path, file_name)
  {
    transition_error_messages(this.adobe_creative_portfolio_options_folder.$web_theme_error, "red", false);
    if(this.admin_nodes.hasChild("Adobe-Creative-Portfolio-Themes"))
    {
      var themes_data = this.admin_data["Adobe-Creative-Portfolio-Themes"];
      var temporary_themes_array = [];
      for(var theme in themes_data)
      {
        temporary_themes_array.push(theme);
      }
      var last_theme_number = parseInt(temporary_themes_array[temporary_themes_array.length - 1]);
      var new_theme_number = (last_theme_number + 1).toString();
      var photo_number = new_theme_number;
    }
    else
    {
      var photo_number = "0";
    }
    var theme_reference = this.admin_firebase_id + "/Adobe-Creative-Portfolio-Themes/" + photo_number;
    DATABASE_ADMIN_BRANCH.child(theme_reference + "/Save Type").set(save_type);
    DATABASE_ADMIN_BRANCH.child(theme_reference + "/File Path").set(file_path);
    DATABASE_ADMIN_BRANCH.child(theme_reference + "/RGB Scheme").set(rgb_scheme);
    DATABASE_ADMIN_BRANCH.child(theme_reference + "/File Name").set(file_name);
  }

  get_location_type(theme_number)
  {
    var file_path = this.admin_data["Adobe-Creative-Portfolio-Themes"][theme_number]["File Path"];
    if(file_path.indexOf("jr-tech-innovation-center.appspot.com") !== -1)
    {
      return "Storage";
    }
    else
    {
      return "Web";
    }
  }

  remove_adobe_theme_data_from_database(original_theme_number)
  {
    delete this.admin_data["Adobe-Creative-Portfolio-Themes"][original_theme_number];
    var database_reference = this.admin_firebase_id + "/Adobe-Creative-Portfolio-Themes/";
    DATABASE_ADMIN_BRANCH.child(database_reference).remove();
    for(var theme in this.admin_data["Adobe-Creative-Portfolio-Themes"])
    {
      if(parseInt(theme) < parseInt(original_theme_number))
      {
        if(this.admin_nodes.hasChild("Adobe-Creative-Portfolio-Themes/" + theme + "/File Name"))
        {
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/File Path").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["File Path"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/RGB Scheme").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["RGB Scheme"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/Save Type").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["Save Type"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/File Name").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["File Name"]);
        }
        else
        {
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/File Path").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["File Path"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/RGB Scheme").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["RGB Scheme"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + theme + "/Save Type").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["Save Type"]);
        }
      }
      else
      {
        if(this.admin_nodes.hasChild("Adobe-Creative-Portfolio-Themes/" + theme + "/File Name"))
        {
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/File Path").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["File Path"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/RGB Scheme").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["RGB Scheme"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/Save Type").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["Save Type"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/File Name").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["File Name"]);
        }
        else
        {
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/File Path").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["File Path"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/RGB Scheme").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["RGB Scheme"]);
          DATABASE_ADMIN_BRANCH.child(database_reference + parseInt(theme - 1).toString() + "/Save Type").set(this.admin_data["Adobe-Creative-Portfolio-Themes"][theme]["Save Type"]);
        }
      }
    }
  }

  rgb_format_parser(rgb_value)
  {
    var indices_of_commas = [];
    var number_of_commas = 0;
    if(rgb_value[0] === "," || rgb_value[rgb_value.length - 1] === ",")
    {
      return false;
    }
    for(let i = 0; i < rgb_value.length; i++)
    {
      if(rgb_value[i] === ',')
      {
        indices_of_commas.push(i);
        number_of_commas++;
      }
      if(number_of_commas > 2)
      {
        return false;
      }
    }
    if(number_of_commas < 2)
    {
      return false;
    }
    else if(indices_of_commas[0] + 1 === indices_of_commas[1])
    {
      return false;
    }
    var numbers = "0123456789";
    for(let i = indices_of_commas[0] - 1; i >= 0; i--)
    {
      if(numbers.indexOf(rgb_value[i]) === -1 && rgb_value[i] !== " ")
      {
        return false;
      }
    }
    var middle_numbers = false;
    for(let i = indices_of_commas[0] + 1; i < rgb_value.length; i++)
    {
      if(numbers.indexOf(rgb_value[i]) === -1 && rgb_value[i] !== " ")
      {
        return false;
      }
      else if(rgb_value[i] !== " ")
      {
        middle_numbers = true;
      }
      if(rgb_value[i + 1] === ",")
      {
        break;
      }
    }
    if(!middle_numbers)
    {
      return false;
    }
    for(let i = indices_of_commas[1] + 1; i < rgb_value.length; i++)
    {
      if(numbers.indexOf(rgb_value[i]) === -1 && rgb_value[i] !== " ")
      {
        return false;
      }
    }
    return true;
  }

  rgb_check_values(rgb_string)
  {
    var numbers = "0123456789";
    var value = "";
    var first_comma_index = rgb_string.indexOf(",", 0);
    var last_comma_index = rgb_string.lastIndexOf(",");
    var current_comma_index = first_comma_index;
    var j = 0;
    for(let i = 0; i < 3; i++)
    {
      var numbers_bool = false;
      while(j < current_comma_index)
      {
        if(numbers.indexOf(rgb_string[j]) !== -1 && !numbers_bool)
        {
          numbers_bool = true;
        }
        value = value + rgb_string[j];
        j++;
      }
      if(!numbers_bool)
      {
        return false
      }
      else if(parseInt(value) < 0 || parseInt(value) > 255)
      {
        return false;
      }
      value = "";
      j = current_comma_index + 1;
      if(i === 0)
      {
        current_comma_index = last_comma_index;
      }
      else if(i === 1)
      {
        current_comma_index = rgb_string.length;
      }
    }
    return true;
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ MAIN CODE --------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const FIREBASE_STORAGE = firebase.storage();
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");
const DATE = get_date(new Date());
var user_2D_array = organize_all_users(DATABASE_ADMIN_BRANCH, DATABASE_STUDENT_BRANCH.child("All Students"));
FIREBASE_AUTHENTICATION.onAuthStateChanged(
  async function(JTIC_user)
  {
    if(JTIC_user)
    {
      console.log(JTIC_user);
      var admin_data = await get_data(DATABASE_ADMIN_BRANCH.child(JTIC_user.uid), false); //Get Dictionary.
      var admin_nodes = await get_data(DATABASE_ADMIN_BRANCH.child(JTIC_user.uid), true); //Get Nodes.
      var admin = new Admin_User(JTIC_user.uid, admin_data, admin_nodes);
    }
    else
    {
      //alert("LOGGED OUT");
    }
  }
);
