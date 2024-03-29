var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      if (!allTodos[key].hidden) {
        todos.push(<TodoItem key={key} todo={allTodos[key]}/>);
      }
    }

    return (
      <section className="list-main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">{todos}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs in the list as complete
   */
  _onToggleCompleteAll: function() {
    var listid = this.props.listid;
    TodoActions.toggleCompleteAll(listid);
  }

});

module.exports = MainSection;
