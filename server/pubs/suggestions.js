Meteor.publish('allSuggestions', function(count, surveyId) {
  return Suggestions.find({surveyId: surveyId}, {sort: {createdAt: -1}, limit: count});
});

Suggestions.allow({
  insert: function(userId, doc) {
    return (doc.suggest !== '');
  },

  remove: function(userId, doc) {
    return (userId === doc.createdBy);
  }
});
