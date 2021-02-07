const BankController = require('../controllers/bank_controller');
const express = require('express');
const router = express.Router();

router.get('/', BankController.homePage);
router.get('/all_customers',BankController.allCustomerPage);
router.get('/transfer/:id',BankController.singleCustomerPage);

router.post('/transfer', BankController.transfer);

module.exports = router;