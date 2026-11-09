# SAP – Backend

API REST en **Spring Boot** (Java 21) que conecta el front con **MariaDB** usando **Hibernate**.
Por ahora solo hace dos cosas: **login** y **consulta de servidores/servicios**.
Es una API REST pensada para que la usen **varias apps** (JSON sobre HTTP, sin sesión en el servidor).

## Arrancar

1. Levanta MariaDB (Docker) con la base `sap` (`application.properties` ya apunta a `localhost:3306`, usuario `root`, clave `sap`).
   Ejecuta `SapDB.sql` (en la raíz del proyecto): crea las tablas y mete los datos iniciales.
2. Desde esta carpeta:
   ```bash
   ./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
   ```
3. API en `http://localhost:9090`. Comprobación rápida: `GET /hola`.

El usuario inicial es **`admin` / `admin123`** (viene en `SapDB.sql`, junto con servidores y servicios de ejemplo).
No hay alta de usuarios en la API: se crean directamente en la base de datos.

## Estructura

```
com.sap.backend
├── controller/   AuthController, ServerController, ServiceItemController
├── service/      AuthService (login), PasswordService (hash PBKDF2)
├── repository/   UserRepository, ServerRepository, ServiceItemRepository
├── model/        User, Rol, Server, ServiceItem
├── dto/          LoginRequest, UserResponse, ServerResponse, ServiceItemResponse
└── config/       WebConfig (CORS)
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | `{ "username": "admin", "password": "admin123" }` → `{ id, name, email, role }` |
| GET | `/api/servers` | Lista de servidores |
| GET | `/api/servers/{id}` | Un servidor |
| GET | `/api/services` | Todos los servicios (`?serverId=1` para filtrar) |

`username` puede ser el nombre o el email. Errores de login: `401` (credenciales) o `400` (campos vacíos).

> Pendiente: seguridad (tokens/sesión), alta de usuarios y modificación de servidores.

## Usarla desde otra app

- Base URL: `http://<host>:9090/api`. Todo es JSON.
- **CORS:** por defecto cualquier origen puede llamar a la API. Para limitarlo, en `backend/.env`:
  `CORS_ORIGINS=http://localhost:5173,http://localhost:5174`
- Errores: `{ "status": 401, "message": "Usuario o contraseña incorrectos" }`.
- El front (Vite) usa un proxy en desarrollo; en otros entornos se le indica la URL con `VITE_API_URL`.

> Pendiente: seguridad. Ahora cualquiera con acceso a la red puede leer `/api/servers`
> (incluye contraseñas). Antes de exponerla, añadir token/sesión.
