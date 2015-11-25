/**
 * Created by Vjaceslavs on 23/11/2015.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodolistConstants = require('../constants/TodolistConstants');

var TodolistActions = {

    /**
     * Create a TODOlist
     * @param {string} text - the name of the list
     */
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: TodolistConstants.TODOLIST_CREATE,
            text: text
        });
    },

    /**
     * Change the name of the list
     * @param {string} text - the new name
     * @param {string} listid - id of the list
     */
    update: function (text, listid) {
        AppDispatcher.dispatch({
            actionType: TodolistConstants.TODOLIST_UPDATE,
            listid: listid,
            text: text
        });
    },

    /**
     * Delete the specified list
     * @param {string} listid - id of the list
     */
    destroy: function(listid){
        AppDispatcher.dispatch({
            actionType: TodolistConstants.TODOLIST_DESTROY,
            listid:listid
        });
    }
};

module.exports = TodolistActions;