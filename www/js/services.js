angular.module('starter.services', [])

/**
 * Service that returns some data.
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
.factory('urlBase', function() {
	return 'http://hellosociets.com/api/';
})
.factory('Api', ['$http', '$localstorage', '$ionicLoading', 'urlBase', function($http, $localstorage, $ionicLoading, urlBase) {
	
	// User Auth
	var auth = $localstorage.getObject('auth');
	
	// HTTP Headers Auth
	if (auth) {
		$http.defaults.headers.common['Authorization'] = auth.access_token;
	}
	
	// HTTP FORM - POST
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	
	// HTTP FORM - PUT / PATCH
	$http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	$http.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
	
	// HTTP Methods
	return {
		all : function(endpoint) {
			return $http.get('http://hellosociets.com/api/' + endpoint, {
				headers : {}
			});
		},
		get : function(endpoint, id) {
			return $http.get('http://hellosociets.com/api/' + endpoint + '/' + id, {
				headers : {}
			});
		},
		post : function(endpoint, data) {
			return $http.post('http://hellosociets.com/api/' + endpoint, data, {
				headers : {'Content-Type' : 'application/json'}
			})
		},
		put : function(endpoint, id, data) {
			return $http.put('http://hellosociets.com/api/' + endpoint + '/' + id, data, {
				headers : {'Content-Type' : 'application/json'}
			});
		},
		delete : function(endpoint, id) {
			return $http.delete('http://hellosociets.com/api/' + endpoint + '/' + id, {
				headers : {'Content-Type' : 'application/json'}
			});
		}
	}
}])
.factory('Message', ['$scope', '$ionicPopup', '$timeout', function($scope, $ionicPopup, $timeout) {
	return {
		show : function(title, subTitle, template) {
			$scope.data = {};
			$ionicPopup.show({
				title: title,
				subTitle: subTitle,
				template: '<input type="password" ng-model="data.input">',
				scope: $scope,
				buttons: [
					{text: 'Cancel'},
					{
						text: '<b>Save</b>',
						type: 'button-positive',
						onTap: function(e) {
							if (!$scope.data.input) {
								e.preventDefault();
							} else {
								return $scope.data.input;
							}
						}
					}
				]
			}).then(function(res) {
				console.log('Tapped!', res);
			});
			
			// Closed
			$timeout(function() {
				$ionicPopup.close();
			}, 3000);
		},
		alert : function(title, template) {
			$ionicPopup.alert({
				title: title,
				template: template
			}).then(function(res) {
				console.log('Thank you for not eating my delicious ice cream cone');
			});
		},
		confirm : function(title, template) {
			$ionicPopup.confirm({
				title: title,
				template: template
			}).then(function(res) {
				if (res) {
					return true;
				} else {
					return false;
				}
			});
		}
	}
}]);

/**
 * Local Storage
 */
angular.module('ionic.utils', []).factory('$localstorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			if (typeof $window.localStorage[key] !== 'undefined') {
				return JSON.parse($window.localStorage[key] || "{}");
			} else {
				return JSON.parse("{}");
			}
		},
		clear : function() {
			$window.localStorage.clear();
		}
	}
}]);