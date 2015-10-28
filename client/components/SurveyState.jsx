SurveyState = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData: function() {
    Meteor.subscribe('survey', Session.get('route'));
    return {
      survey: Surveys.findOne({})
    };
  },

  componentDidMount: function() {
    
  },

  render: function() {
    console.log(this.data.survey);
    if (this.data.survey.surveyState === 'hide') {
      $('#survey-container').addClass('hide-survey');
    } else {
      $('#survey-container').removeClass('hide-survey');
    }

    return (
      <section>
        {this.data.survey.surveyState}
      </section>
    );
  }
});