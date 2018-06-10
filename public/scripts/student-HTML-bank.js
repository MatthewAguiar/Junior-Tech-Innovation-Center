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
------------------ TODO ---------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
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


//STUDENT

var student_project_item =
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

var html_5_game_item =
`
<li class = "folder-item hover-shade-dark-tan pointer-mouse-type">
  <img class = "gamemaker-thumbnail" src = "Images/Flippy the Penguin Idle Sprite.png" alt = "">
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
  <img class = "gamemaker-thumbnail" src = "https://pre00.deviantart.net/b061/th/pre/f/2016/028/d/f/vector_icon_classic_sonic_set4_by_nibroc_rock-d9pordj.png" alt = "">
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
              <img class = "gamemaker-thumbnail" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt = "">
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
              <img class = "gamemaker-thumbnail" src = "Images/Student Project Folder Icons/yoyo-games-logo.png" alt = "">
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