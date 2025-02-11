import dotenv from 'dotenv'
// Load environment variables
dotenv.config()

// interface Config {
//     user: string | undefined
//     password: string | undefined
//     server: string | undefined
//     database: string | undefined
//     options: {
//         trustedconnection: boolean
//         enableArithAbort: boolean
//         trustServerCertificate: boolean
//     }
//     port: number | string | undefined
// }

const config: any = {
    user: process.env.DB_USER, // ชื่อผู้ใช้ของ SQL Server
    password: process.env.DB_PASSWORD, // รหัสผ่านของ SQL Server
    server: process.env.DB_HOST, // ชื่อเซิร์ฟเวอร์หรือ IP Address ของ SQL Server
    database: process.env.DB_NAME, // ชื่อฐานข้อมูล
    options: {
        trustedconnection: true, // ใช้ windows authentication หรือ SQL Server Authentication
        enableArithAbort: true, // ใช้เพื่อป้องกัน SQL Injection
        trustServerCertificate: true // ใช้เพื่อป้องกัน SQL Injection
    },
    // convert to number
    port: parseInt(process.env.DB_PORT as string) // พอร์ตที่ใช้เชื่อมต่อกับ SQL Server
}

export default config