<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Detect plugin. For use on Front End only.
 */
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
 
// check for plugin using plugin name
function is_wpcf7_active(){
  if ( is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ) {
    return true;
  }  
  else{
    return false;
  }
}


if ( ! class_exists( 'Theme_Endpoints' ) ) :

	class Theme_Endpoints {
		function __construct() {
			include_once 'endpoints/add-featured-image.php';
			include_once 'endpoints/add-formatted-date.php';
			include_once 'endpoints/menus.php';
      include_once 'endpoints/pretty-permalinks.php';
      include_once 'endpoints/add-tags.php';
      include_once 'endpoints/add-categories.php';
      if(is_wpcf7_active())
        include_once 'endpoints/add-wpcf7.php';
		}

		function init() {
			$Pretty_Permalinks_Endpoint = new Pretty_Permalinks_Endpoint();
			$Pretty_Permalinks_Endpoint->init();

			$Add_Formatted_Date_Endpoint = new Add_Formatted_Date_Endpoint();
			$Add_Formatted_Date_Endpoint->init();

			$Menus_Endpoint = new Menus_Endpoint();
			$Menus_Endpoint->init();

			$Add_Featured_Image_Endpoint = new Add_Featured_Image_Endpoint();
      $Add_Featured_Image_Endpoint->init();
      
      (new Add_tags_to_post())->init();
      (new Add_categories_to_post())->init();
      if(is_wpcf7_active())
        (new Add_wpcf7_to_page())->init();
		}
	}

endif;