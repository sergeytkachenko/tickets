<?

class Breadcrumbs
{
    /**
     * Keeps all the breadcrumbs
     *
     * @var array
     */
    private $elements = array();

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->reset();
    }

    public function reset()
    {
        $this->elements[] = array(
            'link' => '/',
            'text' => 'Главная',
        );
    }

    /**
     * Adds a new element in the stack
     *
     * @param string $caption
     * @param string $link
     * @param boolean $active
     */
    public function add($caption, $link, $active = false)
    {
        $element = array(
            'link' => '/' . $link,
            'text' => $caption,
            'active' => $active? "active" : ""
        );
        $this->elements[] = $element;
        //array_unshift($this->elements, $element);
    }

    /**
     * Returns all the elements back to the caller
     *
     * @return string
     */
    public function generate()
    {
        return $this->elements;
    }
}