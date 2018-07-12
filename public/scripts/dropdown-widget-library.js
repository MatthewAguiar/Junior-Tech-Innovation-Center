/*
Jr. Tech Innovation Center (JTIC): DROPDOWN WIDGET LIBRARY
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
------------------ DROPDOWN WIDGET CLASS --------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
NOTE: Please recognize that this class, "Dropdown_Widget", is the uppermost ancestor for all other classes which inherit from it. It is recommended that arguments be passed up through them!
Therefore every other class is a more specifi implementation of a "Dropdown_Widget".
REVIEW: List of CONSTRUCTOR parameters!
1) transition_duration - Can be either a string or number representing the amount of time a dropdown widget should tranistion for. DATATYPE: STRING/INT/FLOAT!
2) duration_units - A string that accepts CSS units as to what unit the widget's "transition_duration" should last for. Example: "ms" or "s". DATATYPE: STRING!
3) transition_delay - Can be either a string or number representing the amount of time a dropdown widget should wait BEFORE transitioning for. DATATYPE: STRING/INT/FLOAT!
4) delay_units - A string that accepts CSS units as to what unit the widget's "transition_delay" should last for. Example: "ms" or "s". DATATYPE: STRING! DATATYPE: STRING!
5) height_units - This is a string representing the CSS unit of height the widget should use when expanding. Example: "px", "pc", "em", "rem", "%", etc. DATATYPE: STRING!
6) expanded_spacing - A value indicating how much extra spacing a widget should give when dropping down. MUST HAVE CSS UNITS!!! DATATYPE: STRING ONLY!
7) widget_body_id_or_object - The HTML id of the container you wish to make into a dropdown widget. DATATYPE: STRING!(Must be HTML id WITHOUT # character in front)!
8) widget_content_array - An array of HTML code blocks that you wish to append to the widget's body when expanded. DATATYPE: ARRAY!
9) array_of_parents - An array representing parent widgets. For example, a widget within another widget must have an array_or_parents with that outermost widget object in it in order to expand
both itself and the outermost parent widget. You may nest as many widgets as you'd like. Just remember for each level a widget is further nested, each ansestor widget object must be put into
its array_of_parents.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, widget_body_id_or_object, widget_content_array, array_of_parents)
  {
    //RETURNS: NOTHING.
    //Instance variables created with ALL widgets!!!
    this.widget_content_array = widget_content_array;
    this.array_of_parents = array_of_parents;
    this.height_units = height_units;
    this.expanded_spacing = expanded_spacing;
    this.widget_content_show = false; //Is only true as soon as widget begins openING and turns back to false once widget is FULLY CLOSED.
    this.expanded = false; //Changes to "true" everytime a widget begins openING and to false when it is closING. Does NOT wait until transition finishes.
    this.main_code_expanded = false; //This variable is only used in the check_expanded method below and is used to control program flow in your main code. See check_expanded() for more!
    this.setup_widget_body(widget_body_id_or_object, transition_duration, duration_units, transition_delay, delay_units); //SEE directly below ↓↓↓↓↓↓↓↓
  }

  setup_widget_body(widget_body_id_or_object, transition_duration, duration_units, transition_delay, delay_units)
  {
    //RETURNS: NOTHING.
    //This method takes the same parameters passed to the constructor.
    try
    {
      if(typeof widget_body_id_or_object === "object")
      {
        if(widget_body_id_or_object.length === 1)
        {
          this.$widget_body = widget_body_id_or_object;
        }
      }
      else
      {
        this.$widget_body = $('#' + widget_body_id_or_object); //Creates a jQuery object representing the body of the widget.
      }
      var starting_height = this.$widget_body.height();
      this.previous_height = starting_height;
      this.expanded_height = starting_height;
      this.$widget_body.css("height", starting_height.toString() + this.height_units); //Widget must have concrete starting height value. Gets it from temporary measured height variable above.
      this.$widget_body.css("transition", "height " + transition_duration.toString() + duration_units.toString() + " ease " + transition_delay.toString() + delay_units.toString()).css("overflow", "hidden").css("border-bottom", "1px solid rgb(71, 71, 71)"); //Set CSS transition.
      /*These next two lines eliminate all CSS margin-bottom. You are encouraged to use margin-bottom in your widgets but it will turned into normal height later when the widget is expanded. There will be NO margin-bottom to begin
      with when the widget is collapsed but the margin bottom will be included in its expanded height to give the bottom of the menu some space between the the bottom of the widget and its content.*/
    }
    catch(exception)
    {
      //console.log(exception);
    }
  }

  manage_collapse_transitionend(remove_content)
  {
    //RETURNS NOTHING.
    //This method takes in a jQuery representing a part of the widget to remove once the collapse transition is completed and removes it. That's right, collapsed HTML is not just hidden but removed all together then readded.
    this.$widget_body.on("transitionend", //On transitionend remoe the object and set this.widget_content_show to false.
      function(event)
      {
        if(event.target.id === this.$widget_body.attr("id"))
        {
          if(remove_content.constructor === Array)
          {
            for(let i = 0; i < remove_content.length; i++)
            {
              if(this.$widget_body.find('.' + $(remove_content[i]).attr("class")).length >= 1)
              {
                this.$widget_body.find('.' + $(remove_content[i]).attr("class")).remove();
              }
              else
              {
                this.$widget_body.find('#' + $(remove_content[i]).attr("id")).remove();
              }
            }
          }
          else
          {
            var $object_to_remove = remove_content;
            $object_to_remove.remove();
          }
          this.widget_content_show = false;
          this.main_code_expanded = false;
        }
      }.bind(this)
    );
  }

  manage_widget_state(fixed_collapsed_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height)
  {
    /*
    RETURNS: NOTHING.
    PARAMETERS:
    NOTE: These parameters are all passed as arguments to expand_widget_contents() and collapse_widget_contents() methods.
    1) fixed_collapsed_height_bool - Will be true or false. If true the next parameter, "fixed_collapsed_height", will be used as the concrete, pre-determined height the widget should collapse to. Otherwise the widget's height Will
    automatically collapse to 0 units. DATATYPE: BOOLEAN.
    2) fixed_collapsed_height - The fixed height a widget should collapse to if the previous parameter is true. DATATYPE: INTEGER or FLOAT.
    3) fixed_expanded_height_bool - Same as "fixed_collapsed_height_bool" where, if true, the next parameter "fixed_expanded_height" will be a concrete, pre-determined height the widget should expand to. DATATYPE: BOOLEAN.
    4) fixed_expanded_height - The fixed height a widget should expand to if the previous parameter is true. DATATYPE: INTEGER or FLOAT.
    */
    //This is a method that will automatically manage widget states as to whether a widget should be opening or closing WHEN CLICKED. NOTE: This method is overridden in classes such as "Cummulative_Menu" because those widgets work slightly differently.
    if(!this.widget_content_show && !this.expanded) //If the widget is closed.
    {
      for(let i = 0; i < this.widget_content_array.length; i++) //Then start appending all of the HTML in the widgets content array.
      {
        this.$widget_body.append(this.widget_content_array[i]);
      }
      this.widget_content_show = true; //Content is showing once the HTML is appended.
    }
    if(!this.expanded) //Since the "this.expanded" variable changes everytime the widget changes opening and closing states, check if it is NOT true (widget is closing) and then re-expand the widget and its parents.
    {
      this.$widget_body.off("transitionend");
      this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, this.expanded_spacing);
      if(this.array_of_parents.length > 0) //If the widget is nested within other widgets, expand all of its ancestors. See "expand_parent_widgets" for more.
      {
        this.expand_parent_widgets();
      }
      this.expanded = true;
    }
    else //If the this.expanded is true (widget is opening) start closing the widget.
    {
      this.collapse_widget_contents(fixed_collapsed_height_bool, fixed_collapsed_height, this.expanded_spacing);
      if(this.array_of_parents.length > 0) //As with expanding, if the widget has any ancestor widgets its nested inside of, then expand those as well with the "collapse_parent_widgets" method.
      {
        this.collapse_parent_widgets();
      }
      this.expanded = false;
    }
  }

  expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, expanded_spacing)
  {
    //RETURNS: NOTHING.
    /*Very important method for automatically getting the height of an expanded widget and then expanding to that height. NOTE: Takes "fixed_expanded_height_bool" and "fixed_expanded_height" parameters from "manage_widget_state" method
    and will use those accordingly.*/
    this.previous_height = this.expanded_height; //Set the widget's previous_height to its expanded_height so that when the actual expanded_height is now changed the previous_height will actually be the previous height.
    if(fixed_expanded_height_bool === true) //If that fixed_expanded_height_bool is true set the widget's expanded_height to the fixed_expanded_height.TODO: CHECK margin bottom
    {
      this.expanded_height = fixed_expanded_height + parseInt(expanded_spacing);
    }
    else //If the fixed_expanded_height_bool parameter is false, save the widgets "auto height" to this.expanded_height.
    {
      var current_height = this.$widget_body.height();
      this.expanded_height = this.$widget_body.css("height", "auto").height() + parseInt(expanded_spacing);
      console.log(this.expanded_height);
      this.expanded_height = this.expanded_height + parseInt(this.$widget_body.children("*").css("margin-top")) + parseInt(this.$widget_body.children("*").css("margin-bottom")) +
      parseInt(this.$widget_body.children("*").css("padding-top")) + parseInt(this.$widget_body.children("*").css("padding-bottom"));
      console.log(this.expanded_height);
      this.$widget_body.height(current_height);
    }
    var expand_height = this.expanded_height.toString() + this.height_units; //Then, take whatever this.expanded_height came out to be and format it as a string, with units, in order to be used as CSS.
    this.$widget_body.css("height", expand_height);
  }

  collapse_widget_contents(fixed_collapsed_height_bool, fixed_collapsed_height, expanded_spacing)
  {
    //RETURNS: NOTHING.
    /*Very important method for collaspsing widgets to either 0 units or to a specified height if fixed_collapsed_height_bool is true. NOTE: Takes "fixed_expanded_height_bool" and "fixed_expanded_height" parameters from
    "manage_widget_state" method and will use those accordingly.*/
    this.previous_height = this.expanded_height; //Again change the widget's previous_height to its expanded_height because the widget's expanded_height variable is about to change.
    if(fixed_collapsed_height_bool) //If the fixed_collapsed_height_bool parameter is true, set the widget's height to whatever the fixed_collapsed_height is.
    {
      this.expanded_height = fixed_collapsed_height - parseInt(expanded_spacing);
      fixed_collapsed_height = this.expanded_height.toString() + this.height_units;
      this.$widget_body.css("height", fixed_collapsed_height);
    }
    else //If fixed_collapsed_height_bool parameter is false, collapse the widget to 0 units.
    {
      this.expanded_height = 0;
      this.$widget_body.css("height", "0" + this.height_units);
    }
  }

  expand_parent_widgets()
  {
    //RETURNS: NOTHING.
    //All of the commented out code is just for purposes of observing each widgets heights at different points. I left it here as a good debug tool if anyone needs it.
    /*console.log(this.$widget_body.attr("id") + "'s previous height was " + this.previous_height.toString() + " pixels.");
    console.log(this.$widget_body.attr("id") + "'s height now is " + this.expanded_height.toString() + " pixels.");*/

    /*NOTE: For each ancestor a widget has, get the height they must expand by, by taking the ancestor's expanded_height and adding the difference between the descendant's new expanded_height and the height which it previously was before it got expanded.*/
    for(let i = 0; i < this.array_of_parents.length; i++)
    {
      let expand_height = this.array_of_parents[i].expanded_height + (this.expanded_height - this.previous_height);
      this.array_of_parents[i].expand_widget_contents(true, expand_height, "0px"); //Use the calculated expand_height above and use it as a fixed_expanded_height to expand to!
      //console.log(this.expanded_height, this.previous_height);
      //console.log(this.array_of_parents[i].expanded_height, this.array_of_parents[i].previous_height);
      /*console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height previously was " + this.array_of_parents[i].previous_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height is now " + this.array_of_parents[i].expanded_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + " was increased in height by: " + (this.expanded_height - this.previous_height).toString() + " pixels.");*/
    }
  }

  collapse_parent_widgets()
  {
    //RETURNS: NOTHING.
    //All of the commented out code is just for purposes of observing each widgets heights at different points. I left it here as a good debug tool if anyone needs it.
    /*console.log(this.$widget_body.attr("id") + "'s previous height was " + this.previous_height.toString() + " pixels.");
    console.log(this.$widget_body.attr("id") + "'s height now is " + this.expanded_height.toString() + " pixels.");*/

    /*NOTE: For each ancestor a widget has, get the height they must collapse to, by taking the ancestor's expanded_height and subtracting the difference between the descendant's previous_height and its smaller
    height which it now is.*/
    for(let i = 0; i < this.array_of_parents.length; i++)
    {
      let collapse_height = this.array_of_parents[i].expanded_height - (this.previous_height - this.expanded_height);
      this.array_of_parents[i].collapse_widget_contents(true, collapse_height, "0px"); //Use the calculated expand_height above and use it as a fixed_collapsed_height to collapse to!

      /*console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height previously was " + this.array_of_parents[i].previous_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height is now " + this.array_of_parents[i].expanded_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + " was decreased in height by: " + (this.previous_height - this.expanded_height).toString() + " pixels.");*/
    }
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ MENU CLASS -------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
REVIEW: List of CONSTRUCTOR parameters!
1 - 6) transition_duration through expanded_spacing parameters are the exact same as the "Dropdown_Widget" class. DATATYPES: SAME AS "Dropdown_Widget".
7) menu_expand_handle_id - This is a string representing the HTML id of the button you would like as the open button for the menu. DATATYPE: STRING.
8) menu_collapse_handle_id - A string representing the button which will close the menu once it is open. DATATYPE: STRING.
9) menu_body_id_or_object - The HTML id representing the $widget_body of the menu widget ir jQuery object. DATATYPE: STRING OR JQUERY OBJECT.
10) menu_content_array - An array with the HTML content to be added to the menu. DATATYPE: ARRAY.
11) array_of_parents - An array representing parent widgets. For example, a menu within ANY OTHER widget must have an array_or_parents with that outermost widget object in it in order to expand
both itself and the outermost parent widget. You may nest as many widgets as you'd like. Just remember for each level a widget is further nested, each ansestor widget object must be put into
its array_of_parents. DATATYPE: ARRAY.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ FOLDER CLASS -----------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
REVIEW: List of CONSTRUCTOR parameters!
1 - 5) transition_duration through expanded_spacing - Same as previous classes. DATATYPES: Also same as previous classes.
6) expand_and_collapse_handle_id - Similar to the menu system this is a handlebar HTML id which will control the exapanding and contracting of folders. DATATYPE: STRING.
7) menu_body_id_or_object - The HTML id of the container representing the folder body. DATATYPE: STRING.
8) folder_content_array - An array of HTML content that should be appended the the folder's widget body. DATATYPE: ARRAY.
9) array_of_parents - An array representing parent widgets. For example, a folder within ANY OTHER widget must have an array_or_parents with that outermost widget object in it in order to expand
both itself and the outermost parent widget. You may nest as many widgets as you'd like. Just remember for each level a widget is further nested, each ansestor widget object must be put into
its array_of_parents. DATATYPE: ARRAY.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Folder extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, expand_and_collapse_handle_id_or_object, folder_body_id_or_object, folder_content_array, array_of_parents)
  {
    //RETURNS: NOTHING.
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, folder_body_id_or_object, folder_content_array, array_of_parents); //Call constructor of "Dropdown_Widget".
    this.$folder_expand_collapse_handle = $('#' + expand_and_collapse_handle_id_or_object); //Make the expand_and_collapse_handle_id_or_object into a jQuery object.
    this.$folder_expand_collapse_handle.on("click", //When the folder handle is clicked, do the following...
      function()
      {
        if(this.expanded) //If the menu is already expanded get ready to collapse it.
        {
          this.manage_collapse_transitionend(this.$widget_body.children());
        }
        this.manage_widget_state(false, 0, false, 0);
      }.bind(this)
    );
  }
}

