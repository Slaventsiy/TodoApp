/**
 * Created by Vjaceslavs on 23/11/2015.
 */

var React = require('react');
var TodolistStore = require('../stores/TodolistStore');
var Lists = require('./Lists.react');

function getTodolistState(){
    return {
        allTodolists: TodolistStore.getAll()
    };
}

var Content = React.createClass({

    getInitialState: function(){
        return getTodolistState();
    },

    componentDidMount: function() {
        TodolistStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodolistStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return(
            <section id="content">
                <Lists
                    allTodolists = {this.state.allTodolists}
                />
            </section>
        );
    },

    _onChange: function() {
        this.setState(getTodolistState());
    }
});

module.exports = Content;