angular.module('inomic.controllers.expenses', [])
.controller('ExpensesCtrl', [
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
	
	// Expense - all
	iApi.all('expenses').then(function (result) {
		// Loading Hide
		$ionicLoading.hide();
		
		// Console Log
		console.log('Expense - Response', result.data.data);
		
		// Expenses All
		$scope.expenses = result.data.data;
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
		
		// Expenses Null
		$scope.expenses = [];
	});
	
	// Create
	$scope.create = function() {
		// Defer
		var q = $q.defer();
		
		// Expenses Data
		var expenses = {
			balance: $scope.balance,
			category_id: $scope.category_id,
			subcategory_id: $scope.subcategory_id,
			datetime: $scope.datetime
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Expense - post
		iApi.post('expenses', expenses).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Expense - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Expense
			$state.go('app.expenses');
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
			console.log('Expense - Error', error);
			
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
		
		// Expense - get
		iApi.get('expenses/'+id).then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Expense - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Expense
			$state.go('app.expenses');
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
			console.log('Expense - Error', error);
			
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
		
		// Expenses Data
		var expenses = {
			balance: $scope.balance,
			category_id: $scope.category_id,
			subcategory_id: $scope.subcategory_id,
			datetime: $scope.datetime
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Expense - put/patch
		iApi.put('expenses/'+id, expenses).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Expense - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Expense
			$state.go('app.expenses');
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
			console.log('Expense - Error', error);
			
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
		
		// Expense - destroy
		iApi.destroy('expenses/'+id).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Expense - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Expense
			$state.go('app.expenses');
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
			console.log('Expense - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
}]);
