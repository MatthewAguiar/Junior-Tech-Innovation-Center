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

class Student_User extends User
{
  constructor(student_id, student_data, student_nodes, master_projects_list_id)
  {
    super(student_id, student_data["Profile Photo"], student_data, student_nodes);
    if(VIEWING_MODE)
    {
      $("h2#welcome-message > span").text("Now Viewing: " + this.user_data["Name"]);
    }
    this.$master_projects_list = $('#' + master_projects_list_id);
    this.array_of_project_html_frameworks = [
                                              [gamemaker_folder, python_folder, cpp_folder, adobe_folder],
                                              [gamemaker_project_folder_content, python_project_folder_content, cpp_project_folder_content, adobe_project_folder_content],
                                              [gamemaker_project_download_box, python_project_download_box, cpp_project_download_box, adobe_project_download_box],
                                              [gamemaker_add_project_menu_content, python_add_project_menu_content, cpp_add_project_menu_content, adobe_add_project_menu_content]
                                            ];
    //GameMaker-Studio Instance Variables!
    this.gamemaker_project_folder; //Will eventually hold folder holding GameMaker projects.
    this.gamemaker_project_collection;
    this.gamemaker_folder_array_of_content = [gamemaker_project_folder_content];
    this.gamemaker_project_descriptions_array = [];
    this.gamemaker_download_url_array = [];
    this.gamemaker_file_location_url_array = [];
    this.gamemaker_allowed_array_of_file_extensions = [".gmz", ".yyz"];
    //Python Instance Variables!
    this.python_project_folder;
    this.python_project_collection;
    this.python_folder_array_of_content = [python_project_folder_content];
    this.python_project_descriptions_array = [];
    this.python_download_url_array = [];
    this.python_file_location_url_array = [];
    this.python_allowed_array_of_file_extensions = [".py"];
    //C++ Instance Variables.
    this.cpp_project_folder;
    this.cpp_project_collection;
    this.cpp_folder_array_of_content = [cpp_project_folder_content];
    this.cpp_project_descriptions_array = [];
    this.cpp_download_url_array = [];
    this.cpp_file_location_url_array = [];
    this.cpp_allowed_array_of_file_extensions = [".zip"];
    //Adobe Animate Variables.
    this.adobe_project_folder;
    this.adobe_project_collection;
    this.adobe_folder_array_of_content = [adobe_project_folder_content];
    this.adobe_project_descriptions_array = [];
    this.adobe_download_url_array = [];
    this.adobe_file_location_url_array = [];
    this.adobe_allowed_array_of_file_extensions = [".ai", ".fla"];
    this.adobe_project_folder;
    ////////////////////////////
    this.mode = "";
    this.$right_subconsole_label_element = $("h6#right-subconsole-label");
    this.$right_subconsole = $("section#right-subconsole").find("div.sub-console-content-inner-liner");
    this.adobe_creative_portfolio;
    this.folder_array = [];
    this.clickbox_collection;
    this.populate_project_tree();
  }

