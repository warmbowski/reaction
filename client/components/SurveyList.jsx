SurveyList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData: function() {
    Meteor.subscribe('allSurveyQs', Session.get('route'));
    return {
      surveyQs: SurveyQuestions.find({}).fetch()
    };
  },

  render: function() {
    var questionList = this.data.surveyQs.map(function(question) {
      return (
        <SurveyQuestion key={'quest-' + question._id} question={question} />
      );
    });
    return (
      <section>
        {questionList}
      </section>
    );
  }
});
