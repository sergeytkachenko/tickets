<?php

class RecommendedArticle extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $title;

    /**
     *
     * @var string
     */
    public $description;

    /**
     *
     * @var string
     */
    public $img_src;

    /**
     *
     * @var string
     */
    public $meta_keywords;

    /**
     *
     * @var string
     */
    public $meta_description;

    /**
     *
     * @var integer
     */
    public $is_active;

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'title' => 'title', 
            'description' => 'description', 
            'img_src' => 'img_src', 
            'meta_keywords' => 'meta_keywords', 
            'meta_description' => 'meta_description', 
            'is_active' => 'is_active'
        );
    }

}
