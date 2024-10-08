const express = require('express');

const { listarUsuarios, eliminarUsuario } = require('../controllers/usuarios');

const router = express.Router();

// Middlewares
const authenticateJWT = require('../middlewares/auth');
const authorizeRole = require('../middlewares/authorizeRole');

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Recupera una lista de todos los usuarios registrados en el sistema. Es necesario estar autenticado con un rol de 'admin' para para acceder a esta ruta.
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuarios obtenidos correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Juan Perez
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: usuario@example.com
 *                       password_hash:
 *                         type: string
 *                         example: 2a$10$gUZyb3DSAcas23#$%!@#$%^&*
 *                       role:
 *                         type: string
 *                         example: admin
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-13T18:52:52.421Z"
 *       500:
 *         description: Error en el servidor al obtener los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener todos los usuarios
 */

router.get('/', authenticateJWT, authorizeRole('admin'), listarUsuarios);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Elimina un usuario del sistema. Es necesario estar autenticado con un rol de 'admin' para para acceder a esta ruta.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       404:
 *         description: El usuario no fue encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error en el servidor al eliminar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar usuario
 */

router.delete('/:id', authenticateJWT, authorizeRole('admin'), eliminarUsuario);

module.exports = router;
