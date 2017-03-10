dragonsApp.controller('CardCtrl',
function($rootScope, $scope, $routeParams, $sce, DataService, NavigationService) {
  $scope.data = {};

  $scope.$on('$routeChangeSuccess', function() {

    // Get Card Data
    DataService.findCardById($routeParams.card_id)

    // Handle Card Data
    .then(function(response) {
      $scope.data = response[0];

      $scope.data.path = findImage($scope.data.name, $scope.data.set);
      $scope.data.html = formatText($scope.data.text);
      $scope.data.setName = getFullSetName($scope.data.set);

      if($scope.data.names) {
        var cardsToSearch = findCardsToSearch($scope.data.name, $scope.data.names);
        $scope.data.cards = [];

        for(var i = 0; i < cardsToSearch.length; i++) {
          DataService.findCardByName(cardsToSearch[i]).then(function(response) {
            $scope.data.cards.push(response[0]);
          });
        }
      }
    });
  });

  function findCardsToSearch(card_name, card_names) {
    var i = card_names.length;
    while(i--) if(card_names[i] === card_name) card_names.splice(i, 1);
    return card_names;
  }

  function getFullSetName(card_set) {
    switch(card_set) {
      case 'BFZ':
        return 'Battle for Zendikar';
      case 'OGW':
        return 'Oath of the Gatewatcher';
      case 'SOI':
        return 'Shadows Over Innistrad';
      case 'EMN':
        return 'Eldritch Moon';
      case 'KLD':
        return 'Kaladesh';
      case 'AER':
        return 'Aether Revolt';
    }
  }

  function formatText(card_text) {
    var html = card_text;
    var pattern = new RegExp(/(?!^)(\+|\-|[0])(.|)(\:)/g);

    html = html.replace(pattern, "<br /><br />$1$2$3");
    html = $sce.trustAsHtml(html);

    return html;
  }

  function findImage(card_name, card_set) {
    card_name = card_name.toLowerCase();
    card_set = card_set.toLowerCase();

    card_name = card_name.replace(/'/g, '');
    card_name = card_name.replace(/,/g, '');
    card_name = card_name.replace(/ /g, '_');

    return "/images/cards/" + card_set + "/" + card_name + ".full.jpg";
  }
});