  async populate_project_tree()
  {
    this.clickbox_collection = new JTIC_Clickbox_Collection([]);
    var class_name;
    var classes = this.user_data["Classes"];
    for(var class_type in classes)
    {
      switch(classes[class_type])
      {
        case "gamemaker-student":
          this.add_folder_to_page(gamemaker_folder);
          if(this.user_nodes.hasChild("Projects/GameMaker-Studio"))
          {
            this.gamemaker_project_collection = this.user_data["Projects"]["GameMaker-Studio"];
          }
          else
          {
            this.gamemaker_project_collection =  [];
          }
          console.log(this.gamemaker_project_collection);
          this.save_database_data_into_arrays(gamemaker_project_download_box, this.gamemaker_project_collection, this.gamemaker_folder_array_of_content, this.gamemaker_project_descriptions_array, this.gamemaker_download_url_array, this.gamemaker_file_location_url_array);
          this.gamemaker_project_folder = new JTIC_Folder("750", "ms", "0", "ms", "px", "30px", "gamemaker-arrow", "gamemaker-student-projects-folder", this.gamemaker_folder_array_of_content, []);
          this.gamemaker_project_folder.class_name = "GameMaker-Studio";
          this.folder_array.push(this.gamemaker_project_folder);
          this.clickbox_collection.widget_holder_array.push(this.gamemaker_project_folder);
          this.clickbox_collection.initialize_clickbox_variables(this.gamemaker_project_folder, this.clickbox_collection.widget_holder_array.indexOf(this.gamemaker_project_folder));
          console.log(this.clickbox_collection.widget_holder_array.length);
          this.manage_project_folder(
            this.gamemaker_project_folder, "add-gamemaker-project-button", "remove-gamemaker-project-button", "add-gamemaker-project-menu", gamemaker_add_project_menu_content, gamemaker_download_box_expansion_content,
            this.gamemaker_project_collection, this.gamemaker_project_folder.class_name, this.gamemaker_download_url_array, this.gamemaker_file_location_url_array, this.gamemaker_project_descriptions_array, this.gamemaker_allowed_array_of_file_extensions
          );
          break;

        case "python-student":
          this.add_folder_to_page(python_folder);
          if(this.user_nodes.hasChild("Projects/Python"))
          {
            this.python_project_collection = this.user_data["Projects"]["Python"];
          }
          else
          {
            this.python_project_collection = [];
          }
          this.save_database_data_into_arrays(python_project_download_box, this.python_project_collection, this.python_folder_array_of_content, this.python_project_descriptions_array, this.python_download_url_array, this.python_file_location_url_array);
          this.python_project_folder = new JTIC_Folder("750", "ms", "0", "ms", "px", "30px", "python-arrow", "python-student-projects-folder", this.python_folder_array_of_content, []);
          this.python_project_folder.class_name = "Python";
          this.folder_array.push(this.python_project_folder);
          this.clickbox_collection.widget_holder_array.push(this.python_project_folder);
          this.clickbox_collection.initialize_clickbox_variables(this.python_project_folder, this.clickbox_collection.widget_holder_array.indexOf(this.python_project_folder));
          this.manage_project_folder(
            this.python_project_folder, "add-python-project-button", "remove-python-project-button", "add-python-project-menu", python_add_project_menu_content, python_download_box_expansion_content,
            this.python_project_collection, this.python_project_folder.class_name, this.python_download_url_array, this.python_file_location_url_array, this.python_project_descriptions_array, this.python_allowed_array_of_file_extensions
          );
          break;

        case "c++-student":
          this.add_folder_to_page(cpp_folder);
          if(this.user_nodes.hasChild("Projects/C++"))
          {
            this.cpp_project_collection = this.user_data["Projects"]["C++"];
          }
          else
          {
            this.cpp_project_collection = [];
          }
          this.save_database_data_into_arrays(cpp_project_download_box, this.cpp_project_collection, this.cpp_folder_array_of_content, this.cpp_project_descriptions_array, this.cpp_download_url_array, this.cpp_file_location_url_array);
          this.cpp_project_folder = new JTIC_Folder("750", "ms", "0", "ms", "px", "30px", "cpp-arrow", "cpp-student-projects-folder", this.cpp_folder_array_of_content, []);
          this.cpp_project_folder.class_name = "C++";
          this.folder_array.push(this.cpp_project_folder);
          this.clickbox_collection.widget_holder_array.push(this.cpp_project_folder);
          this.clickbox_collection.initialize_clickbox_variables(this.cpp_project_folder, this.clickbox_collection.widget_holder_array.indexOf(this.cpp_project_folder));
          this.manage_project_folder(
            this.cpp_project_folder, "add-cpp-project-button", "remove-cpp-project-button", "add-cpp-project-menu", cpp_add_project_menu_content, cpp_download_box_expansion_content,
            this.cpp_project_collection, this.cpp_project_folder.class_name, this.cpp_download_url_array, this.cpp_file_location_url_array, this.cpp_project_descriptions_array, this.cpp_allowed_array_of_file_extensions
          );
          break;

        case "adobe-student":
          this.add_folder_to_page(adobe_folder);
          if(this.user_nodes.hasChild("Projects/Adobe"))
          {
            this.adobe_project_collection = this.user_data["Projects"]["Adobe"];
          }
          else
          {
            this.adobe_project_collection = [];
          }
          this.save_database_data_into_arrays(adobe_project_download_box, this.adobe_project_collection, this.adobe_folder_array_of_content, this.adobe_project_descriptions_array, this.adobe_download_url_array, this.adobe_file_location_url_array);
          this.adobe_project_folder = new JTIC_Folder("750", "ms", "0", "ms", "px", "30px", "adobe-arrow", "adobe-student-projects-folder", this.adobe_folder_array_of_content, []);
          this.adobe_project_folder.class_name = "Adobe";
          this.folder_array.push(this.adobe_project_folder);
          this.clickbox_collection.widget_holder_array.push(this.adobe_project_folder);
          this.clickbox_collection.initialize_clickbox_variables(this.adobe_project_folder, this.clickbox_collection.widget_holder_array.indexOf(this.adobe_project_folder));
          this.manage_project_folder(
            this.adobe_project_folder, "add-adobe-project-button", "remove-adobe-project-button", "add-adobe-project-menu", adobe_add_project_menu_content, adobe_download_box_expansion_content,
            this.adobe_project_collection, this.adobe_project_folder.class_name, this.adobe_download_url_array, this.adobe_file_location_url_array, this.adobe_project_descriptions_array, this.adobe_allowed_array_of_file_extensions
          );
      }
    }
  }

