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
  constructor(student_data, master_projects_list_id)
  {
    this.student_data = student_data;
    this.$master_projects_list = $('#' + master_projects_list_id);
    this.array_of_project_html_frameworks = [
                                              [gamemaker_folder, python_folder, cpp_folder, adobe_animate_folder],
                                              [gamemaker_project_folder_content, python_project_folder_content, cpp_project_folder_content, adobe_animate_project_folder_content],
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
}

//Main Code!
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");

FIREBASE_AUTHENTICATION.onAuthStateChanged(
  function(JTIC_user)
  {
    if(JTIC_user)
    {
      console.log(JTIC_user);
      var student_data = get_data(DATABASE_STUDENT_BRANCH.child("All Students/" + JTIC_user.uid));
      var student = new Student_User(student_data, "master-project-list");
      //alert("1LOGGED IN AS: " + JTIC_user.uid);
    }
    else
    {
      //alert("LOGGED OUT");
    }
  }
);
