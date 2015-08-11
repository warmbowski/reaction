SurveyState = React.createClass({
  mixins: [ DDPMixin, ReactiveMixin ],

  subscriptions: function() {
    return Meteor.subscribe('survey', Session.get('route'));
  },

  getReactiveState: function() {
    return {
      survey: Surveys.findOne({})
    };
  },

  componentDidMount: function() {
    
  },

  render: function() {
    console.log(this.state.survey);
    if (this.state.survey.surveyState === 'hide') {
      $('#survey-container').addClass('hide-survey');
    } else {
      $('#survey-container').removeClass('hide-survey');
    }

    return (
      <section>
        {this.state.survey.surveyState}
      </section>
    );
  }
});