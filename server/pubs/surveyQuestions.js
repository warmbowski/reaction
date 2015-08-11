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


Meteor.publish('survey', function(surveyId) {
  return Surveys.find({surveyId: surveyId});
})

Surveys.allow({
  insert: function(userId, doc) {
    return true;
  },

  update: function(userId, doc) {
    return true;
  }
});