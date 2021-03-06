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
  var username_lower_case_format = username.replace(/ /g, "-");
  //console.log(username_lower_case_format + "@jr-tech-innovation.org");
  return username_lower_case_format + "@jrtechinnovation.org";
}

function transition_error_messages($message_object, color, show_bool)
{
  if(show_bool)
  {
    $message_object.off("transitionend");
    $message_object.css("visibility", "visible").css("color", color);
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

async function organize_all_users(admin_branch, student_branch)
{
  try
  {
    var admin_data = await get_data(admin_branch, false);
    var student_data = await get_data(student_branch, false);
  }
  catch(exception)
  {
    alert("An error has occured: " + exception);
    return [];
  }
  var users = [[],[],[]];
  for(var admin_id in admin_data)
  {
    users[0].push(admin_data[admin_id]["Name"]);
    users[1].push(admin_data[admin_id]["Account Type"]);
    users[2].push(admin_id);
  }
  for(var student_id in student_data)
  {
    users[0].push(student_data[student_id]["Name"]);
    users[1].push(student_data[student_id]["Account Type"]);
    users[2].push(student_id);
  }
  return users;
}

function get_data(branch, nodes_bool)
{
  return new Promise(
    function(resolve, reject)
    {
      branch.once("value").then(
        function(data)
        {
          if(!nodes_bool)
          {
            resolve(data.val());
          }
          else
          {
            resolve(data);
          }
        }
      ).catch(
        function(error)
        {
          reject(error);
        }
      );
    }
  );
}

function get_student_or_admin(username, user_2D_array)
{
  console.log(user_2D_array);
  if(user_2D_array[0].indexOf(username) === -1)
  {
    return "null";
  }
  else
  {
    var index_of_admin_or_student_string = user_2D_array[0].indexOf(username);
    return user_2D_array[1][index_of_admin_or_student_string];
  }
}

function has_text(string)
{
  if(string.length === 0)
  {
    return false;
  }
  for(let i = 0; i < string.length; i++)
  {
    if(string[i] !== " " && string[i] !== "\t")
    {
      return true
    }
  }
  return false;
}

function global_get_object_number(string)
{
  var number_string = "0123456789";
  var i = string.length - 1;
  while(i > 0)
  {
    if(number_string.indexOf(string[i]) !== -1)
    {
      i--;
    }
    else
    {
      i++;
      break;
    }
  }
  return parseInt(string.substring(i, string.length));
}

function check_file_extension(file_name, allowed_file_extension_array)
{
  file_name = file_name.toLowerCase();
  if(file_name.indexOf(".") === -1)
  {
    return false;
  }
  for(let i = 0; i < allowed_file_extension_array.length; i++)
  {
    var file_extension = allowed_file_extension_array[i];
    //console.log(file_extension);
    var extension_from_file = "";
    for(let j = file_name.length - 1; j >= 0; j--)
    {
      extension_from_file = file_name[j] + extension_from_file;
      //console.log(extension_from_file);
      if(file_name[j] === "." && extension_from_file === file_extension)
      {
        //console.log("TRUE");
        return true;
      }
      else if(file_name[j] === ".")
      {
        break
      }
    }
  }
  return false;
}

function get_file_extension(file_name)
{
  file_name = file_name.toLowerCase();
  if(file_name.indexOf(".") === -1)
  {
    return "";
  }
  var extension_from_file = "";
  for(let i = file_name.length - 1; i >= 0; i--)
  {
    if(file_name[i] === ".")
    {
      //console.log("TRUE");
      return "." + extension_from_file;
    }
    extension_from_file = file_name[i] + extension_from_file;
  }
}

function verify_web_image_path(url, callback)
{
  var image_holder = new Image();
  image_holder.onload = function(){
    callback(true);
  };
  image_holder.onerror = function(){
    callback(false);
  };
  image_holder.src = url;
}

function manipulate_file_extension_for_database(file_name, remove)
{
  if(remove)
  {
    return file_name.replace(/\./g, "{dot}");
  }
  else
  {
    return file_name.replace(/{dot}/g, ".");
  }
}

function get_date(date_object)
{
  var month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = month_array[date_object.getMonth()];
  var date = date_object.getDate();
  var year = date_object.getFullYear();
  return month + " " + date + ", " + year;
}

function get_file_name_from_storage_url(storage_url)
{
  return storage_url.substring(storage_url.lastIndexOf("/") + 1, storage_url.length);
}

class User
{
  constructor(user_id, profile_photo_link, user_data, user_nodes)
  {
    this.user_data = user_data;
    this.user_nodes = user_nodes;
    this.user_id = user_id;
    $("h2#welcome-message > span").text("Welcome " + this.user_data["Name"]);
    this.profile_photo_link = profile_photo_link;
    this.$sign_out_button = $("button#user-sign-out-button");
    this.$sign_out_button_image = this.$sign_out_button.find("img#user-sign-out-image");
    this.$sign_out_button_image.attr("src", this.profile_photo_link);
    this.sign_out_dropdown_object = new Dropdown_Widget("350", "ms", "0", "ms", "px", "0px", "sign-out-menu-holder", [sign_out_menu], []);
    this.inner_sign_out_widget;
    this.sign_out_clicked = false;
    this.inner_sign_out_widget_active = false;
    this.sign_out_dropdown_object.$widget_body.css("border-bottom", "none");
    this.$sign_out_button.on("click",
      function(event)
      {
        event.stopPropagation();
        this.sign_out_dropdown_object.manage_widget_state(false, 0, false, 0);
        $(window).on("click",
          function()
          {
            this.sign_out_dropdown_object.collapse_widget_contents(false, 0);
            this.sign_out_dropdown_object.expanded = false;
            this.sign_out_dropdown_object.manage_collapse_transitionend(this.sign_out_dropdown_object.$widget_body.children());
            this.sign_out_clicked = false;
            this.inner_sign_out_widget_active = false;
            this.sign_out_dropdown_object.$sign_out_image_overlay.off("click");
            $(window).off("click");
            this.sign_out_dropdown_object.$widget_body.off("click");
            this.sign_out_dropdown_object.$sign_out_button.off("click");
          }.bind(this)
        );
        this.sign_out_dropdown_object.$widget_body.find("*").on("click",
          function(event)
          {
            event.stopPropagation();
          }
        );
        if(!this.sign_out_clicked)
        {
          this.sign_out_clicked = true;
          this.sign_out_dropdown_object.$sign_out_menu = $("div#sign-out-menu");
          this.sign_out_dropdown_object.$sign_out_menu_image = this.sign_out_dropdown_object.$sign_out_menu.find("div#sign-out-image-container > img");
          this.sign_out_dropdown_object.$sign_out_menu_image.attr("src", this.profile_photo_link);
          this.sign_out_dropdown_object.$sign_out_image_overlay = this.sign_out_dropdown_object.$sign_out_menu.find("div#sign-out-image-overlay");
          this.sign_out_dropdown_object.$sign_out_image_overlay_text = $("div#sign-out-image-overlay > span#change-text");
          this.sign_out_dropdown_object.$sign_out_username = this.sign_out_dropdown_object.$sign_out_menu.find("span#sign-out-username");
          this.sign_out_dropdown_object.$sign_out_username.text(user_data["Name"]);
          this.sign_out_dropdown_object.$sign_out_date_of_creation = this.sign_out_dropdown_object.$sign_out_menu.find("span#sign-out-date-joined");
          this.sign_out_dropdown_object.$sign_out_date_of_creation.text("Joined: " + user_data["Date of Creation"]);
          this.sign_out_dropdown_object.$delete_account_button = this.sign_out_dropdown_object.$sign_out_menu.find("button#remove-account-button");
          this.sign_out_dropdown_object.$sign_out_button = this.sign_out_dropdown_object.$sign_out_menu.find("button#sign-out-button");
          this.inner_sign_out_widget = new Dropdown_Widget("350", "ms", "0", "ms", "px", "0px", "sign-out-additional-container", [sign_out_new_profile_image_menu], [this.sign_out_dropdown_object]);
          this.inner_sign_out_widget.$widget_body.css("border-bottom", "none");
          this.sign_out_dropdown_object.$sign_out_image_overlay.on("mouseover",
            function()
            {
              this.sign_out_dropdown_object.$sign_out_image_overlay_text.text("Change");
            }.bind(this)
          );
          this.sign_out_dropdown_object.$sign_out_image_overlay.on("mouseleave",
            function()
            {
              this.sign_out_dropdown_object.$sign_out_image_overlay_text.text("");
            }.bind(this)
          );
          this.sign_out_dropdown_object.$sign_out_image_overlay.add(this.sign_out_dropdown_object.$sign_out_image_overlay_text).on("click",
            function()
            {
              this.inner_sign_out_widget.widget_content_array = [sign_out_new_profile_image_menu];
              this.inner_sign_out_widget.manage_widget_state(false, 0, false, 0);
              if(!this.inner_sign_out_widget_active)
              {
                this.inner_sign_out_widget_active = true;
                this.inner_sign_out_widget.$upload_from_web_input = this.inner_sign_out_widget.$widget_body.find("input#profile-photo-url");
                this.inner_sign_out_widget.$save_web_address_button = this.inner_sign_out_widget.$widget_body.find("button#add-profile-from-web-button");
                this.inner_sign_out_widget.$web_photo_error = this.inner_sign_out_widget.$widget_body.find("span#web-photo-error");
                this.inner_sign_out_widget.$upload_from_PC = this.inner_sign_out_widget.$widget_body.find("input#profile-image-uploader");
                this.inner_sign_out_widget.$upload_from_PC_error = this.inner_sign_out_widget.$widget_body.find("span#PC-image-error");
                this.inner_sign_out_widget.$save_web_address_button.on("click",
                  function()
                  {
                    var file_path = this.inner_sign_out_widget.$upload_from_web_input.val();
                    verify_web_image_path(file_path,
                      async function(path_exists)
                      {
                        if(path_exists)
                        {
                          transition_error_messages(this.inner_sign_out_widget.$web_photo_error, "red", false);
                          if(this.user_data["Account Type"] === "Administrator")
                          {
                            FIREBASE_DATABASE.child("Users/Administrators/" + this.user_id + "/Profile Photo").set(file_path);
                          }
                          else
                          {
                            FIREBASE_DATABASE.child("Users/Students/All Students/" + this.user_id + "/Profile Photo").set(file_path);
                          }
                          this.$sign_out_button_image.attr("src", file_path);
                          this.sign_out_dropdown_object.$sign_out_menu_image.attr("src", file_path);
                          this.profile_photo_link = file_path;
                        }
                        else
                        {
                          this.inner_sign_out_widget.$web_photo_error.text("Photo does does not exist at URL.");
                          transition_error_messages(this.inner_sign_out_widget.$web_photo_error, "red", true);
                        }
                      }.bind(this)
                    );
                  }.bind(this)
                );
              }
              else
              {
                this.inner_sign_out_widget.manage_collapse_transitionend(this.inner_sign_out_widget.$widget_body.children());
                this.inner_sign_out_widget_active = false;
              }
            }.bind(this)
          );
          this.sign_out_dropdown_object.$delete_account_button.on("click",
            function()
            {
              this.inner_sign_out_widget.widget_content_array = [remove_account_mini_form];
              this.inner_sign_out_widget.manage_widget_state(false, 0, false, 0);
              if(!this.inner_sign_out_widget_active)
              {
                this.inner_sign_out_widget_active = true;
                this.inner_sign_out_widget.$final_delete_username =  this.inner_sign_out_widget.$widget_body.find("input#confirm-remove-username");
                this.inner_sign_out_widget.$final_delete_password =  this.inner_sign_out_widget.$widget_body.find("input#confirm-remove-password");
                this.inner_sign_out_widget.$final_delete_button = this.inner_sign_out_widget.$widget_body.find("button#remove-account-button-final");
                this.inner_sign_out_widget.$final_delete_button.on("click",
                  function()
                  {
                    FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(this.inner_sign_out_widget.$final_delete_username.val()), this.inner_sign_out_widget.$final_delete_password.val()).then(
                      function()
                      {
                        if(this.user_data["Account Type"] === "Student")
                        {
                          var warning = new Info_Box(
                            "Jr Tech Warning: DELETING USER", "Question: Are you sure you would like to remove your profile forever?", false, "", "", true, true, "student.html"
                          );
                        }
                        else
                        {
                          var warning = new Info_Box(
                            "Jr Tech Warning: DELETING USER", "Question: Are you sure you would like to remove your profile forever?", false, "", "", true, true, "admin.html"
                          );
                        }
                        warning.$yes_button.on("click",
                          function()
                          {
                            GLOBAL_SIGN_OUT_LOCATION = null;
                            this.complete_student_removal(FIREBASE_AUTHENTICATION.currentUser, this.user_id, true).then(
                              function()
                              {
                                document.location.href = "index.html";
                              }
                            ).catch(
                              function(error)
                              {
                                console.log(error);
                              }
                            );
                          }.bind(this)
                        );
                        warning.$no_button.on("click",
                          function()
                          {
                            warning.remove_self();
                            warning = {};
                          }
                        );
                      }.bind(this)
                    ).catch(
                      function()
                      {

                      }
                    );
                  }.bind(this)
                );
              }
              else
              {
                this.inner_sign_out_widget.manage_collapse_transitionend(this.inner_sign_out_widget.$widget_body.children());
                this.inner_sign_out_widget_active = false;
              }
            }.bind(this)
          );
          this.sign_out_dropdown_object.$sign_out_button.on("click",
            function()
            {
              GLOBAL_SIGN_OUT_LOCATION = "index.html";
              FIREBASE_AUTHENTICATION.signOut();
            }.bind(this)
          );
        }
        else
        {
          this.sign_out_dropdown_object.manage_collapse_transitionend(this.sign_out_dropdown_object.$widget_body.children());
          this.sign_out_clicked = false;
          this.inner_sign_out_widget_active = false;
          this.sign_out_dropdown_object.$sign_out_image_overlay.off("click");
          $(window).off("click");
          this.sign_out_dropdown_object.$widget_body.off("click");
          this.sign_out_dropdown_object.$sign_out_button.off("click");
        }
      }.bind(this)
    );
  }

  complete_student_removal(firebase_user_to_remove, user_id, remove_self)
  {
    return new Promise(
      async function(resolve, reject)
      {
        await this.remove_student_storage_refs(user_id)
        await this.remove_ALL_student_database_refs(user_id)
        await this.remove_auth_account(firebase_user_to_remove, remove_self)
        resolve();
      }.bind(this)
    );
  }

  remove_auth_account(firebase_user_to_remove, remove_self)
  {
    return new Promise(
      function(resolve, reject)
      {
        if(remove_self)
        {
          firebase_user_to_remove.delete().then(
            function()
            {
              resolve();
            }
          ).catch(
            function(error)
            {
              reject(error);
            }
          );
        }
      }
    );
  }

  remove_ALL_student_database_refs(user_id)
  {
    return new Promise(
      async function(resolve, reject)
      {
        var student_data = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + user_id), false);
        var instructor_array = [[],[]];
        var instructor_classes_array = [];
        for(var instructor in student_data["Instructors"])
        {
          instructor_array[0].push(instructor);
          for(var instructor_class in student_data["Instructors"][instructor]["Classes"])
          {
            instructor_classes_array.push(student_data["Instructors"][instructor]["Classes"][instructor_class]);
          }
          instructor_array[1].push(instructor_classes_array);
          instructor_classes_array = [];
        }
        //console.log("Array to be sent to remova", instructor_array);
        await this.remove_data_from_ALL_instructor_classes(user_id, instructor_array, 0, 0);
        DATABASE_STUDENT_BRANCH.child("All Students/" + user_id).remove().then(
          function()
          {
            resolve();
          }
        ).catch(
          function(error)
          {
            reject(error);
          }
        );
      }.bind(this)
    );
  }

  async remove_data_from_ALL_instructor_classes(user_id, array_of_instructors_and_classes, instructor_counter, class_counter)
  {
    if(instructor_counter < array_of_instructors_and_classes[0].length)
    {
      if(class_counter < array_of_instructors_and_classes[1][instructor_counter].length)
      {
        DATABASE_ADMIN_BRANCH.child(array_of_instructors_and_classes[0][instructor_counter] + "/Classes/" + array_of_instructors_and_classes[1][instructor_counter][class_counter] + '/' + user_id).remove().then(
          async function()
          {
            //console.log(array_of_instructors_and_classes[1][instructor_counter][class_counter], instructor_counter, class_counter);
            var update_nodes = await get_data(DATABASE_ADMIN_BRANCH.child(array_of_instructors_and_classes[0][instructor_counter]), true);
            if(!update_nodes.hasChild("Classes/" + array_of_instructors_and_classes[1][instructor_counter][class_counter]))
            {
              DATABASE_ADMIN_BRANCH.child(array_of_instructors_and_classes[0][instructor_counter] + "/Class Types/" + array_of_instructors_and_classes[1][instructor_counter][class_counter]).remove().then(
                function()
                {
                  this.remove_data_from_ALL_instructor_classes(user_id, array_of_instructors_and_classes, instructor_counter, class_counter + 1);
                }.bind(this)
              )
            }
            else
            {
              this.remove_data_from_ALL_instructor_classes(user_id, array_of_instructors_and_classes, instructor_counter, class_counter + 1);
            }
          }.bind(this)
        );
      }
      else
      {
        this.remove_data_from_ALL_instructor_classes(user_id, array_of_instructors_and_classes, instructor_counter + 1, 0);
      }
    }
  }

  remove_student_storage_refs(user_id)
  {
    return new Promise(
      async function(resolve, reject)
      {
        var student_nodes = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + user_id), true);
        if(student_nodes.hasChild("Projects"))
        {
          var student_data = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + user_id), false);
          var projects_array = [[],[]];
          var files_array = [];
          for(var student_class in student_data["Projects"])
          {
            projects_array[0].push(student_class);
            for(var file in student_data["Projects"][student_class])
            {
              files_array.push(manipulate_file_extension_for_database(file, false));
            }
            projects_array[1].push(files_array);
            files_array = [];
          }
          this.remove_student_files(user_id, projects_array, 0, 0).then(
            function()
            {
              resolve();
            }
          ).catch(
            function(error)
            {
              reject(error)
            }
          );
        }
        else
        {
          resolve();
        }
      }.bind(this)
    );
  }

  async remove_student_files(user_id, projects_array, class_counter, file_counter)
  {
    if(class_counter < projects_array[0].length)
    {
      if(file_counter < projects_array[1][class_counter].length)
      {
        //console.log(projects_array);
        FIREBASE_STORAGE.ref("Students/" + user_id + "/Projects/" + projects_array[0][class_counter] + '/' + projects_array[1][class_counter][file_counter]).delete().then(
          function()
          {
            this.remove_student_files(user_id, projects_array, class_counter, file_counter + 1);
          }.bind(this)
        );
      }
      else
      {
        this.remove_student_files(user_id, projects_array, class_counter + 1, 0);
      }
    }
  }
}

