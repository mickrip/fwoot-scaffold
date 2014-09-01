<?php

namespace Router;

class Index extends \Fw\Fwouter
{
    var $routes = array(
        "/" => "index",
    );

    function get_index()
    {
        \Fw\View::twig(
            "home.twig"
        );
    }


}