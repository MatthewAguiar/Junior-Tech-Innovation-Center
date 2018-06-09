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
const FIREBASE_DATABASE = firebase.database().ref();
const FIREBASE_AUTHENTICATION = firebase.auth();
const USERNAME_INPUT_FIELD = document.getElementById("username-input");
const PASSWORD_INPUT_FIELD = document.getElementById("password-input");
const SUBMIT_BUTTON = document.getElementById("sign-in-button");
const RESET_PASSWORD_BUTTON = document.getElementById("reset-password-button");
var incorrect_credentials_message = document.getElementsByTagName("output")[0];
const DATABASE_ADMIN_BRANCH = FIREBASE_DATABASE.child("Users/Administrators");
const DATABASE_STUDENT_BRANCH = FIREBASE_DATABASE.child("Users/Students");
console.log(DATABASE_ADMIN_BRANCH);

FIREBASE_AUTHENTICATION.signOut().then(
  function(error)
  {
    console.log(error);
  }
);

SUBMIT_BUTTON.addEventListener("click",
  function()
  {
    var username_input = USERNAME_INPUT_FIELD.value;
    var password_input = PASSWORD_INPUT_FIELD.value;
    FIREBASE_AUTHENTICATION.signInWithEmailAndPassword(convert_username_to_dummy_email(username_input), password_input).catch(
      function(incorrect_credentials)
      {
        incorrect_credentials_message.id = "show";
      }
    );
  }
);

FIREBASE_AUTHENTICATION.onAuthStateChanged(
  function(JTIC_user)
  {
    if(JTIC_user)
    {
      //console.log(JTIC_user);
      var JTIC_user_data = FIREBASE_DATABASE.child("Users");
      JTIC_user_data.on("value", function(firebase_data_object){
        var user_data = firebase_data_object.val();
          window.localStorage.setItem("Username", username_input);
          window.localStorage.setItem("Password", password_input);
          document.location.href = "admin.html";
      });
    }
    else
    {
      console.log("Not logged in!");
    }
  }
);
