import { Router } from "express"
import * as userController from "../controllers/userController"
const router = Router()

/**
 * @swagger
 * tags:
 *  name: users
 *  description: Test routes
 */

// สร้างเส้นทางสำหรับลงทะเบียนผู้ใช้ใหม่
/**
 * @swagger
 * /users/register:
 *  post:
 *    summary: Register new user
 *    tags: [users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              fullname:
 *                type: string
 *              email:
 *                type: string
 *              tel:
 *                type: string
 *    responses:
 *      200:
 *        description: User registered successfully
 *      400:
 *        description: Error while registering user
 */
router.post("/register", userController.registerUser)

// สร้างเส้นทางสำหรับเข้าสู่ระบบ
/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Login user
 *    tags: [users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User logged in successfully
 *      400:
 *        description: Error while logging in
 */
router.post("/login", userController.loginUser)

export default router