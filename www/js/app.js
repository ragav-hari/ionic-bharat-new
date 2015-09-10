var bharat = angular.module('bharat', ['ionic','ngCordova']);

bharat.run(function($ionicPlatform, $ionicSideMenuDelegate,$cordovaCapture,$cordovaMedia) {
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
   .state('bhart', {
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
 
  $urlRouterProvider.otherwise('/landing');

});
