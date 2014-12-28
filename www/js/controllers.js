angular.module('inomic.controllers', [])

// Dashbaord
.controller('DashCtrl', function($scope) {

})

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
