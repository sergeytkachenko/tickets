<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

class OrdersMigration_100 extends Migration
{

    public function up()
    {
        $this->morphTable(
            'orders',
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
                    'events_seat_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'id'
                    )
                ),
                new Column(
                    'user_name',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'notNull' => true,
                        'size' => 255,
                        'after' => 'events_seat_id'
                    )
                ),
                new Column(
                    'user_email',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'notNull' => true,
                        'size' => 255,
                        'after' => 'user_name'
                    )
                ),
                new Column(
                    'user_phone',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'size' => 255,
                        'after' => 'user_email'
                    )
                ),
                new Column(
                    'date',
                    array(
                        'type' => Column::TYPE_DATETIME,
                        'notNull' => true,
                        'size' => 1,
                        'after' => 'user_phone'
                    )
                ),
                new Column(
                    'success',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'size' => 1,
                        'after' => 'date'
                    )
                ),
                new Column(
                    'uid',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'size' => 255,
                        'after' => 'success'
                    )
                )
            ),
            'indexes' => array(
                new Index('PRIMARY', array('id')),
                new Index('uid', array('uid')),
                new Index('events_seat_id', array('events_seat_id'))
            ),
            'references' => array(
                new Reference('orders_ibfk_1', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'event_seats',
                    'columns' => array('events_seat_id'),
                    'referencedColumns' => array('id')
                ))
            ),
            'options' => array(
                'TABLE_TYPE' => 'BASE TABLE',
                'AUTO_INCREMENT' => '26',
                'ENGINE' => 'InnoDB',
                'TABLE_COLLATION' => 'utf8_general_ci'
            )
        )
        );
    }
}
