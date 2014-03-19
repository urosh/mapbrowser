// js/views/app.js

var app = app || {};

// The Application
//-----------------

// Our overall **AppView** is the top-level piece of UI.
app.appView = Backbone.View.extend({

	// Insted of generating a new element, bind to the exisiting skeleton
	// of the app already present in the HTML.
	el: '#mapBrowse', 

	
	// Our template for the line of the statistics at the bottom of the app.
	statsTemplate: Handlebars.compile('template/map.hbs'),

	// Delegated events for creating new items, and clearing completed ones.
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// At initialization for the line of the statistics we bind to the
	// revlevant events on the Todos collection, when items are added or changed.
	initialize: function(){
		
		this.allCheckbox = this.$("#toggle-all")[0];

		this.$input = this.$("#new-todo");
		this.$footer = this.$("#footer");
		this.$main = this.$("#main");

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll );
		this.listenTo(app.Todos, 'all', this.render);
		this.$el.html(this.statsTemplate({name: "uros"}));
		app.Todos.fetch();

	},

	// Rendering tha app just means refreshing the statistics -- the rest 
	// of the app doesn't change. 
	render: function(){
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;
		
		if ( app.Todos.length ) {
			this.$main.show();
			this.$footer.show();
			//var theTemplate = Handlebars.compile(this.stats-template);
			
			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
			
			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/"' + ( app.TodoFilter || '' ) + '"]')
				.addClass('selected');
		}else{
			this.$main.hide();
			this.$footer.hide();
		}
		//console.log(this.allCheckbox);
		//this.allCheckbox.checked = !remaining;
		//this.allCheckbox.checked = !remaining;

	},

	// Add a single todo item to the list by creating a view for it, 
	// and appending its element to the '<ul>'
	addOne: function( todo ){
		var view = new app.TodoView({ model: todo});
		$("#todo-list").append( view.render().el );
	},

	// Add all items in the **Todos** collection at once
	addAll: function(){
		this.$("#todo-list").html('');
		apps.Todos.each(this.addOne, this);
	},

	filterOne : function(todo){
		todo.trigger('visible');
	},

	filterAll: function(){
		app.Todos.each(this.filterOne, this);
	},	

	// Generate the attributes for a new todo item.
	newAttributes: function(){
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	createOnEnter: function(event){
		if( event.which !== ENTER_KEY || !this.$input.val().trim()){
			return;
		}
		app.Todos.create( this.newAttributes() );
		this.$input.val('');

	},

	clearCompleted: function(){
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},

	toggleAllComplete: function(){
		var completed = this.allCheckbox.checked;
		app.Todos.each(function( todo ){
			todo.save({
				'completed': completed
			});
		});
	}

	
});