<?php
// Composer Autoload
include("vendor/autoload.php");

// Start Fw
\Fw\Framework::init();

// Conveniences
use \Fw\Config as Config;
use Tracy\Debugger;

// Set Environment (convenience)
Config::set("env", Config::get("env", "application.php"));

// Switch on Debug Mode
if (Config::get("env", "application.php") == Config::DEVELOPMENT) {
	Debugger::enable(Debugger::DEVELOPMENT);
	Debugger::$strictMode = true;
}

// Config
date_default_timezone_set(Config::get("default_timezone", "application.php"));
Config::set("base", Config::get("base", "application.php"));
Config::set("cdn", Config::get("cdn", "application.php"));

// Modules
foreach (Config::get("modules", "application.php") as $module_name) {
	\Fw\Module::load($module_name);
}

// Runs all begin functions in all declared modules
\Fw\Module::run_begin();

// Runs all routing functions in all declared modules
\Fw\Module::run_routes();

// Runs all paths functions in all declared modules
\Fw\Module::run_paths();

// Run Application Bootstrap
include("app.php");

// Runs all end functions in all declared modules
\Fw\Module::run_end();

