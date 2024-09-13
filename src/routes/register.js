const express = require('express');

const registerController = require('../controllers/register');

const router = express.Router();

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     description: Permite registrar un nuevo usuario en el sistema. Al registrar un usuario por defecto su role será cliente a no ser que se le asigne role 'admin' en la request body. La contraseña proporcionada se almacenará en formato hash.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Perez
 *                 description: El nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *                 description: El correo electrónico del usuario
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: La contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Juan Perez
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: usuario@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Faltan campos requeridos en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Debe ingresar todos los campos requeridos
 *       500:
 *         description: Error en el servidor al intentar registrar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al registrar usuario
 */

router.post('/', registerController);

module.exports = router;
