<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'Theme_Enqueue' ) ) :

  if ( ! function_exists( 'get_plugins' ) ) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
  }


  define('ACE', 'Simple Code Block');
  define('CONTACT_FORM_7', 'Contact Form 7');

	class Theme_Enqueue {
    private $version = null;//'20171210';
    
    static private $plugins_supported = [
      CONTACT_FORM_7, // 'Contact Form 7', 
      ACE // Ace editor 
    ];

		function __construct() {
			// use this for developments
			$this->version = date('U');
    }
    
    function plugins_list(){
      // All plugins list
      $plugins = get_plugins();
      $list = array();
      foreach($plugins as $plugin){
        array_push($list, $plugin['Name']);  
      }
      return $list;
    }
    function plugin_installed($name){
      if(in_array($name, $this->plugins_list())) return 1;
      else return 0;
    }

		function init() {
      add_action( 'wp_enqueue_scripts', [ $this, 'theme' ], 20 );
		}

		function theme() {
			wp_enqueue_script( 'rockymountains-theme', get_template_directory_uri() . '/index.js',  null, $this->version, false );
			wp_localize_script( 'rockymountains-theme', 'RT_API', array(
				'root'            => esc_url_raw( rest_url() ),
				'nonce'           => wp_create_nonce( 'wp_rest' ),
				'siteName'        => get_bloginfo( 'name' ),
				'baseUrl'         => get_bloginfo( 'url' ),
				'siteDescription' => get_bloginfo( 'description' ),
				'categories'      => $this->get_categories_with_links(),
        'current_user'    => wp_get_current_user()
        //'plugin_ace'      => $this->plugin_installed(ACE),
        //'plugin_cf7'      => $this->plugin_installed(CONTACT_FORM_7)        
			) );
      wp_deregister_style('dashicons');
      wp_deregister_style('admin-bar');
      wp_deregister_style('wp-block-library');
      if($this->plugin_installed(CONTACT_FORM_7))
        wp_deregister_style('contact-form-7');
      if($this->plugin_installed(ACE)){
        wp_deregister_script('simple-code-block-gutenberg-frontend-ace');
        wp_deregister_style('simple-code-block-gutenberg'); // non va..
      }
      wp_deregister_script('wp-emoji'); // neanche
        
		}

		function get_categories_with_links() {
			$categories = get_categories( [ 'hide_empty' => 0 ] );
			foreach ( $categories as $i => $category ) {
				$categories[ $i ]->link = get_category_link( $category->term_id );
			}

			return $categories;
		}
	}

endif;
