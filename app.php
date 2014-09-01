<?php
/*
 * Application Boilerplate
 */

\Fw\Twig::global_data("base", \Fw\Config::get("base"));

if (\Fw\Config::get("env", "application.php") == \Fw\Config::DEVELOPMENT) {
    \Fw\Twig::global_data("assets", \Fw\Config::get("base") . "/" . "assets/dist");
} else {
    \Fw\Twig::global_data("assets", \Fw\Config::get("base") . "/" . "assets/dist");
}


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