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
6) widget_body_id - The HTML id of the container you wish to make into a dropdown widget. DATATYPE: STRING!(Must be HTML id WITHOUT # character in front)!
7) widget_content_array - An array of HTML code blocks that you wish to append to the widget's body when expanded. DATATYPE: ARRAY!
8) array_of_parents - An array representing parent widgets. For example, a widget within another widget must have an array_or_parents with that outermost widget object in it in order to expand
both itself and the outermost parent widget. You may nest as many widgets as you'd like. Just remember for each level a widget is further nested, each ansestor widget object must be put into
its array_of_parents.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, widget_body_id, widget_content_array, array_of_parents)
  {
    //RETURNS: NOTHING.
    //Instance variables created with ALL widgets!!!
    this.widget_content_array = widget_content_array;
    this.array_of_parents = array_of_parents;
    this.height_units = height_units;
    this.widget_content_show = false; //Is only true as soon as widget begins openING and turns back to false once widget is FULLY CLOSED.
    this.expanded = false; //Changes to "true" everytime a widget begins openING and to false when it is closING. Does NOT wait until transition finishes.
    this.main_code_expanded = false; //This variable is only used in the check_expanded method below and is used to control program flow in your main code. See check_expanded() for more!
    this.setup_widget_body(widget_body_id, transition_duration, duration_units, transition_delay, delay_units); //SEE directly below ↓↓↓↓↓↓↓↓
  }

  setup_widget_body(widget_body_id, transition_duration, duration_units, transition_delay, delay_units)
  {
    //RETURNS: NOTHING.
    //This method takes the same parameters passed to the constructor.
    try
    {
      this.$widget_body = $('#' + widget_body_id); //Creates a jQuery object representing the body of the widget.
      var starting_height = this.$widget_body.height();
      this.previous_height = starting_height;
      this.expanded_height = starting_height;
      this.$widget_body.css("height", starting_height.toString() + this.height_units); //Widget must have concrete starting height value. Gets it from temporary measured height variable above.
      this.$widget_body.css("transition", "height " + transition_duration.toString() + duration_units.toString() + " ease " + transition_delay.toString() + delay_units.toString()).css("overflow", "hidden"); //Set CSS transition.
      /*These next two lines eliminate all CSS margin-bottom. You are encouraged to use margin-bottom in your widgets but it will turned into normal height later when the widget is expanded. There will be NO margin-bottom to begin
      with when the widget is collapsed but the margin bottom will be included in its expanded height to give the bottom of the menu some space between the the bottom of the widget and its content.*/
      this.widget_margin_bottom = this.$widget_body.css("margin-bottom"); //TODO: MAKE BORDER BOTTOM BLACK AND THEN SEE!
      this.$widget_body.css("margin-bottom", "0px");
      this.widget_margin_top = this.$widget_body.css("margin-top"); //Also save margin top this will come in handy in the "Cummulative_Menu" class!
    }
    catch(exception)
    {
      console.log(exception);
    }
  }

  check_expanded()
  {
    //RETURNS: TRUE OR FALSE.
    /*This method is highly important for use in the main code where one wants to run certain code/create certain objects only if the widget is open or closed. Highly effective in "if statements"!
    Returns true IF: the widget is in the process of opening. Reutrns false IF: the widget is FULLY closed.*/
    if(this.main_code_expanded)
    {
      this.$widget_body.on("transitionend", //Wait for widget transition to end then return false.
        function(event)
        {
          if(event.target.id === this.$widget_body.attr("id"))
          {
            this.main_code_expanded = false;
            return this.main_code_expanded; //TODO: Take a look at return in .on
          }
        }.bind(this)
      );
    }
    else
    {
      this.$widget_body.off("transitionend")
      this.main_code_expanded = true;
      return this.main_code_expanded;
    }
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
      this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height);
      this.expanded = true;
    }
    else //If the this.expanded is true (widget is opening) start closing the widget.
    {
      this.collapse_widget_contents(fixed_collapsed_height_bool, fixed_collapsed_height);
      this.expanded = false;
    }
  }

  manage_collapse_transitionend($object_to_remove)
  {
    //RETURNS NOTHING.
    //This method takes in a jQuery representing a part of the widget to remove once the collapse transition is completed and removes it. That's right, collapsed HTML is not just hidden but removed all together then readded.
    this.$widget_body.on("transitionend", //On transitionend remoe the object and set this.widget_content_show to false.
      function(event)
      {
        if(event.target.id === this.$widget_body.attr("id"))
        {
          $object_to_remove.remove();
          this.widget_content_show = false;
        }
      }.bind(this)
    );
  }

  expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height)
  {
    //RETURNS: NOTHING.
    /*Very important method for automatically getting the height of an expanded widget and then expanding to that height. NOTE: Takes "fixed_expanded_height_bool" and "fixed_expanded_height" parameters from "manage_widget_state" method
    and will use those accordingly.*/
    this.previous_height = this.expanded_height; //Set the widget's previous_height to its expanded_height so that when the actual expanded_height is now changed the previous_height will actually be the previous height.
    if(fixed_expanded_height_bool === true) //If that fixed_expanded_height_bool is true set the widget's expanded_height to the fixed_expanded_height.TODO: CHECK margin bottom
    {
      this.expanded_height = fixed_expanded_height + parseInt(this.widget_margin_bottom);
    }
    else //If the fixed_expanded_height_bool parameter is false, save the widgets "auto height" to this.expanded_height.
    {
      var current_height = this.$widget_body.height();
      this.expanded_height = this.$widget_body.css("height", "auto").height() + parseInt(this.widget_margin_bottom);
      this.$widget_body.height(current_height);
    }
    var expand_height = this.expanded_height.toString() + this.height_units; //Then, take whatever this.expanded_height came out to be and format it as a string, with units, in order to be used as CSS.
    this.$widget_body.css("height", expand_height);
    if(this.array_of_parents.length > 0) //If the widget is nested within other widgets, expand all of its ancestors. See "expand_parent_widgets" for more.
    {
      this.expand_parent_widgets();
    }
  }

  collapse_widget_contents(fixed_collapsed_height_bool, fixed_collapsed_height)
  {
    //RETURNS: NOTHING.
    /*Very important method for collaspsing widgets to either 0 units or to a specified height if fixed_collapsed_height_bool is true. NOTE: Takes "fixed_expanded_height_bool" and "fixed_expanded_height" parameters from
    "manage_widget_state" method and will use those accordingly.*/
    this.previous_height = this.expanded_height; //Again change the widget's previous_height to its expanded_height because the widget's expanded_height variable is about to change.
    if(fixed_collapsed_height_bool) //If the fixed_collapsed_height_bool parameter is true, set the widget's height to whatever the fixed_collapsed_height is.
    {
      this.expanded_height = fixed_collapsed_height - parseInt(this.widget_margin_bottom);
      fixed_collapsed_height = this.expanded_height.toString() + this.height_units;
      this.$widget_body.css("height", fixed_collapsed_height);
    }
    else //If fixed_collapsed_height_bool parameter is false, collapse the widget to 0 units.
    {
      this.expanded_height = 0;
      this.$widget_body.css("height", "0" + this.units);
    }
    if(this.array_of_parents.length > 0) //As with expanding, if the widget has any ancestor widgets its nested inside of, then expand those as well with the "collapse_parent_widgets" method.
    {
      this.collapse_parent_widgets();
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
      this.array_of_parents[i].expand_widget_contents(true, expand_height); //Use the calculated expand_height above and use it as a fixed_expanded_height to expand to!

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
      this.array_of_parents[i].collapse_widget_contents(true, collapse_height); //Use the calculated expand_height above and use it as a fixed_collapsed_height to collapse to!

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
1) 
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
class Menu extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content_array, array_of_parent_menus)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, menu_body_id, menu_content_array, array_of_parent_menus);
    this.$menu_expand_handle = $('#' + menu_expand_handle_id);
    this.$menu_collapse_handle;
    this.children_exist = false;
    this.expand_handle_active = true;
  }

  update_expand_handle_styles()//TODO: CHECK
  {
    switch(this.expand_handle_active)
    {
      case false:
        this.$menu_expand_handle.one("mouseleave",
          function()
          {
            this.$menu_expand_handle.removeClass("blue-to-green-button");
            this.$menu_expand_handle.addClass("not-allowed");
          }.bind(this)
        );
        break;

      case true:
        this.$menu_expand_handle.removeClass("not-allowed");
        this.$menu_expand_handle.addClass("blue-to-green-button");
    }
  }
}

