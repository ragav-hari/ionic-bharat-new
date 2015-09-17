var bharat = angular.module('bharat', ['ionic','ionic.service.core','ionic.service.push','ngCordova','ionic.service.core','ionic.service.push']);

bharat.run(function($ionicPlatform, $ionicSideMenuDelegate,$cordovaCapture,$cordovaMedia,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //Parse.initialize("bharat", "Ragav$12345");
   
      
      
      
      
     
     
       
      
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

bharat.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '89deb7cf',
    // The public API key all services will use for this app
    api_key: '0aaf73a326b1c0c633f7c28bd72cc64ee0ce3326f825b98c',
    // Set the app to use development pushes
    dev_push: true
  });
}])

bharat.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider
  
  .state('landing', {
        url: '/landing',
        templateUrl: 'view/landingpage.html',
        controller: 'userController'
  })
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
   .state('bharat', {
        url: '/bharat',
        templateUrl: 'view/bharat.html',
        controller: 'userController'
  })
  .state('mobile', {
        url: '/mobile',
        templateUrl: 'view/mobile.html',
        controller: 'userController'
  })
   
   .state('signin', {
        url: '/signin',
        templateUrl: 'view/signin.html',
        controller: 'userController'
  })
  .state('otp', {
        url: '/otp',
        templateUrl: 'view/otp.html',
        controller: 'userController'
  })
 
   .state('profile', {
        url: '/profile',
        templateUrl: 'view/userprofile.html',
        controller: 'userController'
  })
   .state('customertype', {
        url: '/customertype',
        templateUrl: 'view/customertype.html',
        controller: 'userController'
  })
  
 
  $urlRouterProvider.otherwise('/landing');

});
