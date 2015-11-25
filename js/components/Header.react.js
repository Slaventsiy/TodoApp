var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodolistActions = require('../actions/TodolistActions');
var TodoTextInput = require('./TodoTextInput.react');
var classNames = require('classnames');

var Header = React.createClass({

    getInitialState: function () {
        return {
            isEditing: false
        };
    },

    propTypes: {
        todolist: ReactPropTypes.object.isRequired
    },

    render: function () {
        var todolist = this.props.todolist;

        var input;
        if (this.state.isEditing) {
            input =
                <TodoTextInput
                    className="listname-edit"
                    onSave={this._onSaveList}
                    value={todolist.text}
                />;
        }
        return (
            <header className={classNames({
                'list-header': 'list-header',
                'editing':this.state.isEditing
                })} >
                {input}
                <h1 onDoubleClick={this._onDoubleClick}>{todolist.text}</h1>
                <button className="destroy" onClick={this._onDestroyClick} />
                <TodoTextInput
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onSave={this._onSave}
                />
            </header>
        );
    },

    /**
     * Event handler called within TodoTextInput.
     * Creates a new TODO in the specified list
     * @param {string} text - the name of the TODO
     */
    _onSave: function (text) {
        var listid = this.props.todolist.id;
        if (text.trim()) {
            TodoActions.create(text, listid);
        }
    },

    /**
     * Event handler called within TodoTextInput.
     * Changes the name of the specified list
     * @param {string} text - the new name of the TODOlist
     */
    _onSaveList: function(text) {
        var listid = this.props.todolist.id;
        if (text.trim()){
            TodolistActions.update(text, listid);
            this.setState({isEditing: false});
        }
    },

    /**
     * Allows to change the name of the list.
     */
    _onDoubleClick: function () {
        this.setState({isEditing: true});
    },

    /**
     * Delete the specified list and all the associated TODOs
     */
    _onDestroyClick: function() {
        var listid = this.props.todolist.id;
        TodolistActions.destroy(listid);
        TodoActions.destroyFromList(listid);
    }
});

module.exports = Header;
