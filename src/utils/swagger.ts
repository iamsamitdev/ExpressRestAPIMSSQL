import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Express, Request, Response, NextFunction } from "express"
import dotenv from "dotenv"

dotenv.config()

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ExpressJS with MSSQL API",
      version: "1.0.0",
      description: "A simple ExpressJS API with MSSQL",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The user ID",
              example: 1,
            },
            username: {
              type: "string",
              description: "The user's username",
              example: "john_doe",
            },
            password: {
              type: "string",
              description: "The user's hashed password",
              example: "$2a$12$abcdefghijk",
            },
            fullname: {
              type: "string",
              description: "The user's full name",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "The user's email address",
              example: "john.doe@example.com",
            },
            tel: {
              type: "string",
              description: "The user's telephone number",
              example: "0812345678",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The product ID",
              example: 1,
            },
            productname: {
              type: "string",
              description: "The product's name",
              example: "Apple iPhone 12",
            },
            unitprice: {
              type: "number",
              description: "The product's price",
              example: 29999,
            },
            unitinstock: {
              type: "number",
              description: "The product's stock",
              example: 1,
            },
            productpicture: {
                type: "string",
                description: "The product's image URL",
                example: "apple-iphone-12.jpg",
            },
            categoryid: {
                type: "number",
                description: "The product's category ID",
                example: 1,
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/routes/*.ts", 
    "./dist/routes/*.js", 
    "./src/**/*.ts"
  ],
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app: Express): void => {
  app.use("/api-docs", (_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    )
    next()
  })

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
