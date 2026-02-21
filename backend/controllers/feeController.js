const { FeeStructure, FeeInvoice, Payment } = require('../models');

exports.createStructure = async (req, res, next) => {
  try {
    const data = await FeeStructure.create(req.body);
    res.status(201).json(data);
  } catch (e) { next(e); }
};

exports.generateInvoice = async (req, res, next) => {
  try {
    const invoiceNo = `INV-${Date.now()}`;
    const invoice = await FeeInvoice.create({ ...req.body, invoiceNo });
    res.status(201).json(invoice);
  } catch (e) { next(e); }
};

exports.recordPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create({ ...req.body, recordedBy: req.user.id });
    res.status(201).json(payment);
  } catch (e) { next(e); }
};
