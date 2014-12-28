// Ionic Inomic App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'inomic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'inomic.services' is found in services.js
// 'inomic.controllers' is found in controllers.js
angular.module('inomic', [
	'ionic', 
	'ionic.services.core',
	'ionic.services.analytics',
	'ionic.services.deploy',
	'ionic.utils', 
	'inomic.controllers', 
	'inomic.controllers.users', 
	'inomic.controllers.accounts', 
	'inomic.controllers.contacts', 
	'inomic.controllers.credits', 
	'inomic.controllers.payments', 
	'inomic.controllers.incomes', 
	'inomic.controllers.expenses', 
	'inomic.services'
])
.run(function($ionicPlatform, $ionicTrack, $ionicDeploy, $rootScope, $state, $ionicLoading, $iStorage) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
	
	// The run function is useful for sending events on app load
	$ionicTrack.track('load', {'version': 1});
	
	// Check for updates
	$ionicDeploy.check().then(function(response) {
		// response will be true/false
		if (response) {
			// Download the updates
			$ionicDeploy.download().then(function() {
				// Extract the updates
				$ionicDeploy.extract().then(function() {
					// Load the updated version
					$ionicTrack.load();
				}, function(error) {
					// Error extracting
				}, function(progress) {
					// Do something with the zip extraction progress
					$scope.extraction_progress = progress;
				});
			}, function(error) {
				// Error downloading the updates
			}, function(progress) {
				// Do something with the download progress
				$scope.download_progress = progress;
			});
		} else {
			$ionicDeploy.load();
		}
	}, function(error) {
		// Error checking for updates
	});
	
	// on state change you want to check whether or not the state.
	// I'm trying to reach is protected 
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		$ionicLoading.show({template: 'Loading...'});
		
		if (toState.authenticated === true && $iStorage.getObject('auth') === null) {
			$rootScope.authenticate = false;
			$state.transitionTo('signin');
		} else {
			$rootScope.authenticate = toState.authenticated;
		}
		
		console.log('-- authenticated success: '+$rootScope.authenticate+' --', $iStorage.getObject('auth'));
	});
	
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$ionicLoading.hide();
		event.preventDefault();
	});
	
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
        if (toState.authenticated === true) {
			$ionicLoading.hide();
            $state.transitionTo('signin');
			event.preventDefault();
        }
    });
	
})

// Http Interceptor
.factory('HttpErrorInterceptorModule', ['$q', '$rootScope', '$location', function($q, $rootScope, $location) {
	var success = function(response) {
		// pass through
		console.log('success in interceptor');
		return response;
	},
	error = function(response) {
		console.log('error in interceptor');
		console.log(response);
		angular.forEach(response.data, function(value, key) {
			console.log('-- log responses: '+key+' - '+value+' --');
			console.log('-- log values: ', value);
		});
		if(response.status === 401) {
			// dostuff
			response.data = { 
				status: false, 
				description: 'Authentication required!'
			};
			console.log('Response Error 401', response);
			return response;
		}
		return $q.reject(response);
	};

	return function(httpPromise) {
		return httpPromise.then(success, error);
	};
}])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicAppProvider) {

	// http Error
	$httpProvider.interceptors.push('HttpErrorInterceptorModule');
	
	// Identify app
	$ionicAppProvider.identify({
		// The App ID for the server
		app_id: 'YOUR_APP_ID',
		// The API key all services will use for this app
		api_key: 'YOUR_CLIENT_API_KEY'
	});
	
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// Users - Sign-In
	.state('signin', {
		url: '/sign-in',
		templateUrl: 'templates/users/sign-in.html',
		controller: 'UsersCtrl',
		authenticated: false
	})
	
	// Users - Sign-Up
	.state('signup', {
		url: '/sign-up',
		templateUrl: 'templates/users/sign-up.html',
		controller: 'UsersCtrl',
		authenticated: false
	})
	
	// Users - Password Remind
	.state('remind', {
		url: '/password/remind',
		templateUrl: 'templates/users/password-remind.html',
		controller: 'UsersCtrl',
		authenticated: false
	})
	
	// Users - Password Reset
	.state('reset', {
		url: '/password/reset',
		templateUrl: 'templates/users/password-reset.html',
		controller: 'UsersCtrl',
		authenticated: false
	})
	
	// setup an abstract state for the app directive
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/app.html',
		authenticated: true
	})

	// Each app has its own nav history stack:
	.state('app.home', {
		url: '/home',
		views: {
			'app-home': {
				templateUrl: 'templates/app-home.html',
				controller: 'DashCtrl'
			}
		},
		authenticated: true
	})
	
	// Incomes
	.state('app.incomes', {
		url: '/incomes',
		views: {
			all: {
				templateUrl: 'templates/incomes/index.html',
				controller: 'IncomesCtrl'
			}
		},
		authenticated: true
	})
	.state('app.income.show', {
		url: '/income/:id',
		views: {
			'app-incomes': {
				templateUrl: 'templates/incomes/show.html',
				controller: 'IncomesCtrl'
			}
		},
		authenticated: true
	})
	
	// Expenses
	.state('app.expenses', {
		url: '/expenses',
		views: {
			all: {
				templateUrl: 'templates/expenses/index.html',
				controller: 'ExpensesCtrl'
			}
		},
		authenticated: true
	})
	.state('app.expense.show', {
		url: '/expense/:id',
		views: {
			'app-expenses': {
				templateUrl: 'templates/expenses/show.html',
				controller: 'ExpensesCtrl'
			}
		},
		authenticated: true
	})
	.state('app.friends', {
		url: '/friends',
		views: {
			'app-friends': {
				templateUrl: 'templates/app-friends.html',
				controller: 'FriendsCtrl'
			}
		},
		authenticated: true
	})
	.state('app.friend-detail', {
		url: '/friend/:friendId',
		views: {
			'app-friends': {
				templateUrl: 'templates/friend-detail.html',
				controller: 'FriendDetailCtrl'
			}
		},
		authenticated: true
	})
	.state('app.setting', {
		url: '/setting',
		views: {
			'app-setting': {
				templateUrl: 'templates/app-setting.html',
				controller: 'UsersCtrl'	
			}
		},
		authenticated: true
	})
	.state('app.logout', {
		url: '/logout',
		views: {
			'app-logout': {
				controller: 'UsersCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/sign-in');

});
