<?php
if (isset($_SERVER["is_dev"])) { // How do you determine if this is dev?
	return array(
		"base" => "/dir_goes_here/", // surround by slashes
		"cdn" => "http://192.168.1.48/ournotes", // no slash at end
		"default_timezone" => "GMT",
		"env" => \Fw\Config::DEVELOPMENT,
		"modules" => array(
			"example"
		)
	);
} else {
	return array(
		"base" => "/ournotes/", // surround by slashes
		"cdn" => "http://cdn.cdn.whatever/", // no slash at end
		"default_timezone" => "GMT",
		"env" => \Fw\Config::PRODUCTION,
		"modules" => array(
			"example"
		)
	);
}