class Menu extends Dropdown_Widget //Inherits all instance variables and methods from Dropdown_Widget.
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_expand_handle_id_or_object, menu_collapse_handle_id, menu_body_id_or_object, menu_content_array, array_of_parents)
  {
    //RETURNS: NOTHING.
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_body_id_or_object, menu_content_array, array_of_parents); //Call the constructor of the Dropdown_Widget class.
    if(typeof menu_expand_handle_id_or_object === "object")
    {
      if(menu_expand_handle_id_or_object.length === 1)
      {
        this.$menu_expand_handle = menu_expand_handle_id_or_object;
      }
    }
    else
    {
      this.$menu_expand_handle = $('#' + menu_expand_handle_id_or_object); //Make a jQuery object out of the menu_expand_handle_id_or_object so it may be used later to detect clicks.
    }
    this.$menu_collapse_handle; //This is an undefined instance variable which will EVENTUALLY hold a jQuery object of the menu_collapse_handle_id once the menu has been opened. NOTE: Would be best to put collapse button inside of menu!
    this.expand_handle_active = true; //A boolean to keep track of whether the expand button is active and the menu is ready to be dropped down.
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ SINGLE DROPDOWN MENU CLASS ---------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
REVIEW: List of CONSTRUCTOR parameters!
1 - 10) transition_duration through array_of_parents parameters are the same as in the "Menu" class which this "Single_Dropdown_Menu" class inherits from. DATATYPES: Same as previous classes.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Single_Dropdown_Menu extends Menu
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_expand_handle_id_or_object, menu_collapse_handle_id, menu_body_id_or_object, menu_content_array, array_of_parents)
  {
    //RETURNS: NOTHING.
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_expand_handle_id_or_object, menu_collapse_handle_id, menu_body_id_or_object, menu_content_array, array_of_parents); //Call "Menu" class constructor.
    this.$menu_expand_handle.on("click", //When the open menu jQuery object is clicked do the following.
      function()
      {
        if(this.expand_handle_active) //If this.expand_handle_active is true then set it to false so this code cannot be repeated until it returns back to true when the menu closes. Manage the widgets state (expand or collapse).
        {
          this.expand_handle_active = false;
          this.manage_widget_state(false, 0, false, 0);
          this.$menu_collapse_handle = $('#' + menu_collapse_handle_id); //Once expanded define the previously undefined "this.$menu_collapse_handle" variable as a new jQuery object.
          this.$menu_collapse_handle.on("click", //When the collapse handle is clicked do the following to collapse the menu...
            function()
            {
              if(!this.expand_handle_active) //If the this.expand_handle_active is false, which it should be...
              {
                this.expand_handle_active = true; //Set it to true.
                this.manage_widget_state(false, 0, false, 0); //Mange the widget's state.
                console.log(this.$widget_body);
                this.manage_collapse_transitionend(this.$widget_body.children()); //Trigger the transitionend listener and when the menu fully collapse remove the menu's inner content/children.
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ CUMMULATIVE MENU CLASS -------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
NOTE: Cummulative menus and item boxes(below) work together. Cummulative menus add item boxes filled with HTML.
REVIEW: List of CONSTRUCTOR parameters!
1 - 6) transition_duration through expanded_spacing parameters are the exact same as the "Dropdown_Widget" and "Menu" classes. DATATYPES: SAME AS "Dropdown_Widget" and "Menu".
7) item_box_transition_properties_array - Because cummulative menus append boxes of HTML and since those boxes also collapse with a transition, this array holds the following parameters for the "Item_Box" class below:
[transition_duration(String, Int or Float), duration_units(String), transition_delay(String, Int or Float), delay_units(String), height_units(String)]. DATATYPE: ARRAY.
8 - 10) menu_expand_handle_id_or_object through menu_body_id_or_object parameters are the same as in the "Menu" class above. DATATYPE: Same as "Menu" class. DATATYPE: Same as ancestor classes.
11) item_box_class - This is the HTML class name for the item boxes which will be appended in later methods. DATATYPE: String.
12) item_box_cancel_class - This is the HTML class name for the cancel button/delete button which will remove item boxes from the cummulative menu. Again see later methods to see how this class is implemented. DATATYPE: String.
13) item_box_content - NOT and array. Just a single chunk of HTML which will represent each item box which is appended to the menu. DATATYPE: STRING FULL OF HTML CONTENT.
14) array_or_parents - An array representing parent widgets. For example, a menu within ANY OTHER widget must have an array_or_parents with that outermost widget object in it in order to expand
both itself and the outermost parent widget. You may nest as many widgets as you'd like. Just remember for each level a widget is further nested, each ansestor widget object must be put into
its array_of_parents. DATATYPE: ARRAY.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Cummulative_Menu extends Menu
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, item_box_transition_properties_array, menu_expand_handle_id_or_object, menu_body_id_or_object, item_box_class, item_box_cancel_class, item_box_content, array_of_parents)
  {
    //RETURNS: NOTHING.
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_expand_handle_id_or_object, "", menu_body_id_or_object, item_box_content, array_of_parents); //Call parent class constructor.
    this.item_box_class = item_box_class;
    this.item_box_cancel_class = item_box_cancel_class;
    this.item_box_content = item_box_content;
    this.item_box_transition_properties_array = item_box_transition_properties_array;
    this.item_box_array = []; //This array will hold all "Item_Box" objects.
    this.current_number_of_item_boxes = 0; //This will keep track of the number of item boxes in this menu.
    this.$menu_expand_handle.on("click",
      function()
      {
        this.manage_widget_state(false, 0, false, 0);
      }.bind(this)
    );
  }

  manage_widget_state(fixed_collapsed_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height)
  {
    //RETURNS: NOTHING.
    this.widget_content_show = true;
    this.expanded = true;
    this.$widget_body.append(this.item_box_content); //Before actually creating an item box object when the $menu_expand_handle is clicked, actually append the HTML first so the next line can properly create the "Item_Box".
    this.item_box_array.push(new Item_Box(
        this.item_box_transition_properties_array[0], this.item_box_transition_properties_array[1], this.item_box_transition_properties_array[2], this.item_box_transition_properties_array[3],
        this.item_box_transition_properties_array[4], this.item_box_transition_properties_array[5], this, $('.' + this.item_box_class).eq(this.current_number_of_item_boxes), this.item_box_content,
        $('.' + this.item_box_cancel_class).eq(this.current_number_of_item_boxes), this.current_number_of_item_boxes, [this].concat(this.array_of_parents))); //Push a new item box to the item_box_array variable.
    this.current_number_of_item_boxes++; //Increment the number of item boxes this cummulative menu has.
    this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, this.expanded_spacing);
    if(this.array_of_parents.length > 0) //As with expanding, if the widget has any ancestor widgets its nested inside of, then expand those as well with the "collapse_parent_widgets" method.
    {
      this.expand_parent_widgets();
    }
  }

  renumber_item_box_ids(starting_index)
  {
    //RETURNS: NOTHING.
    //This method will renumber all of the menu's item boxes if one gets collapsed.
    for(let i = starting_index; i < this.item_box_array.length; i++)
    {
      this.item_box_array[i].$widget_body.attr("id", this.item_box_array[i].dummy_id_stem + i.toString());
      this.item_box_array[i].item_box_number = i;
    }
  }

  get_item_box_number(item_box_id)
  {
    //RETURNS: INTEGER.
    var number_string = "0123456789";
    var i = item_box_id.length - 1;
    while(i > 0) //Start at back of string and work until a non-numerical character is met. Then return the number found!
    {
      if(number_string.indexOf(item_box_id[i]) !== -1)
      {
        i--;
      }
      else
      {
        i++;
        break;
      }
    }
    return parseInt(item_box_id.substring(i, item_box_id.length));
  }
}
/*
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------ ITEM BOX CLASS ---------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
REVIEW: List of CONSTRUCTOR parameters!
1 - 6) transition_duration through expanded_spacing parameters are the exact same as the "Dropdown_Widget", "Menu", "Single_Dropdown_Menu" and "Cummulative_Menu" classes. DATATYPES: SAME AS "Dropdown_Widget", "Menu", "Single_Dropdown_Menu" and "Cummulative_Menu".
7) menu_object - This is the "Cummulative_Menu" object in which the new "Item_Box" will be placed in. DATATYPE: CUMMULATIVE MENU OBJECT.
8) $item_box - A jQuery object representing the particular item box being added to the cummulative menu. DATATYPE jQuery OBJECT.
9) item_box_content - The actual HTML which the item box is made out of. DATATYPE: STRING WITH HTML CONTENT.
10) $item_box_cancel_button - Another jQuery object representing the button which will collapse the item box. DATATYPE: jQuery Object.
11) item_box_number - An integer representing the order in which one item box falls in relation to others. DATATYPE: INTEGER.
12) array_of_parents - An array representing parent widgets. For example, an item box within ANY OTHER widget must have an array_or_parents with that outermost widget object in it in order to expand
both itself and the outermost parent widget. You may nest as many widgets as you'd like. Just remember for each level a widget is further nested, each ansestor widget object must be put into
its array_of_parents. DATATYPE: ARRAY.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Item_Box extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_object, $item_box, item_box_content, $item_box_cancel_button, item_box_number, array_of_parents)
  {
    //RETURN: NOTHING.
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, "", [item_box_content], array_of_parents); //Call "Dropdown_Widget" constructor.
    this.menu_object = menu_object; //This is an instance variable holding the "Cummulative_Menu" which a particular "Item_Box" is inside of.
    this.item_box_number = item_box_number; //Number the item box.
    this.dummy_id_stem = "item-box-"; //All item boxes will start with this stem.
    $item_box.attr("id", this.dummy_id_stem + this.item_box_number.toString()); //Set id of item box object.
    this.setup_widget_body($item_box.attr("id"), transition_duration, duration_units, transition_delay, delay_units); //Then setup widget body!
    this.$widget_body.css("border-bottom", "none");
    this.set_height_including_margins(); //See this method for more info.
    this.$item_box_cancel_button = $item_box_cancel_button;
    this.widget_margin_bottom;
    this.widget_margin_top;
    this.$item_box_cancel_button.on("click", //When a cancel button is clicked...
      function()
      {
        this.menu_object.item_box_array.splice(this.item_box_number, 1); //Remove this particular item box from the "Cummulative_Menu" item_box_array.
        this.menu_object.renumber_item_box_ids(this.item_box_number); //Renumber all other item boxes starting at the one removed.
        this.menu_object.current_number_of_item_boxes--; //Subtract one from the "Cummulative_Menu" current_number_of_item_boxes variable.
        this.menu_object.expanded = false;
        this.collapse_widget_contents(false, 0, this.expanded_spacing);
        if(this.array_of_parents.length > 0) //As with expanding, if the widget has any ancestor widgets its nested inside of, then expand those as well with the "collapse_parent_widgets" method.
        {
          this.collapse_parent_widgets();
        }
        this.manage_collapse_transitionend(this.$widget_body);
        if(this.menu_object.item_box_array.length < 1)
        {
          this.menu_object.$widget_body.on("transitionend",
            function(event)
            {
              if(event.target.id === this.menu_object.$widget_body.attr("id"))
              {
                this.menu_object.widget_content_show = false;
                this.menu_object.$widget_body.off("transitionend");
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  set_height_including_margins()
  {
    //RETURN: NOTHING.
    /*Because we want the "Cummulative_Menu" object to collapse COMPLETELY, if the item boxes have any margin top or bottom then this will not allow the "Cummulative_Menu" to close fully as the margin is not included in the
    height of any HTML element. Also, when the item boxes are removed, the margin remaining on the top or bottom will dissappear causing other widgets below to snap into place rather than slide up. Luckily this code turns any
    margin top into height and shifts the boxes content down by that amount to simulate margin top!*/
    this.widget_margin_bottom = this.$widget_body.css("margin-bottom");
    this.widget_margin_top = this.$widget_body.css("margin-top");
    this.$widget_body.css("margin-bottom", "0px");
    this.$widget_body.css("margin-top", "0px");
    var $item_box_children = this.$widget_body.children();
    $item_box_children.css("position", "relative").css("top", this.widget_margin_top); //SEE HERE!!!
    this.expanded_height = this.$widget_body.height() + parseInt(this.widget_margin_top) + parseInt(this.widget_margin_bottom);
    this.$widget_body.css("height", this.expanded_height.toString() + "px");
  }
}

