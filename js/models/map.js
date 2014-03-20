//if app is defined app is app if not app is empty object.
var app = app || {};

// Todo Model
// --------------
// Our basic **Todo** model has 'title', 'order', and 'completed' attributes.

app.MapModel = Backbone.Model.extend({

	//Default attributes ensure that each todo created has 'title' and "completed" keys
	defaults: {
		title: '',
		latLng: []
	},

	//Toggle the 'completed' state of this todo item.
	toggle: function(){
		this.save({
			completed: !this.get('completed')
		});
	}
});

