angular.module('inomic.controllers.payments', [])
.controller('PaymentsCtrl', [
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
		
		// Payment - all
		iApi.all('payments').then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Payment - Response', result.data);
			
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
			console.log('Payment - Error', error);
			
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
		
		// Payments Data
		var payments = {
			credit_id: $scope.credit_id,
			paid: $scope.paid,
			datetime: $scope.datetime
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Payment - post
		iApi.post('payments', payments).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Payment - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Payment
			$state.go('app.payments');
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
			console.log('Payment - Error', error);
			
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
		
		// Payment - get
		iApi.get('payments/'+id).then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Payment - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Payment
			$state.go('app.payments');
		}, function (error) {
			// Error
			if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Payment - Error', error);
			
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
		
		// Payments Data
		var payments = {
			paid: $scope.paid,
			datetime: $scope.datetime
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Payment - put/patch
		iApi.put('payments/'+id, payments).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Payment - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Payment
			$state.go('app.payments');
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
			console.log('Payment - Error', error);
			
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
		
		// Payment - destroy
		iApi.destroy('payments/'+id).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Payment - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Payment
			$state.go('app.payments');
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
			console.log('Payment - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
}]);
