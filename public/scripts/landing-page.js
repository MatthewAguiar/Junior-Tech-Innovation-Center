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
const AUTHENTICATION = firebase.auth(); //Saves all firebase authentication methods in the "AUTHENTICATION" constant for later use in creating/loging into user accounts.
const USER_LOGIN = AUTHENTICATION.createUserWithEmailAndPassword("matthew-aguiar@jr-tech-innovation.org", "SonicBoom");
USER_LOGIN.catch(function(error){
  alert("An error has occured. Please try again later.");
  console.log(error);
});
*/
const AUTHENTICATION = firebase.auth();
const SIGN_IN_FORM = document.getElementById("sign-in-form");
const USERNAME_INPUT_FIELD = document.getElementById("username-input");
const PASSWORD_INPUT_FIELD = document.getElementById("password-input");

//Functions
function get_attribute_from_DOM_object(object, attribute)
{
  switch(attribute)
  {
    case "id":
      return object.id;

    case "value":
      return object.value;

    default:
      return undefined;
  }
}

function convert_username_to_dummy_email(username)
{
  var username_lower_case_format = username.toLowerCase().replace(" ", "-");
  //console.log(username_lower_case_format + "@jr-tech-innovation.org");
  return username_lower_case_format + "@jr-tech-innovation.org";
}
//Main Code
SIGN_IN_FORM.addEventListener("submit", function(){
  var username_input = convert_username_to_dummy_email(get_attribute_from_DOM_object(USERNAME_INPUT_FIELD, "value"));
  var password_input = get_attribute_from_DOM_object(PASSWORD_INPUT_FIELD, "value");
  var sign_in = AUTHENTICATION.signInWithEmailAndPassword(username_input, password_input);
  sign_in.catch(function(error){
    //REPLACE WITH ERROR MESSAGE TO USER!
  });

  AUTHENTICATION.onAuthStateChanged(function(user){
    if(user)
    {
      console.log(user);
      document.location.href = "student_portfolio.html";
    }
    else
    {
      console.log("Not logged in!");
    }
  });
});
//console.log(get_attribute_from_DOM_object(SIGN_IN_FORM, "id"));