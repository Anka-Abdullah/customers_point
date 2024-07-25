const pool = require('../config/db');

const createCustomer = async (customer) => {
    const { nm_customer, id_point, point_type, point_customer, no_hp_customer, address_customer, point_amount } = customer;
  
        const client = await pool.connect();
    try {
      await client.query('BEGIN');   
            const customerResult = await client.query(
        `INSERT INTO customer_point (nm_customer, id_point, point_type, point_customer, no_hp_customer, address_customer)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_customer`,
        [nm_customer, id_point, point_type, point_customer, no_hp_customer, address_customer]
      );
  
      const id_customer = customerResult.rows[0].id_customer;
  
            await client.query(
        `INSERT INTO point_details (id_customer, id_point, point_amount, transaction_type, transaction_date)
        VALUES ($1, $2, $3, 'IN', NOW())`,
        [id_customer, id_point, point_amount]
      );
  
      await client.query('COMMIT');   
      return {
        id_customer,
        nm_customer,
        point_amount
      };
    } catch (error) {
      await client.query('ROLLBACK');       throw error;
    } finally {
      client.release(); 
    }
  };

const getCustomerById = async (id_customer) => {
  const result = await pool.query(
    `SELECT id_customer, nm_customer, id_point, no_hp_customer, address_customer FROM customer_point WHERE id_customer = $1`, [id_customer]
  );
  return result.rows[0];
};

const getPointDetailsByCustomerId = async (id_customer) => {
  const result = await pool.query(
    `SELECT id_point_detail, point_amount, transaction_date, transaction_type FROM point_details WHERE id_customer = $1`, [id_customer]
  );
  return result.rows;
};

const getTotalPointsByCustomerId = async (id_customer) => {
  const result = await pool.query(
    `SELECT COALESCE(SUM(point_amount), 0) AS total_points FROM point_details WHERE id_customer = $1 AND transaction_type = 'IN'`, [id_customer]
  );
  return result.rows[0].total_points;
};

module.exports = {
  createCustomer,
  getCustomerById,
  getPointDetailsByCustomerId,
  getTotalPointsByCustomerId,
};
