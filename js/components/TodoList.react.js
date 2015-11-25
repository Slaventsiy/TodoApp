/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 * @param {string} todolistid - the id of the list
 */
function getTodoState(todolistid) {
    return {
        allTodos: TodoStore.getAll(todolistid),
        areAllComplete: TodoStore.areAllComplete(todolistid)
    };
}

var TodoList = React.createClass({

    getInitialState: function () {
        var todolistid = this.props.todolist.id;
        return getTodoState(todolistid);
    },

    componentDidMount: function () {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var todolist = this.props.todolist;

        var input;
        if (this.state.isEditing) {
            input =
                <TodoTextInput
                    className="edit"
                    onSave={this._onSave}
                    value={todolist.text}
                />;
        }

        return (
            <li className="todolist" key={todolist.id}>
                <Header
                    todolist={todolist}
                />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                    listid={todolist.id}
                />
                {input}
                <Footer
                    allTodos={this.state.allTodos}
                    listid={todolist.id}
                />
            </li>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function () {
        var todolistid = this.props.todolist.id;
        this.setState(getTodoState(todolistid));
    }

});

module.exports = TodoList;
