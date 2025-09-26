# 📌 Cooperativa Backend API

Este es el backend de la **Cooperativa**, desarrollado en **Node.js + Express + PostgreSQL**, con autenticación JWT y control de acceso basado en roles.

---

## 🚀 Requisitos

- Node.js >= 20
- PostgreSQL >= 14
- npm o yarn

---

## ⚙️ Instalación y configuración

1. Clonar el repositorio:
   
   git clone https://github.com/tuusuario/cooperativa_backend.git
   cd cooperativa_backend


2. Instalar dependencias:

   
   ```npm install
  

3. Configurar variables de entorno:

   Crea un archivo **.env** en la raíz y define:

 ```env
DB_USER=postgres
DB_PASS=tu_password
DB_HOST=127.0.0.1
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=supersecret
PORT=3000

  

4. Levantar el servidor en desarrollo:

   
   npm run dev
  

   Servidor corriendo en:

  
   http://localhost:3000
  

---

## 🔑 Autenticación

La API usa **JWT (Bearer Token)**.
Primero debes iniciar sesión:

### Login

* **POST** `/api/auth/login`
* Body:

```json
{
  "username": "admin",
  "password": "123456"
}
```

* Respuesta:

```json
{
  "message": "Login exitoso",
  "token": "JWT_TOKEN",
  "usuario": {
    "usuario_id": 1,
    "username": "admin",
    "rol": "Admin"
  }
}
```

En cada request protegido debes enviar el header:

```
Authorization: Bearer <TOKEN>
```

---

## 📂 Módulos y Endpoints

### 👤 Usuarios (`/api/usuarios`)

* `POST /` → Crear usuario
* `GET /` → Listar usuarios
* `GET /:id` → Obtener usuario por ID
* `PUT /:id` → Actualizar usuario
* `DELETE /:id` → Eliminar usuario

### 🧑‍💼 Empleados (`/api/empleados`)

* `POST /` → Crear empleado
* `GET /` → Listar empleados
* `GET /:id` → Obtener empleado
* `PUT /:id` → Actualizar empleado
* `DELETE /:id` → Marcar empleado como inactivo

### 👥 Socios (`/api/socios`)

* `POST /` → Crear socio
* `GET /` → Listar socios
* `GET /:id` → Obtener socio
* `PUT /:id` → Actualizar socio
* `DELETE /:id` → Eliminar socio

### 💳 Cuentas (`/api/cuentas`)

* `POST /` → Crear cuenta
* `GET /` → Listar cuentas
* `GET /:id` → Obtener cuenta
* `PUT /:id` → Actualizar cuenta
* `DELETE /:id` → Cerrar cuenta

### 💰 Préstamos (`/api/prestamos`)

* `POST /` → Crear préstamo
* `GET /` → Listar préstamos
* `GET /:id` → Obtener préstamo
* `PUT /:id` → Actualizar préstamo
* `DELETE /:id` → Eliminar préstamo

### 🏦 Pagos de préstamos (`/api/pagos/prestamos`)

* `POST /` → Registrar pago
* `GET /:prestamo_id` → Listar pagos de un préstamo

### 💸 Transacciones (`/api/transacciones`)

* `POST /` → Crear transacción (depósito, retiro, transferencia)
* `GET /` → Listar transacciones

### 📈 Aportaciones (`/api/aportaciones`)

* `POST /` → Registrar aportación
* `GET /` → Listar aportaciones
* `GET /:id` → Obtener aportación
* `PUT /:id` → Actualizar aportación

### 📑 Garantías (`/api/garantias`)

* `POST /` → Registrar garantía
* `GET /` → Listar garantías
* `GET /:id` → Obtener garantía
* `PUT /:id` → Actualizar garantía
* `DELETE /:id` → Eliminar garantía

### 📊 Productos Financieros (`/api/productos/financieros`)

* `POST /` → Crear producto financiero
* `GET /` → Listar productos financieros
* `GET /:id` → Obtener producto
* `PUT /:id` → Actualizar producto
* `DELETE /:id` → Eliminar producto

---

## 🔒 Roles y Permisos

* **Admin** → Acceso total a todos los módulos.
* **Gerente** → Puede gestionar usuarios, socios, préstamos, empleados.
* **Oficial de Negocios** → Puede gestionar préstamos y garantías.
* **Oficial de Servicios** → Puede gestionar socios, cuentas y aportaciones.
* **Cajero** → Puede gestionar transacciones, pagos de préstamos y consultar cuentas.


## 🛠️ Herramientas usadas

* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [morgan](https://www.npmjs.com/package/morgan)
* [cors](https://www.npmjs.com/package/cors)


´´Este  backend está hecho con glitter de @mbelpines 🌟´´

