# StockAlert Mini-API

Sistema de alertas de stock crítico con Node.js, Express, MongoDB, JWT, EJS y node-cron.

## Instalación

1. Copia `.env.example` a `.env`.
2. Ajusta `MONGO_URI`, `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASSWORD` y `STATIC_TOKEN`.
3. Ejecuta:

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

## Rutas principales

- `POST /api/auth/register` - Registra un usuario administrador.
- `POST /api/auth/login` - Genera JWT para autenticación.
- `GET /api/productos` - Lista todos los productos.
- `POST /api/productos` - Crea un producto (requiere token Bearer o token estático).
- `PATCH /api/productos/:id` - Actualiza un producto (requiere autenticación).
- `GET /dashboard` - Muestra el panel HTML con los productos y stock crítico.

## Autenticación

Envía el token así:

```
Authorization: Bearer <token>
```

O usa `STATIC_TOKEN` en el `.env`:

```
Authorization: Bearer mi-token-estatico-123
```

## Cron Job

Se ejecuta cada minuto y detecta productos con `cantidad < umbralMinimo` y `estadoAlerta == false`.
Cuando detecta un producto, imprime el mensaje de alerta en consola y marca `estadoAlerta` como `true`.
