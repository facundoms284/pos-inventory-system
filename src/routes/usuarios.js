const express = require('express');

const { listarUsuarios, eliminarUsuario } = require('../controllers/usuarios');

// Middleware para autenticar los usuarios
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// Aplico el middleware para autenticar los usuarios
router.use(authenticateJWT);

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Recupera una lista de todos los usuarios registrados en el sistema. Es necesario estar autenticado para acceder a esta ruta.
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
 *                       role:
 *                         type: string
 *                         example: admin
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

router.get('/', listarUsuarios);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Elimina un usuario del sistema. Es necesario estar autenticado para acceder a esta ruta.
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

router.delete('/:id', listarUsuarios);

module.exports = router;
