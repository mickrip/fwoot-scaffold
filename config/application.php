<?php

if (strpos($_SERVER["SERVER_ADDR"], "192.168") !== false) {
    $is_dev = true;
} else {
    $is_dev = false;
}

if ($is_dev) { // How do you determine if this is dev?
    return array(
        "base" => "/fwoot/", // surround by slashes
        "cdn" => "http://192.168.1.60/fwoot", // no slash at end
        "default_timezone" => "GMT",
        "env" => \Fw\Config::DEVELOPMENT,
        "modules" => array(
            "example"
        )
    );
} else {
    return array(
        "base" => "/fwoot/", // surround by slashes
        "cdn" => "http://cdn.cdn.whatever/", // no slash at end
        "default_timezone" => "GMT",
        "env" => \Fw\Config::PRODUCTION,
        "modules" => array(
            "example"
        )
    );
}
