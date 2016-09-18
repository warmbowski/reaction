SuggestionsTransitionGroup = React.addons.CSSTransitionGroup;

SuggestionsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData: function() {
    Meteor.subscribe('allSuggestions', 50, Session.get('route'));
    return {
      suggestList: Suggestions.find({}, {sort: {createdAt: -1}}).fetch()
    };
  },

  handleDeleteClick: function(id) {
    return Suggestions.remove({_id: id});
  },

  handleReadClick: function(id) {
    if(Session.get('isAdmin')) {
      return Suggestions.update({_id: id}, {$set: {markedRead: 'is-read'}});
    }
  },

  render: function() {
    var self = this;
    var listItems = self.data.suggestList.map(function(item) {
      var adminMode = Session.get('isAdmin') ? 'admin-mode' : '';
      var isMine = item.createdBy === Session.get('deviceId') ? 'my-post' : 'your-post';

      return (
        <li key={item._id} className={isMine + ' ' + adminMode + ' ' + item.markedRead}>
          <a className="delete" onClick={self.handleDeleteClick.bind(self, item._id)}>
            <i className="fa fa-times"></i>
          </a>
          <i className="fa fa-paper-plane-o"> </i> {item.suggestion}
            <a className="mark-read" onClick={self.handleReadClick.bind(self, item._id)}>
              <i className="fa fa-hand-spock-o"></i>
            </a>
        </li>
      );
    });

    return (
      <ul id="suggestions">
        <SuggestionsTransitionGroup transitionName='fadein' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {listItems}
        </SuggestionsTransitionGroup>
      </ul>
    );
  }
});
