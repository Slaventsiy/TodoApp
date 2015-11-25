/**
 * Created by Vjaceslavs on 23/11/2015.
 */
var React = require('react');
var TodolistActions = require('../actions/TodolistActions');
var TodoTextInput = require('./TodoTextInput.react');

var Menu = React.createClass({

    render: function() {
        return (
            <header id="menu">
                <TodoTextInput
                    id="new-todolist"
                    placeholder="Todolist name"
                    onSave={this._onSave}
                />
            </header>
        );
    },

    /**
     * Event handler called within TodoTextInput.
     * Creates a new list
     * @param {string} text - the name of the new list
     */
    _onSave: function(text) {
        if (text.trim()){
            TodolistActions.create(text);
        }
    }
});

module.exports = Menu;
