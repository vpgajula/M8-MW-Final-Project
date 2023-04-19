const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// need the following route to send the add new customer form to the browser
router.route('/addCustomerForm')
     .get(customerController.addCustomerForm);

router.route('/')
    .get(customerController.getAllCustomers)
    .post(customerController.createCustomer)

router.route('/:id')
    .get(customerController.getCustomerById)
    .patch(customerController.updateCustomerById)
    .put(customerController.updateCustomerById)
    .delete(customerController.deleteCustomerById);

module.exports = router;