class Widget_Collection
{
  constructor(widget_holder_array)
  {
    this.widget_holder_array = widget_holder_array;
    this.subwidget_array = [];
    this.global_subwidget_counter = 0;
  }

  get_id_number(widget_id)
  {
    var number_string = "0123456789";
    var i = widget_id.length - 1;
    while(i > 0)
    {
      if(number_string.indexOf(widget_id[i]) !== -1)
      {
        i--;
      }
      else
      {
        i++;
        break;
      }
    }
    return parseInt(widget_id.substring(i, widget_id.length));
  }

  get_starting_subwidget_number(widget_object)
  {
    var index_of_widget_holder = this.widget_holder_array.indexOf(widget_object);
    if(this.widget_holder_array.length > 1 && index_of_widget_holder !== this.widget_holder_array.length - 1)
    {
      if(index_of_widget_holder === 0)
      {
        return 0;
      }
      else
      {
        for(let i = index_of_widget_holder - 1; i >= 0; i--)
        {
          if(this.widget_holder_array[i].widget_content_show)
          {
            return this.widget_holder_array[i].clickbox_number_array[this.widget_holder_array[i].clickbox_number_array.length - 1] + 1;
          }
        }
        for(let i = index_of_widget_holder + 1; i < this.widget_holder_array.length; i++)
        {
          if(this.widget_holder_array[i].widget_content_show)
          {
            return this.widget_holder_array[i].clickbox_number_array[0];
          }
        }
        return 0;
      }
    }
    else if(index_of_widget_holder === this.widget_holder_array.length - 1)
    {
      return this.global_subwidget_counter;
    }
  }
}

