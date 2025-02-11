// Express server
import express from 'express'
import testRoutes from './routes/testRoutes'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv'
import setupSwagger from './utils/swagger'
import cors from 'cors'

// Load environment variables
dotenv.config()

// Create Express server
const app = express()

// Middleware allows Express to parse JSON
app.use(express.json())

// Setup Swagger
setupSwagger(app)

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: '*', // อนุญาตให้ทุก domain ใช้งาน API
  // origin: ['http://localhost:4200', 'http://localhost:8080', 'http://www.example.com'], // อนุญาตให้เฉพาะ domain ที่ระบุใช้งาน API
  methods:  ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // อนุญาตให้ใช้งาน method ไหนบ้าง
  allowedHeaders: ['Content-Type', 'Authorization'], // อนุญาตให้ใช้งาน header ไหนบ้าง
}

// Apply CORS middleware
app.use(cors(corsOptions))

// Use routes
app.use(testRoutes)
app.use("/products", productRoutes)
app.use("/users", userRoutes)

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const HOST = process.env.HOST || "localhost"

// Start Express server
app.listen(PORT, HOST, () => {
  console.log(`Server started on http://${process.env.HOST}:${process.env.PORT}`)
})