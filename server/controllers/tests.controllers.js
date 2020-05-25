const Test = require('../models/Test');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const tests = await Test.find({});

    res.status(200).json({
      status: "Tests uploaded successfully",
      tests
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

module.exports.create = async (req, res) => {
  console.log("Server");
  console.log(req);
  try {
    console.log(req.body);
    console.log(req.headers.authorization);
    const userId = req.user.id;
    const {title, topic, questions} = req.body;

    const newTest = new Test({
      created_by: userId,
      title,
      topic,
      questions,
    });

    await newTest.save();

    res.status(200).json({
      status: 'Test created successfully'
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

module.exports.getUserTests = async (req, res) => {
  try {
    const userId = req.user.id;
    const tests = await Test.find({created_by: userId});

    res.status(200).json({
      status: 'Tests uploaded successfully',
      tests,
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

module.exports.deleteById = async (req, res) => {
  try {
    const testId = req.params.id;
    const userId = req.user.id;

    const test = await Test.findById(testId);

    if(!test) {
      return res.status(400).json({
        status: "Test doesn't exist"
      });
    }

    if (test.created_by !== userId) {
      return res.status(403).json({
        status: 'Access rejected'
      });
    }

    await Test.findByIdAndDelete(testId);
    res.status(200).json({
      status: "Test deleted successfully",
    })
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

module.exports.updateById = async (req, res) => {
  try {
    const testId = req.params.id;
    const userId = req.user.id;

    const {title, topic, questions} = req.body;

    const test = await Test.findById(testId);

    if(!test) {
      return res.status(400).json({
        status: "Test doesn't exist"
      });
    }

    if (test.created_by !== userId) {
      return res.status(403).json({
        status: 'Access rejected'
      });
    }

    await test.update({title, topic, questions});
    await test.save();
    res.status(200).json({
      status: 'Test updated successfully'
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};
