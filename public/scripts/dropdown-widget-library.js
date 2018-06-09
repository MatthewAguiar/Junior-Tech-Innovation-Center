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
class Dropdown_Widget
{
  constructor(widget_body_id, widget_content, array_of_parents)
  {
    this.setup_widget_body(widget_body_id);
    this.widget_content = widget_content;
    this.array_of_parents = array_of_parents;
    this.widget_content_show = false;
    this.expanded = false;
    this.previous_height = 0;
    this.expanded_height = 0;
  }

  setup_widget_body(widget_body_id)
  {
    try
    {
      this.$widget_body = $('#' + widget_body_id);
      this.widget_margin_bottom = this.$widget_body.css("margin-bottom");
      this.widget_margin_top = this.$widget_body.css("margin-top");
      this.$widget_body.css("margin-bottom", "0px");
    }
    catch(exception)
    {

    }
  }

  expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, units, margin_bottom)
  {
    this.previous_height = this.expanded_height;
    if(fixed_expanded_height_bool === true)
    {
      this.expanded_height = fixed_expanded_height + parseInt(margin_bottom);
    }
    else
    {
      var current_height = this.$widget_body.height();
      this.expanded_height = this.$widget_body.css("height", "auto").height() + parseInt(margin_bottom);
      this.$widget_body.height(current_height);
    }
    var expand_height = this.expanded_height.toString() + units;
    this.$widget_body.css("height", expand_height);
    //console.log(current_height);
    //console.log(expanded_height);
    //console.log(typeof expanded_height);
  }

  collapse_widget_contents(fixed_collapse_height_bool, fixed_collapsed_height, units, margin_bottom)
  {
    this.previous_height = this.expanded_height;
    if(fixed_collapse_height_bool)
    {
      this.expanded_height = fixed_collapsed_height - parseInt(margin_bottom);
      fixed_collapsed_height = this.expanded_height.toString() + units;
      this.$widget_body.css("height", fixed_collapsed_height);
    }
    else
    {
      this.expanded_height = 0;
      this.$widget_body.css("height", "0px");
    }
  }

  expand_parent_widgets()
  {
    /*console.log(this.$widget_body.attr("id") + "'s previous height was " + this.previous_height.toString() + " pixels.");
    console.log(this.$widget_body.attr("id") + "'s height now is " + this.expanded_height.toString() + " pixels.");*/
    for(let i = 0; i < this.array_of_parents.length; i++)
    {
      let expand_height = this.array_of_parents[i].expanded_height + (this.expanded_height - this.previous_height);
      this.array_of_parents[i].expand_widget_contents(true, expand_height, "px", 0);
      /*console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height previously was " + this.array_of_parents[i].previous_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height is now " + this.array_of_parents[i].expanded_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + " was increased in height by: " + (this.expanded_height - this.previous_height).toString() + " pixels.");*/
    }
  }

  collapse_parent_widgets()
  {
    /*console.log(this.$widget_body.attr("id") + "'s previous height was " + this.previous_height.toString() + " pixels.");
    console.log(this.$widget_body.attr("id") + "'s height now is " + this.expanded_height.toString() + " pixels.");*/
    for(let i = 0; i < this.array_of_parents.length; i++)
    {
      let collapse_height = this.array_of_parents[i].expanded_height - (this.previous_height - this.expanded_height);
      this.array_of_parents[i].collapse_widget_contents(true, collapse_height, "px", 0);
      /*console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height previously was " + this.array_of_parents[i].previous_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + "'s height is now " + this.array_of_parents[i].expanded_height.toString() + " pixels.");
      console.log(this.array_of_parents[i].$widget_body.attr("id") + " was decreased in height by: " + (this.previous_height - this.expanded_height).toString() + " pixels.");*/
    }
  }
}

class Menu extends Dropdown_Widget
{
  constructor(menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content, array_of_parent_menus)
  {
    super(menu_body_id, menu_content, array_of_parent_menus);
    this.$menu_expand_handle = $('#' + menu_expand_handle_id);
    this.$menu_collapse_handle;
    this.children_exist = false;
    this.expand_handle_active = true;
  }

  update_expand_handle_styles()
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

      default :
        this.$menu_expand_handle.removeClass("not-allowed");
        this.$menu_expand_handle.addClass("blue-to-green-button");
    }
  }
}

