<?php
namespace Controller;

class Root extends \Fw\Controller
{

	function home()
	{
		$this->twig("home.twig");
	}

	function _404()
	{
		$this->response->setStatusCode(404);
		$this->twig("404.twig", array("reason" => $this->request->get("reason")));
	}

}
