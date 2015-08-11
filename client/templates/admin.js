Template.registerHelper('_', function(){
    return _
});

Template.admin.onCreated(function() {
  var self = this
  self.autorun(function() {
    self.subscribe('survey', Session.get('route'));
  });
});

Template.admin.helpers({
  showForAdmin: function() {
    var testForAdmin = SurveyQuestions.findOne({});
    if(testForAdmin) {
      var isAdmin = (Session.get('deviceId') === testForAdmin.surveyorId || testForAdmin.surveyorId === '77777');
      Session.set('isAdmin', isAdmin);
    }

    if(Session.get('isAdmin')) {
      return Session.get('isAdmin');
    }
  },

  surveyShowState: function() {
    var survey = Surveys.findOne();

    if(typeof survey === 'undefined') {
      return 'show';
    } else {
      if (survey.surveyState === 'hide') {
        $('#survey-container').addClass('hide-survey');
        $('#suggestions-container').addClass('hide-survey');
      } else {
        $('#survey-container').removeClass('hide-survey');
        $('#suggestions-container').removeClass('hide-survey');
      }
      return survey.surveyState;
    }
  }
});

Template.admin.events ({
  'click #duplicate': function(evt, tmp) {
    var conf = window.confirm('Do you want to create a fresh copy of the current survey?');
      if (conf == true) {
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
  },

  'click .survey-on-off': function(evt, tmp) {
    var survey = Surveys.findOne();
    
    if(typeof survey === 'undefined') {
      Surveys.insert({surveyId: Session.get('route'), surveyState: 'hide'});
    } else {
      if(survey.surveyState === 'show') {
        Surveys.update({_id: survey._id}, {$set: {surveyState: 'hide'}});
      } else {
        Surveys.update({_id: survey._id}, {$set: {surveyState: 'show'}});
      }
    }
  }
});