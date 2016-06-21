import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './users.html';

Template.user_signup.events({
  'click .js-signup-submit'(event) {
    console.log(event);
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