class Item_Box_Collection extends Widget_Collection
{
  constructor(cummulative_menu_array)
  {
    super(cummulative_menu_array);
    if(this.widget_holder_array.length > 0)
    {
      for(let i = 0; i < this.widget_holder_array.length; i++)
      {
        this.initialize_item_box_variables(this.widget_holder_array[i], i);
      }
    }
  }

  initialize_item_box_variables(cummulative_menu_object, cummulative_menu_number)
  {
    for(let i = 0; i < cummulative_menu_object.item_box_array.length; i++)
    {
      this.subwidget_array.push(cummulative_menu_object.item_box_array[i]);
      this.subwidget_array[i].item_box_number = i;
    }
    cummulative_menu_object.$widget_body.attr("id", "item-box-holder-" + cummulative_menu_number.toString());
    cummulative_menu_object.item_box_holder_number = cummulative_menu_number;
    cummulative_menu_object.item_box_number_array = [];
  }

  renumber_item_box_holder_ids(starting_index)
  {
    for(let i = starting_index; i < this.widget_holder_array.length; i++)
    {
      this.widget_holder_array[i].$widget_body.attr("id", "item-box-holder-" + i.toString());
      this.widget_holder_array[i].item_box_holder_number = i;
    }
  }

  renumber_item_box_ids(starting_index)
  {
    //console.log(starting_index);
    for(let i = starting_index; i < this.subwidget_array.length; i++)
    {
      this.subwidget_array[i].$widget_body.attr("id", "item-box-" + i.toString());
      this.subwidget_array[i].item_box_number = i;
    }
  }

