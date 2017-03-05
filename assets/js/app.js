var dragonsApp = angular.module('dragonsApp', ['ngRoute']);

dragonsApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      controller: 'SearchCtrl'
    })
    .when('/card/:card_id', {
      controller: 'CardCtrl'
    })
    .otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    });

    $locationProvider.html5Mode(true);
  }
]);

dragonsApp.controller('CardCtrl', ['$rootScope', '$scope', '$routeParams', '$log', 'DataService',
function($rootScope, $scope, $routeParams, $log, DataService) {
  $scope.data = {};
  $scope.$on('$routeChangeSuccess', function () {
    // Get Card Data
    DataService.findCardById($routeParams.card_id).then(function(response) {
      $scope.data = response[0];

      var set = $scope.data.set.toLowerCase();
      var name = $scope.data.name.toLowerCase();

      name = name.replace(/'/g, '');
      name = name.replace(/,/g, '');
      name = name.replace(/ /g, "_");

      var pathToImage = '/images/cards/' + set + '/' + name + '.full.jpg';

      $scope.data.path = pathToImage;
      console.log($scope.data);
    });
  });
}]);

dragonsApp.controller('SearchCtrl', ['$rootScope', '$scope', '$window', '$location', '$log', 'DataService',
function($rootScope, $scope, $window, $location, $log, DataService) {
  $scope.data = {};

  $scope.showResults = function() {
    if($scope.searchData.length > 0) {
      DataService.searchCardsByName($scope.searchData).then(function(response) {
        $scope.data.cards = response;
      });
    } else {
      $scope.data.cards = [];
    }
  };

  $scope.navigate = function(card_id) {
    var landingUrl = "http://" + $window.location.host + "/card/" + card_id;
    $window.location.href = landingUrl;
  };

  $scope.formatName = function(cardName) {
    var pattern = new RegExp($scope.searchData, 'i');
    var str = cardName.replace(pattern, '');
    $log.info(str);
    return str;
  };
}]);
