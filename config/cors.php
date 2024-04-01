<?php

use Laravel\Sanctum\SanctumServiceProvider;


/*
return [


    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |


    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://127.0.0.1:4200', 'http://localhost:4200'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];

*/




return [

    /*
    |--------------------------------------------------------------------------
    | Allowed request origins
    |--------------------------------------------------------------------------
    |
    | Indicates which origins are allowed to perform requests.
    |
    */

    'allowed_origins' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed HTTP methods
    |--------------------------------------------------------------------------
    |
    | Indicates which HTTP methods are allowed on this endpoint.
    |
    */

    'allowed_methods' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed headers
    |--------------------------------------------------------------------------
    |
    | Indicates which HTTP headers are allowed in a preflight OPTIONS request.
    |
    */

    'allowed_headers' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Whether the response can be exposed
    |--------------------------------------------------------------------------
    |
    | Indicates whether the response to the request can be exposed when the
    | credentials flag is true.
    |
    */

    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Indicates how long the results of a preflight request can be cached
    |--------------------------------------------------------------------------
    |
    | Specifies the maximum time, in seconds, that the results of a preflight
    | request can be cached.
    |
    */

    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Whether or not the response can include credentials
    |--------------------------------------------------------------------------
    |
    | Indicates whether or not the response to the request can be exposed when the
    | credentials flag is true.
    |
    */

    //'supports_credentials' => false,


    //'paths' => ['api/*'],
    //'methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    'headers' => ['*'],

    'Access-Control-Allow-Origin' => ['*'],
    //'Access-Control-Allow-Credentials' => ['true'],
    'Access-Control-Allow-Headers' => ['Content-Type', 'X-Requested-With', 'Authorization'],




    'allowed_origins_patterns' => [],



    'supports_credentials' => true,

    'paths' => ['api/*', 'web/*'], // Applique CORS aux routes API et web
    'methods' => ['*'], // Permet toutes les méthodes
    // Permet tous les en-têtes

    //'Access-Control-Allow-Origin' => ['*'],
    'Access-Control-Allow-Credentials' => true,

];
