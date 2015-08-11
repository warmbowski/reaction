Meteor.publish('allSurveyQs', function(surveyId) {
  return SurveyQuestions.find({surveyId: surveyId});
});

SurveyQuestions.allow({
  insert: function(userId, doc) {
    return true;
  },

  update: function(userId, doc) {
    return true;
  }
});