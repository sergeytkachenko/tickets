<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

class SeatsMigration_105 extends Migration
{

    public function up()
    {
        $this->morphTable(
            'seats',
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
                    'alias',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'size' => 25,
                        'after' => 'id'
                    )
                ),
                new Column(
                    'title',
                    array(
                        'type' => Column::TYPE_VARCHAR,
                        'notNull' => true,
                        'size' => 255,
                        'after' => 'alias'
                    )
                ),
                new Column(
                    'seat_color_id',
                    array(
                        'type' => Column::TYPE_INTEGER,
                        'size' => 11,
                        'after' => 'title'
                    )
                )
            ),
            'indexes' => array(
                new Index('PRIMARY', array('id')),
                new Index('seat_color_id', array('seat_color_id'))
            ),
            'references' => array(
                new Reference('seats_ibfk_1', array(
                    'referencedSchema' => 'tickets',
                    'referencedTable' => 'seat_colors',
                    'columns' => array('seat_color_id'),
                    'referencedColumns' => array('id')
                ))
            ),
            'options' => array(
                'TABLE_TYPE' => 'BASE TABLE',
                'AUTO_INCREMENT' => '1801',
                'ENGINE' => 'InnoDB',
                'TABLE_COLLATION' => 'utf8_general_ci'
            )
        )
        );
    }
}
