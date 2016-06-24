import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

export const Linker = new Mongo.Collection('linker');

Meteor.methods({
  addSite: function(site){
    if (!this.userId) throw new Meteor.error('only registered users can submit sites');
    check(site.name, nonEmptyString);
    check(site.url, nonEmptyString);
    console.log(site);

    Linker.insert({
      name: site.name,
      url: site.url,
      comments: 0,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date(),
      owner: this.userId,
    });
  },
});

const nonEmptyString = Match.Where(function(x){
  check(x, String);
  return x.length > 0;
});
