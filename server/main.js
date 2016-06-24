import { Meteor } from 'meteor/meteor';

import { Linker } from '../imports/linker/api.js';

Meteor.publish('linker', function(){
  return Linker.find({});
});

Meteor.startup(() => {
  // code to run on server at startup
});
