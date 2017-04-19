<!DOCTYPE html>
<html>
<head>
	<title>Shopping List</title>
	<link rel="stylesheet" type="text/css" href="">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	<script>
		var app = angular.module('myApp', []);
		app.controller("myController", function ($scope) {
			$scope.products=['Milk', 'Bread', 'Vegitables'];
			$scope.text = 'Go with your shopping';
			$scope.addToList= function(){
				console.log($scope.products);
				
				if ($scope.addMe != undefined ) {
					$scope.text = 'Go with your shopping';
					repeat = false;
					for (var i = 0; i < $scope.products.length; i++) {
						if ($scope.products[i] == $scope.addMe) {
							repeat = true;
						}
					}
							if (!repeat) {
								$scope.products.push($scope.addMe);
								console.log($scope.products);	
							}else{
								$scope.text = 'This product is already present in your cart';
							}			
								
				}
				else{
					$scope.text = "Empty item is not allowed";
				}
				
			}
			$scope.removeFromList = function(x){
				$scope.products.splice(x,1);
			}
		})
		
	</script>
	<style type="text/css">
		   .col-lg-6{
			border: solid;
			padding: 10px;
			width: 49%;
			margin-right: 1px;
			
		}
		

		li:nth-child(even) {
		    background: lightgrey;
		}
	</style>
</head>
<body ng-app='myApp' ng-controller='myController'>
	<div class="container" >
	<header><h2 style="text-align: center; background-color: #e2e2e2; color: blue;">Make your Order</h2></header>
		<div class="col-lg-6 " style="background-color: whitesmoke">
			<input type="text" ng-model='addMe' placeholder="Please enter your Product Name"  required style="margin-bottom: 2px;">
			<button ng-click='addToList()'>Add to List</button>
			<p class="alert alert-info">{{text}}</p>
		</div>
		<div class="col-lg-6" style="background-color: palegoldenrod">
			<h3>Shopping List:</h3>
			<ol style="list-style-type:  none">
				<li ng-repeat='x in products' style="margin-bottom: 3px; ">{{x}}
				<span ng-click='removeFromList($index)' href='' style="float: right; margin-left: 100px;" >x</span> 
				</li>

			</ol>
		</div>
	</div>
</body>
</html>