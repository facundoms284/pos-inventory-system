const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión en el sistema
 *     tags: [Autenticación]
 *     description: Permite a los usuarios iniciar sesión en el sistema proporcionando sus credenciales. Si el inicio de sesión es exitoso, se devolverá un token JWT que puede ser utilizado para autenticar futuras solicitudes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *                 description: El correo electrónico registrado del usuario
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve el token JWT de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Iniciaste sesión correctamente
 *                 token:
 *                   type: string
 *                   description: Token JWT que puede ser utilizado para autenticar solicitudes.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: La contraseña ingresada es incorrecta
 *       404:
 *         description: Usuario no registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no registrado en el sistema
 *       500:
 *         description: Error en el servidor al intentar iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al iniciar sesión
 */

router.post('/', loginController);

module.exports = router;
