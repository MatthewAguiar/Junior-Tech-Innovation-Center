/*
Jr. Tech Innovation Center (JTIC): JTIC (SPECIFIC) DROPDOWN WIDGET LIBRARY
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
class JTIC_Single_Dropdown_Menu extends Single_Dropdown_Menu
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_expand_handle_id_or_object, menu_collapse_handle_id, menu_body_id_or_object, menu_content_array, array_of_parent_menus)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, menu_expand_handle_id_or_object, menu_collapse_handle_id, menu_body_id_or_object, menu_content_array, array_of_parent_menus);
    this.$menu_expand_handle.on("click", this.update_expand_handle_styles.bind(this));
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

      case true:
        this.$menu_expand_handle.removeClass("not-allowed");
        this.$menu_expand_handle.addClass("blue-to-green-button");
    }
    this.$menu_collapse_handle.on("click", this.update_expand_handle_styles.bind(this));
  }
}

class JTIC_Cummulative_Menu extends Cummulative_Menu
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, item_box_transition_properties_array, menu_expand_handle_id_or_object, menu_body_id_or_object, item_box_class, item_box_cancel_class, item_box_content, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, item_box_transition_properties_array, menu_expand_handle_id_or_object, menu_body_id_or_object, item_box_class, item_box_cancel_class, item_box_content, array_of_parents);
  }
}

class JTIC_Folder extends Folder
{
  constructor(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, expand_and_collapse_handle_id_or_object, folder_body_id_or_object, folder_content_array, array_of_parents)
  {
    super(transition_duration, duration_units, transition_delay, delay_units, height_units, expanded_spacing, expand_and_collapse_handle_id_or_object, folder_body_id_or_object, folder_content_array, array_of_parents);
    this.$folder_arrow_icon = this.$folder_expand_collapse_handle.find(".expand-arrow");
    this.$folder_expand_collapse_handle.on("click", this.change_arrow_states.bind(this));
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

class JTIC_Clickbox_Collection extends Clickbox_Collection
{
  constructor(widget_array)
  {
    super(widget_array);
  }
}
