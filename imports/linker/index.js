import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Linker } from './api.js';

import './api.js';
import './index.html';

Template.linker_main.onCreated(function(){
  Meteor.subscribe('linker');
});

Template.linker_main.helpers({
  sites(){
    return Linker.find({});
  },
});

Template.linker_site_submit.onRendered(function(){
  this.$('.lss-form').slideUp(0);
  this.$('.js-site-submit').hide(0);
});

Template.linker_site_submit.events({
  'click .js-site-add'(){
    const el = $('.lss-form');
    const tog = $('.js-site-add');
    el.slideToggle(300);
    $('.js-site-submit').fadeToggle(550);
    window.setTimeout(function(){
      let togText = tog.text() == '+' ? tog.text('−') : tog.text('+');
    }, 400);
  },
  'click .js-site-submit'(event){
    event.preventDefault();
    const site = {
      name: $('.js-site-name').val(),
      url: $('.js-site-url').val(),
    };
    console.log(site);
    console.log(typeof site.name);
    Meteor.call('addSite', site, function(err){
      if (err) throw new Meteor.error(err.reason);
      else {
        console.log('site record inserted successfuly');
        $('.js-site-name').val('');
        $('.js-site-url').val('');
      }
    });
  },
});
// FlowRouter.route('/linker/:id', {
//   name: 'Site',
//   action: function(params) {
//     console.log(params);
//   },
// });
