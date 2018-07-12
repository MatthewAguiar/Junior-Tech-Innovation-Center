/*
Jr. Tech Innovation Center (JTIC): ADMIN HTML BANK
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
------------------ ADMIN HTML ELEMENTS ----------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
//1. THE CONTENT WHICH WILL GO IN THE DROPDOWN MENU WHEN AN ADMIN WOULD LIKE TO MAKE A NEW CLASS.
var new_class_form =
`
<form id = "new-class-form">
  <fieldset id = "add-class-form-content" class = "border-color-and-radius">
    <legend>New Class</legend>
    <fieldset class = "shrink-and-center-SUB-fieldset form-vertical-spacing-rule">
      <legend class = "bold-heading">Class Setup</legend>
      <div class = "SUB-fieldset-content">
        <div>
          <label class = "small-label-format" for = "class-name">Class Name:</label>
          <input class = "input-half-width input-height-and-font"  id = "class-name" type = "text">
          <span style = "display: block;" id = "class-name-warning" class = "name-warning warning-message">Please enter a class name.</span>
        </div>
        <div class = "choose-class-type">
          <h6 class = "small-label-format">Class Type:</h6>
          <div class = "course-type-flexbox border-color-and-radius">
            <div>
              <label class = "inline-label" for = "gamemaker-student"><img class = "course-icons" src = "Images/Coding Logos/GameMaker/yoyo-games-logo.png" alt=""></label>
              <input class = "inline-checkbox" id = "gamemaker-student" type = "radio" name = "course_type">
            </div>
            <div>
              <label class = "inline-label" for = "python-student"><img class = "course-icons" src = "Images/Coding Logos/Python/python-logo.png" alt=""></label>
              <input class = "inline-checkbox" id = "python-student" type = "radio" name = "course_type">
            </div>
            <div>
              <label class = "inline-label" for = "c++-student"><img class = "course-icons" src = "Images/Coding Logos/C++/cpp-logo.png" alt=""></label>
              <input class = "inline-checkbox" id = "c++-student" type = "radio" name = "course_type">
            </div>
            <div>
              <label class = "inline-label" for = "adobe-animate-student"><img class = "course-icons" src = "Images/Coding Logos/Adobe/adobe.png" alt=""></label>
              <input class = "inline-checkbox" id = "adobe-animate-student" type = "radio" name = "course_type">
            </div>
          </div>
          <span style = "display: block;" id = "class-type-warning" class = "warning-message">Please choose one class.</span>
        </div>
      </div>
    </fieldset>
    <fieldset class = "shrink-and-center-SUB-fieldset form-vertical-spacing-rule">
      <legend class = "bold-heading">Add Students:</legend>
      <div class = "SUB-fieldset-content">
        <div class = "student-add-container">
          <div id = "students-box" class = "students-box">

          </div>
          <div class = "new-student-add">
            <h6 class = "small-label-format">New Student:</h6>
            <button id = "add-student-button" class = "add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
          </div>
        </div>
      </div>
      <div style = "margin-bottom: 15px;">
        <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "create-class-button" class = "STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">Create</button>
        <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "remove-class-button" class = "remove general-button-format" type = "button" name = "add_class">Cancel</button>
        <span style = "margin-left: 5px;" id = "incorrect-credentials-warning" class = "warning-message">Please confirm <u>all</u> credientials.</span>
      </div>
    </fieldset>
  </fieldset>
</form>
`;

//2. THIS CODE WILL ACT AS MINI ITEM BOXES CONTAINING INFORMATION ABOUT STUDENT USERNAME'S AND PASSWORDS.
var add_student_mini_field =
`
<div class = "js-student-box">
  <h6 class = "small-label-format make-bold">Student 1:</h6>
  <div class = "student-name-and-password-container border-color-and-radius">
    <div class = "student-activate-input-box existing-student-field-seperator">
      <label class = "small-label-format" for = "student-name">Search Existing Student:</label>
      <div>
        <input class = "existing-student-input input-half-width input-height-and-font"  id = "student-name" type = "text" name = "student_add" value = "">
        <button class = "search-student STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "search_student"><img src = "Images/Admin/Add-Existing-Student.svg" alt = ""></button>
        <span style = "display: block;" class = "existing-student-warning warning-message">Student not found.</span>
      </div>
    </div>
    <div class = "new-student-info">
      <div class = "student-activate-input-box form-vertical-spacing-rule">
        <label class = "small-label-format" for = "student-name">New Student Name:</label>
        <input class = "student-name-input input-half-width input-height-and-font"  id = "student-name" type = "text" name = "student_add" value = "">
        <span style = "display: block;" class = "name-warning warning-message">Please enter a username.</span>
      </div>
      <div class = "student-activate-input-box" style = "margin-top: 7px;">
        <label class = "small-label-format" for = "student-password">New Student Password:</label>
        <input class = "student-password-input input-half-width input-height-and-font"  id = "student-password" type = "text" name = "student_add" value = "">
        <span style = "display: block;" class = "password-warning warning-message">Please enter a password.</span>
      </div>
    </div>
    <button class = "confirm-student-info STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format" type = "button" name = "activate_student_profile">Add to Class</button>
    <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" class = "remove-student remove general-button-format" type = "button" name = "remove_student">Cancel</button>
  </div>
</div>
`;

//3. THIS CODE IS THE ADOBE CREATIVE PORTFOLIO FOLDER CONTENT IN THE RIGHT SUBCONSOLE.
var adobe_creative_portfolio_folder_contents =
`
<form id = "new-class-form">
  <fieldset style = "margin-top: 0;" id = "current-themes" class = "shrink-and-center-SUB-fieldset border-color-and-radius">
    <legend>Themes</legend>
    <fieldset class = "shrink-and-center-SUB-fieldset form-vertical-spacing-rule">
      <legend class = "bold-heading">New Theme</legend>
      <div class = "new-form-content">
        <div class = "color-chooser-container">
          <div style = "margin-top: 15px;">
            <label class = "small-label-format" for = "font-theme">RGB color code:</label>
            <span>rgb(</span>
            <input id = "font-theme" class = "input-half-width input-height-and-font rgb-input-resize" type = "text" placeholder = "250, 25, 160">
            <span>)</span>
          </div>
          <div>
            <svg id = "color-svg">
              <rect id = "color-rectangle" />
            </svg>
          </div>
        </div>
        <div style = "margin-top: 15px;">
          <div class = "">
            <label class = "small-label-format" for = "theme-url">Web Image URL:</label>
            <div class = "">
              <input id = "theme-url" class = "input-height-and-font" type = "text">
              <button id = "add-from-web-button" style = "display: inline; vertical-align: top; margin-top: 0;" class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format" type = "button">Add from Web</button>
              <span display: inline;" id = "theme-error" class = "warning-message">Default</span>
            </div>
          </div>
          <div class = "">
            <input class = "real-file-upload-hide" id = "image-upload-button-selector" type = "file">
            <label style = "padding: 6px 5px; margin-top: 3px;  margin-bottom: 10px;" class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "image-upload-button-selector">
                <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
                <span>Upload Theme</span>
            </label>
            <span display: inline;" id = "upload-theme-error" class = "warning-message">Default</span>
          </div>
        </div>
      </div>
    </fieldset>
  </fieldset>
</form>
`;

var current_themes_field =
`
<fieldset class = "shrink-and-center-SUB-fieldset form-vertical-spacing-rule">
  <legend class = "bold-heading">Current Themes</legend>
  <div style = "margin-top: 0px;" class = "new-form-content">
    <ul id = "themes-list">
    </ul>
  </div>
</fieldset>
`;

var theme_box =
`
<li class = "theme">
  <button class = "remove theme-remove general-button-format" type = "button">x</button>
  <div class = "overlay"></div>
  <img src = "" class = "theme-image"/>
</li>
`;

var expanded_theme_container =
`
<div id = "expanded-theme">
  <div id = "expanded-theme-relative-position">
  </div>
</div>
`;


//CLASSES!!!!!!!!!!!
 var class_folder =
 `
 <div style = "margin-top: 15px;" class = "class-folder root-folder-selector">
   <h4 class = "folder-arrow pointer-mouse-type"><span class = "expand-arrow">►</span> <img class = "root-folder-selector-image" src = "Images/Coding Logos/GameMaker/yoyo-games-logo.png" alt=""><span class = "name-tag">Class</span></h4>
   <div class = "students" style = "margin-top: 15px;">

   </div>
 </div>
 `;

 var class_folder_content =
 `
 <div style = "margin-top: 0;" class = "class-folder-content new-form-content">
   <ul class = "students-list">

   </ul>
   <div class = "student-add-container">
     <div class = "new-student-add">
       <h6 class = "small-label-format">Add Students:</h6>
       <button class = "add-student-single-dropdown-button add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
     </div>
     <div style = "margin-top: 15px;" id = "add-class" class = "add-student-single-dropdown-menu">

     </div>
   </div>
 </div>
 `;

 var student_clickbox_content =
 `
 <li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
   <div class = "main-content">
     <img class = "user-photo project-thumbnail" alt = "">
     <div class = "data-box-info">
       <h6 class = "student-name namedata-box-text-format pointer-mouse-type">Default Name</h6>
       <h6 class = "date-uploaded data-box-text-format pointer-mouse-type">Default Date</h6>
     </div>
     <button class = "view-student STEM-blue-background blue-to-green-button general-button-format" type="button">View Console</button>
   </div>
 </li>
 `;

 var student_clickbox_remove_button =
`
<div style = "margin: 10px 10px 0px 10px;" class = "remove-container">
  <button style = "font-size: 11px; padding: 7px 8px;" class = "remove general-button-format" type="button">Remove</button>
</div>
`;

var new_student_single_dropdown_menu =
`
<div class = "new-form-content">
  <div class = "add-student-cummulative-menu">

  </div>
  <div class = "add-student-controls">
    <h6 class = "small-label-format">New Student:</h6>
    <button class = "add-student-cummulative-dropdown-button add-new STEM-blue-background blue-to-green-button general-button-format" type = "button">+</button>
  </div>
  <div>
  <div style = "margin-top: 10px;">
    <button style = "font-size: 12px; padding: 8px 6px;" class = "create-students STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">Create Students</button>
    <button style="font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "cancel-add-additional-student" class = "remove general-button-format" type="button">Cancel</button>
  </div>
</div>
`;
