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
.factory('iApi', ['$http', '$iStorage', '$ionicLoading', 'urlBase', function($http, $iStorage, $ionicLoading, urlBase) {
	
	// User Auth
	var auth = $iStorage.getObject('auth');
	
	// HTTP Headers Auth
	if (auth) {
		$http.defaults.headers.common['Authorization'] = auth.access_token;
	}
	
	// HTTP FORM - POST - application/json or application/x-www-form-urlencoded
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	
	// HTTP FORM - PUT / PATCH
	$http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	$http.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
	
	// HTTP Methods
	return {
		all: function(endpoint) {
			return $http.get('http://hellosociets.com/api/' + endpoint);
		},
		get: function(endpoint, id) {
			return $http.get('http://hellosociets.com/api/' + endpoint + '/' + id);
		},
		post: function(endpoint, data) {
			return $http.post('http://hellosociets.com/api/' + endpoint, data)
		},
		put: function(endpoint, id, data) {
			return $http.put('http://hellosociets.com/api/' + endpoint + '/' + id, data);
		},
		delete: function(endpoint, id) {
			return $http.delete('http://hellosociets.com/api/' + endpoint + '/' + id);
		}
	}
}]);

/**
 * Local Storage
 */
angular.module('ionic.utils', []).factory('$iStorage', ['$window', function($window) {
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
				return JSON.parse($window.localStorage[key]);
			} else {
				return null;
			}
		},
		clear : function() {
			$window.localStorage.clear();
		}
	}
}])
.factory('iMessage', ['$rootScope', '$ionicPopup', '$timeout', function($rootScope, $ionicPopup, $timeout) {
	return {
		show: function(title, subTitle, template) {
			$rootScope.input = '';
			$ionicPopup.show({
				title: title,
				subTitle: subTitle,
				template: '<input type="password" ng-model="input">',
				scope: $rootScope,
				buttons: [
					{text: 'Cancel'},
					{
						text: '<b>Save</b>',
						type: 'button-positive',
						onTap: function(e) {
							if (!$rootScope.input) {
								e.preventDefault();
							} else {
								return $rootScope.input;
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
		alert: function(title, messageData) {			
			if (typeof messageData === 'object') {
				var messageAll = '';
				angular.forEach(messageData, function(value) {
					if (typeof value === 'object') {
						angular.forEach(value, function(val) {
							messageAll += '-'+val+'</br>';
						});
					} else {
						messageAll += '-'+val+'</br>';
					}
				});
				$ionicPopup.alert({
					title : 'Error!',
					template : messageAll
				});
			} else {
				$ionicPopup.alert({
					title : 'Error!',
					template : messageData
				});
			}
		},
		confirm: function(title, template) {
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