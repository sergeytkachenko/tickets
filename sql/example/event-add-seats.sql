/**
  Привязывает все места к событию
  {{цена}} - цена билетов
  {{id из таблицы events}} - id ранее созданого события
**/
INSERT INTO event_seats
    SELECT
      null as id,
      s.id as seat_id,
      {{цена}} as price,
      {{id из таблицы events}} as event_id,
      null as last_reservation,
      null as last_reservation_session_id,
      0 as is_purchased
    FROM seats;
