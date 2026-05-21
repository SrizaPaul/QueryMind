const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('../config/db');

// =========================
// REGISTER
// =========================

const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message: 'All fields required'

      });

    }

    // CHECK USER

    const existingUser =
      await pool.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (
      existingUser.rows.length > 0
    ) {

      return res.status(400).json({

        success: false,

        message: 'User already exists'

      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // INSERT USER

    await pool.query(
      `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      `,
      [
        name,
        email,
        hashedPassword
      ]
    );

    res.status(201).json({

      success: true,

      message: 'User registered successfully'

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: 'Server error'

    });

  }

};

// =========================
// LOGIN
// =========================

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await pool.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (
      user.rows.length === 0
    ) {

      return res.status(400).json({

        success: false,

        message: 'Invalid credentials'

      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.rows[0].password
      );

    if (!validPassword) {

      return res.status(400).json({

        success: false,

        message: 'Invalid credentials'

      });

    }

    // JWT TOKEN

    const token = jwt.sign(

      {
        id: user.rows[0].id,
        email: user.rows[0].email
      },

      'querymind_secret_key',

      {
        expiresIn: '7d'
      }

    );

    res.status(200).json({

      success: true,

      token

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: 'Server error'

    });

  }

};

module.exports = {

  register,

  login

};