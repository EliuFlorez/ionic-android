angular.module('starter.controllers', [])

// Dashbaord
.controller('DashCtrl', function($scope) {

})

// Users
.controller('UsersCtrl', [
	'$scope', 
	'$q', 
	'$state',
	'$ionicPopup', 
	'$ionicLoading', 
	'$ionicUser',
	'$iStorage', 
	'iApi', 
	'iMessage',
function($scope, $q, $state, $ionicPopup, $ionicLoading, $ionicUser, $iStorage, iApi, iMessage) {
	
	// Profile - Auth
	$scope.profile = $iStorage.getObject('auth');
	
	// Sign-In
	$scope.signIn = function() {
		// Defer
		var q = $q.defer();
		
		// Users Data
		var users = {
			email: $scope.email,
			password: $scope.password
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// SignIn
		iApi.post('users/signin', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', 'Bienvenido a iNomic!');
			}
			
			// Session Storage
			$iStorage.setObject('auth', result.data.data);
			
			// User Auth
			var auth = $iStorage.getObject('auth');
			
			// User Identification
			$ionicUser.identify({
				user_id: auth.id,
				name: auth.name,
				email: auth.email
			});
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Sign-In - Response', $iStorage.getObject('auth'));
			
			// Resolve
			q.resolve(result);
			
			// State - Home
			$state.go('app.home');
		}, function (error) {
			// Error
			if (error.data.success == false) {
				if (error.data.message) { 
					iMessage.alert('Error!', error.data.message);
				}
			} else if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Sign-In - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Sign-Up
	$scope.signUp = function() {
		// Defer
		var q = $q.defer();
		
		// Users Data
		var users = {
			name: $scope.name,
			email: $scope.email,
			password: $scope.password,
			password_confirmation: $scope.password_confirmation
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// SignIn
		iApi.post('users/signup', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
			
			// State - Home
			$state.go('signin');
		}, function (error) {
			// Error
			if (error.data.success == false) {
				if (error.data.message) { 
					iMessage.alert('Error!', error.data.message);
				}
			} else if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Sign-Up - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Setting
	$scope.setting = function(profile) {
		// Defer
		var q = $q.defer();
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		console.log('profile - data: ', profile);
		
		// SignIn
		iApi.post('users/setting', profile).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
			
			// State - Setting
			$state.go('app.setting');
		}, function (error) {
			// Error
			if (error.data.success == false) {
				if (error.data.message) { 
					iMessage.alert('Error!', error.data.message);
				}
			} else if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Setting - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Password-Remind
	$scope.passwordRemind = function() {
		// Defer
		var q = $q.defer();
		
		// Users Data
		var users = {
			email: $scope.mail
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// SignIn
		iApi.post('password/remind', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
		}, function (error) {
			// Error
			if (error.data.success == false) {
				if (error.data.message) { 
					iMessage.alert('Error!', error.data.message);
				}
			} else if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Password-Remind - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Password-Reset
	$scope.passwordReset = function() {
		// Defer
		var q = $q.defer();
		
		// Users Data
		var users = {
			token: $scope.token,
			email: $scope.email,
			password: $scope.password,
			password_confirmation: $scope.password_confirmation
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// PasswordReset
		iApi.post('password/reset', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
		}, function (error) {
			// Error
			if (error.data.success == false) {
				if (error.data.message) { 
					iMessage.alert('Error!', error.data.message);
				}
			} else if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Password-Reset - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Logout
	$scope.logout = function() {
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Session Destroy
		$iStorage.setObject('auth', null);
		
		// Loading Hide
		$ionicLoading.hide();
		
		// State - Home
		$state.go('signin');
	};
	
}])

// Friends
.controller('FriendsCtrl', function($scope, $ionicModal, Friends) {
	$scope.friends = Friends.all();
	
	$ionicModal.fromTemplateUrl('modal', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.AddFriend = function(data){
		$scope.friends.push({task:data.name, status:'not done'});
		data.name = '';
		$scope.closeModal();
	};

	$scope.openModal = function() {
		$scope.modal.show();
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

})

// Friends Detalle
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
})

// Accounts
.controller('AccountCtrl', function($scope) {

});
