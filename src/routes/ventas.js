const express = require('express');

// Middleware para autenticar los usuarios
const authenticateJWT = require('../middlewares/auth');
const { listarVentas } = require('../controllers/ventas');
const { crearVenta } = require('../controllers/ventas');
const { eliminarVenta } = require('../controllers/ventas');

const router = express.Router();

// Aplico el middleware para autenticar los usuarios
router.use(authenticateJWT);

/**
 * @swagger
 * /api/v1/ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     description: Recupera una lista de todas las ventas realizadas. Es necesario estar autenticado para acceder a esta ruta.
 *     responses:
 *       200:
 *         description: Ventas obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ventas obtenidas correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       id_usuario:
 *                         type: integer
 *                         example: 1
 *                       total:
 *                         type: number
 *                         example: 100.50
 *                       fecha_venta:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-09-06T15:12:34.000Z
 *       404:
 *         description: No se encontraron ventas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron ventas
 *       500:
 *         description: Error en el servidor al obtener las ventas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener todas las ventas
 */

router.get('/', listarVentas);

/**
 * @swagger
 * /api/v1/ventas:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     description: Crea una nueva venta y sus detalles. La venta requiere información del usuario y los productos. Es necesario estar autenticado para acceder a esta ruta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_producto:
 *                       type: integer
 *                       example: 1
 *                     cantidad:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Venta creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Venta creada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     idVenta:
 *                       type: integer
 *                       example: 1
 *                     total:
 *                       type: number
 *                       example: 150.00
 *                     fecha_venta:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-09-06T15:12:34.000Z
 *                     usuario:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nombre:
 *                           type: string
 *                           example: Juan Perez
 *                         email:
 *                           type: string
 *                           example: usuario@example.com
 *                     productos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nombre:
 *                             type: string
 *                             example: Producto A
 *                           descripcion:
 *                             type: string
 *                             example: Descripción del producto A
 *                           cantidad:
 *                             type: integer
 *                             example: 2
 *                           precioPorUnidad:
 *                             type: number
 *                             example: 75.00
 *                           subtotal:
 *                             type: number
 *                             example: 150.00
 *       400:
 *         description: Producto sin stock.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No hay stock disponible del producto Producto A
 *       404:
 *         description: Producto no encontrado o sin stock.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error en el servidor al crear la venta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear venta
 */

router.post('/', crearVenta);

/**
 * @swagger
 * /api/v1/ventas/{id}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     description: Elimina una venta existente y restaura el stock de los productos asociados. Es necesario estar autenticado para acceder a esta ruta.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta cancelada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Venta cancelada correctamente
 *       404:
 *         description: Venta no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Venta no encontrada
 *       500:
 *         description: Error en el servidor al eliminar la venta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar venta
 */

router.delete('/:id', eliminarVenta);

module.exports = router;
