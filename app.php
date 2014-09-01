<?php
/*
 * Application Boilerplate
 */

\Fw\Twig::global_data("base", \Fw\Config::get("base"));

\Fw\Fwouter::init(
    array("base" => \Fw\Config::get("base"))
);

if (\Fw\Fwouter::$error) {
    _404(\Fw\Fwouter::$error);
}

// 404
function _404($reason = '')
{
    \Fw\View::twig(
        "404.twig", array("reason" => $reason)
    );
}