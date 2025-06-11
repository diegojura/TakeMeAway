<?php

return [
'paths'           => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173'], // tu Vite dev
'allowed_headers' => ['*'],
'exposed_headers' => [],
'supports_credentials' => true,

];
