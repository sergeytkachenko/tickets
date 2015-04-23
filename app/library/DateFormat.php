<?

class DateFormat {
    public static function displayWhen($dateString) {
        $date = new \DateTime($dateString);
        return $date->format('d.m.Y в H:i');
    }
}