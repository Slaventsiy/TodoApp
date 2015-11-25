/**
 * Created by Vjaceslavs on 23/11/2015.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodolistConstants = require('../constants/TodolistConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todolists = {
    1: {id: 1, text: "first"},
    2: {id: 2, text: "second"}
};

/**
 * Create a TODOlist.
 * @param  {string} text - The name of the TODOlist
 */
function create(text) {
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todolists[id] = {
        id: id,
        text: text
    };
}

/**
 * Change the name of the list to the new one
 * @param {string} text - the new name
 * @param {string} listid - the list id
 */
function update(text, listid){
    _todolists[listid].text = text;
}

/**
 * Delete the list
 * @param {string} listid - the list id
 */
function destroy(listid){
    delete _todolists[listid];
}

var TodolistStore = assign({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of TODOlists.
     * @return {object}
     */
    getAll: function() {
        return _todolists;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;
    switch(action.actionType) {
        case TodolistConstants.TODOLIST_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
                TodolistStore.emitChange();
            }
            break;
        case TodolistConstants.TODOLIST_UPDATE:
            text = action.text.trim();
            if (text != ''){
                update(text, action.listid);
                TodolistStore.emitChange();
            }
            break;
        case TodolistConstants.TODOLIST_DESTROY:
            destroy(action.listid);
            TodolistStore.emitChange();
            break;

        default:
    }
});

module.exports = TodolistStore;