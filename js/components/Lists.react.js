/**
 * Created by Vjaceslavs on 24/11/2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoList = require('./TodoList.react');

var Lists = React.createClass({

    propTypes: {
        allTodolists: ReactPropTypes.object.isRequired
    },

    render: function() {

        if (Object.keys(this.props.allTodolists).length < 1) {
            return null;
        }

        var allTodolists = this.props.allTodolists;
        var todolists = [];

        for (var key in allTodolists) {
            todolists.push(<TodoList key={key} todolist={allTodolists[key]} />);
        }

        return (
            <div>
                <ul> {todolists} </ul>
            </div>
        );
    }
});

module.exports = Lists;
