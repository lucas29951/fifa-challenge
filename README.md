# FIFA Challenge - Proyecto Full Stack

![FIFA Challenge](https://github.com/lucas29951/fifa-challenge/raw/main/client/public/logo.png)

## Tabla de Contenidos
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Variables de Entorno](#variables-de-entorno)
- [Testing](#testing)
- [Despliegue](#despliegue)
- [Roadmap](#roadmap)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción
FIFA Challenge es una aplicación web full stack que permite a los usuarios interactuar con datos de jugadores de FIFA, crear equipos personalizados y competir en desafíos virtuales.

## Tecnologías

### Frontend
- **React** con TypeScript
- **Vite** como build tool
- **React Router** para navegación
- **React Hook Form** para formularios
- **Sass** con CSS Modules para estilos
- **Axios** para llamadas HTTP

### Backend
- **Node.js** con Express
- **TypeScript**
- **Prisma** como ORM
- **PostgreSQL** como base de datos
- **JWT** para autenticación
- **Zod** para validación de datos

### DevOps
- **Docker** para containerización

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/lucas29951/fifa-challenge.git
cd fifa-challenge
```

2. Instala dependencias del backend:
```bash
cd server
npm install
```

3. Instala dependencias del frontend:
```bash
cd ../client
npm install
```

## Configuración

1. Crea un archivo `.env` en la carpeta `server` basado en `.env.example`:
```bash
cp .env.example .env
```

2. Configura tus variables de entorno (ver sección [Variables de Entorno](#variables-de-entorno)).

3. Ejecuta las migraciones de Prisma:
```bash
cd server
npx prisma migrate dev
```

## Decisiones Técnicas

### Arquitectura
- **Separación clara** entre frontend (`client`) y backend (`server`)
- **API RESTful** con convenciones estándar
- **Autenticación JWT** para seguridad

### Base de Datos
- **MySQL** para manejo relacional de datos
- **ORM** para type-safe database access
- **Paginación en backend** para mejor performance

### Frontend
- **Componentes funcionales**
- **Context API** para estado global
- **CSS Modules** para evitar colisiones de estilos

### Calidad de Código
- **TypeScript** en todo el proyecto

## Estructura del Proyecto

```
fifa-challenge/
├── client/                  # Frontend React app
│   ├── public/              # Assets públicos
│   ├── src/                 # Código fuente
│   │   ├── components/      # Componentes reutilizables
│   │   ├── contexts/        # Contextos de React
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Componentes de página
│   │   ├── styles/          # Estilos globales
│   │   ├── types/           # Tipos TypeScript
│   │   ├── utils/           # Utilidades
│   │   ├── App.tsx          # Componente principal
│   │   └── main.tsx         # Punto de entrada
│   └── vite.config.ts       # Configuración de Vite
│
├── server/                  # Backend Node.js
│   ├── prisma/              # Esquemas y migraciones
│   ├── src/                 # Código fuente
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── middleware/      # Middlewares
│   │   ├── routes/          # Definición de rutas
│   │   ├── services/        # Lógica de negocio
│   │   ├── types/           # Tipos TypeScript
│   │   ├── utils/           # Utilidades
│   │   ├── app.ts           # Configuración de Express
│   │   └── server.ts        # Punto de entrada
│   └── .env                 # Variables de entorno
│
├── .github/                 # Configuración de GitHub
│   └── workflows/           # GitHub Actions workflows
│
├── .gitignore               # Archivos ignorados por Git
├── README.md                # Este archivo
└── package.json             # Scripts globales
```

## API Endpoints

La documentación completa de la API está disponible en `/api-docs` cuando el servidor está en ejecución (usando Swagger UI).

Principales endpoints:
- `GET /api/players` - Lista de jugadores (con paginación)
- `GET /api/players/:id` - Detalles de un jugador
- `POST /api/auth/login` - Autenticación de usuario
- `POST /api/auth/register` - Registro de nuevo usuario
- `GET /api/teams` - Equipos del usuario actual
- `POST /api/teams` - Crear nuevo equipo

## Variables de Entorno

Archivo `.env` en la carpeta `server`:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fifa_db?schema=public"

# Auth
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="24h"

# CORS
CLIENT_URL="http://localhost:3000"
```

## Testing

Para ejecutar tests:

```bash
# En la carpeta client/ o server/
npm test
```

Cobertura de tests:
- **Frontend**: Pruebas de componentes con React Testing Library
- **Backend**: Pruebas unitarias de servicios y de integración de endpoints

## Despliegue

### Desarrollo
```bash
# Backend
cd server
npm run dev

# Frontend (en otra terminal)
cd client
npm run dev
```

### Producción
El proyecto incluye configuración para Docker:

```bash
docker-compose up --build
```

## Roadmap

- [x] Configuración inicial del proyecto
- [x] Autenticación JWT
- [x] CRUD de jugadores
- [x] Gestión de equipos
- [ ] Sistema de desafíos
- [ ] Estadísticas de jugadores
- [ ] Internacionalización (i18n)
- [ ] Notificaciones en tiempo real

## Contribución

1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.