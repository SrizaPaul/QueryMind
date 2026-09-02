import mysqlPool from "../config/mysql.js";

// Get all employees
export const getMySQLEmployees = async (req, res) => {
  try {
    const [employees] = await mysqlPool.query(
      "SELECT * FROM employees"
    );

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.error("MySQL GET Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new employee
export const createMySQLEmployee = async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;

    const [result] = await mysqlPool.query(
      `INSERT INTO employees (name, email, department, salary)
       VALUES (?, ?, ?, ?)`,
      [name, email, department, salary]
    );

    const [newEmployee] = await mysqlPool.query(
      "SELECT * FROM employees WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: newEmployee[0],
    });
  } catch (error) {
    console.error("MySQL POST Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an employee
export const updateMySQLEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;

    const [result] = await mysqlPool.query(
      `UPDATE employees
       SET name = ?, email = ?, department = ?, salary = ?
       WHERE id = ?`,
      [name, email, department, salary, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const [updatedEmployee] = await mysqlPool.query(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      data: updatedEmployee[0],
    });
  } catch (error) {
    console.error("MySQL PUT Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an employee
export const deleteMySQLEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await mysqlPool.query(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("MySQL DELETE Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};