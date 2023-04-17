<?php

session_start();

include './app/controller/principalController.php';

$principalController = new principalController();

define('BASE_URL', 'http://localhost/proj/');

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$url = (explode('?', $url))[0]; //tudo que for ponto de interrogação é ignorado na url (ex: ?id=1)

switch ($url) {
    case '/proj/':
        $principalController->viewprincipal();
    break;

    case '/proj/openweather':
        $principalController->viewOpenWeather();
    break;

    case '/proj/Geonames':
        $principalController->viewGeonames();
    break;

    case '/proj/restcountries':
        $principalController->viewrestcountries();
    break;

    case '/proj/openexchangerates':
        $principalController->viewopenexchangerates();
    break;

    case '/proj/opencagedata':
        $principalController->viewopencagedata();
    break;

    case '/proj/OpenRouteService':
        $principalController->viewOpenRouteService();
    break;

    //caso a url não seja encontrada
    default :
        echo 'Página não encontrada';
    break;
}