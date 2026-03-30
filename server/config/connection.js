/*global process*/
import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
 connectionString: process.env.DB_URL,
 ssl: {
  rejectUnauthorized: true,
 },
})

pool.connect(() => {
 try {
  console.log('🌱 Dataga ulandi.')
 } catch (error) {
  console.log('🔥 Dataga ulanishda xatolik:', error)
 }
})

export default pool
