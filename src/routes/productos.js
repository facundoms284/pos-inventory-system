const express = require('express');

const listarProductosController =
  require('../controllers/productos').listAllProducts;
const crearProductoController =
  require('../controllers/productos').createProduct;
const actualizarProductoController =
  require('../controllers/productos').updateProduct;
const eliminarProductoController =
  require('../controllers/productos').deleteProduct;

// Middlewares
const authenticateJWT = require('../middlewares/auth');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

/**
 * @swagger
 * /api/v1/productos:
 *   get:
 *     summary: Listar todos los productos
 *     security:
 *       - bearerAuth: []
 *     description: Recupera una lista de todos los productos registrados en el sistema. Es necesario estar autenticado para acceder a esta ruta.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Productos obtenidos correctamente
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
 *                         example: Producto A
 *                       descripcion:
 *                         type: string
 *                         example: Descripción del producto
 *                       precio:
 *                         type: number
 *                         example: 100.50
 *                       cantidad_disponible:
 *                         type: integer
 *                         example: 10
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-13T18:52:52.421Z"
 *                       fecha_actualizacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-13T18:52:52.421Z"
 *       500:
 *         description: Error al obtener los productos
 */
router.get('/', authenticateJWT, listarProductosController);

/**
 * @swagger
 * /api/v1/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     security:
 *       - bearerAuth: []
 *     description: Crea un nuevo producto en el sistema. Es necesario estar autenticado con un rol de 'admin' para para acceder a esta ruta.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Producto B
 *               descripcion:
 *                 type: string
 *                 example: Descripción del producto B
 *               precio:
 *                 type: number
 *                 example: 200.00
 *               cantidad_disponible:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto creado correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     fecha_creacion:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-13T18:52:52.421Z"
 *                     fecha_actualizacion:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-13T18:52:52.421Z"
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     nombre:
 *                       type: string
 *                       example: Producto B
 *                     descripcion:
 *                       type: string
 *                       example: Descripción del producto B
 *                     precio:
 *                       type: number
 *                       example: 200.00
 *                     cantidad_disponible:
 *                       type: integer
 *                       example: 20
 *       400:
 *         description: El precio debe ser un número positivo
 *       500:
 *         description: Error al crear producto
 */
router.post(
  '/',
  authenticateJWT,
  authorizeRole('admin'),
  crearProductoController
);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     security:
 *       - bearerAuth: []
 *     description: Actualiza un producto existente en el sistema. Es necesario estar autenticado con un rol de 'admin' para para acceder a esta ruta.
 *     tags:
 *       - Productos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Producto C
 *               descripcion:
 *                 type: string
 *                 example: Descripción del producto C
 *               precio:
 *                 type: number
 *                 example: 150.00
 *               cantidad_disponible:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar producto
 */
router.put(
  '/:id',
  authenticateJWT,
  authorizeRole('admin'),
  actualizarProductoController
);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto existente
 *     security:
 *       - bearerAuth: []
 *     description: Elimina un producto existente en el sistema. Es necesario estar autenticado con un rol de 'admin' para para acceder a esta ruta.
 *     tags:
 *       - Productos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar producto
 */
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRole('admin'),
  eliminarProductoController
);

module.exports = router;
