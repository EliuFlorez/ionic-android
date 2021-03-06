angular.module('inomic.services', [])

/**
 * Service that returns some data.
 */
.factory('iApi', ['$http', function($http) {
	
	// HTTP FORM - application/json Or application/x-www-form-urlencoded
	$http.defaults.headers.post['Content-Type'] = 'application/json';
	$http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	
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
		destroy: function(endpoint, id) {
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
			return JSON.parse($window.localStorage[key] || '{}');
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