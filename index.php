<?php

session_start();

include './app/controller/principalController.php';

$principalController = new principalController();

define('BASE_URL', 'http://localhost/proj/');

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$url = (explode('?', $url))[0]; //tudo que for ponto de interrogação é ignorado na url (ex: ?id=1)

switch ($url) {
    case '/projCli/':
        $principalController->viewprincipal();
    break;

    case '/projCli/openweather':
        $principalController->viewOpenWeather();
    break;

    case '/projCli/Geonames':
        $principalController->viewGeonames();
    break;

    case '/projCli/restcountries':
        $principalController->viewrestcountries();
    break;

    case '/projCli/openexchangerates':
        $principalController->viewopenexchangerates();
    break;

    case '/projCli/opencagedata':
        $principalController->viewopencagedata();
    break;

    case '/projCli/OpenRouteService':
        $principalController->viewOpenRouteService();
    break;

    //caso a url não seja encontrada
    default :
        echo 'Página não encontrada';
    break;
}