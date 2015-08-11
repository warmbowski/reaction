SurveyList = React.createClass({
  mixins: [ DDPMixin, ReactiveMixin ],

  subscriptions: function() {
    return Meteor.subscribe('allSurveyQs', Session.get('route'));
  },

  getReactiveState: function() {
    return {
      surveyQs: SurveyQuestions.find({}).fetch()
    };
  },

  render: function() {
    var questionList = this.state.surveyQs.map(function(question) {
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
