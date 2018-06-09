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
    this.add_class_menu.$class_name_element;
    this.add_class_menu.$class_name_error;
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
        this.manage_student_box_state(box_index, false);
      }.bind(this)
    );
  }

  manage_student_box_state(box_index, global_proof_check_bool)
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
            this.add_student_menu.item_box_array[box_index].$confirm_student_button.removeClass("STEM-blue-background").removeClass("blue-to-green-button");
            this.add_student_menu.item_box_array[box_index].$confirm_student_button.addClass("STEM-pink-background").addClass("pink-to-orange-button");
            var width_to_keep = this.add_student_menu.item_box_array[box_index].$confirm_student_button.css("width");
            this.add_student_menu.item_box_array[box_index].$confirm_student_button.text("Edit");
            this.add_student_menu.item_box_array[box_index].$confirm_student_button.css("width", width_to_keep);
            this.add_student_menu.item_box_array[box_index].confirm_mode = true;
          }
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, false);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, false);
        }
        else if(student_username_populated && student_password_required_length && !student_username_valid_characters && !student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Invalid character: ' " + invalid_username_character + " '");
          this.add_student_menu.item_box_array[box_index].$password_error_element.text("Invalid character: ' " + invalid_password_character + " '");
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, true);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
        }
        else if(student_username_populated && student_password_required_length && !student_username_valid_characters && student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Invalid character: ' " + invalid_username_character + " '");
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, true);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, false);
        }
        else if(student_username_populated && student_password_required_length && student_username_valid_characters && !student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$password_error_element.text("Invalid character: ' " + invalid_password_character + " '");
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, false);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
        }
        else if(!student_username_populated && student_password_required_length && student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Please enter a username.");
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, true);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, false);
        }
        else if(!student_username_populated && student_password_required_length && !student_password_valid_characters)
        {
          this.add_student_menu.item_box_array[box_index].$name_error_element.text("Please enter a username.");
          this.add_student_menu.item_box_array[box_index].$password_error_element.text("Invalid character: ' " + invalid_password_character + " '");
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, true);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
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
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, false);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
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
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, true);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
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
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$name_error_element, true);
          this.transition_error_messages(this.add_student_menu.item_box_array[box_index].$password_error_element, true);
        }
        break;

      case true:
        if(!global_proof_check_bool)
        {
          this.add_student_menu.item_box_array[box_index].$confirmed_name_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$student_name_input_element);
          this.add_student_menu.item_box_array[box_index].$confirmed_password_credentials.replaceWith(this.add_student_menu.item_box_array[box_index].$student_password_input_element);
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.removeClass("STEM-pink-background").removeClass("pink-to-orange-button");
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.addClass("STEM-blue-background").addClass("blue-to-green-button");
          this.add_student_menu.item_box_array[box_index].$confirm_student_button.text("Add to Class");
          this.add_student_menu.item_box_array[box_index].confirm_mode = false;
        }
    }
  }

  transition_error_messages($message_object, show_bool)
  {
    if(show_bool)
    {
      $message_object.off("transitionend");
      $message_object.css("visibility", "visible").css("color", "red");
    }
    else
    {
      $message_object.css("color", "transparent");
      $message_object.one("transitionend",
        function(event)
        {
          $message_object.css("visibility", "hidden");
        }
      );
    }
  }

  collect_student_credentials()
  {
    var valid = this.proof_check_class_menu();
    if(valid)
    {
      var i = 0;
      var class_type = document.querySelector("input[name = 'course_type']:checked").id;
      $("*").off("click");
      $("body").prepend(message_box);
      var processing_students_notification = new Info_Box("Jr Tech Notification: Creating Students", "Processing: Jr Tech is currently processing your new student accounts. Please wait...", true);
      this.setup_student(i, class_type, processing_students_notification);
    }
  }

  proof_check_class_menu()
  {
    var class_name_complete = false;
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
    if(this.add_class_menu.$class_name_element.val() === "")
    {
      this.transition_error_messages(this.add_class_menu.$class_name_error, true);
    }
    else
    {
      class_name_complete = true;
      this.transition_error_messages(this.add_class_menu.$class_name_error, false);
    }
    if(!class_type_complete)
    {
      this.transition_error_messages(this.add_class_menu.$class_type_error, true);
    }
    else
    {
      this.transition_error_messages(this.add_class_menu.$class_type_error, false);
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
            this.manage_student_box_state(j, true);
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
    if(!class_type_complete || !student_credentials_complete || !class_name_complete)
    {
      this.transition_error_messages(this.add_class_menu.$general_credentials_error, true);
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
    if(box_index < this.add_student_menu.item_box_array.length)
    {
      var class_name = this.add_class_menu.$class_name_element.val();
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
              this.populate_new_student_database(class_name, FIREBASE_AUTHENTICATION.currentUser.uid, username, class_type);
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
      var admin_username = window.localStorage.getItem("Username");
      var admin_password = window.localStorage.getItem("Password");
      //alert("Signing in admin!");
      //FIREBASE_AUTHENTICATION.signOut(); //4) Once the recursion has reached the base case of the item_box_array's length, log out of which ever student is logged in.
      FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(admin_username), admin_password).then(
        function()
        {
          notification_box.$info_box.css("transform", "translate(-50%, -50%) scale(0, 0)");
          notification_box.$info_box.one("transitionend",
            function(event)
            {
              if(event.target.id === notification_box.$info_box.attr("id"))
              {
                notification_box.$box_content_container.find("img#in-progress").remove();
                notification_box.$decription_element.text("Jr Tech Notification: All done!");
                notification_box.$content_element.text("Finished: Jr Tech has created your students.");
                notification_box.$info_box.css("transform", "translate(-50%, -50%) scale(1, 1)");
                notification_box.$confirm_button = notification_box.$button_container.append("<button id = 'finish' class = 'STEM-blue-background blue-to-green-button general-button-format'><img src = 'Images/JTIC-checkmark.svg'></button>");
                notification_box.$confirm_button.on("click",
                  function()
                  {
                    document.location.href = "admin.html";
                  }
                );
              }
            }
          );
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

  populate_new_student_database(class_name, new_student_id, username, class_type)
  {
    var class_database_reference = FIREBASE_DATABASE.child("Users/Students/" + class_name + "/" + new_student_id);
    class_database_reference.child("Account Type").set("Student");
    class_database_reference.child("Name").set(username);
    class_database_reference.child("Classes/1").set(class_type);
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ MAIN CODE --------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
var admin = new Admin_User(["add-class-button", "remove-class-button", "add-class-form-container", new_class_form],
                           ["add-student-button", "remove-student", "students-box", "js-student-box", "remove-student", add_student_mini_field]);
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
