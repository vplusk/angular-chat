(function() {
	'use strict';
	var module = angular.module('myApp');
	module.controller('ChatController', ChatController);
	ChatController.$inject = [
		'$http',
		'$scope'
	];

	function ChatController($http, $scope) {
		var vm = this;

		$scope.getMessageHistory = function() {
			$http({
				method: 'GET',
				url: '/messages'
			}).then(function successCallback(data) {
				$scope.messages = data.data;
				//console.log($scope.messages);
			}, function errorCallback(response) {
				alert("Something went wrong");
				console.log(response);
			});
		};

		
		
		setInterval(function() {
			$scope.getMessageHistory();
		}, 1000);
		

		$scope.sendMessage = function() {
			var inputData = {
				name: $scope.userName,
				text: $scope.userMessage
			};
			var messageData = {
				name: inputData.name,
				text: inputData.text
			}
			$http({
				method: 'POST',
				url: '/messages',
				headers: {
					'Content-Type': 'application/json'
				},
				data: messageData
			}).then(function successCallback(data) {
				$scope.userMessage = '';
				//console.log(data.data);
			});
		}	

	}
})();