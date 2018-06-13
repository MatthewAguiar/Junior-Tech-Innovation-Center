/*
Jr. Tech Innovation Center (JTIC): STUDENT PORTFOLIO PAGE JAVASCRIPT
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

class Student_User
{
  constructor(user_id, student_data, master_projects_list_id)
  {
    this.user_id = user_id;
    this.student_data = student_data;
    this.$master_projects_list = $('#' + master_projects_list_id);
    this.array_of_project_html_frameworks = [
                                              [gamemaker_folder, python_folder, cpp_folder, adobe_animate_folder],
                                              [gamemaker_project_folder_content, python_project_folder_content, cpp_project_folder_content, adobe_animate_project_folder_content],
                                              [gamemaker_project_download_box, python_project_download_box, cpp_project_download_box, adobe_animate_project_download_box],
                                              [gamemaker_add_project_menu_content, python_add_project_menu_content, cpp_add_project_menu_content, adobe_animate_add_project_menu_content]
                                            ];
    this.gamemaker_project_folder;
    this.python_project_folder;
    this.cpp_project_folder;
    this.adobe_animate_project_folder;
    this.student_data.then(this.populate_project_tree.bind(this));
  }

  populate_project_tree(student_data)
  {
    var classes = student_data["Classes"];
    for(var class_type in classes)
    {
      switch(classes[class_type])
      {
        case "gamemaker-student":
          this.$master_projects_list.append(gamemaker_folder);
          this.gamemaker_project_folder = new Folder("gamemaker-folder", "gamemaker-student-projects-folder", gamemaker_project_folder_content, []);
          this.gamemaker_project_folder.$folder_expand_collapse_handle.on("click",
            function()
            {
              this.gamemaker_project_folder.add_project_menu = new Single_Dropdown_Menu("add-gamemaker-project-button", "remove-gamemaker-project-button", "add-gamemaker-project-menu", gamemaker_add_project_menu_content, [this.gamemaker_project_folder]);
              this.gamemaker_project_folder.add_project_menu.$menu_expand_handle.on("click",
                function()
                {
                  this.setup_add_project_menu(this.gamemaker_project_folder.add_project_menu, 0, "GameMaker-Studio", [".gmz", ".yyz"]);
                }.bind(this)
              );
            }.bind(this)
          );
          break;

        case "python-student":
          this.$master_projects_list.append(python_folder);
          this.python_project_folder = new Folder("python-folder", "python-student-projects-folder", python_project_folder_content, []);
          this.python_project_folder.$folder_expand_collapse_handle.on("click",
            function()
            {
              this.python_project_folder.add_project_menu = new Single_Dropdown_Menu("add-python-project-button", "remove-python-project-button", "add-python-project-menu", python_add_project_menu_content, [this.python_project_folder]);
            }.bind(this)
          );
          break;

        case "c++-student":
          this.$master_projects_list.append(cpp_folder);
          this.cpp_project_folder = new Folder("cpp-folder", "cpp-student-projects-folder", cpp_project_folder_content, []);
          this.cpp_project_folder.$folder_expand_collapse_handle.on("click",
            function()
            {
              this.cpp_project_folder.add_project_menu = new Single_Dropdown_Menu("add-cpp-project-button", "remove-cpp-project-button", "add-cpp-project-menu", cpp_add_project_menu_content, [this.cpp_project_folder]);
            }.bind(this)
          );
          break;

        case "adobe-animate-student":
          this.$master_projects_list.append(adobe_animate_folder);
          this.adobe_animate_project_folder = new Folder("adobe-animate-folder", "adobe-animate-student-projects-folder", adobe_animate_project_folder_content, []);
          this.adobe_animate_project_folder.$folder_expand_collapse_handle.on("click",
            function()
            {
              this.adobe_animate_project_folder.add_project_menu = new Single_Dropdown_Menu("add-adobe-animate-project-button", "remove-adobe-animate-project-button", "add-adobe-animate-project-menu", adobe_animate_add_project_menu_content, [this.adobe_animate_project_folder]);
            }.bind(this)
          );
          break;
      }
    }
  }

  setup_add_project_menu(new_project_menu_instance, html_framework_index, class_folder_name, allowed_file_extension_array)
  {
    new_project_menu_instance.$description_field = new_project_menu_instance.$widget_body.find("textarea.project-add-textarea");
    new_project_menu_instance.$file_uploader = new_project_menu_instance.$widget_body.find("input.real-file-upload-hide");
    new_project_menu_instance.$error_message = new_project_menu_instance.$widget_body.find("span.warning-message");
    new_project_menu_instance.$file_uploader.on("change",
      function(event)
      {
        this.add_file_to_storage(event, new_project_menu_instance, class_folder_name, allowed_file_extension_array);
      }.bind(this)
    );
  }

  add_file_to_storage(file_change_event, new_project_menu_instance, class_folder_name, allowed_file_extension_array)
  {
    var file = file_change_event.target.files[0];
    //console.log(file);
    //console.log(file["name"]);
    var valid = this.proof_check_new_project_form(new_project_menu_instance, file["name"], allowed_file_extension_array);
    if(valid)
    {
      var upload_file_notification_box = new Info_Box(
        "Jr Tech Notification: Uploading Project", "Processing: Jr Tech is storing your project so you may download it later. Note - This may take a while.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has stored your project.", true, "student.html"
      );
      console.log(upload_file_notification_box);
      var storage_location = FIREBASE_STORAGE.ref("Students/" + this.user_id + '/' + class_folder_name + '/' + file.name);
      var store = storage_location.put(file);
      $(window).on("beforeunload",
        function()
        {
          return;
        }
      );
      store.then(
        function()
        {
          $(window).off("beforeunload");
          upload_file_notification_box.firebase_mode_confirm_completion();
        }
      );
    }
    else
    {
      new_project_menu_instance.$file_uploader.val("");
    }
  }

  proof_check_new_project_form(menu_instance, file_name, allowed_file_extension_array)
  {
    var description_has_text = has_text(menu_instance.$description_field.val());
    //console.log(description_has_text);
    var valid_file_extension = check_file_extension(file_name, allowed_file_extension_array);
    //console.log(valid_file_extension);
    if(!description_has_text)
    {
      menu_instance.$error_message.text("Please add a description.");
      transition_error_messages(menu_instance.$error_message, "red", true);
      return false;
    }
    else if(!valid_file_extension)
    {
      var error_message = "Project must have file extension of: ";
      for(let i = 0; i < allowed_file_extension_array.length; i++)
      {
        error_message = error_message + "'" + allowed_file_extension_array[i] + "'";
        if((i + 1) === allowed_file_extension_array.length - 1)
        {
          error_message = error_message + " or ";
        }
        else if(i !== allowed_file_extension_array.length - 1)
        {
          error_message = error_message + ", ";
        }
      }
      menu_instance.$error_message.text(error_message);
      transition_error_messages(menu_instance.$error_message, "red", true);
      return false;
    }
    else
    {
      return true;
    }
  }
}

//Main Code!
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const FIREBASE_STORAGE = firebase.storage();
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");

FIREBASE_AUTHENTICATION.onAuthStateChanged(
  function(JTIC_user)
  {
    if(JTIC_user)
    {
      console.log(JTIC_user);
      var student_data = get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + JTIC_user.uid));
      var student = new Student_User(JTIC_user.uid, student_data, "master-project-list");
      //alert("1LOGGED IN AS: " + JTIC_user.uid);
    }
    else
    {
      //alert("LOGGED OUT");
    }
  }
);
