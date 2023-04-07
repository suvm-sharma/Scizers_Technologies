const User = require('../model/userModel');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    // 1A) Filtering
    const queryObj = { ...req.query };
    if (queryObj.name) {
      const searchTerm = queryObj.name;
      const regex = new RegExp(searchTerm, 'i'); // i is a regular expression flag that stands for "case-insensitive", a regular expression with the 'i' flag will match strings like 'Deepak', 'deepak', 'DEEPAK', and 'DeEpAk'.
      queryObj.name = regex; // /Shu/i
    }
    const query = User.find(queryObj).sort({ name: 1 });

    const allUser = await query;
    res.status(200).json({
      status: 'Success',
      result: allUser.length,
      data: {
        allUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
