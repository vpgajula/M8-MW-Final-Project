const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// need the following route to send the add new customer form to the browser
router.route('/addLoanForm')
     .get(loanController.addLoanForm);

router.route('/')
    //.get(loanController.getLoan)
    .get(loanController.getAllLoans)
    .post(loanController.createLoan)

router.route('/:id')
    .get(loanController.getLoanById)
    .patch(loanController.updateLoanById)
    .put(loanController.updateLoanById)
    .delete(loanController.deleteLoanById);

module.exports = router;
