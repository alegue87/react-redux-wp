<?php 

if ( !defined('ABSPATH') ){
  exit;
}

if( !class_exists('Add_categories_to_post') ){
  class Add_categories_to_post{
    /* Alla 'category' vengono aggiunti altri campi
       come l'id della taxonomia ed il nome */
    function __constructor(){}

    function init(){
      add_action('rest_api_init', function(){
        register_rest_field('post', 'categories', array(
          'get_callback' => function($post){
            $cats = get_the_category($post->ID);
            $data = array();
            if($cats){
              foreach($cats as $cat){
                array_push($data, array(
                  'name' => $cat->name,
                  'id' => $cat->term_id,
                ));
              }
            }
            return $data;
          }
        ));
      });
    }
  }
}