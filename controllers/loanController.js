const customerLoan = require('../models/loanModel');
const APIFeatures = require('./../dataBaseManager/loanDbContext');
const {check, validationResult} = require('express-validator');

exports.addLoanForm = async (req, res) => {
    //const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()});
    // }
    try {
        res.status(200).render('addLoan', {message: ``});
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Fail message from rendering add loan form',
            error: JSON.stringify(err)
        });
    }
};

exports.getLoanById = async (req, res) => {
    // get particular loan details from database
    const { id } = req.params;
    const customerloan = await customerLoan.find({ _id: id });
    res.status(200).json({
        status: 'Success',
        results: customerloan.length,
        data: {
            customerloan
        }
    });
};



exports.getAllLoans = async (req, res) => {
    try {
        // EXECUTE QUERY
        const features = new APIFeatures(customerLoan.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const customerloan = await features.query;

        // SEND RESPONSE
        //render on the browser
        res.status(200).render('allLoans', { customerloan });

        //display in portman
        // res.status(200).json({
        //     status: 'success',
        //     results: customerloan.length,
        //     data: {
        //         customerloan
        //     }
        // });

    } catch (error) {
        console.error(error)
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.createLoan = async (req, res) => {
    const newLoan = req.body;

    try {
        const customerloan = await customerLoan.create(newLoan)
        // res.status(201).json({
        //     status: 'Success',
        //     data: customerloan
        // });
        res.status(200).render('addLoan', {message: `Loan: ${customerloan.loanNumber} created successfully!`});
        //res.send('Hello World from customerloan POST');
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};


exports.updateLoanById = async (req, res) => {
    const newloan = req.body;
    const dateTime = new Date().toISOString();
    const newcustomerloan = { ...newloan, modifiedDate: dateTime };

    try {
        const customerloan = await customerLoan.findByIdAndUpdate(req.params.id, newcustomerloan, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                customerloan
            }
        });
        //res.send('Hello World from customerloan UpdateByLoanId');
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.deleteLoanById = async (req, res) => {
    try {
        await customerLoan.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'Document successfully deleted!',
            data: null
        });
        //res.send('Hello World from customerloan DELETE');
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};
