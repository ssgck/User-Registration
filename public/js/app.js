

	var app = angular.module('myApp', []);
	app.controller('myController', function ($scope, $http){

		$scope.data = [{'taskName':'Cooking1', 'priority': 'Urgent'}];
		$scope.priorities = ['Urgent', 'Medium', 'Normal', 'None'];
		$scope.addTask = function(){
			$http.post("/addTask", $scope.formData).then(function(req, res){
				console.log($scope.formData);});
		}

	});

			