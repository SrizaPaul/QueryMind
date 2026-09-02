import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "querymind",
  port: 3306,
});

const testMySQLConnection = async () => {
  try {
    const connection = await mysqlPool.getConnection();

    console.log("✅ MySQL Connected");

    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed");
    console.error(error.message);
  }
};

testMySQLConnection();

export default mysqlPool;