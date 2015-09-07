<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

class EventSeatsMigration_104 extends Migration
{

    public function up()
    {
        $this->morphTable(
            'event_seats',
            array(
            'columns' => array(
                new Column(
                    'id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'autoIncrement' => true,
                        'size' => 11,
                        'first' => true
                    )
                ),
                new Column(
                    'seat_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'id'
                    )
                ),
                new Column(
                    'event_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'seat_id'
                    )
                ),
                new Column(
                    'last_reservation',
                    array(
                        'type' => Column::TYPE_DATETIME,
                        'size' => 1,
                        'after' => 'event_id'
                    )
                ),
                new Column(
                    'last_reservation_session_id',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'size' => 255,
                        'after' => 'last_reservation'
                    )
                ),
                new Column(
                    'is_purchased',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 1,
                        'after' => 'last_reservation_session_id'
                    )
                )
            ),
            'indexes' => array(
                new Index('PRIMARY', array('id')),
                new Index('event_id', array('event_id')),
                new Index('seat_id', array('seat_id'))
            ),
            'references' => array(
                new Reference('event_seats_ibfk_1', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'seats',
                    'columns' => array('seat_id'),
                    'referencedColumns' => array('id')
                )),
                new Reference('event_seats_ibfk_2', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'events',
                    'columns' => array('event_id'),
                    'referencedColumns' => array('id')
                ))
            ),
            'options' => array(
                'TABLE_TYPE' => 'BASE TABLE',
                'AUTO_INCREMENT' => '3',
                'ENGINE' => 'InnoDB',
                'TABLE_COLLATION' => 'utf8_general_ci'
            )
        )
        );
    }
}
