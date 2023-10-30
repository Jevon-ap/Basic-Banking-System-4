const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.createAccount);
router.get('/', accountController.getAccounts);
router.get('/:accountId', accountController.getAccountById);

module.exports = router;