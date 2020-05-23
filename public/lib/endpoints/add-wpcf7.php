<?php
if( !defined('ABSPATH') ){
  exit;
}

if( !class_exists('Add_wpcf7_to_page') ){
  class Add_wpcf7_to_page{
    function __construct(){}

    function init(){
      if(is_admin()) return;
      
      add_action('rest_api_init', function(){
        register_rest_field('page', 'wpcf7', array(
          'get_callback' => function($post){
            $form = wpcf7_get_current_contact_form();
            if($form == null){
              return array();
            }
            $data = array(
              'id' => $form->id,
              'name' => $form->title,
              'form' => $form->get_properties()['form']
            );
            return $data;
          },
          'schema' => array(
            'description'=> 'WPCF7 properties',
            'type' => 'array'
          )));
        }
      );
    }
  }
}

