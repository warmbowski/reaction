Meteor.publish('allSuggestions', function(count, surveyId) {
  return Suggestions.find({surveyId: surveyId}, {sort: {createdAt: -1}, limit: count});
});

Suggestions.allow({
  insert: function(userId, doc) {
    return (doc.suggest !== '');
  },

  remove: function(userId, doc) {
    return (userId === doc.createdBy);
  },

  update: function(userId, doc, field, mod) {
    console.log((field.length === 1 && field[0] === 'markedRead'));
    return (field.length === 1 && field[0] === 'markedRead');
  }
});
