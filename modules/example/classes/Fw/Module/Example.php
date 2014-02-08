<?php
namespace Fw\Module;

class Example extends \Fw\Module
{

	function __construct()
	{
		$this->config = \Fw\Config::load("example.php");
	}


	function paths()
	{
		\Fw\Find::add_path_to("views", \Fw\Config::get("apppath") . "modules/example/views");
	}

	function routes()
	{
		\Fw\Router::map(
		          "example",
			          function () {
				          \Fw\Controller::load("Example\\Root", "home");
			          }

		);
	}
}