class Single_Dropdown_Menu extends Menu
{
  constructor(menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content, array_of_parent_menus)
  {
    super(menu_expand_handle_id, menu_collapse_handle_id, menu_body_id, menu_content, array_of_parent_menus);
    this.$menu_expand_handle.on("click",
      function()
      {
        if(this.expand_handle_active)
        {
          this.expand_handle_active = false;
          this.update_expand_handle_styles();
          this.manage_widget_state(false, 0, false, 0, "px");
          this.$menu_collapse_handle = $('#' + menu_collapse_handle_id);
          this.$menu_collapse_handle.on("click",
            function()
            {
              if(!this.expand_handle_active)
              {
                this.expand_handle_active = true;
                this.update_expand_handle_styles();
                this.manage_widget_state(false, 0, false, 0, "px");
                this.$widget_body.on("transitionend",
                  function(event)
                  {
                    //console.log(event.target.id);
                    if(event.target.id === this.$widget_body.attr("id"))
                    {
                      this.$widget_body.children().remove();
                      this.widget_content_show = false;
                    }
                  }.bind(this)
                );
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  manage_widget_state(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units)
  {
    if(!this.widget_content_show && !this.expanded)
    {
      this.$widget_body.append(this.widget_content);
      this.widget_content_show = true;
    }
    if(!this.expanded)
    {
      this.$widget_body.off("transitionend");
      this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, units, this.widget_margin_bottom);
      if(this.array_of_parents.length > 0)
      {
        this.expand_parent_widgets();
      }
      this.expanded = true;
    }
    else
    {
      this.collapse_widget_contents(fixed_collapse_height_bool, fixed_collapsed_height, units, this.widget_margin_bottom);
      if(this.array_of_parents.length > 0)
      {
        this.collapse_parent_widgets();
      }
      this.expanded = false;
    }
  }
}

class Cummulative_Menu extends Menu
{
  constructor(menu_expand_handle_id, collapse_handle_id, menu_body_id, item_box_class, item_box_cancel_class, item_box_content, array_of_parent_menus)
  {
    super(menu_expand_handle_id, collapse_handle_id, menu_body_id, item_box_content, array_of_parent_menus);
    this.current_number_of_item_boxes = 0;
    this.item_box_class = item_box_class;
    this.item_box_cancel_class = item_box_cancel_class;
    this.item_box_content = this.widget_content;
    this.item_box_array = [];
    this.$menu_expand_handle.on("click",
      function()
      {
        this.manage_widget_state(false, 0, false, 0, "px");
      }.bind(this)
    );
  }

  manage_widget_state(fixed_collapse_height_bool, fixed_collapsed_height, fixed_expanded_height_bool, fixed_expanded_height, units)
  {
    this.$widget_body.append(this.item_box_content);
    //console.log(this);
    this.item_box_array.push(new Item_Box(this, $('.' + this.item_box_class).eq(this.current_number_of_item_boxes), this.item_box_content, $('.' + this.item_box_cancel_class).eq(this.current_number_of_item_boxes), this.current_number_of_item_boxes, [this].concat(this.array_of_parents)));
    this.expand_widget_contents(fixed_expanded_height_bool, fixed_expanded_height, units, this.widget_margin_bottom);
    if(this.array_of_parents.length > 0)
    {
      this.expand_parent_widgets();
    }
    this.current_number_of_item_boxes++;
  }

  renumber_item_box_ids(starting_index)
  {
    //console.log(starting_index);
    for(let i = starting_index; i < this.item_box_array.length; i++)
    {
      this.item_box_array[i].$item_box.attr("id", this.item_box_array[i].dummy_id_stem + i.toString());
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
  constructor(menu_object, $item_box, item_box_content, $item_box_cancel_button, item_box_number, parent_widgets)
  {
    super("", item_box_content, parent_widgets);
    this.menu_object = menu_object;
    this.item_box_number = item_box_number;
    this.dummy_id_stem = "item-box-";
    this.$item_box = $item_box;
    this.$item_box.attr("id", this.dummy_id_stem + this.item_box_number.toString());
    this.setup_widget_body(this.$item_box.attr("id"));
    this.set_height_including_margin_top();
    this.$item_box_cancel_button = $item_box_cancel_button;
    this.$item_box_cancel_button.on("click",
      function()
      {
        this.collapse_widget_contents(false, 0, "px", this.widget_margin_bottom);
        this.collapse_parent_widgets();
        this.menu_object.item_box_array.splice(this.item_box_number, 1);
        this.menu_object.renumber_item_box_ids(this.item_box_number);
        this.menu_object.current_number_of_item_boxes--;
        this.$item_box.on("transitionend",
          function(event)
          {
            if(event.target.id === this.$item_box.attr("id"))
            {
              this.$item_box.remove();
            }
          }.bind(this)
        );
      }.bind(this)
    );
  }

  set_height_including_margin_top()
  {
    this.$item_box.css("margin-top", "0px");
    var $item_box_children = this.$item_box.children();
    $item_box_children.css("position", "relative").css("top", this.widget_margin_top);
    this.expanded_height = this.$item_box.height() + parseInt(this.widget_margin_top) + parseInt(this.widget_margin_bottom);
    this.$item_box.css("height", this.expanded_height.toString() + "px");
  }
}


/*
class Folder extends Dropdown_Widget
{
  constructor(folder_expand_handle_id, folder_collapse_handle_id, folder_body_id, folder_content_id, arrow_id)
  {
    super(folder_expand_handle_id, folder_collapse_handle_id, folder_body_id, folder_content_id);
    this.arrow = $folder_handlebar.find($(arrow_id));
  }

  transition_folder_dropdown_arrow()
  {
    if(!this.expanded)
    {
      this.arrow.removeClass("compressed");
      this.arrow.addClass("expanded");
    }
    else
    {
      this.arrow.removeClass("expanded");
      this.arrow.addClass("compressed");
    }
  }
}*/

/*
class Menu_Button
{
  constructor(button_id)
  {
    this.button = document.getElementById(button_id);
    this.button_jQuery_selector = "#" + button_id;
    this.active = true;
  }

  update_button_status()
  {
    if(this.active === false)
    {
      $(this.button_jQuery_selector).removeClass("blue-to-green-button");
      $(this.button_jQuery_selector).addClass("not-allowed");
    }
  }
}*/
