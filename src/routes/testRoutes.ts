import { Router } from "express"

// Import mssql library
import sql from "mssql"

// Import sql connection
import dbConfig from "../config/dbconfig"

const router = Router()

/**
 * @swagger
 * tags:
 *  name: tests
 *  description: Test routes
 */

// Route: GET /
/**
 * @swagger
 * /:
 *  get:
 *    summary: Test route
 *    tags: [tests]
 *    responses:
 *      200:
 *        description: Hello from test route
 */
router.get("/", (req, res) => {
  res.send("Hello from test route")
})

// Route: GET /testdb
/**
 * @swagger
 * /testdb:
 *  get:
 *    summary: Test database connection
 *    tags: [tests]
 *    responses:
 *      200:
 *        description: Connected to database successfully
 *      500:
 *        description: Error while connecting to database
 */
router.get("/testdb", async (req, res) => {
  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log(err)
      res.send("Error while connecting to database")
    } else {
      res.send("Connected to database successfully")
    }
  })
})

export default router