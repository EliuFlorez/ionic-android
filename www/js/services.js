angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var friends = [
		{ id: 0, name: 'Scruff McGruff' },
		{ id: 1, name: 'G.I. Joe' },
		{ id: 2, name: 'Miss Frizzle' },
		{ id: 3, name: 'Ash Ketchum' }
	];

	return {
		all: function() {
			return friends;
		},
		get: function(friendId) {
			// Simple index lookup
			return friends[friendId];
		}
	}
})
.factory('Api', ['$http', function($http) {
	return {
		all : function(endpoint) {
			return $http.get('http://localhost/laravel/public/v1/'+endpoint, {
				headers : {}
			});
		},
		get : function(endpoint, id) {
			return $http.get('http://localhost/laravel/public/v1/'+endpoint+'/'+id, {
				headers : {}
			});
		},
		create : function(endpoint, data) {
			return $http.post('http://localhost/laravel/public/v1/'+endpoint, data, {
				headers : {'Content-Type' : 'application/json'}
			});
		},
		edit : function(endpoint, id, data) {
			return $http.put('http://localhost/laravel/public/v1/'+endpoint+'/'+id, data, {
				headers : {'Content-Type' : 'application/json'}
			});
		},
		delete : function(endpoint, id) {
			return $http.delete('http://localhost/laravel/public/v1/'+endpoint+'/'+id,{
				headers : {'Content-Type' : 'application/json'}
			});
		}
	}
}]);