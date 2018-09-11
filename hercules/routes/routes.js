const express = require("express");
const router = express.Router();

 const User = require("../models/user.model");

router.get('/users', (req, res, next) => {
   // var query = req.query;
   //sanitize the request on random query param
   var query = {}
   if(req.query.phone) {
       query.phone = req.query.phone;
   }
    Contact.find(query, function(err, contacts) {
        if(err)  {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(contacts);
        }
        
    });
    
});

router.use('/users/:id', (req, res, next) => {
    
    Contact.findById(req.params.contactId, (err, contact) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if (contact) {
            req.contact = contact;
            next();
        } else {
            res.status(404).send('Not Found');
        }
        
    });
    
});

router.route('/users/:id')
.put((req, res) => {

    
    // Contact.findByIdAndUpdate(req.params.contactId, req.body, function(err, contact) {
    //     if(err)  {
    //         console.log(err);
    //         res.status(500).send(err);
    //     } else {
    //        // contact.save(contact); 
    //         res.json(contact);
    //     }
        
    // });
    
    req.contact.first_name = req.body.first_name;
    req.contact.last_name = req.body.last_name;
    req.contact.phone = req.body.phone;
    req.contact.save((err) => {
        if(err) {
            res.status(500).send(err);
        }else {
            res.json(req.contact);
        }
    });
    

})

.get((req, res, next) => {
    
     Contact.findById(req.params.contactId, function(err, contact) {
         if(err)  {
             console.log(err);
             res.status(500).send(err);
         } else {
             res.json(contact);
         }
         
     });
     
 })
 .patch((req,res) => {
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
 });

router.post('/users', (req, res, next) => {
    let newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err, contact) => {
        if(err) {
            res.json({msg : "Failed to add Contact"});
        } else {
            res.status(201).send({result : contact, msg : "Contact added Successfully" });
        }

    });
});

router.delete('/users/:id', (req, res, next) => {
    Contact.remove({_id : req.params.id}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

module.exports = router;