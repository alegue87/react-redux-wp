<?php
if( !defined('ABSPATH') ){
  exit;
}

if( !class_exists('Add_tags_to_post') ){
  class Add_tags_to_post{
    /*
      I tags sono già presenti nel 'post' ma vengono
      inseriti solo gli id: qui vengono aggiunti anche
      altri valori.
    */
    function __construct(){}

    function init(){
      if(is_admin()) return;
      
      add_action('rest_api_init', function(){
        register_rest_field('post', 'tags', array(
          'get_callback' => function($post){
            $tags = get_the_tags($post->ID);
            $data = array();
            if($tags){
              foreach($tags as $tag){
                array_push($data, array(
                  'id' => $tag->term_id,
                  //'link' => get_tag_link($tag->term_id),
                  'name' => $tag->name,
                  'slug' => $tag->slug
                ));
              }
            }
            return $data;
          },
          'schema' => array(
            'description'=> 'Post tags',
            'type' => 'array'
          )));
        }
      );
    }
  }
}

