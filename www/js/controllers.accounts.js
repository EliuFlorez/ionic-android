angular.module('inomic.controllers.accounts', [])
.controller('AccountsCtrl', [
	'$scope', 
	'$q', 
	'$state', 
	'$stateParams',
	'$ionicLoading', 
	'iApi', 
	'iMessage',
function($scope, $q, $state, $stateParams, $ionicLoading, iApi, iMessage) {
	
	// All
	$scope.all = function() {
		// Defer
		var q = $q.defer();
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Account - all
		iApi.all('accounts').then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Response', result.data);
			
			// Resolve
			q.resolve(result.data);
		}, function (error) {
			// Error
			if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Create
	$scope.create = function() {
		// Defer
		var q = $q.defer();
		
		// Accounts Data
		var accounts = {
			name: $scope.name,
			type: $scope.type,
			number: $scope.number,
			balance: $scope.balance,
			datetime: $scope.datetime,
			description: $scope.description
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Account - post
		iApi.post('accounts', accounts).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Account
			$state.go('app.accounts');
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
			console.log('Account - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Show
	$scope.show = function(id) {
		// Defer
		var q = $q.defer();
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Account - get
		iApi.get('accounts/'+id).then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Account
			$state.go('app.accounts');
		}, function (error) {
			// Error
			if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Update
	$scope.update = function(id) {
		// Defer
		var q = $q.defer();
		
		// Accounts Data
		var accounts = {
			name: $scope.name,
			type: $scope.type,
			number: $scope.number,
			balance: $scope.balance,
			datetime: $scope.datetime,
			description: $scope.description
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Account - put/patch
		iApi.put('accounts/'+id, accounts).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Account
			$state.go('app.accounts');
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
			console.log('Account - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
	// Destroy
	$scope.destroy = function(id) {
		// Defer
		var q = $q.defer();
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Account - destroy
		iApi.destroy('accounts/'+id).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Account - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Account
			$state.go('app.accounts');
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
			console.log('Account - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
}]);
