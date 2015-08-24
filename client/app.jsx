Meteor.startup(function () {
  
  var hash = location.hash;
  if(hash === '') hash = '#99999'
  Session.set('route', hash.substring(1));
  console.log(Session.get('route'));

  if (!(localStorage.getItem('deviceId'))) {
    var newId = new Meteor.Collection.ObjectID();
    localStorage.setItem('deviceId', newId._str);
  }
  var myId = localStorage.getItem('deviceId');
  Session.set('deviceId', myId);
  Meteor.call('setUserId', myId);
  Session.set('adminId', false);

  React.render(<SuggestionInputList />, document.getElementById('suggestion-box'));
  React.render(<SurveyList />, document.getElementById('survey-questions'));

  window.React = React;
});
