var dragonsApp = angular.module('dragonsApp', ['ngRoute', 'ngSanitize']);

dragonsApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/card/:card_id', {
      controller: 'CardCtrl'
    });

    $locationProvider.html5Mode(true);
  }
]);

dragonsApp.run(function($rootScope, NavigationService) {
  $rootScope.navigate = function(card_id) {
    NavigationService.route(card_id);
  };
});


// TO BE CART CONTROLLER:
dragonsApp.controller('HeaderCtrl', ['$rootScope', '$scope', '$log', function($rootScope, $scope, $log) {
  console.log("CONTROLLER");
  $scope.link = "Cart";
}]);

dragonsApp.controller('LoginCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.title = "Login Page";
  console.log("CONTROLLER");
}]);
