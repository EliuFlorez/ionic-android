// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.utils', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $state, $ionicLoading, $iStorage) {
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
	
	// on state change you want to check whether or not the state.
	// I'm trying to reach is protected 
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		$ionicLoading.show({template: 'Loading...'});
		
		if (toState.authenticated === true && $localstorage.getObject('auth') !== null) {
			$rootScope.authenticate = true;
		} else {
			$rootScope.authenticate = false;
			//$state.transitionTo('signin');
		}
		
		console.log('-- authenticated success: '+$rootScope.authenticate+' --', $iStorage.getObject('auth'));
	});
	
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$ionicLoading.hide();
		event.preventDefault();
	});
	
	$rootScope.$on('$routeChangeError', function(event, toState, toParams, fromState, fromParams) {
        if (toState.authenticated === false) {
            $state.transitionTo('signin');
        }
    });
	
})

// Http Interceptor
.factory("HttpErrorInterceptorModule", ["$q", "$rootScope", "$location", function($q, $rootScope, $location) {
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
			console.log("Response Error 401", response);
			$location.path('/login').search('returnTo', $location.path());
			return response;
		}
		return $q.reject(response);
	};

	return function(httpPromise) {
		return httpPromise.then(success, error);
	};
}])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	// http Error
	$httpProvider.responseInterceptors.push("HttpErrorInterceptorModule");
	
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
