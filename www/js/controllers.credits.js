angular.module('inomic.controllers.credits', [])
.controller('CreditsCtrl', [
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
	
	// Credit - all
	iApi.all('credits').then(function (result) {
		// Loading Hide
		$ionicLoading.hide();
		
		// Console Log
		console.log('Credit - Response', result.data.data);
		
		// Credits All
		$scope.credits = result.data.data;
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
		
		// Credits Null
		$scope.credits = [];
	});
	
	// Create
	$scope.create = function() {
		// Defer
		var q = $q.defer();
		
		// Credits Data
		var credits = {
			contact_id: $scope.contact_id,
			total: $scope.total,
			amount: $scope.amount,
			rate: $scope.rate,
			rate_type: $scope.rate_type,
			description: $scope.description,
			datetime_start: $scope.datetime_start,
			datetime_end: $scope.datetime_end
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Credit - post
		iApi.post('credits', credits).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Credit - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Credit
			$state.go('app.credits');
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
			console.log('Credit - Error', error);
			
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
		
		// Credit - get
		iApi.get('credits/'+id).then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Credit - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Credit
			$state.go('app.credits');
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
			console.log('Credit - Error', error);
			
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
		
		// Credits Data
		var credits = {
			contact_id: $scope.contact_id,
			total: $scope.total,
			amount: $scope.amount,
			rate: $scope.rate,
			rate_type: $scope.rate_type,
			description: $scope.description,
			datetime_start: $scope.datetime_start,
			datetime_end: $scope.datetime_end
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Credit - put/patch
		iApi.put('credits/'+id, credits).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Credit - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Credit
			$state.go('app.credits');
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
			console.log('Credit - Error', error);
			
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
		
		// Credit - destroy
		iApi.destroy('credits/'+id).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Credit - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Credit
			$state.go('app.credits');
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
			console.log('Credit - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
}]);
