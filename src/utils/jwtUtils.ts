import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// อ่านข้อมูล secret key จากไฟล์ .env
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string
const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRY as any

// สร้าง JWT token (ออก token ให้ user)
export const generateAccessToken = (userId:any) => {
    return jwt.sign(
        { userId }, 
        ACCESS_TOKEN_SECRET, 
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    )
}

// Verify Access Token (ตรวจสอบ token ว่าถูกต้องหรือไม่)
export const verifyAccessToken = (token:string) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET)
    } catch (error) {
        return null
    }
}