import { Request } from "express"
import productModel from "../models/productModel"

// Import mssql library
import sql from "mssql"

// Import sql connection
import dbConfig from "../config/dbconfig"

// กำหนดประเภทข้อมูลที่จะรับใน req.body
interface CreateProductRequest extends Request {
    body: Omit<productModel, "id"> // ไม่รับค่า id
}

// อ่านข้อมูลสินค้าทั้งหมด
export const getAllProducts = async (): Promise<productModel[]> => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Query products
        const result = await pool.request().query("SELECT * FROM products")

        // If no record found
        if (result.recordset.length === 0) {
            throw new Error("No record found")
        }

        return result.recordset
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching products: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

// อ่านสินค้าตาม id
export const getProductById = async (id: number): Promise<productModel> => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Query product
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM products WHERE ProductID = @id")

        // If no record found
        if (result.recordset.length === 0) {
            throw new Error("No record found")
        }

        return result.recordset[0]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching product: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

// เพิ่มสินค้าใหม่
export const createProduct = async (req: CreateProductRequest) => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Insert new product
        const result = await pool.request()
            .input("productname", sql.VarChar, req.body.productname)
            .input("unitprice", sql.Money, req.body.unitprice)
            .input("unitinstock", sql.Int, req.body.unitinstock)
            .input("productpicture", sql.VarChar, req.body.productpicture)
            .input("categoryid", sql.Int, req.body.categoryid)
            .query("INSERT INTO products (ProductName, UnitPrice,UnitInStock,ProductPicture,CategoryID) OUTPUT INSERTED.* VALUES (@productname, @unitprice, @unitinstock, @productpicture, @categoryid)")

        // ส่งรายการสินค้าที่เพิ่มล่าสุดกลับไป
        return result.recordset[0]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error creating product: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

// แก้ไขสินค้า
export const updateProduct = async (req: CreateProductRequest, id: number) => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Update product
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("productname", sql.VarChar, req.body.productname)
            .input("unitprice", sql.Money, req.body.unitprice)
            .input("unitinstock", sql.Int, req.body.unitinstock)
            .input("productpicture", sql.VarChar, req.body.productpicture)
            .input("categoryid", sql.Int, req.body.categoryid)
            .query("UPDATE products SET ProductName = @productname, UnitPrice = @unitprice, UnitInStock = @unitinstock, ProductPicture = @productpicture, CategoryID = @categoryid OUTPUT INSERTED.* WHERE ProductID = @id")
        return result.recordset[0]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error updating product: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

// ลบสินค้า
export const deleteProduct = async (id: number) => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Delete product
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM products OUTPUT DELETED.* WHERE ProductID = @id")

        // If no record found
        if (result.recordset.length === 0) {
            throw new Error("No record found")
        }

        return result.recordset[0]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error deleting product: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

// ค้นหาสินค้าตามชื่อ
export const searchProduct = async (search: string): Promise<productModel[]> => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Query product
        const result = await pool.request()
            .input("search", sql.NVarChar, `%${search}%`)
            .query("SELECT * FROM products WHERE ProductName LIKE @search")

        // If no record found
        if (result.recordset.length === 0) {
            throw new Error("No record found")
        }

        return result.recordset
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching product: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}