<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
    <p>Hola {{ $conductor->nombre }},</p>
    <p>{{ $user->name }} quiere hacer un viaje contigo.</p>
    <ul>
        <li><strong>De (B):</strong> {{ $viaje->lat_inicio }},{{ $viaje->lng_inicio }}</li>
        <li><strong>A (C):</strong> {{ $viaje->lat_fin }},{{ $viaje->lng_fin }}</li>
        <li><strong>Precio:</strong> {{ $viaje->kilometros }} km</li>
    </ul>
    <p>¡Enhorabuena!</p>
</body>
</html>
