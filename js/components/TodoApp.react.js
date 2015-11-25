/**
 * Created by Vjaceslavs on 23/11/2015.
 */

var React = require('react');
var Menu = require('./Menu.react.js');
var Content = require('./Content.react.js');

var TodoApp = React.createClass({

    render: function () {
        return (
            <div>
                <Menu />
                <Content />
            </div>
        );
    }
});

module.exports = TodoApp;