  add_folder_to_page(html_folder_content)
  {
    this.$master_projects_list.append(html_folder_content);
  }

  save_database_data_into_arrays(download_box, project_collection, folder_array_of_content, project_descriptions_array, download_url_array, location_url_array)
  {
    for(var project in project_collection)
    {
      folder_array_of_content.push(download_box);
      project_descriptions_array.push(project_collection[project]["Description"]);
      download_url_array.push(project_collection[project]["Download Link"]);
      location_url_array.push(project_collection[project]["Storage Location"]);
    }
  }

  manage_project_folder(folder_object, expand_new_project_button_id, collapse_new_project_button_id, new_project_menu_body_id, new_project_menu_html_content, clickbox_expansion_content, project_collection, class_name, download_url_array, location_url_array, project_descriptions_array, allowed_array_of_file_extensions)
  {
    /*
    if(folder_object.$widget_body.attr("id") === "gamemaker-student-projects-folder")
    {
      console.log("Array of folders ", this.folder_array);
    }*/
    folder_object.$folder_expand_collapse_handle.on("click",
      function(event)
      {
        if(this.mode !== folder_object.class_name)
        {
          this.mode = folder_object.class_name;
          this.setup_right_subconsole(folder_object.class_name);
        }
        if(!folder_object.main_code_expanded)
        {
          folder_object.main_code_expanded = true;
          folder_object.add_project_menu = new JTIC_Single_Dropdown_Menu(
            "750", "ms", "0", "ms", "px", "18px", expand_new_project_button_id, collapse_new_project_button_id, new_project_menu_body_id, [new_project_menu_html_content], [folder_object]
          );
          folder_object.add_project_menu.$menu_expand_handle.on("click",
            function()
            {
              this.setup_add_project_menu(folder_object.add_project_menu, class_name, allowed_array_of_file_extensions);
            }.bind(this)
          );
          var clickbox_number = this.clickbox_collection.get_starting_subwidget_number(folder_object);
          for(var project in project_collection)
          {
            this.clickbox_collection.append_clickbox(folder_object, "750", "ms", "0", "ms", "px", "5px", folder_object.$widget_body.find("li.folder-item").eq(folder_object.local_clickbox_counter), [clickbox_expansion_content], clickbox_number, [folder_object]);
            this.clickbox_collection.subwidget_array[clickbox_number].$project_name_element = this.clickbox_collection.subwidget_array[clickbox_number].$widget_body.find(".project-name");
            this.clickbox_collection.subwidget_array[clickbox_number].$date_uploaded_element = this.clickbox_collection.subwidget_array[clickbox_number].$widget_body.find(".date-uploaded");
            this.clickbox_collection.subwidget_array[clickbox_number].project_name = manipulate_file_extension_for_database(project, false);
            this.clickbox_collection.subwidget_array[clickbox_number].$project_name_element.text("Name: " + this.clickbox_collection.subwidget_array[clickbox_number].project_name);
            this.clickbox_collection.subwidget_array[clickbox_number].$date_uploaded_element.text("Uploaded on: " + project_collection[project]["Date Uploaded"]);
            this.clickbox_collection.subwidget_array[clickbox_number].$download_button = this.clickbox_collection.subwidget_array[clickbox_number].$widget_body.find("a.download-project");
            if(allowed_array_of_file_extensions.indexOf(".py") === -1)
            {
              alert("HI");
              this.clickbox_collection.subwidget_array[clickbox_number].$download_button.attr("href", download_url_array[clickbox_index]);
            }
            this.clickbox_collection.subwidget_array[clickbox_number].$download_button.on("click",
              function(event)
              {
                event.stopPropagation();
                var clickbox_index = this.clickbox_collection.get_id_number($(event.target).closest("li.folder-item").attr("id"));
                if(allowed_array_of_file_extensions.indexOf(".py") !== -1)
                {
                  $.ajax(
                    {
                      url: download_url_array[clickbox_index],

                      success: function(data){
                        //console.log(data);
                        var file_download_name = manipulate_file_extension_for_database(get_file_name_from_storage_url(location_url_array[clickbox_index]), false);
                        this.clickbox_collection.subwidget_array[clickbox_index].$download_button.attr("download", file_download_name);
                        this.clickbox_collection.subwidget_array[clickbox_index].$download_button.attr("href", "data:text/plain," + encodeURIComponent(data));
                      }.bind(this)
                    }
                  );
                }
              }.bind(this)
            );
            this.clickbox_collection.subwidget_array[clickbox_number].$download_button.click();
            this.clickbox_collection.subwidget_array[clickbox_number].$widget_body.on("click",
              function(event)
              {
                var clickbox_index = this.clickbox_collection.get_id_number($(event.target).closest("li.folder-item").attr("id"));
                if(!this.clickbox_collection.subwidget_array[clickbox_index].main_code_expanded)
                {
                  this.clickbox_collection.subwidget_array[clickbox_index].main_code_expanded = true;
                  this.clickbox_collection.subwidget_array[clickbox_index].$project_description_element = this.clickbox_collection.subwidget_array[clickbox_index].$widget_body.find(".project-description-paragraph");
                  this.clickbox_collection.subwidget_array[clickbox_index].$project_description_element.text(project_descriptions_array[folder_object.clickbox_number_array.indexOf(clickbox_index)]);
                  this.clickbox_collection.subwidget_array[clickbox_index].expand_widget_contents(false, 0, "5px");
                  this.clickbox_collection.subwidget_array[clickbox_index].expand_parent_widgets(false, 0, "0px");
                  this.clickbox_collection.subwidget_array[clickbox_index].$update_version_button = this.clickbox_collection.subwidget_array[clickbox_index].$widget_body.find("input.update-project");
                  this.clickbox_collection.subwidget_array[clickbox_index].$update_version_error = this.clickbox_collection.subwidget_array[clickbox_index].$widget_body.find("span.new-version-error");
                  this.clickbox_collection.subwidget_array[clickbox_index].$update_version_button.on("change",
                    function(event)
                    {
                      event.stopPropagation();
                      var clickbox_index = this.clickbox_collection.get_id_number($(event.target).closest(".folder-item").attr("id"));
                      var file = event.target.files[0];
                      if(file.name === manipulate_file_extension_for_database(this.clickbox_collection.subwidget_array[clickbox_index].$project_name_element.text().replace("Name: ", ""), false))
                      {
                        transition_error_messages(this.clickbox_collection.subwidget_array[clickbox_index].$update_version_error, "red", false);
                        this.add_file_to_storage("", file, class_name, allowed_array_of_file_extensions); //TODO:OPEN IN NEW TAB!!!
                      }
                      else
                      {
                        transition_error_messages(this.clickbox_collection.subwidget_array[clickbox_index].$update_version_error, "red", true);
                      }
                    }.bind(this)
                  );
                  this.clickbox_collection.subwidget_array[clickbox_index].$delete_button = this.clickbox_collection.subwidget_array[clickbox_index].$widget_body.find("button.remove");
                  this.clickbox_collection.subwidget_array[clickbox_index].$delete_button.on("click",
                    function(event)
                    {
                      event.stopPropagation();
                      var remove_file_warning = new Info_Box("Jr Tech Warning: Deleting Project", "Question: Are you sure you would like to remove this project from your profile forever?", false, "", "", true, true, "student.html");
                      remove_file_warning.$yes_button.on("click",
                        function()
                        {
                          this.remove_file_from_storage(FIREBASE_STORAGE.ref("Students/" + this.user_id + "/Projects/" + class_name + '/' + this.clickbox_collection.subwidget_array[clickbox_index].project_name)).then(
                            function()
                            {
                              this.remove_database_nodes(DATABASE_STUDENT_BRANCH.child("All Students/" + this.user_id + "/Projects/" + class_name + '/' + manipulate_file_extension_for_database(this.clickbox_collection.subwidget_array[clickbox_index].project_name, true)));
                              remove_file_warning.reload_page();
                            }.bind(this)
                          );
                        }.bind(this)
                      );
                      remove_file_warning.$no_button.on("click",
                        function()
                        {
                          remove_file_warning.remove_self();
                          remove_file_warning = {};
                        }
                      );
                    }.bind(this)
                  );
                }
              }.bind(this)
            );
            clickbox_number++;
          }
        }
        else
        {
          clickbox_number = 0;
        }
        this.clickbox_collection.update_widget_clickbox_numbers(folder_object);
      }.bind(this)
    );
  }

