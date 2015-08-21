<?php

class SeatColorsPrice extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var integer
     */
    public $seat_color_id;

    /**
     *
     * @var integer
     */
    public $representation_id;

    /**
     *
     * @var integer
     */
    public $price;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('seat_color_id', 'SeatColors', 'id', array('alias' => 'SeatColors'));
        $this->belongsTo('representation_id', 'Representations', 'id', array('alias' => 'Representations'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'seat_colors_price';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return SeatColorsPrice[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return SeatColorsPrice
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
