<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

class EventPricesMigration_104 extends Migration
{

    public function up()
    {
        $this->morphTable(
            'event_prices',
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
                    'price',
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
                        'after' => 'price'
                    )
                ),
                new Column(
                    'seat_color_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'event_id'
                    )
                )
            ),
            'indexes' => array(
                new Index('PRIMARY', array('id')),
                new Index('event_id', array('event_id')),
                new Index('seat_color_id', array('seat_color_id'))
            ),
            'references' => array(
                new Reference('event_prices_ibfk_1', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'events',
                    'columns' => array('event_id'),
                    'referencedColumns' => array('id')
                )),
                new Reference('event_prices_ibfk_2', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'seat_colors',
                    'columns' => array('seat_color_id'),
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
