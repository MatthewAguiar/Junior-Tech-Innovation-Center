/*
Jr. Tech Innovation Center (JTIC): STUDENT HTML BANK
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
------------------ GAMEMAKER FOLDER CONTENT -----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
var gamemaker_folder =
`
<li class = "root-folder-selector">
  <h4 id = "gamemaker-arrow" class = "folder-arrow pointer-mouse-type"><span class = "expand-arrow">►</span> <img class = "root-folder-selector-image" src = "Images/Coding Logos/GameMaker/yoyo-games-logo.png" alt=""><span>GameMaker-Studio</span></h4>
  <ul id = "gamemaker-student-projects-folder" class = "list-content">

  </ul>
</li>
`;

var gamemaker_project_folder_content =
`
<li class = "new-project-add">
  <div style = "margin-bottom: 15px;">
    <h6 class = "small-label-format">New Project:</h6>
    <button id = "add-gamemaker-project-button" class = "add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
  </div>
  <div id = "add-gamemaker-project-menu" class = "project-menu">

  </div>
</li>
`;

var gamemaker_project_download_box =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <div class = "main-content">
    <img class = "project-thumbnail" src = "Images/Coding Logos/GameMaker/yoyo-games-logo.png" alt = "">
    <div class = "data-box-info">
      <h6 class = "project-name data-box-text-format pointer-mouse-type">Default Name</h6>
      <h6 class = "date-uploaded data-box-text-format pointer-mouse-type">Default Date</h6>
    </div>
    <a class = "download-project STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download" download>
      <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
      <span>Download Project</span>
    </a>
  </div>
</li>
`;

var gamemaker_add_project_menu_content =
`
<form class = "sub-console-content-vertical-spacing">
  <fieldset class = "border-color-and-radius">
    <legend>New Project</legend>
    <div class = "new-project-form-content">
      <label class = "small-label-format" for = "project-add-textarea">Project Description:</label>
      <textarea class = "project-add-textarea" name = "name"></textarea>
      <span style = "display: block; margin-left: 5px;" class = "warning-message">Please add a description.</span>
      <input class = "real-file-upload-hide" id = "gamemaker-upload-button-selector" type = "file" name = "" value = "">
      <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "gamemaker-upload-button-selector">
          <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
          <span>Upload Project</span>
      </label>
      <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "remove-gamemaker-project-button" class = "remove general-button-format" type = "button" name = "add_class">Cancel</button>
    </div>
  </fieldset>
</form>
`;

var gamemaker_download_box_expansion_content =
`
<div class = "download-box-expansion-content">
  <div>
    <h6 class = "small-label-format"><u>Project Description</u>:</h6>
    <p class = "project-description-paragraph"></p>
  </div>
  <div class = "project-management-buttons">
    <input class = "update-project real-file-upload-hide" id = "update-gamemaker-project" type = "file" name = "" value = "">
    <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "update-gamemaker-project">
        <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
        <span>Upload New Version</span>
    </label>
    <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" class = "remove general-button-format">Delete</button>
    <span style = "margin-left: 5px;" class = "new-version-error warning-message">Projects do not match.</span>
  </div>
</div>
`;
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ PYTHON FOLDER CONTENT --------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
var python_folder =
`
<li class = "root-folder-selector">
  <h4 id = "python-arrow" class = "folder-arrow pointer-mouse-type"><span class = "expand-arrow">►</span> <img class = "root-folder-selector-image" src = "Images/Coding Logos/Python/python-logo.png" alt=""><span>Python</span></h4>
  <ul id = "python-student-projects-folder" class = "list-content">

  </ul>
</li>
`;

var python_project_folder_content =
`
<li class = "new-project-add">
  <h6 class = "small-label-format">New Project:</h6>
  <button id = "add-python-project-button" class = "add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
</li>
<li id = "add-python-project-menu" class = "project-menu">

</li>
`;

var python_add_project_menu_content =
`
<form class = "sub-console-content-vertical-spacing">
  <fieldset class = "border-color-and-radius">
    <legend>New Project</legend>
    <div class = "new-project-form-content">
      <label class = "small-label-format" for = "project-add-textarea">Project Description:</label>
      <textarea class = "project-add-textarea" name = "name"></textarea>
      <span style = "display: block; margin-left: 5px;" class = "warning-message">Please add a description.</span>
      <input class = "real-file-upload-hide" id = "python-upload-button-selector" type = "file" name = "" value = "">
      <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "python-upload-button-selector">
          <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
          <span>Upload Project</span>
      </label>
      <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "remove-python-project-button" class = "remove general-button-format" type = "button" name = "add_class">Cancel</button>
    </div>
  </fieldset>
</form>
`;

var python_project_download_box =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <div class = "main-content">
    <img class = "project-thumbnail" src = "Images/Coding Logos/Python/python-logo.png" alt = "">
    <div class = "data-box-info">
      <h6 class = "project-name data-box-text-format pointer-mouse-type">Default Name</h6>
      <h6 class = "date-uploaded data-box-text-format pointer-mouse-type">Default Date</h6>
    </div>
    <a class = "download-project STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download" download>
      <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
      <span>Download Project</span>
    </a>
  </div>
</li>
`;

var python_download_box_expansion_content =
`
<div class = "download-box-expansion-content">
  <div>
    <h6 class = "small-label-format"><u>Project Description</u>:</h6>
    <p class = "project-description-paragraph"></p>
  </div>
  <div class = "project-management-buttons">
    <input class = "update-project real-file-upload-hide" id = "update-python-project" type = "file" name = "" value = "">
    <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "update-python-project">
        <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
        <span>Upload New Version</span>
    </label>
    <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" class = "remove general-button-format">Delete</button>
    <span style = "margin-left: 5px;" class = "new-version-error warning-message">Projects do not match.</span>
  </div>
</div>
`;
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ C++ FOLDER CONTENT -----------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
var cpp_folder =
`
<li class = "root-folder-selector">
  <h4 id = "cpp-arrow" class = "folder-arrow pointer-mouse-type"><span class = "expand-arrow">►</span> <img class = "root-folder-selector-image" src = "Images/Coding Logos/C++/cpp-logo.png" alt=""><span>C++</span></h4>
  <ul id = "cpp-student-projects-folder" class = "list-content">

  </ul>
</li>
`;

var cpp_project_folder_content =
`
<li class = "new-project-add">
  <h6 class = "small-label-format">New Project:</h6>
  <button id = "add-cpp-project-button" class = "add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
</li>
<li id = "add-cpp-project-menu" class = "project-menu">
</li>
`;

var cpp_project_download_box =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <div class = "main-content">
    <img class = "project-thumbnail" src = "Images/Coding Logos/C++/cpp-logo.png" alt="">
    <div class = "data-box-info">
      <h6 class = "project-name data-box-text-format pointer-mouse-type">Default Name</h6>
      <h6 class = "date-uploaded data-box-text-format pointer-mouse-type">Default Date</h6>
    </div>
    <a class = "download-project STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download" download>
      <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
      <span>Download Project</span>
    </a>
  </div>
</li>
`;

var cpp_add_project_menu_content =
`
<form class = "sub-console-content-vertical-spacing">
  <fieldset class = "border-color-and-radius">
    <legend>New Project</legend>
    <div class = "new-project-form-content">
      <label class = "small-label-format" for = "project-add-textarea">Project Description:</label>
      <textarea class = "project-add-textarea" name = "name"></textarea>
      <span style = "display: block;  margin-left: 5px;" class = "warning-message">Please add a description.</span>
      <input class = "real-file-upload-hide" id = "cpp-upload-button-selector" type = "file" name = "" value = "">
      <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "cpp-upload-button-selector">
          <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
          <span>Upload Project</span>
      </label>
      <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "remove-cpp-project-button" class = "remove general-button-format" type = "button" name = "add_class">Cancel</button>
    </div>
  </fieldset>
</form>
`;

var cpp_download_box_expansion_content =
`
<div class = "download-box-expansion-content">
  <div>
    <h6 class = "small-label-format"><u>Project Description</u>:</h6>
    <p class = "project-description-paragraph"></p>
  </div>
  <div class = "project-management-buttons">
    <input class = "update-project real-file-upload-hide" id = "update-cpp-project" type = "file" name = "" value = "">
    <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "update-cpp-project">
        <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
        <span>Upload New Version</span>
    </label>
    <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" class = "remove general-button-format">Delete</button>
    <span style = "margin-left: 5px;" class = "new-version-error warning-message">Projects do not match.</span>
  </div>
</div>
`;
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ ADOBE FOLDER CONTENT ---------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
var adobe_folder =
`
<li id = "adobe-folder" class = "root-folder-selector">
  <h4 id = "adobe-arrow" class = "folder-arrow pointer-mouse-type"><span class = "expand-arrow">►</span> <img class = "root-folder-selector-image" src = "Images/Coding Logos/Adobe/adobe.png" alt=""><span>Adobe</span></h4>
  <ul id = "adobe-student-projects-folder" class = "list-content">

  </ul>
</li>
`;

var adobe_project_folder_content =
`
<li class = "new-project-add">
  <h6 class = "small-label-format">New Project:</h6>
  <button id = "add-adobe-project-button" class = "add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
</li>
<li id = "add-adobe-project-menu" class = "project-menu">
</li>
`;

var adobe_project_download_box =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <div class = "main-content">
    <img class = "project-thumbnail" src = "Images/Coding Logos/Adobe/adobe.png" alt = "">
    <div class = "data-box-info">
      <h6 class = "project-name data-box-text-format pointer-mouse-type">Default Name</h6>
      <h6 class = "date-uploaded data-box-text-format pointer-mouse-type">Default Date</h6>
    </div>
    <a class = "download-project STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download" download>
      <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
      <span>Download Project</span>
    </a>
  </div>
</li>
`;

var adobe_add_project_menu_content =
`
<form class = "sub-console-content-vertical-spacing">
  <fieldset class = "border-color-and-radius">
    <legend>New Project</legend>
    <div class = "new-project-form-content">
      <label class = "small-label-format" for = "project-add-textarea">Project Description:</label>
      <textarea class = "project-add-textarea" name = "name"></textarea>
      <span style = "display: block;  margin-left: 5px;" class = "warning-message">Please add a description.</span>
      <input class = "real-file-upload-hide" id = "adobe-upload-button-selector" type = "file" name = "" value = "">
      <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "adobe-upload-button-selector">
          <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
          <span>Upload Project</span>
      </label>
      <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" id = "remove-adobe-project-button" class = "remove general-button-format" type = "button" name = "add_class">Cancel</button>
    </div>
  </fieldset>
</form>
`;

var adobe_download_box_expansion_content =
`
<div class = "download-box-expansion-content">
  <div>
    <h6 class = "small-label-format"><u>Project Description</u>:</h6>
    <p class = "project-description-paragraph"></p>
  </div>
  <div class = "project-management-buttons">
    <input class = "update-project real-file-upload-hide" id = "update-adobe-project" type = "file" name = "" value = "">
    <label class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-upload" for = "update-cpp-project">
        <img src = "Images/Portfolio Images/Upload-Icon.svg" alt="">
        <span>Upload New Version</span>
    </label>
    <button style = "font-size: 12px; padding: 6px; margin: auto 0px auto 4px" class = "remove general-button-format">Delete</button>
    <span style = "margin-left: 5px;" class = "new-version-error warning-message">Projects do not match.</span>
  </div>
</div>
`;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var student_project_item =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <img class = "project-thumbnail" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt = "">
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

var html_5_game_item =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <img class = "project-thumbnail" src = "Images/Flippy the Penguin Idle Sprite.png" alt = "">
  <div class = "data-box-info">
    <h6 class = "data-box-text-format pointer-mouse-type">Title: <u>Flippy the Penguin</u></h6>
    <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2018</h6>
    <h6 class = "data-box-text-format pointer-mouse-type">Views: 56</h6>
  </div>
  <a class = "STEM-purple-background purple-to-orange-button general-button-format general-file-manipulation-button-format play-button-positioning">
    <span style = "font-weight: bold; font-size: 12px">Play!</span>
  </a>
</li>
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <img class = "project-thumbnail" src = "https://pre00.deviantart.net/b061/th/pre/f/2016/028/d/f/vector_icon_classic_sonic_set4_by_nibroc_rock-d9pordj.png" alt = "">
  <div class = "data-box-info">
    <h6 class = "data-box-text-format pointer-mouse-type">Title: <u>Sonic Unleashed</u></h6>
    <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2100</h6>
    <h6 class = "data-box-text-format pointer-mouse-type">Views: 156,000</h6>
  </div>
  <a class = "STEM-purple-background purple-to-orange-button general-button-format general-file-manipulation-button-format play-button-positioning">
    <span style = "font-weight: bold; font-size: 12px">Play!</span>
  </a>
</li>
`;

var holder =
`

<input class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format" type = "submit" name = "" value = "Create Class">



<section> <!--COMBAK: This is not a form!!!-->
  <ul class = "master-list">
    <li>
      <h6 class = "year-header bold-heading">Year of 2018</h6>
      <ul>
        <li class = "root-folder-selector">
          <h4 id = "class2018" class = "folder-arrow pointer-mouse-type"><span class = "expand-arrow">►</span> <img class = "root-folder-selector-image" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt=""><span>GameMaker-Studio: February 20<sup>th</sup> - 23<sup>rd</sup></span></h4>
          <ul class = "list-content">
            <li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
              <img class = "project-thumbnail" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt = "">
              <div class = "data-box-info">
                <div class = "student-stat-box">
                  <h6 class = " pointer-mouse-type">Name:</h6>
                  <span class = "overflow-student-stat-box-content">Andrew Aguiar</span>
                </div>
                <div class = "student-stat-box">
                  <h6 class = " pointer-mouse-type">Projects:</h6>
                  <span class = "normal-student-stat-box-content">76</span>
                </div>
                <div class = "student-stat-box">
                  <h6 class = " pointer-mouse-type">Games:</h6>
                  <span class = "normal-student-stat-box-content">56</span>
                </div>
              </div>
            </li>
            <li class = "folder-item folder-item-clicked hover-shade-dark-tan pointer-mouse-type">
              <img class = "project-thumbnail" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt = "">
              <div class = "data-box-info">
                <div class = "student-stat-box">
                  <h6 class = " pointer-mouse-type">Name:</h6>
                  <span class = "overflow-student-stat-box-content">Joe Shmoe</span>
                </div>
                <div class = "student-stat-box">
                  <h6 class = " pointer-mouse-type">Projects:</h6>
                  <span class = "normal-student-stat-box-content">888</span>
                </div>
                <div class = "student-stat-box">
                  <h6 class = " pointer-mouse-type">Games:</h6>
                  <span class = "normal-student-stat-box-content">0</span>
                </div>
              </div>
              <ul class = "student-data-list expanded-box-content">
                <li class = "project-section">
                  <h6 class = "small-label-format">Projects:</h6>
                  <ul>
                    <li class = "student-project">
                      <h6 class = "data-box-text-format pointer-mouse-type">Project Name: <u>flippy_game.gmx</u></h6>
                      <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2018</h6>
                      <a class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download">
                        <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
                        <span>Download</span>
                      </a>
                    </li>
                    <li class = "student-project">
                      <h6 class = "data-box-text-format pointer-mouse-type">Project Name: <u>flippy_game.gmx</u></h6>
                      <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2018</h6>
                      <a class = "STEM-blue-background blue-to-green-button general-button-format general-file-manipulation-button-format file-download">
                        <img src = "Images/Portfolio Images/Download-Icon.svg" alt="">
                        <span>Download</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class = "html-5-game-section">
                  <h6 class = "small-label-format">HTML 5 Games:</h6>
                  <ul>
                    <li class = "student-project">
                      <h6 class = "data-box-text-format pointer-mouse-type">Project Name: <u>flippy_game.gmx</u></h6>
                      <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2018</h6>
                      <a class = "STEM-purple-background purple-to-orange-button general-button-format general-file-manipulation-button-format file-download">
                        <span style = "font-weight: bold; font-size: 12px">Play!</span>
                      </a>
                    </li>
                    <li class = "student-project">
                      <h6 class = "data-box-text-format pointer-mouse-type">Project Name: <u>flippy_game.gmx</u></h6>
                      <h6 class = "data-box-text-format pointer-mouse-type">Uploaded On: November 15, 2018</h6>
                      <a class = "STEM-purple-background purple-to-orange-button general-button-format general-file-manipulation-button-format file-download">
                        <span style = "font-weight: bold; font-size: 12px">Play!</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <hr class = "folder-divider">
        </li>
      </ul>
    </li>
  </ul>
</section>
<section class = "form-vertical-spacing-rule add-class">
  <h6 class = "small-label-format">Add Class:</h6>
  <button class = "add-new STEM-blue-background blue-to-green-button general-button-format" type = "button" name = "add_class">+</button>
</section>
`;
