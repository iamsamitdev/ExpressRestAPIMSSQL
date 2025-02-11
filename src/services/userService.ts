// Import mssql library
import sql from "mssql"

// Import sql connection
import dbConfig from "../config/dbconfig"
import UserModel from "../models/userModel"

// สร้างฟังก์ชันสำหรับการลงทะเบียนผู้ใช้ใหม่ registerUser
export const registerUser = async (
    username: string,
    password: string,
    fullname: string,
    email: string,
    tel: string
): Promise<any> => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Query user check if username and email already exists
        let result = await pool.request()
            .input("username", sql.NVarChar, username)
            .input("email", sql.NVarChar, email)
            .query("SELECT * FROM users WHERE username = @username OR email = @email")

        // If record found
        if (result.recordset.length > 0) {
            throw new Error("Username or email already exists")
        }

        // Insert user
        result = await pool.request()
            .input("username", sql.NVarChar, username)
            .input("password", sql.NVarChar, password)
            .input("fullname", sql.NVarChar, fullname)
            .input("email", sql.NVarChar, email)
            .input("tel", sql.NVarChar, tel)
            .query("INSERT INTO users (username, password, fullname, email, tel) OUTPUT INSERTED.* VALUES (@username, @password, @fullname, @email, @tel)")

        return result.recordset[0]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error registering user: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

// สร้างฟังก์ชันสำหรับการเข้าสู่ระบบ login
export const loginUser = async (username: string): Promise<UserModel> => {
    try {
        // Connect to database
        const pool = await sql.connect(dbConfig)

        // Query user
        const result = await pool.request()
            .input("username", sql.NVarChar, username)
            .query("SELECT * FROM users WHERE username = @username")

        // If record not found
        if (result.recordset.length === 0) {
            throw new Error("User not found")
        }

        // Return user without password
        return result.recordset[0]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error logging in: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}