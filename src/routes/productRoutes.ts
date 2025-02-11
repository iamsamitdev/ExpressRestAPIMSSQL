import { Router } from "express"
import * as productController from "../controllers/productController"
import authMiddleware from "../middlewares/authMiddleware"
const router = Router()

/**
 * @swagger
 * tags:
 *  name: products
 *  description: Product routes
 */


// route อ่านข้อมูลสินค้าทั้งหมด
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [products]
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
*/
router.get("/", authMiddleware, productController.getAllProducts)

// route ค้นหาสินค้าตามชื่อ
/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name
 *     tags: [products]
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the product to search for
 *     responses:
 *       200:
 *         description: List of products matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/search", authMiddleware, productController.searchProduct)

// route อ่านสินค้าตาม id
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [products]
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", authMiddleware, productController.getProductById)

// route เพิ่มสินค้าใหม่
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [products]
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error while creating product
 */
router.post("/", authMiddleware, productController.createProduct)

// route อัปเดตสินค้า
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [products]
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error while updating product
 */
router.put("/:id", authMiddleware, productController.updateProduct)

// route ลบสินค้า
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [products]
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Error while deleting product
 */
router.delete("/:id", authMiddleware, productController.deleteProduct)

export default router