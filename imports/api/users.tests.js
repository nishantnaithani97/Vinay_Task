import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Users } from './users.js';
 

if (Meteor.isServer) {
  describe('Users', () => {
    describe('methods', () => {
      let user;
      before(() => {
        Users.remove({});
        console.log("Users in db : " + Users.find().count());
      });
      it('Register User', () => {
      let name = 'Nishant Naithani';
      let email= 'nishant@gmail.com';
      let pass= 'Nishant@123';
      Meteor.call('addUser', name, email, pass);
      assert.equal(Users.find({}).count(), 1);
      console.log("Users in db : " + Users.find().count());
      });
      it('Register User', () => {
        let name = 'Nishant Naithani';
        let email= 'nishan23t@gmail.com';
        let pass= 'Nishant@123';
        Meteor.call('addUser', name, email, pass);
        assert.equal(Users.find({}).count(), 2);
        console.log("Users in db : " + Users.find().count());
      });
      it('Register User', () => {
        let name = 'Task Test';
        let email= 'task@test.com';
        let pass= 'task@test';
        Meteor.call('addUser', name, email, pass);
        assert.equal(Users.find({}).count(), 3);
        console.log("Users in db : " + Users.find().count());
      });
    });
  });
}

