var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');

var Footer = React.createClass({

    propTypes: {
        allTodos: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return{
            hidden: false
        };
    },

    render: function () {
        var allTodos = this.props.allTodos;
        var total = Object.keys(allTodos).length;

        if (total === 0) {
            return null;
        }

        var completed = 0;
        for (var key in allTodos) {
            if (allTodos[key].complete) {
                completed++;
            }
        }

        var itemsLeft = total - completed;
        var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';

        // Undefined and thus not rendered if no completed items are left.
        var clearCompletedButton, hideCompletedButton;
        if (completed) {
            clearCompletedButton =
                <button
                    className="clear-completed"
                    onClick={this._onClearCompletedClick}>
                    Clear completed ({completed})
                </button>;
            hideCompletedButton =
                <button
                    className="hide-completed"
                    onClick={this._onToggleHideCompletedClick}>
                    {this.state.hidden ? "Show" : "Hide"} completed ({completed})
                </button>;
        }

        return (
            <footer className="list-footer">
        <span className="todo-count">
          <strong>
              {itemsLeft}
          </strong>
            {itemsLeftPhrase}
        </span>
                {hideCompletedButton}
                {clearCompletedButton}
            </footer>
        );
    },

    /**
     * Event handler to delete all completed TODOs
     */
    _onClearCompletedClick: function () {
        var listid = this.props.listid;
        TodoActions.destroyCompleted(listid);
        this.setState({hidden: false});
    },

    /**
     * Event handler to hide or show completed TODOs
     */
    _onToggleHideCompletedClick: function() {
        var listid = this.props.listid;
        TodoActions.toggleHideCompleted(listid);
        this.setState({hidden: !this.state.hidden});
    }
});

module.exports = Footer;
