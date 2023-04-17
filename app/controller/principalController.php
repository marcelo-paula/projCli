<?php

class principalController {
    public function viewOpenWeather(){
        include 'app/view/OpenWeather.html';
    }

    public function viewGeonames(){
        include 'app/view/Geonames.html';
    }

    public function viewrestcountries(){
        include 'app/view/restcountries.html';
    }

    public function viewopenexchangerates(){
        include 'app/view/openexchangerates.html';
    }

    public function viewopencagedata(){
        include 'app/view/opencagedata.html';
    }

    public function viewprincipal(){
        include 'app/view/principal.html';
    }

    public function viewOpenRouteService(){
        include 'app/view/OpenRouteService.html';
    }
}