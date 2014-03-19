// js/views/todos.js

var app = app || {};

// Todo Item View

// The DOM element for a todo item... 
app.MapView = Backbone.View.extend({

	// .... is a list tag
	el: '#map', 
	// Cache the template function for a single item
	mapTemplate: Handlebars.compile($("#map-template").html()),

	// The DOM events specific to an item
	events:{
		/*
		'click .toggle': 'togglecompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
		*/
	},

	initialize: function(){
		/*
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
		*/
		

        var myLatlng = new google.maps.LatLng(44.490, -78.649);

        var mapOptions = {
          center: (myLatlng),
          streetViewControl: false,
		  zoom: 8
        };

        var map = new google.maps.Map(this.el,
            mapOptions);

		google.maps.event.addListener(map, "click", function(event){
			console.log(event.latLng);
		})        
		/*
			[44.97645, -79.4723510]
			[44.78183, 78.758239]
			[45.023067, 078.81866455]
			[45.0657, -79.4064331]
			[44.194020, -78.58147]
			[44.296332, -77.8848266]

		*/
		
	},

	render: function(){
		/*
		this.$el.html(this.template(this.model.toJSON() ));

		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();
		this.$input = this.$('.edit');
		return this;
		*/
		
		
	},

	toggleVisible: function(){
		this.$el.toggleClass('hidden', this.isHidden());
	},

	isHidden: function(){
		var isCompleted = this.model.get('completed');
		return(
			(!isCompleted && app.TodoFilter === 'completed')
			|| (isCompleted && app.TodoFilter === 'active')
		);
	},
	togglecompleted: function(){
		this.model.toggle();
	},

	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function(){
		var value = this.$input.val().trim();

		if ( value ) {
			this.model.save( { title: value });
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function(e){
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	},
	clear: function(){
		this.model.destroy();
	}
	

});
