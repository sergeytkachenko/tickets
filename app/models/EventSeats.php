<?php

class EventSeats extends \Phalcon\Mvc\Model
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
    public $seat_id;

    /**
     *
     * @var integer
     */
    public $event_id;

    /**
     *
     * @var string
     */
    public $last_reservation;

    /**
     *
     * @var string
     */
    public $last_reservation_session_id;

    /**
     *
     * @var integer
     */
    public $is_purchased;


    public function initialize()
    {
        $this->belongsTo('event_id', 'Events', 'id', array('alias' => 'Events'));
        $this->belongsTo('seat_id', 'Seats', 'id', array('alias' => 'Seats'));
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return EventSeats[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return EventSeats
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

    /**
     * Возвращает цену на указаное мероприятие, по цвету места
     * @return EventPrices
     * @throws Exception
     */
    public function getPrice () {
        $price = EventPrices::findFirst(array(
            'representation_id = :representationId: AND seat_color_id = :seatColorId:',
            'bind' => array(
                'representationId' => $this->Events->Representation->id,
                'seatColorId' => $this->Seats->seat_color_id
            )
        ));
        if(!$price) {
            throw new Exception('price for seat not found');
        }
        return $price->price;
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'event_seats';
    }

}
