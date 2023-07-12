const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res.status(400).json({ message: 'Amount must be a psotive number' });
    }
    await expense.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: 'Expense Deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error' });
    });
};
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  ExpenseSchema.findByIdAndUpdate(id, updateData)
    .then((expense) => {
      if (expense) {
        res.status(200).json({ message: 'Expense Updated' });
      } else {
        res.status(404).json({ message: 'Expense Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error' });
    });
};
