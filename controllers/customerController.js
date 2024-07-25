const customerModel = require('../models/customerModel');

const createCustomer = async (req, res) => {
    try {
      const newCustomer = await customerModel.createCustomer(req.body);
      res.status(201).json({
        response_code: "00",
        message: "Berhasil menambahkan pelanggan",
        data: [newCustomer]
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getCustomerById = async (req, res) => {
    try {
      const customer = await customerModel.getCustomerById(req.params.id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      const totalPoints = await customerModel.getTotalPointsByCustomerId(req.params.id);
      const pointDetails = await customerModel.getPointDetailsByCustomerId(req.params.id);
  
      const response = {
        id_customer: customer.id_customer,
        total_point: totalPoints,
        id_point: customer.id_point,
        no_handphone: customer.no_hp_customer,
        alamat: customer.address_customer,
        point_details: pointDetails,
      };
  
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createCustomer,
  getCustomerById,
};
