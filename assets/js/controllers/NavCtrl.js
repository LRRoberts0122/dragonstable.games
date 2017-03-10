dragonsApp.controller('NavCtrl', function($rootScope, $scope) {
  $scope.menuState = 'closed';

  $scope.toggleMenu = function() {
    if($scope.menuState === 'closed') {
      $scope.menuState = 'open';
    } else {
      $scope.menuState = 'closed';
    }

    console.log($scope.menuState);
  };
});
