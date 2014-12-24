// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.utils', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state, $rootScope, $ionicLoading, $localstorage) {
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
	$rootScope.$on('$stateChangeStart', function() {
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		if ($localstorage.getObject('auth')) {
			$rootScope.authenticated = true;
		} else {
			$rootScope.authenticated = false;
		}
		
		console.log('-- authenticated success: '+$rootScope.authenticated+' --');
	});
	
	$rootScope.$on('$stateChangeSuccess', function() {
		$ionicLoading.hide();
	});
	
})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// Users - Sign-In
	.state('signin', {
		url: '/sign-in',
		templateUrl: 'templates/users/sign-in.html',
		controller: 'UsersCtrl'
	})
	
	// Users - Sign-Up
	.state('signup', {
		url: '/sign-up',
		templateUrl: 'templates/users/sign-up.html',
		controller: 'UsersCtrl'
	})
	
	// Users - Password Remind
	.state('remind', {
		url: '/password/remind',
		templateUrl: 'templates/users/password-remind.html',
		controller: 'UsersCtrl'
	})
	
	// Users - Password Reset
	.state('reset', {
		url: '/password/reset',
		templateUrl: 'templates/users/password-reset.html',
		controller: 'UsersCtrl'
	})
	
	// setup an abstract state for the app directive
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/app.html'
	})

	// Each app has its own nav history stack:
	.state('app.home', {
		url: '/home',
		views: {
			'app-home': {
				templateUrl: 'templates/app-home.html',
				controller: 'DashCtrl'
			}
		}
	})
	.state('app.friends', {
		url: '/friends',
		views: {
			'app-friends': {
				templateUrl: 'templates/app-friends.html',
				controller: 'FriendsCtrl'
			}
		}
	})
	.state('app.friend-detail', {
		url: '/friend/:friendId',
		views: {
			'app-friends': {
				templateUrl: 'templates/friend-detail.html',
				controller: 'FriendDetailCtrl'
			}
		}
	})
	.state('app.setting', {
		url: '/setting',
		views: {
			'app-setting': {
				templateUrl: 'templates/app-setting.html',
				controller: 'UsersCtrl'
			}
		}
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