  setup_add_project_menu(new_project_menu_instance, class_folder_name, allowed_file_extension_array)
  {
    new_project_menu_instance.$description_field = new_project_menu_instance.$widget_body.find("textarea.project-add-textarea");
    console.log(new_project_menu_instance.$description_field);
    new_project_menu_instance.$file_uploader = new_project_menu_instance.$widget_body.find("input.real-file-upload-hide");
    new_project_menu_instance.$error_message = new_project_menu_instance.$widget_body.find("span.warning-message");
    new_project_menu_instance.$file_uploader.on("change",
      function(event)
      {
        var file = event.target.files[0];
        var valid = this.proof_check_new_project_form(new_project_menu_instance, file["name"], class_folder_name, allowed_file_extension_array);
        if(valid)
        {
          this.add_file_to_storage(new_project_menu_instance, file, class_folder_name, allowed_file_extension_array);
        }
        else
        {
          new_project_menu_instance.$file_uploader.val("");
        }
      }.bind(this)
    );
  }

  setup_right_subconsole(class_mode)
  {
    this.$right_subconsole_label_element.css("visibility", "visible");
    this.$right_subconsole.html("");
    switch(class_mode)
    {
      case "GameMaker-Studio":
        this.$right_subconsole_label_element.text("HTML 5 Games:");
        this.$right_subconsole.append("<p style = 'font-size: 18pt; text-align: center;'>Coming Soon!<p>");
        break;

      case "Python":
        this.add_notes_menu(class_mode);
        break;

      case "C++":
        this.add_notes_menu(class_mode);
        break;

      case "Adobe":
        this.add_adobe_creative_portfolio();
    }
  }

