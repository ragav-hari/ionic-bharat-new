var bharat = angular.module('bharat', ['ionic','ionic.service.core','ngCordova','ionic.service.push','valdr']);

bharat.run(function($ionicPlatform, $ionicSideMenuDelegate,$cordovaCapture,$cordovaMedia,$rootScope,$ionicPopup,$cordovaFileTransfer,$cordovaPush,$http,$window,userService,$cordovaProgress,$location,$ionicHistory,$ionicNavBarDelegate,$ionicPlatform,$cordovaSplashscreen) {
  $ionicPlatform.ready(function() {
     
     // alert("READY");
     /* $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  alert('Got token'+data.token+"Platform"+data.platform);
          alert(JSON.stringify(data));
  $rootScope.token = data.token;          
  // Do something with the token
});*/
    


      
       $rootScope.$on('$stateChangeSuccess', function(e, toState) {
               if(toState.name === 'mobile') {
                  $rootScope.goback = false;
                   $rootScope.headershow = true;
              }
            
              else if(toState.name === 'splash')
                  {
                      $rootScope.goback = false;
                      $rootScope.headershow = false;
                  }
              else if(toState.name === 'front')
              {
                  $rootScope.headershow = true;
                   $rootScope.goback = false;
              }
            else{
                $rootScope.headershow = true;
            }

        });

          
                  
    $ionicPlatform.registerBackButtonAction(function (event) {}, 100);
      
      $rootScope.myGoBack = function()
        {
            $ionicHistory.goBack();
        }
      
          
     $rootScope.HOSTURL = "http://www.cloudservices.ashinetech.com/Bharat/uploads/"; 
      
    var push = PushNotification.init({ "android": {"senderID": "235999860706"}} );

    function registerPush()
    {
          push.on('registration', function(data) {
       // alert("REGG"+JSON.stringify(data));
        var mobileno = window.localStorage.getItem("mobile");
       // alert("MOBILE"+mobileno);
       
        var pushdata = {mobileno:mobileno , deviceToken: data.registrationId};
        userService.registerPush(pushdata).then(function(response){
                //alert("RESP"+JSON.stringify(response));
            });
          });
    }
    

    push.on('notification', function(data) {
       
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
    });
      
      
   

    push.on('error', function(e) {
        // e.message
        alert("ERROR"+JSON.stringify(e));
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
                            ionic.Platform.exitApp();
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

bharat.constant('$ionicLoadingConfig', {
  template: 'Please wait...<ion-spinner icon="spiral"></ion-spinner>'
});

bharat.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
   // alert("Config Called");
 /* $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '2483996b',
    // The public API key all services will use for this app
    api_key: '944de8f5d2876371d1bd8166639725638d4c21a5375e93b8',
    // Set the app to use development pushes
    dev_push: true
  });*/
}])






bharat.config(function(valdrProvider) {
  valdrProvider.addConstraints({
    'addressdetails': {
      'user_first_name': {
        'required': {
          'message': 'Name is required.'
        }
      },
      'user_email': {
           "email": {
            "message": "Not a valid email address."
          },
          "required": {
            "message": "The email is required."
          }
      },
      'user_address1': {
        'required': {
          'message': 'Name is required.'
        }
      },
      'user_pincode': {
        'required': {
          'message': 'Pincode is required.'
        }
      },
      'user_landmark': {
        'required': {
          'message': 'Landmark is required.'
        }
      }    
      }        
    });
});

bharat.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider
  
   .state('splash', {
    url: '/splash',
    templateUrl: 'view/splash.html',
      controller: 'userController'
  })
  
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
  
  .state('useraddress',{
       url: '/useraddress',
        templateUrl: 'view/addressdetails.html',
        controller: 'userController'
  })
  
   .state('viewallorders',{
       url: '/viewallorders',
        templateUrl: 'view/viewallorders.html',
        controller: 'userController'
  })
 
  .state('viewsingleorderdetail',{
       url: '/viewsingleorderdetail',
        templateUrl: 'view/viewsingleorderdetail.html',
        controller: 'userController'
  })
 
  $urlRouterProvider.otherwise('/splash');

}).
 run(function($rootScope,$location,$state,$ionicHistory) {
    $rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 
        
         console.log('toState.name: '+toState.name);
        console.log('fromState.name: '+fromState.name);
        
        if((toState.name=="front")&&(fromState.name=="mobile"))
        {
         console.log("yes");
         var a = window.localStorage.getItem("mobile");
         console.log("mobile is" +a);
         if(a)
         {
             
         }
         else
         {  
          //  console.log("mobile NOT set");
            
         //   alert("MOBILE NOT SET");
          
            event.preventDefault();
             // $location.path('/mobile');
         //  $state.go('mobile');
         //  $state.go('mobile', { url:'/mobile'}); 
                       
             
         }
        }
        
        
       
  
   
});   
  });

bharat.directive('addressdetail', function() {
  return {
    templateUrl: '/view/addressdetails.html'
  };
});
