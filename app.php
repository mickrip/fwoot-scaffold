<?php
/*
 * Application Boilerplate
 */


use \Fw\Controller as Controller;
use \Fw\Router as Router;

// Default Action/Controller Routes
Router::map(
      "/",
	      function () {
		      if (!Controller::load("root", "home")) _404();
	      }
);

Router::map(
      "[:controller]?/[:action]",
	      function ($params) {
		      if (!$controller = $params->controller) $controller = "root";
		      if (!$action = $params->action) $action = "root";
		      if (!Controller::load($controller, $action)) _404("Default Controller/Action could find the class");
	      }

);

if (!Router::run()) {
	_404();
}

// 404
function _404($reason = '')
{
	Controller::load("root", "_404", array("reason" => $reason));
	die();
}