class Info_Box
{
  constructor(description, content, firebase_mode, firebase_finished_description, firebase_finished_content, yes_no_mode, reload_bool, reload_location)
  {
    $("body").prepend(message_box);
    this.$info_box = $("aside#help-guide-box");
    this.$background = this.$info_box.prev();
    this.$background.css("background-color");
    this.$background.css("background-color", "black");
    this.$info_box.css("transform");
    this.$info_box.css("transform", "translate(-50%, -50%) scale(1, 1)");
    this.$decription_element = this.$info_box.find("span#notification-name");
    this.$decription_element.text(description);
    this.$content_element = this.$info_box.find("p#notification-content");
    this.$content_element.text(content);
    this.$box_content_container = this.$info_box.find("div#help-content");
    this.$button_container = this.$info_box.find("div#button-box");
    this.firebase_mode = firebase_mode;
    this.yes_no_mode = yes_no_mode;
    this.reload_bool = reload_bool;
    if(this.reload_bool)
    {
      this.reload_bool = true;
      this.reload_location = reload_location;
    }
    if(this.firebase_mode)
    {
      this.firebase_finished_description = firebase_finished_description;
      this.firebase_finished_content = firebase_finished_content;
      this.$box_content_container.append("<img id = 'in-progress' src = 'Images/JTIC Loading Bar/JTIC-loading-bar.gif'>");
    }
    else if(this.yes_no_mode)
    {
      this.$button_container.append("<button id = 'yes-button' class = 'STEM-blue-background blue-to-green-button general-button-format'><span>Yes</span></button>");
      this.$button_container.append("<button id = 'no-button' class = 'STEM-pink-background pink-to-orange-button general-button-format'><span>No</span></button>");
      this.$yes_button = this.$button_container.find("#yes-button");
      this.$no_button = this.$button_container.find("#no-button");
    }
  }

  firebase_mode_confirm_completion()
  {
    if(this.firebase_mode)
    {
      this.$info_box.css("transform", "translate(-50%, -50%) scale(0, 0)");
      this.$info_box.one("transitionend",
        function(event)
        {
          if(event.target.id === this.$info_box.attr("id"))
          {
            this.$box_content_container.find("img#in-progress").remove();
            this.$decription_element.text(this.firebase_finished_description);
            this.$content_element.text(this.firebase_finished_content);
            this.$info_box.css("transform", "translate(-50%, -50%) scale(1, 1)");
            this.$confirm_button = this.$button_container.append("<button id = 'finish' class = 'STEM-blue-background blue-to-green-button general-button-format'><img src = 'Images/JTIC-checkmark.svg'></button>");
            if(this.reload_bool)
            {
              this.$confirm_button.on("click",
                function()
                {
                  this.reload_page();
                }.bind(this)
              );
            }
            else
            {
              this.$confirm_button.on("click", this.remove_self.bind(this));
            }
          }
        }.bind(this)
      );
    }
  }

  reload_page()
  {
    document.location.href = this.reload_location;
  }

  remove_self()
  {
    this.$info_box.remove();
    this.$background.remove();
  }
}
