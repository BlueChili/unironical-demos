import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Global UI components templates
import './index.html';
import './index-links.html';
import './unironicalNav.html';
import './user-flow/users.js';

// Entry point for apps
import './linker/index.js';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('root', {main: 'index_links'});
  },
});

FlowRouter.route('/linker', {
  name: 'Linker',
  action() {
    BlazeLayout.render('root', { main: 'linker_main'});
  },
});