  increment_item_box_numbers(cummulative_menu_object)
  {
    if(cummulative_menu_object.expanded)
    {
      cummulative_menu_object.$widget_body.off("transitionend");
      if(cummulative_menu_object.item_box_array.length > 1)
      {
        var index_of_splice = cummulative_menu_object.item_box_number_array[cummulative_menu_object.item_box_number_array.length - 1] + 1;
      }
      else
      {
        var index_of_splice = this.get_starting_subwidget_number(cummulative_menu_object);
      }
      console.log("Adding Item Box at index:", index_of_splice);
      this.subwidget_array.splice(index_of_splice, 0, cummulative_menu_object.item_box_array[cummulative_menu_object.item_box_array.length - 1]);
      this.subwidget_array[index_of_splice].item_box_number = index_of_splice;
      cummulative_menu_object.item_box_number_array.push(index_of_splice);
      console.log("Here is the item box array:", this.subwidget_array);
      console.log("Here is the number array for " + cummulative_menu_object.$widget_body.attr("id") + ':', cummulative_menu_object.item_box_number_array);
      this.global_subwidget_counter++;
      this.renumber_item_box_ids(cummulative_menu_object.item_box_number_array[cummulative_menu_object.item_box_number_array.length - 1]);
      for(let i = this.widget_holder_array.indexOf(cummulative_menu_object) + 1; i < this.widget_holder_array.length; i++)
      {
        for(let j = 0; j < this.widget_holder_array[i].item_box_number_array.length; j++)
        {
          if(this.widget_holder_array[i].item_box_number_array.length > 0)
          {
            this.widget_holder_array[i].item_box_number_array[j]++;
          }
        }
        console.log("Number array for " + this.widget_holder_array[i].$widget_body.attr("id") + ":", this.widget_holder_array[i].item_box_number_array);
      }
    }
  }

