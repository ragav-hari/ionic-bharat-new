(function(){
    bharat.controller('userController', ['$q','$timeout','$scope','$cordovaCapture','$ionicModal',userController]); 
    
    function userController($q,$timeout,$scope,$cordovaCapture,$ionicModal)
    {
        $scope.audio = [];
        $scope.image = [];
        
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        
        
       $scope.captureAudio = function()
       {
           var options = { limit: 1, duration: 10 };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                alert(audioData);
                $scope.audio.push(audioData[0]);
            }, function(err) {
              console.log("ERROR AUDIO");
            });
       }
    
       $scope.selectimage = function() 
        {
            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) 
                    {
                        $scope.image.push(results[i]);
                    }
                    if(!$scope.$$phase) 
                    {
                        $scope.$apply();
                    }
                }, function (error) {
                    console.log('Error: ' + error);
                }
               
            );
             $scope.modal.hide();
	   };
        
      $scope.captureImage = function() 
      {
            var options = { limit: 1 };

            $cordovaCapture.captureImage(options).then(function(imageData) {
              $scope.image.push(imageData[0].fullPath);
            }, function(err) {
              // An error occurred. Show a message to the user
            });
      }
      
     $scope.removeImage = function(index)
     {
          $scope.image.splice(index,1);
     }
     
     $scope.removeAudio = function(index)
     {
          $scope.audio.splice(index,1);
     }
     
     $scope.sendEmail = function()
     {
        /*    var email = {
            to: 'mynameisragav@gmail.com',
            subject: 'Cordova Icons',
            body: 'How are you? Nice greetings from Leipzig',
            isHtml: true
          };
        $cordovaEmailComposer.isAvailable().then(function() {
            alert("EMAIL Available");
         }, function () {
            alert("EMAIL Not Available");
         });        

        $cordovaEmailComposer.open(email).then(null, function () {
           alert("EMAIL OPEN");
         });*/
     }

    }
    
}());