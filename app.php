<?php
/*
 * Application Boilerplate
 */

\Fw\Twig::global_data("base", \Fw\Config::get("base"));
\Fw\Twig::global_data("assets", \Fw\Config::get("base") . "assets/build");
\Fw\Twig::global_data("server_ip", $_SERVER["SERVER_ADDR"]);
\Fw\Twig::global_data("is_dev", ((\Fw\Config::get("env", "application.php") == \Fw\Config::DEVELOPMENT) ? true : false));

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