import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './users.html';

Template.user_signup.events({
  'click .js-signup-submit'(event) {
    console.log(event);
  },
});

Template.user_login.events({
  'click .js-login-submit'(event) {
    event.preventDefault();
    const formData = event.target.form;
    const username = formData[0].value;
    const password = formData[1].value;
    Meteor.loginWithPassword(username,
      password,
      (err) => {
        if (err) console.log(err);
        else console.log('all fine');
      }
    );
  },
  'click .js-logout-submit'(){
    Meteor.logout();
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
