# ขั้นตอนการ Build
FROM node:20-alpine as builder

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# คำสั่งติดตั้ง dependencies
RUN npm install --legacy-peer-deps

# คัดลอกไฟล์ทั้งหมด
COPY . .

# Build แอพพลิเคชั่น
RUN npm run build

# ขั้นตอนการ Production
FROM node:20-alpine

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# คัดลอกไฟล์ที่จำเป็นจาก builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY .env .env

# ติดตั้งเฉพาะ dependencies ที่ใช้ใน production
RUN npm install --only=production --legacy-peer-deps

# กำหนด port ที่ใช้งาน
EXPOSE 3000

# คำสั่งที่ใช้รันแอพพลิเคชั่น
CMD ["node", "dist/app.js"]