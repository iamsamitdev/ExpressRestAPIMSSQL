// import { getAllProducts, createProduct } from "../services/productService"
import { Request, Response } from "express"
import * as userService from "../services/userService"
import { success, errors } from "../utils/apiResponse"
import bycrypt from "bcryptjs"
import * as jwtUtils from "../utils/jwtUtils"

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้ใหม่
export const registerUser = async (req: Request, res: Response): Promise<void> => {

    // ดึงข้อมูลจาก req.body
    const { username, password, fullname, email, tel } = req.body

    try {
        const hashedPassword = await bycrypt.hash(password, 10) // แปลงรหัสผ่านเป็นรหัสแฮช 10 รอบ เพื่อความปลอดภัย
        const user = await userService.registerUser(username, hashedPassword, fullname, email, tel)
        res.status(201).json(
            success({
                id: user.UserID,
                username: user.Username,
                fullname: user.Fullname,
                email: user.Email,
                tel: user.Tel
            }, "User registered successfully")
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

// ฟังก์ชันสำหรับเข้าสู่ระบบ
export const loginUser = async (req: Request, res: Response): Promise<void> => {

    // ดึงข้อมูลจาก req.body
    const { username, password } = req.body

    try {

        const user = await userService.loginUser(username)

        if (!user) {
            res.status(401).json(
            errors('Invalid credentials')
        )
            return
        }

        const isPasswordMatch = await bycrypt.compare(password, user.Password)
        
        if (!isPasswordMatch) {
            res.status(401).json(
              errors('Invalid credentials')
            )
            return
        }

        // สร้าง JWT token
        const accessToken = jwtUtils.generateAccessToken(user.UserID)
      
        res.status(200).json(
            success(
                {
                    id: user.UserID,
                    username: user.Username,
                    fullname: user.Fullname,
                    email: user.Email,
                    tel: user.Tel,
                    token: accessToken
                },
                "User logged in successfully"
            )
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