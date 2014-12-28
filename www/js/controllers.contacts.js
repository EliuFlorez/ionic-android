angular.module('inomic.controllers.contacts', [])
.controller('ContactsCtrl', [
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
		
		// Contact - all
		iApi.all('contacts').then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Contact - Response', result.data);
			
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
			console.log('Contact - Error', error);
			
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
		
		// Contacts Data
		var contacts = {
			name: $scope.name,
			nit: $scope.nit,
			address: $scope.address,
			states: $scope.states,
			email: $scope.email,
			phone_m: $scope.phone_m,
			phone_l: $scope.phone_l,
			type: $scope.type,
			observation: $scope.observation
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Contact - post
		iApi.post('contacts', contacts).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Contact - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Contact
			$state.go('app.contacts');
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
			console.log('Contact - Error', error);
			
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
		
		// Contact - get
		iApi.get('contacts/'+id).then(function (result) {
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Contact - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Contact
			$state.go('app.contacts');
		}, function (error) {
			// Error
			if (typeof error.data.error === 'object') {
				iMessage.alert('Error!', error.data.error.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Contact - Error', error);
			
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
		
		// Contacts Data
		var contacts = {
			name: $scope.name,
			nit: $scope.nit,
			address: $scope.address,
			states: $scope.states,
			email: $scope.email,
			phone_m: $scope.phone_m,
			phone_l: $scope.phone_l,
			type: $scope.type,
			observation: $scope.observation
		};
		
		// Loading Show
		$ionicLoading.show({template: 'Loading...'});
		
		// Contact - put/patch
		iApi.put('contacts/'+id, contacts).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Contact - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Contact
			$state.go('app.contacts');
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
			console.log('Contact - Error', error);
			
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
		
		// Contact - destroy
		iApi.destroy('contacts/'+id).then(function (result) {
			// Success
			if (result.data.success == true) {
				iMessage.alert('Success!', result.data.message);
			}
			
			// Loading Hide
			$ionicLoading.hide();
			
			// Console Log
			console.log('Contact - Response', result.data);
			
			// Resolve
			q.resolve(result);
			
			// State - Contact
			$state.go('app.contacts');
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
			console.log('Contact - Error', error);
			
			// Reject
			q.reject(error);
		});
		
		// Promise
		return q.promise;
	};
	
}]);
