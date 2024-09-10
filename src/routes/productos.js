const express = require('express');

const listarProductosController =
  require('../controllers/productos').listAllProducts;
const crearProductoController =
  require('../controllers/productos').createProduct;
const actualizarProductoController =
  require('../controllers/productos').updateProduct;
const eliminarProductoController =
  require('../controllers/productos').deleteProduct;

// Middleware para autenticar los usuarios
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// Aplico el middleware para autenticar los usuarios
router.use(authenticateJWT);

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Listar todos los productos
 *     security:
 *       - bearerAuth: []
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
 *       500:
 *         description: Error al obtener los productos
 */
router.get('/', listarProductosController);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     security:
 *       - bearerAuth: []
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
router.post('/', crearProductoController);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     security:
 *       - bearerAuth: []
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
 *                 data:
 *                   type: object
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar producto
 */
router.put('/:id', actualizarProductoController);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto existente
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', eliminarProductoController);

module.exports = router;