  decrement_item_box_numbers(cummulative_menu_object, item_box_remove_index)
  {
    if(!cummulative_menu_object.expanded)
    {
      cummulative_menu_object.$widget_body.on("transitionend",
        function()
        {
          if(event.target.id === cummulative_menu_object.$widget_body.attr("id"))
          {
            console.log("Removing Item Box at index:", item_box_remove_index);
            var item_box_number_array_remove_index = cummulative_menu_object.item_box_number_array.indexOf(item_box_remove_index);
            console.log("Corresponding to index " + item_box_remove_index.toString() + " in: " + cummulative_menu_object.$widget_body.attr("id") + " number array.");
            cummulative_menu_object.item_box_number_array.splice(item_box_number_array_remove_index, 1);
            this.subwidget_array.splice(item_box_remove_index, 1);
            this.renumber_item_box_holder_ids(item_box_remove_index);
            this.global_subwidget_counter--;
            console.log("Here is the item box array:", this.subwidget_array);
            if(!cummulative_menu_object.widget_content_show)
            {
              if(this.widget_holder_array.indexOf(cummulative_menu_object) + 1 === this.widget_holder_array.length)
              {
                var i = this.widget_holder_array.length;
              }
              else
              {
                var i = this.widget_holder_array.indexOf(cummulative_menu_object) + 1;
              }
            }
            else
            {
              var i = this.widget_holder_array.indexOf(cummulative_menu_object);
            }
            while(i < this.widget_holder_array.length)
            {
              if(i === this.widget_holder_array.indexOf(cummulative_menu_object))
              {
                var j = item_box_number_array_remove_index;
              }
              else
              {
                var j = 0;
              }
              while(j < this.widget_holder_array[i].item_box_number_array.length)
              {
                if(this.widget_holder_array[i].item_box_number_array.length > 0)
                {
                  this.widget_holder_array[i].item_box_number_array[j]--;
                }
                j++;
              }
              console.log("Here is the number array for " + this.widget_holder_array[i].$widget_body.attr("id") + ':', this.widget_holder_array[i].item_box_number_array);
              i++
            }
            cummulative_menu_object.$widget_body.off("transitionend")
          }
        }.bind(this)
      );
    }
  }
}