class Single_Dropdown_Menu extends Menu
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content_array, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content_array, array_of_parents);
    this.$menu_expand_handle.on("click",
      function()
      {
        if(this.expand_handle_active)
        {
          this.expand_handle_active = false;
          this.update_expand_handle_styles();
          this.manage_widget_state(false, 0, false, 0);
          this.$menu_collapse_handle = $('#' + menu_collapse_handle_id);
          this.$menu_collapse_handle.on("click",
            function()
            {
              if(!this.expand_handle_active)
              {
                this.expand_handle_active = true;
                this.update_expand_handle_styles();
                this.manage_widget_state(false, 0, false, 0);
                this.manage_collapse_transitionend(this.$widget_body.children());
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }
}

class Cummulative_Menu extends Menu
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, item_box_transition_properties_array, menu_expand_handle_id, collapse_handle_id, menu_body_id, item_box_class, item_box_cancel_class, item_box_content, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, menu_expand_handle_id, collapse_handle_id, menu_body_id, item_box_content, array_of_parents);
    this.item_box_transition_properties_array = item_box_transition_properties_array;
    this.current_number_of_item_boxes = 0;
    this.item_box_class = item_box_class;
    this.item_box_cancel_class = item_box_cancel_class;
    this.item_box_content = item_box_content;
    this.item_box_array = [];
    this.$menu_expand_handle.on("click",
      function()
      {
        this.manage_widget_state(false, 0, false, 0);
      }.bind(this)
    );
  }

  manage_widget_state(fixed_collapsed_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height)
  {
    this.$widget_body.append(this.item_box_content);
    this.item_box_array.push(new Item_Box(
        this.item_box_transition_properties_array[0], this.item_box_transition_properties_array[1], this.item_box_transition_properties_array[2], this.item_box_transition_properties_array[3],
        this.item_box_transition_properties_array[4], this, $('.' + this.item_box_class).eq(this.current_number_of_item_boxes), this.item_box_content,
        $('.' + this.item_box_cancel_class).eq(this.current_number_of_item_boxes), this.current_number_of_item_boxes, [this].concat(this.array_of_parents)));
    this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height);
    this.current_number_of_item_boxes++;
  }

  renumber_item_box_ids(starting_index)
  {
    //console.log(starting_index);
    for(let i = starting_index; i < this.item_box_array.length; i++)
    {
      this.item_box_array[i].$widget_body.attr("id", this.item_box_array[i].dummy_id_stem + i.toString());
      this.item_box_array[i].item_box_number = i;
    }
  }

  get_item_box_number(item_box_id)
  {
    var number_string = "0123456789";
    var i = item_box_id.length - 1;
    while(i > 0)
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

class Item_Box extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, menu_object, $item_box, item_box_content, $item_box_cancel_button, item_box_number, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, "", item_box_content, array_of_parents);
    this.menu_object = menu_object;
    this.item_box_number = item_box_number;
    this.dummy_id_stem = "item-box-";
    $item_box.attr("id", this.dummy_id_stem + this.item_box_number.toString());
    this.setup_widget_body($item_box.attr("id"), transition_duration, duration_units, transition_delay, delay_units);
    this.set_height_including_margin_top();
    this.$item_box_cancel_button = $item_box_cancel_button;
    this.$item_box_cancel_button.on("click",
      function()
      {
        this.collapse_widget_contents(false, 0);
        this.collapse_parent_widgets();
        this.menu_object.item_box_array.splice(this.item_box_number, 1);
        this.menu_object.renumber_item_box_ids(this.item_box_number);
        this.menu_object.current_number_of_item_boxes--;
        this.manage_collapse_transitionend(this.$widget_body);
      }.bind(this)
    );
  }

  set_height_including_margin_top()
  {
    this.$widget_body.css("margin-top", "0px");
    var $item_box_children = this.$widget_body.children();
    $item_box_children.css("position", "relative").css("top", this.widget_margin_top);
    this.expanded_height = this.$widget_body.height() + parseInt(this.widget_margin_top) + parseInt(this.widget_margin_bottom);
    this.$widget_body.css("height", this.expanded_height.toString() + "px");
  }
}

