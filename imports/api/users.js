import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import bcrypt from 'bcrypt';
import SimpleSchema from 'simpl-schema';

export const Users = new Mongo.Collection("users");

// Import fibers futrure packages
const Future = Npm.require('fibers/future');

const Schema = {};

Schema.User = new SimpleSchema({
    name : {
        type : String,
        max : 50,
        min : 10,
        required : true 
    },
    email : {
        type : String,
        max : 100,
        min : 10,
        unique : true,
        required : true
    },
    password : {
        type : String,
        max : 200,
        min : 10,
        required : true
    }
});

Users.attachSchema(Schema.User);

Meteor.methods({
    'addUser' : function(name, email, password) {
        const future = new Future();
        bcrypt.hash(password, 10).then(function(res){
            if(res) {
                Users.insert({
                    name ,
                    email ,
                    password : res
                }, (err, iRes)=>{
                        if(err) {
                            future.throw(err);
                        }
                        else {
                            future.return(iRes);
                        }
                    });
            }
        }).catch(function(err) {
            future.return(false);
        });

        return future.wait();
    },
    'findUser' : function(email, pass) {
        if(Users.find({email : email}).fetch()) {
            let password = Users.findOne({email : email}).password;
            if(bcrypt.compareSync(pass, password))
                return true;
            else 
                return false;
        }
        else {
            return false;
        }
    }
});