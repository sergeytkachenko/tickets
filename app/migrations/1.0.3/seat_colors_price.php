<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

class SeatColorsPriceMigration_103 extends Migration
{

    public function up()
    {
        $this->morphTable(
            'seat_colors_price',
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
                    'seat_color_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'id'
                    )
                ),
                new Column(
                    'representation_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'seat_color_id'
                    )
                ),
                new Column(
                    'price',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'notNull' => true,
                        'size' => 11,
                        'after' => 'representation_id'
                    )
                )
            ),
            'indexes' => array(
                new Index('PRIMARY', array('id')),
                new Index('seat_color_id', array('seat_color_id')),
                new Index('representation_id', array('representation_id'))
            ),
            'references' => array(
                new Reference('seat_colors_price_ibfk_1', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'seat_colors',
                    'columns' => array('seat_color_id'),
                    'referencedColumns' => array('id')
                )),
                new Reference('seat_colors_price_ibfk_2', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'representations',
                    'columns' => array('representation_id'),
                    'referencedColumns' => array('id')
                ))
            ),
            'options' => array(
                'TABLE_TYPE' => 'BASE TABLE',
                'AUTO_INCREMENT' => '6',
                'ENGINE' => 'InnoDB',
                'TABLE_COLLATION' => 'utf8_general_ci'
            )
        )
        );
    }
}
