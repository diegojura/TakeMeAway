<?php

return [
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // Mientras pruebas desde React en 5173, o pon '*' si no usas cookies
    'allowed_origins' => ['http://localhost:5173', '*'],

    'allowed_headers' => ['*'],

    'supports_credentials' => false,
];
