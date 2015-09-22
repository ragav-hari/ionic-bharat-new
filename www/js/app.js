var bharat = angular.module('bharat', ['ionic','ionic.service.core','ngCordova','ionic.service.push']);

bharat.run(function($ionicPlatform, $ionicSideMenuDelegate,$cordovaCapture,$cordovaMedia,$rootScope,$ionicPopup,$cordovaFileTransfer,$cordovaDevice) {
  $ionicPlatform.ready(function() {
      var device = $cordovaDevice.getDevice();

    var cordova = $cordovaDevice.getCordova();

    var model = $cordovaDevice.getModel();

    var platform = $cordovaDevice.getPlatform();

    var uuid = $cordovaDevice.getUUID();

    var version = $cordovaDevice.getVersion();
      alert("PLATFORM"+platform);
      console.log("Filetransfer"+$cordovaFileTransfer);
      alert("READY");
      $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  alert('Got token'+data.token+"Platform"+data.platform);
  $rootScope.token = data.token;          
  // Do something with the token
});
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //Parse.initialize("bharat", "Ragav$12345");
    if(window.Connection) {
         if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            //ionic.Platform.exitApp();
                        }
                    });
         }
    }
      
      
      
      
     
     
       
      
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
    alert("Config Called");
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '2483996b',
    // The public API key all services will use for this app
    api_key: '944de8f5d2876371d1bd8166639725638d4c21a5375e93b8',
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
  
   .state('profileinitial', {
        url: '/profileinitial',
        templateUrl: 'view/profileinitial.html',
        controller: 'userController'
  })
  
 
  $urlRouterProvider.otherwise('/landing');

});
