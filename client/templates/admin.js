Template.admin.helpers({
  showForAdmin: function() {
    var testQuestion = SurveyQuestions.findOne({});
    if(testQuestion) {
      return (Session.get('deviceId') === testQuestion.surveyorId || testQuestion.surveyorId === '77777');
    }
  }
});

Template.admin.events ({
  'click #duplicate': function(evt, tmp) {
    var newSurveyId = new Meteor.Collection.ObjectID()._str;
    var routeTo = window.location.origin + '/#' + newSurveyId

    SurveyQuestions.find({surveyId: Session.get('route')}).forEach(function(question) {
      var dupQuestion = {
        surveyId: newSurveyId,
        surveyorId: Session.get('deviceId'),
        question: question.question,
        choices: question.choices
      };

      _.forEach(question.choices, function(choice) {
        choice.value = 0;
        choice.voters = [];
      });
      console.log(dupQuestion);
      SurveyQuestions.insert(dupQuestion);
    });
    console.log(routeTo);
    setTimeout(function() {location.replace(routeTo); location.reload();}, 5000);
  }
});