// import { getAllProducts, createProduct } from "../services/productService"
import { Request, Response } from "express"
import * as productService from "../services/productService"
import { success, errors } from "../utils/apiResponse"

// อ่านข้อมูลสินค้าทั้งหมด
export const getAllProducts = async (_: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.getAllProducts()
        res.status(200).json(
            success(products, "Products fetched successfully")
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errors(error.message)
            )
        } else {
            res.status(500).json(
                errors("An unknown error occurred")
            )
        }
    }
}

// อ่านสินค้าตาม id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const product = await productService.getProductById(id)
        res.status(200).json(
            success(product, "Product fetched successfully")
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errors(error.message)
            )
        } else {
            res.status(500).json(
                errors("An unknown error occurred")
            )
        }
    }
}

// เพิ่มสินค้าใหม่
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.createProduct(req)
        res.status(201).json(
            success(products, "Product created successfully")
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errors(error.message)
            )
        } else {
            res.status(500).json(
                errors("An unknown error occurred")
            )
        }
    }
}

// อัปเดตสินค้า
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const products = await productService.updateProduct(req, id)
        res.status(200).json(
            success(products, "Product updated successfully")
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errors(error.message)
            )
        } else {
            res.status(500).json(
                errors("An unknown error occurred")
            )
        }
    }
}

// ลบสินค้า
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const products = await productService.deleteProduct(id)
        res.status(200).json(
            success(products, "Product deleted successfully")
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errors(error.message)
            )
        } else {
            res.status(500).json(
                errors("An unknown error occurred")
            )
        }
    }
}

//http://localhost:3000/products/search?name=product1
// ค้นหาสินค้าด้วยชื่อ
export const searchProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.query.name as string
        const products = await productService.searchProduct(name)
        res.status(200).json(
            success(products, "Products fetched successfully")
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errors(error.message)
            )
        } else {
            res.status(500).json(
                errors("An unknown error occurred")
            )
        }
    }
}