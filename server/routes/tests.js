const express = require('express');
const Router = express.Router;
const router = new Router;
//this code should be in config
const secret = 'someSecretCode';
const jwt = require('jsonwebtoken');
const Test = require('../models/Test');
const User = require('../models/User');

router.get('/tests/all', (req, res) => {
    Test.find({})
        .then((tests) => {
            res.status(200).json(tests);
        })
        .catch((err) => {
            return res.status(404).json({status: err.name});
        });
});


router.post('/tests', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const {userId} = jwt.verify(token, secret);

        const newTest = await new Test({
            created_by: userId,
            title: req.body.title,
            topic: req.body.topic,
            questions: req.body.questions,
        });

        await newTest.save();

        res.status(200).json({message: 'new test created', test: newTest});
    } catch (e) {
        res.status(500).json({message: `Error: ${e}`});
    }
});


router.get('/tests', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const {userId} = jwt.verify(token, secret);

        const user = await User.findById(userId);

        if (user) {
            await Test.find({created_by: userId})
                .then((tests) => {
                    res.status(200).json({'status': 'Success', 'tests': tests});
                })
                .catch((err) => {
                    return res.status(404).json({status: err.name});
                });
        } else {
            return res.status(404).json({status: err.name});
        }
    } catch (e) {
        return res.status(404).json({status: e.name});
    }
});

router.delete('/tests/:id', async (req, res) => {
  const testId = req.params.id;
  const token = req.headers.authorization;
  const {userId} = jwt.verify(token, secret);

    const test = await Test.findOne({_id: testId});

    if (String(test.created_by) !== userId ) {
        return res.status(403).json({message: 'Access rejected'});
    }

    await Test.deleteOne({_id: testId})
        .then(()=>{
            res.status(200).json({message: 'Deleted is done'});
        })
        .catch((e)=>{
            return res.status(404).json({status: e.name});
        });
});

router.patch('/tests/:id', async (req, res) => {
    try {
      const testId = req.params.id;
      const token = req.headers.authorization;
      const {userId} = jwt.verify(token, secret);
        const {
            title,
            topic,
            questions
        } = req.body;

        const test = await Test.findById(testId);

        if (test) {
            if (String(test.created_by) !== userId ) {
                return res.status(403).json({message: 'Access rejected'});
            }

            test.title = title;
            test.topic = topic;
            test.questions = questions;

            await  test.save();
            return res.status(200).json({message: 'Test updated', test});
        } else {
            return res.status(404).json({message: 'Test not found'});
        }
    } catch (e) {
        return res.status(404).json({message: e.name});
    }
});

module.exports = router;


