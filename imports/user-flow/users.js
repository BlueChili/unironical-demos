import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import './users.html';

let isSigning = new ReactiveVar(false);

Template.user_panel.events({
  'click .js-signup-submit'(event) {
    event.preventDefault();
    const formData = event.target.form,
          username = formData[0].value,
          email = formData[1].value,
          password = formData[2].value;
    Accounts.createUser({
      username: username,
      email: email,
      password: password},
      function(err){
       if (err) throw err.reason;
       else console.log('no error');
      }
    );
  },
  'click .js-login-submit'(event) {
    event.preventDefault();
    const formData = event.target.form;
    const username = formData[0].value;
    const password = formData[1].value;
    Meteor.loginWithPassword(
      username,
      password,
      (err) => {
        if (err) console.log(err);
        else console.log('all fine');
      }
    );
  },
  'click .js-logout-submit'(){ Meteor.logout(); },
  'click .js-register'() {
    isSigning.set(true); return false;
  },
  'click .js-login-flow'() {
    isSigning.set(false); return false;
  },
});

Template.user_panel.helpers({
  signing: function(){
    return isSigning.get();
  },
});

FlowRouter.route('/signup', {
  name: 'Signup',
  action: (params, queryParams) => {
    const { email, username, password } = queryParams;
    Accounts.createUser({
      username: username,
      email: email,
      password: password},
      function(err){
       if (err) {
         throw err.reason;
       } else {
         console.log('no error');
       }
      }
    );
  },
});
