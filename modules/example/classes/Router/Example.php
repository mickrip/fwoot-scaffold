<?php

namespace Router;

class Example extends \Fw\Fwouter
{
    var $routes = array(
        "/" => "index",
    );

    function get_index()
    {
        echo "Winning";
        echo "Winning";
        die();

        \Fw\View::twig(
            "home.twig"
        );
    }


}