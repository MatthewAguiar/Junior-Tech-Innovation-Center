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

function sign_in_to_firebase()
{
  var username_input = USERNAME_INPUT_FIELD.value;
  var password_input = PASSWORD_INPUT_FIELD.value;
  user_2D_array.then(
    function(array)
    {
      console.log(array);
      user_type = get_student_or_admin(username_input, array);
      console.log(user_type);
      if(user_type !== "null")
      {
        FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(username_input), password_input).then(
          function()
          {
            window.localStorage.setItem("Password", password_input);
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
          }
        ).catch(
          function(error)
          {
            incorrect_credentials_message.id = "show";
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

const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const USERNAME_INPUT_FIELD = document.getElementById("username-input");
const PASSWORD_INPUT_FIELD = document.getElementById("password-input");
const SUBMIT_BUTTON = document.getElementById("sign-in-button");
const RESET_PASSWORD_BUTTON = document.getElementById("reset-password-button");
var incorrect_credentials_message = document.getElementsByTagName("output")[0];
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students/All Students");
var user_type;

/*FIREBASE_AUTHENTICATION.signOut().then(
  function(error)
  {
    console.log(error);
  }
);*/

var user_2D_array = organize_all_users(DATABASE_ADMIN_BRANCH, DATABASE_STUDENT_BRANCH);
SUBMIT_BUTTON.addEventListener("click", sign_in_to_firebase);
window.addEventListener("keydown",
  function(event)
  {
    if(event.keyCode === 13)
    {
      sign_in_to_firebase();
    }
  }
);
