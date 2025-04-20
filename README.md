# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## ShipmentsApp Frontend

Descripción General
ShipmentsApp es una aplicación web para gestionar y rastrear envíos. Este frontend proporciona una interfaz amigable para crear, rastrear y administrar envíos con diferentes roles de usuario, incluyendo usuarios regulares y administradores.

## Características

Autenticación de Usuarios: Funcionalidad de registro e inicio de sesión
Panel de Administración: Login y dashboard separados para administradores
Gestión de Envíos: Crear, rastrear y ver envíos
Diseño Responsivo: Funciona en dispositivos de escritorio y móviles
Panel de Usuario: Interfaz personalizada con barra lateral de navegación

## Estructura del Proyecto

shipmentsapp/
├── src/
│ ├── admin/
│ │ ├── components/
│ │ │ └── AdminDashboard.jsx
│ │ └── pages/
│ │ └── AdminLogin.jsx
│ ├── components/
│ │ └── Loading.jsx
│ ├── features/
│ │ ├── auth/
│ │ │ └── pages/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ └── components/
│ │ ├── ShipmentForm.jsx
│ │ ├── ShipmentsList.jsx
│ │ └── TrackingSection.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── NotFound.jsx
│ │ └── UserLayout.jsx
│ └── routes/
│ └── AppRouter.jsx
├── package.json
└── ...

## Tecnologías Utilizadas

React.js
React Router DOM para navegación
Lucide React para iconos
Tailwind CSS para estilos
React Toastify para notificaciones

## Rutas

/ - Página de inicio
/register - Registro de usuarios
/login - Inicio de sesión de usuarios
/userLayout/\* - Panel de usuario con rutas anidadas:

/userLayout/ - Inicio de usuario
/userLayout/create - Crear envío
/userLayout/track - Rastrear envíos
/userLayout/shipments - Ver envíos del usuario
/userLayout/settings - Configuración de usuario

/adminLogin - Inicio de sesión de administrador
/adminDashboard - Panel de administración
/loading - Página de carga

- - Página 404 No Encontrado

## Instrucciones de Configuración

1. Clonar el repositorio

```bash
git clone https://github.com/MAURO0189/shipmentsFront
cd backend-envios

Instalar dependencias:
npm install

```

Iniciar el servidor de desarrollo:
npm run dev

Abrir el navegador y navegar a http://localhost:3000

## Autor

Desarrollado por: Mauro Yepes

✉️ Email: mauroy711@gmail.com

🐙 GitHub: https://github.com/MAURO0189
