dragonsApp.service('NavigationService', function($window) {
  return {
    'route': function(card_id) {
      var url = "http://" + $window.location.host + "/card/" + card_id;
      $window.location.href = url;
    }
  };
});
