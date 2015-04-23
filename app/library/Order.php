<?

abstract class Order {
    const TYPE_DEFAULT = 1;
    static function getOrderServiceItem ($orderType) {
        switch($orderType) {
            case 1:
                return "title ASC";
            case 2:
                return "title DESC";
            case 3:
                return "price ASC";
            case 4:
                return "price DESC";
            case 5:
                return "date_post ASC";
            case 6:
                return "is_vip=1 DESC, date_post DESC";
        }

        throw new Exception("wrong type order column");
    }
}