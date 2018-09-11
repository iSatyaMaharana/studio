const User = require("../models/user.model");

let userRoutes = () => {
    
let createUser = (req, res, next) => {
    console.log(req.body);
    console.log(req.body.firstName);
    let user = new User({
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    });

    console.log(user);
    
    user.save((err) => {
        if(err) {
            next(err);
        } else {
            res.status(201).send({message : "User has been created Successfully", results: [user]});
        }
    });
};

let updateUser = (req, res, next) => {
    console.log(req.body);
    req.user.first_name = req.body.firstName;
    req.user.last_name = req.body.lastName;
    req.user.email = req.body.email;
    req.user.mobile = req.body.mobile;
    req.user.save((err, result) => {
        if(err) {
            next(err);
        }else {
            console.log(req.user);
            res.status(201).send({message : "User has been updated Successfully", results: [req.user]});
        }
    });
};

let deleteUser = (req, res, next) => {
    console.log(req);
    User.remove({_id : req.user._id}, (err, result) => {
        if(err) {
            next(err);
        } else {
            res.status(204).send({message : "User has been Deleted Successfully", results: [req.user]});
        }
    })
};

let getUsers = (req, res, next) => {
    //    var query = {}
    //    if(req.query.phone) {
    //        query.phone = req.query.phone;
    //    }
    let query  = req.query;
    User.find(query, (err, users) => {
        if(err) {
            next(err);
        } else {
            res.status(200).send({message : "Users has been fetched", results: users});
        }
    });
};

let getUserById = (req, res, next) => {
    console.log(req.user +"controller");
    res.status(200).send({message : "Users has been fetched", result: req.user});
};

let getUser = (req, res, next) => {
    let query = req.query;
    User.findOne(query, function (err, user) {
        if (err) {
          next(err);
        } else {
            res.status(200).send({message : "Users has been fetched", result: user});
        }
      });
};

let patchUser = (req,res, next) => {
    if(req.body._id)
        delete req.body._id;
    for(let p in req.body) {
        req.contact[p] = req.body[p];
    }

    req.contact.save((err) => {
        if(err) {
            res.status(500).send(err);
        }else {
            res.send(req.contact);
        }
    });
 };

 return { createUser, updateUser, deleteUser, getUsers, patchUser, getUser, getUserById };
};

module.exports = userRoutes;







