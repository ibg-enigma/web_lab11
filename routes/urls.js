const {Router} = require('express');
const User = require('../models/User');
const router = Router();

router.get('/', async (req, res) => {
    const users = await User.find({}).lean();

    res.render('index', {
       title: 'Users list',
       isIndex: true,
       users 
    });
});

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add user',
        isAdd: true
    });
});

router.post('/add', async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age
    });

    await user.save();
    res.redirect('/');
});

router.post('/remove', async (req, res) => {
    await User.deleteOne({_id: req.body.id});

    res.redirect('/');
});

module.exports = router;