class Clickbox_Collection extends Widget_Collection
{
  constructor(widget_holder_array)
  {
    super(widget_holder_array);
    if(this.widget_holder_array.length > 0)
    {
      for(let i = 0; i < this.widget_holder_array.length; i++)
      {
        this.initialize_clickbox_variables(this.widget_holder_array[i], i);
      }
    }
  }

  initialize_clickbox_variables(clickbox_holder_object, clickbox_holder_number)
  {
    clickbox_holder_object.$widget_body.attr("id", "clickbox-holder-" + clickbox_holder_number.toString());
    clickbox_holder_object.clickbox_number_array = [];
    clickbox_holder_object.local_clickbox_counter = 0;
    clickbox_holder_object.clickbox_holder_number = clickbox_holder_number;
  }

  append_clickbox(widget_object, transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, $clickbox, expansion_content_array, clickbox_number, array_of_parents)
  {
    var index_of_widget_object = this.widget_holder_array.indexOf(widget_object);
    this.subwidget_array.splice(clickbox_number, 0,
      new Clickbox(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, $clickbox, expansion_content_array, clickbox_number, array_of_parents)
    );
    this.widget_holder_array[index_of_widget_object].clickbox_number_array.push(this.subwidget_array[clickbox_number].clickbox_number);
    this.global_subwidget_counter++;
    widget_object.local_clickbox_counter++;
  }

