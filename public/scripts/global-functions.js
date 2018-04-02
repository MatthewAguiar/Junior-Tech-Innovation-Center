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
  return username_lower_case_format + "@gmail.com";
}
