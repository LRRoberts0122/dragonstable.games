dragonsApp.controller('SearchCtrl',
function($rootScope, $scope, $log, DataService, NavigationService) {
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

  $scope.formatName = function(card_name) {
    var pat = new RegExp($scope.searchData, 'i');
    var str = card_name.replace(pat, '');
    return str;
  };
});
