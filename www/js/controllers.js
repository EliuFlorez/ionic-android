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
	'$localstorage', 
	'Api', 
	function($scope, $q, $state, $ionicPopup, $ionicLoading, $localstorage, Api) {
	
	// Profile
	$scope.profile = $localstorage.getObject('auth');
	
	// Sign-In
	$scope.signIn = function() {
		// Defer
		var q = $q.defer();
		
		// Users Data
		var users = {
			email : $scope.email,
			password : $scope.password
		};
		
		// Loading Show
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		// Console Log
		console.log('Sign-In - Request', users);
		
		// SignIn
		Api.post('users/signin', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				$ionicPopup.alert({
					title : 'Success!',
					template : 'Bienvenido a iNomic!'
				});
			}
			
			// Session Storage
			$localstorage.setObject('auth', result.data);
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Sign-In - Response', $localstorage.getObject('auth'));
			
			// Resolve
			q.resolve(result);
			
			// State - Home
			$state.go('app.home');
		}, function (error) {
			// Error
			if (error.data != null) {
				if (error.data.message) { 
					var message = error.data.message;
					if (typeof message === 'object') {
						var messageAll = '';
						angular.forEach(message, function(value) {
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
							template : message
						});
					}
				}
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
			name : $scope.name,
			email : $scope.email,
			password : $scope.password,
			password_confirmation : $scope.password_confirmation
		};
		
		// Loading Show
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		// Console Log
		console.log('Sign-Up - Request', users);
		
		// SignIn
		Api.post('users/signup', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				$ionicPopup.alert({
					title : 'Success!',
					template : result.data.message
				});
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
			
			// State - Home
			$state.go('signin');
		}, function (error) {
			// Error
			if (error.data != null) {
				if (error.data.message) { 
					var message = error.data.message;
					if (typeof message === 'object') {
						var messageAll = '';
						angular.forEach(message, function(value) {
							if (typeof value === 'object') {
								angular.forEach(value, function(val) {
									messageAll += '-'+val+'</br>';
								});
							} else {
								messageAll += '-'+value+'</br>';
							}
						});
						$ionicPopup.alert({
							title : 'Error!',
							template : messageAll
						});
					} else {
						$ionicPopup.alert({
							title : 'Error!',
							template : message
						});
					}
				}
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
	
	// Password-Remind
	$scope.passwordRemind = function() {
		// Defer
		var q = $q.defer();
		
		// Users Data
		var users = {
			email : $scope.mail
		};
		
		// Loading Show
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		// Console Log
		console.log('Password-Remind - Request', users);
		
		// SignIn
		Api.post('password/remind', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				$ionicPopup.alert({
					title : 'Success!',
					template : result.data.message
				});
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
		}, function (error) {
			// Error
			if (error.data != null) {
				if (error.data.message) { 
					var message = error.data.message;
					if (typeof message === 'object') {
						var messageAll = '';
						angular.forEach(message, function(value) {
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
							template : message
						});
					}
				}
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
			token : $scope.token,
			email : $scope.email,
			password : $scope.password,
			password_confirmation : $scope.password_confirmation
		};
		
		// Loading Show
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		// Console Log
		console.log('Password-Reset - Request', users);
		
		// PasswordReset
		Api.post('password/reset', users).then(function (result) {
			// Success
			if (result.data.success == true) {
				$ionicPopup.alert({
					title : 'Success!',
					template : result.data.message
				});
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Resolve
			q.resolve(result);
		}, function (error) {
			// Error
			if (error.data != null) {
				if (error.data.message) { 
					var message = error.data.message;
					if (typeof message === 'object') {
						var messageAll = '';
						angular.forEach(message, function(value) {
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
							template : message
						});
					}
				}
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
		
		// Defer
		var q = $q.defer();
		
		// Loading Show
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		// Session Destroy
		$localstorage.clear();
		
		// Loading Hide
		$ionicLoading.hide();
		
		// Resolve
		q.resolve(result);
		
		// State - Home
		$state.go('signin');
		
		// Promise
		return q.promise;
	};
	
}])

// Friends
.controller('FriendsCtrl', function($scope, $ionicModal, Friends, Api) {
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
