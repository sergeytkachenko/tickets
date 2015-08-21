<?

class DateFormat {
    public static function displayWhen($dateString) {
        $date = new \DateTime($dateString);
        return $date->format('d.m.Y в H:i');
    }

    public static function getDay ($datetime) {
        $date = date_create($datetime);
        return strftime("%d", $date->format('U'));
    }

    public static function getDayName ($datetime) {
        $date = date_create($datetime);
        return strftime("%A", $date->format('U'));
    }

    public static function getMonthName ($datetime) {
        $date = date_create($datetime);
        return strftime("%B", $date->format('U'));
    }

    public static function getHours ($datetime) {
        $date = date_create($datetime);
        return strftime("%H", $date->format('U'));
    }

    public static function getMinutes ($datetime) {
        $date = date_create($datetime);
        return strftime("%M", $date->format('U'));
    }
}