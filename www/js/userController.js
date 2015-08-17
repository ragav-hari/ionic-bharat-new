(function(){
    bharat.controller('userController', ['$q','$timeout','$scope','$cordovaCapture','$ionicModal','$cordovaEmailComposer','$cordovaCamera','$cordovaFile',userController]); 
    
    function userController($q,$timeout,$scope,$cordovaCapture,$ionicModal,$cordovaEmailComposer,$cordovaCamera,$cordovaFile)
    {
        $scope.audio = [];
        $scope.image = [];

        $scope.user  = {}; 
        $scope.attachments = [];
        
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
                $scope.audio.push(audioData[0].fullPath);
                 //$scope.attachments.push(audioData[0].fullPath);
            }, function(err) {
              console.log("ERROR AUDIO");
            });
       }
    
       
        $scope.urlForImage = function(imageName) {
           /* var filename = imageName.substring(imageName.lastIndexOf('/')+1);
  var trueOrigin = cordova.file.dataDirectory + filename;
  console.log("TRUEORIGIN"+trueOrigin);     */
            var filename = imageName.substring(imageName.lastIndexOf('/')+1);
          console.log("TRUEORIGIN"+filename); 
  return trueOrigin;
}         
       
       
       
       $scope.selectimage = function() 
        {
           
            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) 
                    {
                         var filename = results[i].substring(results[i].lastIndexOf('/')+1);
                        
          $cordovaFile.moveFile(cordova.file.cacheDirectory,filename, "file:///storage/emulated/0/Pictures")
          .then(function (success) {
                console.log("Native URL: "+ success.toURL());

          $scope.image.push(success.toURL());
            
          }, function (error) {
           console.log("FILE ERROR"+JSON.stringify(error));
          });
                        
                        
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
        
        
   
        
     $scope.createdirectory = function()
     {
         // checkIfFileExists("file:///storage/emulated/0/Pictures");
     }
        
      $scope.captureImage = function() 
      {
            var options = { limit: 1 };

            $cordovaCapture.captureImage(options).then(function(imageData) {    
              $scope.image.push(imageData[0].fullPath);
             // $scope.attachments.push(""+imageData[0].replace('file://',''));
              //  $scope.attachments.push(imageData[0].fullPath);
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
     
     function deletefile(fileEntry)
     {
        console.log(fileEntry);
        fileEntry.remove(success, fail);
     }

    function success(entry) 
    {
        console.log("Removal succeeded");
    }

    function fail(error) 
    {
        console.log("Error removing file: " + error.code);
    }

     $scope.sendEmail = function()
     {
         
         
        $scope.attachments = $scope.image.concat($scope.audio);
        
       
         
         alert("ATTACH"+$scope.attachments);
         
         $scope.messagebody = "Mobile :"+$scope.user.user_mobile+"<br/>"+"Comment :"+$scope.user.user_comment;
            var email = {
            to: 'ragavitcian@gmail.com',
            subject: 'Bharat Purchase',
            body: $scope.messagebody,
            isHtml: true,
            attachments: $scope.attachments
          };
         
        $cordovaEmailComposer.isAvailable().then(function() {
            //alert("EMAIL Available");
         }, function () {
           // alert("EMAIL Not Available");
         });        

        $cordovaEmailComposer.open(email).then(null, function () {
          // alert("EMAIL OPEN");
         });
     }
     
     
     $scope.openwebsite = function()
     {
         alert("Opening");
         window.open('http://www.bharathration.com/we_view/index.php','_system');
     }
     

    }
    
}());