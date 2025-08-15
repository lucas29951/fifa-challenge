# FIFA Challenge - Gestión de Jugadores

## Tabla de Contenidos
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución con Docker](#ejecución-con-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Variables de Entorno](#variables-de-entorno)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción
Aplicación web full stack para gestionar un listado de jugadores de FIFA, desarrollada con:
- **Backend**: Node.js con Express y Sequelize como ORM
- **Frontend**: Angular
- **Base de datos**: MySQL

## Tecnologías

### Frontend
- **Angular** (v16+)
- **Angular Material** para componentes UI
- **RxJS** para manejo de observables
- **NgRx** (opcional) para gestión de estado

### Backend
- **Node.js** con Express
- **Sequelize** como ORM
- **MySQL** como base de datos
- **JWT** para autenticación

### DevOps
- **Docker** y **docker-compose** para containerización
- **MySQL** en contenedor Docker

## Requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+
- npm 9+
- Angular CLI 16+

## Instalación (Desarrollo)

1. Clona el repositorio:
```bash
git clone https://github.com/lucas29951/fifa-challenge.git
cd fifa-challenge
```

2. Instala dependencias del backend:
```bash
cd backend
npm install
```

3. Instala dependencias del frontend:
```bash
cd ../frontend
npm install
```

## Configuración

1. Crea un archivo `.env` en la carpeta `backend` basado en `.env.example`:
```bash
cd backend
cp .env.example .env
```

2. Configura tus variables de entorno (ver sección [Variables de Entorno](#variables-de-entorno)).

## Ejecución con Docker

El proyecto incluye un archivo `docker-compose.yml` para levantar toda la infraestructura:

```bash
docker-compose up --build
```

Esto iniciará:
- Servidor backend en puerto 3000
- Frontend Angular en puerto 4200
- Base de datos MySQL en puerto 3306

## Estructura del Proyecto

```
fifa-challenge/
├── backend/                 # Backend Node.js
│   ├── config/              # Configuración de Sequelize
│   ├── controllers/         # Controladores de rutas
│   ├── migrations/          # Migraciones de Sequelize
│   ├── models/              # Modelos de Sequelize
│   ├── routes/              # Definición de rutas
│   ├── seeders/             # Datos iniciales
│   ├── app.js               # Configuración de Express
│   ├── server.js            # Punto de entrada
│   └── .env                 # Variables de entorno
│
├── frontend/                # Frontend Angular
│   ├── src/
│   │   ├── app/             # Módulos y componentes
│   │   ├── assets/          # Archivos estáticos
│   │   ├── environments/    # Configuración por entorno
│   │   └── ...              # Estructura estándar de Angular
│   └── angular.json         # Configuración de Angular
│
├── docker-compose.yml       # Configuración de Docker
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

## API Endpoints

### Jugadores
- `GET /api/players` - Lista todos los jugadores
- `GET /api/players/:id` - Obtiene un jugador por ID
- `POST /api/players` - Crea un nuevo jugador
- `PUT /api/players/:id` - Actualiza un jugador
- `DELETE /api/players/:id` - Elimina un jugador

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión

## Variables de Entorno

Archivo `.env` en la carpeta `backend`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_NAME=fifa_db
DB_USER=root
DB_PASSWORD=password
DB_HOST=mysql_db  # Nombre del servicio en docker-compose

# Auth
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

## Decisiones Técnicas

### Backend
- **Sequelize** como ORM para interacción con MySQL
- **Migraciones** para control de cambios en la base de datos
- **Seeders** para datos iniciales
- **JWT** para autenticación stateless

### Frontend
- **Angular CLI** para estructura y build
- **Angular Material** para UI consistente
- **Services** para comunicación con API
- **Reactive Forms** para formularios

### Base de Datos
- **MySQL** como motor relacional
- **Dockerizada** para fácil configuración
- **Modelo relacional** para jugadores y usuarios

### Docker
- **Servicios separados** para frontend, backend y base de datos
- **Persistencia** de datos con volumen para MySQL
- **Variables de entorno** para configuración

## Contribución

1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.