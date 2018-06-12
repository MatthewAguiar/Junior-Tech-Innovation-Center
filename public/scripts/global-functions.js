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

async function organize_all_users(admin_branch, student_branch)
{
  try
  {
    var admin_data = await get_data(admin_branch);
    var student_data = await get_data(student_branch);
  }
  catch(exception)
  {
    alert("An error has occured: " + exception);
    return [];
  }
  var users = [[],[],[]];
  for(var admin_id in admin_data)
  {
    users[0].push(admin_data[admin_id]["Name"]);
    users[1].push(admin_data[admin_id]["Account Type"]);
    users[2].push(admin_id);
  }
  for(var student_id in student_data)
  {
    users[0].push(student_data[student_id]["Name"]);
    users[1].push(student_data[student_id]["Account Type"]);
    users[2].push(student_id);
  }
  return users;
}

function get_data(branch)
{
  return new Promise(
    function(resolve, reject)
    {
      branch.once("value").then(
        function(data)
        {
          resolve(data.val());
        }
      ).catch(
        function(error)
        {
          reject(error);
        }
      );
    }
  );
}

function get_student_or_admin(username, user_2D_array)
{
  console.log(user_2D_array);
  if(user_2D_array[0].indexOf(username) === -1)
  {
    return "null";
  }
  else
  {
    var index_of_admin_or_student_string = user_2D_array[0].indexOf(username);
    return user_2D_array[1][index_of_admin_or_student_string];
  }
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
