// js/collections/todos.js

var app = app || {};

// Todo Collection
// -----------------

// The collection of todos is backed by *localStorage* instead of remote server.
var ResultList = Backbone.Collection.extend({

	//Reference to this collection's model
	model: app.Item,

	//Save all of the todo items under the 'todos-backbone' namespace
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	
	//Save all of the todo items under the 'todos-backbone' namespace
	
	// Filter donw the list of all todo items that are finished 
	completed: function(){
		return this.filter(function( todo ){
			return todo.get('completed');
		});
	},

	// Filter down the list to only todo items that are still not finished.
	remaining: function(){
		// apply alowsus to define the context of this within our function scope
		return this.without.apply(this, this.completed());
	},

	// We keep the Todo in sequential order, despite being saved by 
	// unordered GUID in the database. This generates the next order
	// number for new items. 
	nextOrder: function(){
		if( !this.length){
			return 1;
		}else{
			return this.last().get('order') + 1;
		}
	},

	// Todos are sorted by their original insertion order.
	comparator: function( todo ){
		return todo.get('order');
	},

})

// Create our global collection of **Todos**
app.Results = new ResultList();
