angular.module('inomic.controllers.incomes', [])
.controller('IncomesCtrl', [
	'$scope', 
	'$q', 
	'$state', 
	'$stateParams',
	'$ionicLoading', 
	'iApi', 
	'iMessage',
function($scope, $q, $state, $stateParams, $ionicLoading, iApi, iMessage) {
	
	// Loading Show
	$ionicLoading.show({template: 'Loading...'});
	
	// Income - all
	iApi.all('incomes').then(function (result) {
		// Loading Hide
		$ionicLoading.hide();
		
		// Console Log
		console.log('Income - Response', result.data.data);
		
		// Incomes All
		$scope.incomes = result.data.data;
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
		
		// Incomes Null
		$scope.incomes = [];
	});
	
	// Create
	$scope.create = function() {
		// Defer
		var q = $q.defer();
		
		// Incomes Data
		var incomes = {
			balance: $scope.balance,
			datetime: $scope.datetime
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Income - post
		iApi.post('incomes', incomes).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Income - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Income
			$state.go('app.incomes');
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
			console.log('Income - Error', error);
			
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
		
		// Income - get
		iApi.get('incomes/'+id).then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Income - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Income
			$state.go('app.incomes');
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
			console.log('Income - Error', error);
			
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
		
		// Incomes Data
		var incomes = {
			balance: $scope.balance,
			datetime: $scope.datetime
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Income - put/patch
		iApi.put('incomes/'+id, incomes).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Income - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Income
			$state.go('app.incomes');
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
			console.log('Income - Error', error);
			
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
		
		// Income - destroy
		iApi.destroy('incomes/'+id).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Income - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Income
			$state.go('app.incomes');
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
			console.log('Income - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
}]);
