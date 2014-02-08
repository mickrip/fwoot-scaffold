<?php
namespace Controller\Example;

class Root extends \Fw\Controller
{

	function home()
	{
		$this->twig("example/example.twig");
	}


}
