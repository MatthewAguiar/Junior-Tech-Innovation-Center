/*
Jr. Tech Innovation Center (JTIC): GLOBAL JAVASCRIPT FUNCTIONS
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

function convert_username_to_dummy_email(username)
{
  var username_lower_case_format = username.replace(/ /g, "-");
  //console.log(username_lower_case_format + "@jr-tech-innovation.org");
  return username_lower_case_format + "@jrtechinnovation.org";
}

class Info_Box
{
  constructor(description, content, loading_bar_bool)
  {
    this.$info_box = $("aside#help-guide-box");
    this.$background = this.$info_box.prev();
    this.$background.css("background-color");
    this.$background.css("background-color", "black");
    this.$info_box.css("transform");
    this.$info_box.css("transform", "translate(-50%, -50%) scale(1, 1)");
    this.$decription_element = this.$info_box.find("span#notification-name");
    this.$decription_element.text(description);
    this.$content_element = this.$info_box.find("p#notification-content");
    this.$content_element.text(content);
    this.$box_content_container = this.$info_box.find("div#help-content");
    this.$button_container = this.$info_box.find("div#button-box");
    if(loading_bar_bool)
    {
      this.$box_content_container.append("<img id = 'in-progress' src = 'Images/JTIC Loading Bar/JTIC-loading-bar.gif'>");
    }
  }
}
