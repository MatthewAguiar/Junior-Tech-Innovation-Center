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
      <legend class = "bold-heading">Add Students:</legend>
      <div class = "SUB-fieldset-content">
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
              <label class = "inline-label" for = "adobe-student"><img class = "course-icons" src = "Images/Coding Logos/Adobe/adobe-animate.jpg" alt=""></label>
              <input class = "inline-checkbox" id = "adobe-student" type = "radio" name = "course_type">
            </div>
          </div>
          <span style = "display: block;" id = "class-type-warning" class = "warning-message">Please choose one class.</span>
        </div>
        <div class = "student-add-container">
          <div id = "students-box">

          </div>
          <hr class = "folder-divider">
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
        <input class = "input-half-width input-height-and-font"  id = "student-name" type = "text" name = "student_add" value = "">
        <button class = "search-student STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "search_student"><img src = "Images/Admin/Add-Existing-Student.svg" alt = ""></button>
      </div>
    </div>
    <div class = "student-activate-input-box form-vertical-spacing-rule">
      <label class = "small-label-format" for = "student-name">New Student Name:</label>
      <input class = "student-name-input input-half-width input-height-and-font"  id = "student-name" type = "text" name = "student_add" value = "">
      <span style = "display: block;" class = "name-warning warning-message">Please enter a username.</span>
    </div>
    <div class = "student-activate-input-box" style = "margin-top: 7px;">
      <label class = "small-label-format" for = "student-password">New Student Password:</label>
      <input class = "student-password-input input-half-width input-height-and-font"  id = "student-password" type = "text" name = "student_add" value = "">
      <span style = "display: block;" class = "password-warning warning-message">Please enter a <u>secure</u> password.</span>
    </div>
    <button class = "confirm-student-info STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format" type = "button" name = "activate_student_profile">Add to Class</button>
    <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" class = "remove-student remove general-button-format" type = "button" name = "remove_student">Cancel</button>
  </div>
</div>
`;
