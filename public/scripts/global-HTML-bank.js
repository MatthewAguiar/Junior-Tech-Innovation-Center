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
var sign_out_menu =
`
<div id = "sign-out-menu">
  <div id = "sign-out-menu-content">
    <div id = "main-sign-out-content">
      <div id = "sign-out-image-container">
        <div id = "sign-out-image-overlay" class = "overlay"><span id = "change-text"></span></div>
        <img>
      </div>
      <div id = "sign-out-user-info">
        <span id = "sign-out-username"></span>
        <span id = "sign-out-date-joined"></span>
      </div>
    </div>
    <div id = "change-profile-image-container">

    </div>
    <div id = "sign-out-button-container">
      <button id = "sign-out-button">Sign Out</button>
    </div>
  </div>
</div>
`;

var sign_out_new_profile_image_menu =
`
<div id = "change-profile-image-content">
  <h6 class = "small-label-format">Photo Upload or Web:</h6>
  <div style = "margin-bottom: 5px;" id = "sign-out-change-photo-contianer">
    <input id = "profile-photo-url" class = "input-half-width input-height-and-font" type = "text">
    <button id = "add-profile-from-web-button" style = "display: inline; vertical-align: top; margin-top: 0;" class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format" type = "button">Add from Web</button>
    <span style = "display: block; margin-top: 2px;" id = "web-photo-error" class = "warning-message">Default</span>
  </div>
</div>
`;

var message_box =
`
<div id = "help-guide-overlay"></div>
<aside id = "help-guide-box">
  <div class = "color-header-container">
    <div class = "color-strip STEM-blue-background"></div><div class = "color-strip STEM-orange-background"></div><div class = "color-strip STEM-green-background"></div><div class = "color-strip STEM-pink-background"></div>
  </div>
  <div id = info-box-inner-content>
    <header id = "help-guide-header">
      <img id = "notification-JTIC-logo" src = "Images/Landing Page/Junior-Tech-Innovation-Center-Logo.png" alt = "">
      <span id = "notification-name"></span>
    </header>
    <div id = "help-content">
      <hr id = "help-guide-divider">
      <p id = "notification-content"><u>Info</u>:</p>
    </div>
    <div id = "button-box">
    </div>
  </div>
</aside>
`;

//var loading bar = "<img id = 'in-progress' src = 'Images/JTIC Loading Bar/JTIC-loading-bar.gif'>";
