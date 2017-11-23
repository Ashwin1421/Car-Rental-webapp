var app = angular.module('car-rental-app', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-Car', {
            templateUrl: 'partials/car-form.html',
            controller: 'AddCarCtrl'
        })
        .when('/car/:id', {
            templateUrl: 'partials/car-form.html',
            controller: 'EditCarCtrl'
        })
        .when('/car/delete/:id', {
            templateUrl: 'partials/car-delete.html',
            controller: 'DeleteCarCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Cars = $resource('/api/cars');
        Cars.query(function(Cars){
            $scope.Cars = Cars;
        });
}]);
app.controller('AddCarCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Cars = $resource('/api/cars');
            Cars.save($scope.Car, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditCarCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){   
        var Cars = $resource('/api/cars/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Cars.get({ id: $routeParams.id }, function(Car){
            $scope.Car = Car;
        });

        $scope.save = function(){
            Cars.update($scope.Car, function(){
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteCarCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Cars = $resource('/api/cars/:id');

        Cars.get({ id: $routeParams.id }, function(Car){
            $scope.Car = Car;
        })

        $scope.delete = function(){
            Cars.delete({ id: $routeParams.id }, function(Car){
                $location.path('/');
            });
        }
    }]);