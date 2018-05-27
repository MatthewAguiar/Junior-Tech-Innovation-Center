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

var gamemaker_project_folder = new Folder($("h4#gamemaker-folder"), ".expand-arrow", $("h4#gamemaker-folder").next(), student_project_item, "h4#gamemaker-folder + ul.list-content", null);
var html_5_game_folder = new Folder($("h4#html-5-games-folder"), ".expand-arrow", $("h4#html-5-games-folder").next(), html_5_game_item, "h4#html-5-games-folder + ul.list-content", null);

var $folder_button = $("h4.folder-arrow");
$folder_button.on("click",
  function()
  {
    //console.log(document.location);
    var $folder_id = $(this).attr("id");
    switch($folder_id)
    {
      case "gamemaker-folder":
        gamemaker_project_folder.transition_folder_dropdown_arrow();
        gamemaker_project_folder.manage_widget_state(false, 0, false, 0, "px", 15);
        break;

      case "html-5-games-folder":
        html_5_game_folder.transition_folder_dropdown_arrow();
        html_5_game_folder.manage_widget_state(false, 0, false, 0, "px", 15);
    }
    //console.log($folder_handlebar);
    //console.log(gamemaker_project_folder.expanded);
    //console.log(html_5_game_folder.expanded);
    //console.log($folder_handlebar.attr("id"));
    //transition_folder_dropdown_arrow($folder_handlebar.find(".expand-arrow"));
  });
