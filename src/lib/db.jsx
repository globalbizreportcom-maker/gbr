// lib/db.js
import { Pool } from 'pg';

let pool;

const poolConfig = {
    host: process.env.PG_HOST_REMOTE || "195.35.23.249",
    port: Number(process.env.PG_PORT) || 5432,
    database: process.env.PG_DATABASE || "gbr",
    user: process.env.PG_USER || "gbr_user",
    password: process.env.PG_PASSWORD || "6!qZe@8.gwZ,F?Y",
    // max: 20,                          // Crucial limit for lakhs of requests
    idleTimeoutMillis: 0,          // Close inactive connections after 30s
    connectionTimeoutMillis: 0,     // Fail quickly if connection hangs
    // 👇 ADD THIS BLOCK TO FORCE ENCRYPTION
    ssl: {
        rejectUnauthorized: false // Allows self-signed certificates used by remote hosts
    }
};

if (process.env.NODE_ENV === 'production') {
    pool = new Pool(poolConfig);
} else {
    // Preserves the single instance across dev hot-reloads
    if (!global._postgresPool) {
        global._postgresPool = new Pool(poolConfig);
    }
    pool = global._postgresPool;
}

export default pool;