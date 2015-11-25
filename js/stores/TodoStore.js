var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item in the specified list.
 * @param  {string} text - The content of the TODO
 */
function create(text, listid) {
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        listid: listid,
        complete: false,
        hidden: false,
        text: text
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates - An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object in the specified list.
 * @param  {object} updates - An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates, listid) {
    var todos = getRelevantTodos(listid);
    for (var id in todos) {
        update(id, updates);
    }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _todos[id];
}

/**
 * From the list of all TODOs gets only for the specified list
 * @param listid
 * @returns array of TODOs
 */
function getRelevantTodos(listid) {
    var todos = {};
    for (var id in _todos) {
        if (_todos[id].listid == listid) {
            todos[id] = _todos[id];
        }
    }
    return todos;
}

/**
 * Delete all the completed TODO items from the specified todolist.
 * @param {string} listid
 */
function destroyCompleted(listid) {
    var todos = getRelevantTodos(listid);
    for (var id in todos) {
        if (todos[id].complete) {
            destroy(id);
        }
    }
}

/**
 * Delete all the TODOs from the specified list
 * @param {string} listid
 */
function destroyFromList(listid){
    var todos = getRelevantTodos(listid);
    for (var id in todos){
        destroy(id);
    }
}

/**
 * Check if there are any TODOs hidden in the specified list
 * @param {string} listid
 * @returns {boolean}
 */
function areAnyHidden(listid){
    var todos = getRelevantTodos(listid);
    for (var id in todos){
        if (todos[id].hidden){
            return true;
        }
    }
    return false;
}

/**
 * Hide completed TODOs in the specified list
 * @param {string} listid
 */
function hideCompleted(listid){
    var todos = getRelevantTodos(listid);
    for (var id in todos){
        if (todos[id].complete){
            update(id, {hidden: true});
        }
    }
}

var TodoStore = assign({}, EventEmitter.prototype, {

    /**
     * Tests whether all the remaining TODO items are marked as completed.
     * @return {boolean}
     */
    areAllComplete: function (listid) {
        var todos = getRelevantTodos(listid);
        for (var id in todos) {
            if (!todos[id].complete) {
                return false;
            }
        }
        return true;
    },

    /**
     * Get the entire collection of TODOs for the specified list.
     * @return {object}
     */
    getAll: function (listid) {
        return getRelevantTodos(listid);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text, action.listid);
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
            var listid = action.listid;
            if (TodoStore.areAllComplete(listid)) {
                updateAll({complete: false, hidden: false}, listid);
            } else if (areAnyHidden(listid)) {
                updateAll({complete: true, hidden: true}, listid);
            } else {
                updateAll({complete: true}, listid);
            }
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_COMPLETE:
            var id = action.id;
            if (areAnyHidden(_todos[id].listid)){
                update(id, {complete: true, hidden: true});
            } else{
                update(id, {complete: true});
            }

            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY_COMPLETED:
            destroyCompleted(action.listid);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY_FROM_LIST:
            destroyFromList(action.listid);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_TOGGLE_HIDE_COMPLETED:
            var listid = action.listid;
            if (areAnyHidden(listid)){
                updateAll({hidden: false}, listid);
            } else{
                hideCompleted(listid);
            }
            TodoStore.emitChange();
            break;

        default:
    }
});

module.exports = TodoStore;