  add_notes_menu(class_name)
  {
    this.$right_subconsole_label_element.text("Notes:");
    this.$right_subconsole.append(python_and_cpp_note_html);
    this.new_note_menu = new JTIC_Single_Dropdown_Menu("750", "ms", "0", "ms", "px", "5px", "new-note-button", "remove-new-note-button", "add-note-menu", [new_note_content], []);
    if(this.user_nodes.hasChild("Notes/" + class_name + " Notes"))
    {
      this.$right_subconsole.append(notes_list);
      for(var note_number in this.user_data["Notes"][class_name + " Notes"])
      {
        this.$right_subconsole.find("ul#notes-list").append(note_item);
        var note_title = Object.keys(this.user_data["Notes"][class_name + " Notes"][note_number])[0];
        this.$right_subconsole.find("li.note-item").eq(parseInt(note_number)).find("h5.note-title").text(note_title + ':');
        this.$right_subconsole.find("li.note-item").eq(parseInt(note_number)).find("p.note-content").text(this.user_data["Notes"][class_name + " Notes"][note_number][note_title]);
        this.$right_subconsole.find("li.note-item").eq(parseInt(note_number)).attr("id", "note-" + note_number);
        this.$right_subconsole.find("li.note-item").eq(parseInt(note_number)).find("button.remove-note").on("click",
          function(event)
          {
            var note_to_remove = global_get_object_number($(event.target).closest("li.note-item").attr("id"));
            this.remove_note_from_database(note_to_remove.toString(), class_name);
          }.bind(this)
        );
        if(!this.user_nodes.hasChild("Notes/" + class_name + " Notes/" + (parseInt(note_number) + 1).toString()))
        {
          this.$right_subconsole.find("li.note-item").eq(parseInt(note_number)).css("margin-bottom", "0px").css("padding-bottom", "0px").css("border-bottom", "none");
        }
      }
    }
    this.new_note_menu.$menu_expand_handle.on("click",
      function()
      {
        if(!this.new_note_menu.main_code_expanded)
        {
          this.new_note_menu.main_code_expanded = true;
          this.new_note_menu.$new_note_title = this.new_note_menu.$widget_body.find("input#new-note-title");
          this.new_note_menu.$new_note_content = this.new_note_menu.$widget_body.find("textarea");
          this.new_note_menu.$create_new_note_button = this.new_note_menu.$widget_body.find("button#create-note-button");
          this.new_note_menu.$new_note_error = this.new_note_menu.$widget_body.find("span.warning-message");
          this.new_note_menu.$create_new_note_button.on("click",
            function()
            {
              if(has_text(this.new_note_menu.$new_note_title.val()) && has_text(this.new_note_menu.$new_note_content.val()))
              {
                var note_add_info_box = new Info_Box(
                  "Jr Tech Notification: Saving Note", "Processing: Jr Tech is currently saving your note.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has saved your note.", false, true, "student.html"
                );
                transition_error_messages(this.new_note_menu.$new_note_error, "red", false);
                this.save_note_to_database(this.new_note_menu.$new_note_title.val(), this.new_note_menu.$new_note_content.val(), class_name);
                setTimeout(
                  function()
                  {
                    note_add_info_box.firebase_mode_confirm_completion();
                  }, 3000
                );
              }
              else
              {
                transition_error_messages(this.new_note_menu.$new_note_error, "red", true);
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  save_note_to_database(note_title, note_content, class_name)
  {
    if(this.user_nodes.hasChild("Notes/" + class_name + " Notes"))
    {
      var next_note;
      for(var note_number in this.user_data["Notes"][class_name + " Notes"])
      {
        if(!this.user_nodes.hasChild("Notes/" + class_name + " Notes/" + (parseInt(note_number) + 1).toString()))
        {
          next_note = (parseInt(note_number) + 1).toString();
        }
      }
      DATABASE_STUDENT_BRANCH.child("All Students/" + this.user_id + "/Notes/" + class_name + " Notes/" + next_note + "/" + note_title).set(note_content);
    }
    else
    {
      DATABASE_STUDENT_BRANCH.child("All Students/" + this.user_id + "/Notes/" + class_name + " Notes/0/" + note_title).set(note_content);
    }
  }

  remove_note_from_database(note_to_remove, class_name)
  {
    var note_remove_info_box = new Info_Box(
      "Jr Tech Notification: Removing Note", "Processing: Jr Tech is currently removing your note.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has removed your note.", false, true, "student.html"
    );
    DATABASE_STUDENT_BRANCH.child("All Students/" + this.user_id + "/Notes/" + class_name + " Notes").remove();
    for(var note in this.user_data["Notes"][class_name + " Notes"])
    {
      var note_title = Object.keys(this.user_data["Notes"][class_name + " Notes"][note])[0];
      if(parseInt(note) < parseInt(note_to_remove))
      {
        DATABASE_STUDENT_BRANCH.child("All Students/" + this.user_id + "/Notes/" + class_name + " Notes/" + note + "/" + note_title).set(this.user_data["Notes"][class_name + " Notes"][note][note_title]);
      }
      else if(parseInt(note) > parseInt(note_to_remove))
      {
        DATABASE_STUDENT_BRANCH.child("All Students/" + this.user_id + "/Notes/" + class_name + " Notes/" + (parseInt(note) - 1).toString() + "/" + note_title).set(this.user_data["Notes"][class_name + " Notes"][note][note_title]);
      }
    }
    setTimeout(
      function()
      {
        note_remove_info_box.firebase_mode_confirm_completion();
      }, 3000
    );
  }

  add_adobe_creative_portfolio()
  {
    this.$right_subconsole_label_element.text("Creative Portfolio:");
    this.$right_subconsole.append(adobe_creative_portfolio_folder);
    this.adobe_creative_portfolio = new JTIC_Folder("750", "ms", "0", "ms", "px", "30px", "creative-portfolio-arrow", "adobe-porfolio-edit-folder", [adobe_creative_portfolio_folder_content], []);
    this.adobe_creative_portfolio.$folder_expand_collapse_handle.on("click",
      function()
      {
        if(!this.adobe_creative_portfolio.main_code_expanded)
        {
          this.adobe_creative_portfolio.main_code_expanded = true;
          this.adobe_creative_portfolio.themes_menu = new JTIC_Single_Dropdown_Menu("750", "ms", "0", "ms", "px", "15px", "theme-menu-button", "collapse-themes-menu-button", "theme-container", [themes], [this.adobe_creative_portfolio]);
        }
      }.bind(this)
    );
  }

  add_file_to_storage(new_project_menu_instance, file, class_folder_name, allowed_file_extension_array)
  {
    var upload_file_notification_box = new Info_Box(
      "Jr Tech Notification: Uploading Project", "Processing: Jr Tech is storing your project so you may download it later. Note - This may take a while.", true, "Jr Tech Notification: All done!", "Finished: Jr Tech has stored your project.", false, true, "student.html"
    );
    $(window).on("beforeunload",
      function()
      {
        return "";
      }
    );
    var storage_location = FIREBASE_STORAGE.ref("Students/" + this.user_id + '/Projects/' + class_folder_name + '/' + file.name);
    var store = storage_location.put(file);
    store.then(
      function()
      {
        storage_location.getDownloadURL().then(
          function(download_link)
          {
            this.populate_project_database_tree(new_project_menu_instance, file["name"], class_folder_name, download_link);
            $(window).off("beforeunload");
            upload_file_notification_box.firebase_mode_confirm_completion();
          }.bind(this)
        );
      }.bind(this)
    );
  }

  remove_file_from_storage(storage_reference)
  {
    return new Promise(
      function(resolve, reject)
      {
        storage_reference.delete().then(
          function()
          {
            resolve();
          }
        ).catch(
          function()
          {
            reject("ERROR DELETING FILE");
          }
        );
      }
    );
  }

  proof_check_new_project_form(project_menu_instance, file_name, class_folder_name, allowed_file_extension_array)
  {
    var description_has_text = has_text(project_menu_instance.$description_field.val());
    //console.log(description_has_text);
    var valid_file_extension = check_file_extension(file_name, allowed_file_extension_array);
    //console.log(valid_file_extension);
    if(!description_has_text)
    {
      project_menu_instance.$error_message.text("Please add a description.");
      transition_error_messages(project_menu_instance.$error_message, "red", true);
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
      project_menu_instance.$error_message.text(error_message);
      transition_error_messages(project_menu_instance.$error_message, "red", true);
      return false;
    }
    else
    {
      if(this.user_nodes.hasChild("Projects/" + class_folder_name))
      {
        for(var file in this.user_data["Projects"][class_folder_name])
        {
          if(manipulate_file_extension_for_database(file, false) === file_name)
          {
            project_menu_instance.$error_message.text("The file '" + file_name + "' already exists.");
            transition_error_messages(project_menu_instance.$error_message, "red", true);
            return false;
          }
        }
      }
      transition_error_messages(project_menu_instance.$error_message, "red", false);
      return true;
    }
  }

  populate_project_database_tree(project_menu_instance, file_name, class_folder_name, download_link)
  {
    file_name = manipulate_file_extension_for_database(file_name, true);
    var database_project_link = "All Students/" + this.user_id + "/Projects/" + class_folder_name + "/" + file_name;
    console.log(database_project_link);
    DATABASE_STUDENT_BRANCH.child(database_project_link + "/Date Uploaded").set(DATE);
    try
    {
      DATABASE_STUDENT_BRANCH.child(database_project_link + "/Description").set(project_menu_instance.$description_field.val());
    }
    catch(no_object)
    {
      console.log(no_object);
    }
    DATABASE_STUDENT_BRANCH.child(database_project_link + "/Storage Location").set(
      "gs://jr-tech-innovation-center.appspot.com/Students/" + this.user_id +  "/Projects/" + class_folder_name + "/" + file_name
    );
    DATABASE_STUDENT_BRANCH.child(database_project_link + "/Download Link").set(download_link);
  }

  remove_database_nodes(database_reference)
  {
    database_reference.remove();
  }
}

//Main Code!
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const FIREBASE_STORAGE = firebase.storage();
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");
const DATE = get_date(new Date());
GLOBAL_SIGN_OUT_LOCATION = "404.html";
var VIEWING_MODE = false;
console.log(DATE);

FIREBASE_AUTHENTICATION.onAuthStateChanged(
  async function(JTIC_user)
  {
    if(JTIC_user)
    {
      console.log(JTIC_user);
      var student_data = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + JTIC_user.uid), false); //Get Data.
      var student_nodes = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + JTIC_user.uid), true); //Get Nodes
      if(student_data === null)
      {
        var admin_data = await get_data(DATABASE_ADMIN_BRANCH.child(JTIC_user.uid), false); //Get Data.
        if(admin_data["Viewing Mode"] !== "")
        {
          VIEWING_MODE = true;
          var student_to_view = admin_data["Viewing Mode"];
          var viewing_data = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + student_to_view), false); //Get Data.
          var viewing_nodes = await get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + student_to_view), true); //Get Nodes
          //console.log(viewing_data["Viewing Mode"]);
          var virtual_student = new Student_User(student_to_view, viewing_data, viewing_nodes, "master-project-list");
        }
        else
        {
          document.location.href = "admin.html";
        }
      }
      else
      {
        var student = new Student_User(JTIC_user.uid, student_data, student_nodes, "master-project-list");
      }
      //alert("1LOGGED IN AS: " + JTIC_user.uid);
    }
    else
    {
      setTimeout(
        function()
        {
          if(GLOBAL_SIGN_OUT_LOCATION !== null)
          {
            document.location.href = GLOBAL_SIGN_OUT_LOCATION;
          }
        }, 150
      );
    }
  }
);
