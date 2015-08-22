var bharat = angular.module('bharat', ['ionic','ngCordova']);

bharat.run(function($ionicPlatform, $ionicSideMenuDelegate,$cordovaCapture) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
     
     
       
      
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})


bharat.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

 
  .state('front', {
    url: '/front',
    templateUrl: 'view/front.html'
  })

   .state('process', {
        url: '/process',
        templateUrl: 'view/process.html',
        controller: 'userController'
  })
  .state('userguide', {
        url: '/userguide',
        templateUrl: 'view/userguide.html',
        controller: 'userController'
  })
   .state('bhart', {
        url: '/bharat',
        templateUrl: 'view/bharat.html',
        controller: 'userController'
  })
 
  $urlRouterProvider.otherwise('/front');

});