  renumber_clickbox_holder_ids(starting_index)
  {
    //console.log(starting_index);
    for(let i = starting_index; i < this.widget_holder_array.length; i++)
    {
      this.widget_holder_array[i].$widget_body.attr("id", "clickbox-holder-" + i.toString());
      this.widget_holder_array[i].clickbox_holder_number = i;
    }
  }

  renumber_clickbox_ids(starting_index)
  {
    //console.log(starting_index);
    for(let i = starting_index; i < this.subwidget_array.length; i++)
    {
      this.subwidget_array[i].$widget_body.attr("id", "clickbox-" + i.toString());
      this.subwidget_array[i].clickbox_number = i;
    }
  }

  update_widget_clickbox_numbers(widget_object)
  {
    if(widget_object.expanded)
    {
      widget_object.$widget_body.off("transitionend");
      this.renumber_clickbox_ids(widget_object.clickbox_number_array[widget_object.clickbox_number_array.length - 1]);
      var number_of_boxes_added = widget_object.local_clickbox_counter;
      for(let i = this.widget_holder_array.indexOf(widget_object) + 1; i < this.widget_holder_array.length; i++)
      {
        for(let j = 0; j < this.widget_holder_array[i].clickbox_number_array.length; j++)
        {
          if(this.widget_holder_array[i].clickbox_number_array.length > 0)
          {
            this.widget_holder_array[i].clickbox_number_array[j] += number_of_boxes_added;
          }
        }
      }
    }
    else
    {
      widget_object.$widget_body.on("transitionend",
        function()
        {
          if(!widget_object.widget_content_show)
          {
            for(let i = 0; i < widget_object.clickbox_number_array.length; i++)
            {
              this.global_subwidget_counter--;
            }
            var number_of_boxes_removed = widget_object.local_clickbox_counter;
            for(let i = this.widget_holder_array.indexOf(widget_object) + 1; i < this.widget_holder_array.length; i++)
            {
              for(let j = 0; j < this.widget_holder_array[i].clickbox_number_array.length; j++)
              {
                if(this.widget_holder_array[i].clickbox_number_array.length > 0)
                {
                  this.widget_holder_array[i].clickbox_number_array[j] -= number_of_boxes_removed;
                }
              }
            }
            var renumbering_starting_index = widget_object.clickbox_number_array[0];
            this.subwidget_array.splice(renumbering_starting_index, widget_object.clickbox_number_array.length);
            this.renumber_clickbox_ids(renumbering_starting_index);
            widget_object.clickbox_number_array = [];
            widget_object.local_clickbox_counter = 0;
          }
        }.bind(this)
      );
    }
  }
}

class Clickbox extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, $clickbox, expansion_content_array, clickbox_number, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, "", expansion_content_array, array_of_parents);
    this.clickbox_number = clickbox_number;
    this.clickbox_id_stem = "clickbox-";
    $clickbox.attr("id", this.clickbox_id_stem + this.clickbox_number.toString());
    this.setup_widget_body($clickbox.attr("id"), transition_duration, duration_units, transition_delay, delay_units);
    this.fixed_collapsed_height = parseInt(this.$widget_body.css("height"));
    this.$widget_body.on("click",
      function()
      {
        if(this.expanded)
        {
          this.manage_collapse_transitionend(this.widget_content_array);
        }
        this.manage_widget_state(true, this.fixed_collapsed_height + parseInt(this.$widget_body.css("padding-bottom")), false, 0);
      }.bind(this)
    );
  }
}
