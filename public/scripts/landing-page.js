/*
Jr. Tech Innovation Center (JTIC): LANDING PAGE JAVASCRIPT
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
//TEST user
/*
const FIREBASE_AUTHENTICATION = firebase.auth(); //Saves all firebase FIREBASE_AUTHENTICATION methods in the "FIREBASE_AUTHENTICATION" constant for later use in creating/loging into user accounts.
const USER_LOGIN = FIREBASE_AUTHENTICATION.createUserWithEmailAndPassword("matthew-aguiar@jrtechinnovation.org", "SonicBoom");
USER_LOGIN.catch(function(error){
  alert("An error has occured. Please try again later.");
  console.log(error);
});
*/

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
  var users = [[],[]];
  for(var admin_id in admin_data)
  {
    users[0].push(admin_data[admin_id]["Name"]);
    users[1].push(admin_data[admin_id]["Account Type"]);
  }
  for(var class_name in student_data)
  {
    for(var student_id in student_data[class_name])
    {
      users[0].push(student_data[class_name][student_id]["Name"]);
      users[1].push(student_data[class_name][student_id]["Account Type"]);
    }
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

const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const USERNAME_INPUT_FIELD = document.getElementById("username-input");
const PASSWORD_INPUT_FIELD = document.getElementById("password-input");
const SUBMIT_BUTTON = document.getElementById("sign-in-button");
const RESET_PASSWORD_BUTTON = document.getElementById("reset-password-button");
var incorrect_credentials_message = document.getElementsByTagName("output")[0];
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");
var user_type;

FIREBASE_AUTHENTICATION.signOut().then(
  function(error)
  {
    console.log(error);
  }
);

var user_2D_array = organize_all_users(DATABASE_ADMIN_BRANCH, DATABASE_STUDENT_BRANCH);
SUBMIT_BUTTON.addEventListener("click",
  function()
  {
    var username_input = USERNAME_INPUT_FIELD.value;
    var password_input = PASSWORD_INPUT_FIELD.value;
    user_2D_array.then(
      function(array)
      {
        user_type = get_student_or_admin(username_input, array);
        if(user_type !== "null")
        {
          FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(username_input), password_input).catch(
            function(error)
            {
              alert(error);
            }
          );
        }
        else
        {
          incorrect_credentials_message.id = "show";
        }
      }
    );
  }
);

FIREBASE_AUTHENTICATION.onAuthStateChanged(
  function(JTIC_user)
  {
    if(JTIC_user)
    {
      console.log(JTIC_user);
      if(user_type === "Administrator")
      {
        document.location.href = "admin.html";
      }
      else if(user_type === "Student")
      {
        document.location.href = "student.html";
      }
    }
    else
    {
      console.log("Not logged in!");
    }
  }
);
