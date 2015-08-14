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
       
      /*  $scope.errorCallback1 = function(data)
        {
            console.log("ERROR 1"+JSON.stringify(data));
        }
        
        $scope.errorCallback2 = function(data)
        {
            console.log("ERROR 2"+JSON.stringify(data));
        }
        
        $scope.errorCallback3 = function(data)
        {
            console.log("ERROR 3"+JSON.stringify(data));
        }
        */
        
       
       
       $scope.selectimage = function() 
        {
           
            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) 
                    {
                       /* $scope.image.push(results[i]);
                        alert("Selected"+results[i]);
                       // $scope.attachments.push(""+results[i].replace("file://",""));
                         //$scope.attachments.push(results[i].replace("file:///","file:/"));
                       //  $scope.attachments.push(results[i]);*/
                        
                         var filename = results[i].substring(results[i].lastIndexOf('/')+1);
                        
          $cordovaFile.moveFile(cordova.file.cacheDirectory,filename, "file:///storage/emulated/0/Pictures")
          .then(function (success) {
                console.log("Native URL: "+ success.toURL());

          $scope.image.push(success.toURL());
            
          }, function (error) {
           console.log("FILE ERROR"+JSON.stringify(error));
          });
                        
                        
          
                        /*window.resolveLocalFileSystemURL(fileUri,function(fileEntry){
                newFileUri  = cordova.file.dataDirectory + "images/";
                oldFileUri  = results[i];
    
          window.resolveLocalFileSystemURL(cordova.file.dataDirectory,function(dirEntry) {
                            // move the file to a new directory and rename it
                                console.log("SUCCESS 1"+dirEntry);
                            fileEntry.moveTo(dirEntry, filename, function(successCallback){
                                console.log("SUCCESS 2"+successCallback);
                            }, function(errorCallback1){
                                console.log("ERROR 1"+errorCallback1);
                            });
                        },
                       function(errorCallback2){
                    console.log("ERROR 2"+errorCallback2);
                });
          },
          function(errorCallback3){
              console.log("ERROR 3"+errorCallback3);
          });*/
                        
                        
                        
                        
                        
                        
                        
              
                        
                        
                        
                        
                        
                        
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

    }
    
}());