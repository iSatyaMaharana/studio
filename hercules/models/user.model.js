var mongoose = require("mongoose");
var Schema = mongoose.Schema;

 var UserSchema = new Schema({
    
    first_name :{
        type:String,
        required : true,
        
    },
    last_name :{
        type:String,
        required : true,
        
    },
    email :{
        type:String,
        required : true,
        trim: true,
        unique:true,
        match:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    
    mobile :{
        type:String,
        required : true
    },

    password: {
        type: String,
        required: true
    }
});



const User = module.exports = mongoose.model('User', UserSchema);