class Folder extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expand_and_collapse_handle_id, folder_body_id, folder_content_array, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, folder_body_id, folder_content_array, array_of_parents);
    this.$folder_expand_collapse_handle = $('#' + expand_and_collapse_handle_id).find(".folder-arrow");//TODO
    this.$folder_arrow_icon = this.$folder_expand_collapse_handle.find(".expand-arrow");//TODO
    this.$folder_expand_collapse_handle.on("click",
      function()
      {
        if(this.expanded)
        {
          this.manage_collapse_transitionend(this.$widget_body.children());
        }
        this.manage_widget_state(false, 0, false, 0);
        this.change_arrow_states();
        console.log(this);
      }.bind(this)
    );
  }

  change_arrow_states()
  {
    if(this.expanded)
    {
      this.$folder_arrow_icon.removeClass("compressed");
      this.$folder_arrow_icon.addClass("expanded");
    }
    else
    {
      this.$folder_arrow_icon.removeClass("expanded");
      this.$folder_arrow_icon.addClass("compressed");
    }
  }
}







class Clickbox extends Dropdown_Widget
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, $clickbox, expansion_content, expansion_content_class, clickbox_number, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, "", expansion_content, array_of_parents);
    this.main_code_expanded_bool = false;
    this.$clickbox = $clickbox;
    this.clickbox_number = clickbox_number;
    this.clickbox_id_stem = "clickbox-";
    this.$clickbox.attr("id", this.clickbox_id_stem + this.clickbox_number.toString());
    this.setup_widget_body(transition_duration, duration_units, transition_delay, delay_units, this.$clickbox.attr("id"));
    var set_const_height = this.$widget_body.height();
    this.expanded_height = set_const_height;
    this.$widget_body.css("height", set_const_height.toString() + "px");
    this.fixed_collapsed_height = parseInt(this.$widget_body.css("height"));
    this.expansion_content_class = expansion_content_class;
    this.$expansion_content;
    this.$widget_body.on("click",
      function()
      {
        if(this.expanded)
        {
          this.$expansion_content = this.$widget_body.find("." + this.expansion_content_class);
          this.manage_collapse_transitionend(this.$expansion_content);
        }
        this.manage_widget_state(true, this.fixed_collapsed_height, false, 0);
      }.bind(this)
    );
  }

  static get_clickbox_number(clickbox_id)
  {
    var number_string = "0123456789";
    var i = clickbox_id.length - 1;
    while(i > 0)
    {
      if(number_string.indexOf(clickbox_id[i]) !== -1)
      {
        i--;
      }
      else
      {
        i++;
        break;
      }
    }
    return parseInt(clickbox_id.substring(i, clickbox_id.length));
  }


  renumber_item_box_ids(starting_index, number_of_boxes)
  {
    //console.log(starting_index);
    for(let i = starting_index; i < number_of_boxes; i++)
    {
      this.$clickbox.attr("id", this.clickbox_id_stem + i.toString());
      this.clickbox_number = i;
    }
  }
}
