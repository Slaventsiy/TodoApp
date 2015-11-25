var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

    /**
     * Creates a TODO in the specified todolist
     * @param {string} text - The TODO name
     * @param {string} listid - The id of the TODOlist
     */
    create: function (text, listid) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            text: text,
            listid: listid
        });
    },

    /**
     * Updated the name of the TODO
     * @param  {string} id - The ID of the ToDo item
     * @param  {string} text - The new name of the TODO
     */
    updateText: function (id, text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: function (todo) {
        var id = todo.id;
        var actionType = todo.complete ?
            TodoConstants.TODO_UNDO_COMPLETE :
            TodoConstants.TODO_COMPLETE;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },

    /**
     * Mark all ToDos as complete
     * @param {string} listid - The Id of the list
     */
    toggleCompleteAll: function (listid) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL,
            listid: listid
        });
    },

    /**
     * Delete the TODO with given id
     * @param  {string} id
     */
    destroy: function (id) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: function (listid) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY_COMPLETED,
            listid: listid
        });
    },

    /**
     * Delete all the TODO from the specified list
     * @param {string} listid
     */
    destroyFromList: function(listid){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY_FROM_LIST,
            listid: listid
        });
    },

    /**
     * Hide or show the completed TODO items in the specified list
     * @param {string} listid
     */
    toggleHideCompleted: function(listid){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_TOGGLE_HIDE_COMPLETED,
            listid: listid
        });
    }
};

module.exports = TodoActions;
