const express = require("express");

const router = express.Router();
const userRoutes = require("./../controllers/user.controller")();
const User = require("../models/user.model");

router.use('/users/:userId', (req, res, next) => {
    //console.log(id);
    User.findById(req.params.userId, (err, user) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).send('Not Found');
        }
        
    });
    
});
router.route('/users')
    .post(userRoutes.createUser)
    .get(userRoutes.getUsers)

router.route('/user')
    .get(userRoutes.getUser);

router.route('/users/:userId')
    .get(userRoutes.getUserById)
    .put(userRoutes.updateUser)
    .delete(userRoutes.deleteUser)
    .patch(userRoutes.patchUser)
    .get(userRoutes.getUser);

module.exports = router;