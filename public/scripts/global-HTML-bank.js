/*
Jr. Tech Innovation Center (JTIC): GLOBAL HTML BANK
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
var help_guide =
`
<div id = "help-guide-overlay"></div>
<aside id = "help-guide-box">
  <div class = "color-header-container">
    <div class = "color-strip STEM-blue-background"></div><div class = "color-strip STEM-orange-background"></div><div class = "color-strip STEM-green-background"></div><div class = "color-strip STEM-purple-background"></div>
  </div>
  <header id = "help-guide-header">
    <img id = "notification-JTIC-logo" src = "Images/Landing Page/Junior-Tech-Innovation-Center-Logo.png" alt = "">
    <span>Jr Tech Help Guide: Student Portfolio</span>
  </header>
  <div id = "help-content">
    <hr id = "help-guide-divider">
    <p><u>Info</u>: The student portfolio is a beast!</p>
  </div>
</aside>
`;

var project_list_content =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <img class = "gamemaker-thumbnail" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt = "">
  <div class = "data-box-info">
    <h6 class = "data-box-text-format pointer-mouse-type">Project Name: <u>flippy_game.gmx</u></h6>
    <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2018</h6>
  </div>
  <a class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download">
    <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
    <span>Download Project</span>
  </a>
</li>
<li>
  <form class = "form-vertical-spacing-rule sub-console-content-vertical-spacing">
    <fieldset class = "border-color-and-radius">
      <legend>New Project</legend>
      <div id = "new-project-form-content">
        <label class = "small-label-format" for = "project-add-textarea">Project Description:</label>
        <textarea id = "project-add-textarea" name = "name"></textarea>
        <input class = "real-file-upload-hide" id = "upload-button-selector" type = "file" name = "" value = "">
        <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "upload-button-selector">
            <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
            <span>Upload Project</span>
        </label>
      </div>
    </fieldset>
  </form>
</li>
`;
