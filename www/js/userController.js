(function(){
    bharat.controller('userController', ['$q','$timeout','$scope','$cordovaCapture','$ionicModal','$cordovaEmailComposer','$cordovaCamera','$cordovaFile','$window','$location','$rootScope',userController]); 
    
    function userController($q,$timeout,$scope,$cordovaCapture,$ionicModal,$cordovaEmailComposer,$cordovaCamera,$cordovaFile,$window,$location,$rootScope)
    {
        $scope.audio = [];
        $scope.image = [];
        $rootScope.imagedata = [];
        $rootScope.audiodata = [];
        $scope.user  = {}; 
        $scope.attachments = [];
        $scope.user.user_type = 1;
        $rootScope.hasaudio = false;
        $rootScope.hasimage = false;
        
        $scope.usertypedata = false;
        
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        
        $ionicModal.fromTemplateUrl('attachment.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.attachmentmodal = modal;
        });
        $scope.openAttachmentModal = function() {
            $scope.attachmentmodal.show();
        };
        $scope.closeAttachmentModal = function() {
            $scope.attachmentmodal.hide();
        };
        
        
       $scope.captureAudio = function()
       {
           var options = { limit: 1, duration: 10 };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                $rootScope.audiodata.push(audioData[0].fullPath);
                 $rootScope.hasaudio = true;
            }, function(err) {
              console.log("ERROR AUDIO");
            });
           // $scope.modal.hide();    
            $location.path('/bharat');
       }
       
        $scope.captureAudioModal = function()
       {
           var options = { limit: 1, duration: 10 };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                $rootScope.audiodata.push(audioData[0].fullPath);
                 $scope.attachmentmodal.hide();    
            }, function(err) {
               $scope.attachmentmodal.hide();    
            });
            $scope.attachmentmodal.hide();    
           // $location.path('/bharat');
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

          $scope.imagedata.push(success.toURL());
            
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
                    $scope.attachmentmodal.hide();    
                }
               
            );
             $scope.attachmentmodal.hide();    
           //$location.path('/bharat');
	   };
        
        
   
        
     $scope.createdirectory = function()
     {
         // checkIfFileExists("file:///storage/emulated/0/Pictures");
     }
        
      $scope.captureImage = function() 
      {
            var options = { limit: 1 };

            $cordovaCapture.captureImage(options).then(function(imageData) {    
              $rootScope.imagedata.push(imageData[0].fullPath);  
                 $rootScope.hasimage = true;
                $location.path('/bharat');
                
                
                  //$scope.image.push(imageData[0].fullPath);
            }, function(err) {
              // An error occurred. Show a message to the user
                
                $location.path('/process');
            
            });
           //$scope.modal.hide();    
          $location.path('/bharat');
           
      }
      
       $scope.captureImageModal = function() 
      {
            var options = { limit: 1 };

            $cordovaCapture.captureImage(options).then(function(imageData) {    
              $rootScope.imagedata.push(imageData[0].fullPath);  
                
               $scope.modal.hide();  
                
                
                  //$scope.image.push(imageData[0].fullPath);
            }, function(err) {
              // An error occurred. Show a message to the user
                
                $scope.attachmentmodal.hide();   
            
            });
           $scope.attachmentmodal.hide();    
          //$location.path('/bharat');
           
      }
      
     $scope.removeImage = function(index)
     {
          $rootScope.imagedata.splice(index,1);
     }
     
     $scope.removeAudio = function(index)
     {
          $rootScope.audiodata.splice(index,1);
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
        
    $scope.getusertype = function()
    {
        if($scope.user.user_type == 2)
        {
            $scope.usertypedata = true;
        }
        else
        {
            $scope.usertypedata = false;        
        }
    }

     $scope.zoom = function(url)
         {
             $scope.zoomimage = url;
             $scope.modal.show();
         }
     
     $scope.onchagevalidation = function()
     {
          if($scope.user.user_name==null)
        {
             $scope.error_message1="please type your name";   
            
        }
        else
        {

            $scope.error_message1=""; 
        }
        
         if($scope.user.user_mobile==null)
        {
               $scope.error_message2="please type your mobile number"; 
            
        }
         else
        {

            $scope.error_message2=" "; 
        }
       if($scope.user.user_type==null) 
        {
            
           $scope.error_message3="please select user type"; 
        }
        else
        {

            $scope.error_message3=" "; 
        }
         if($scope.user.user_type == 2 && $scope.user.dealer_code==null)  
        {
            
          $scope.error_message4="please enter dealer code"; 
  
        }
         else
        {

            $scope.error_message4=" "; 
        } 
     }
     
      $scope.validationChecking=function()
     {
       
        if($scope.user.user_name==null)
        {
             $scope.error_message1="please type your name";   
            
        }
        else
        {

            $scope.error_message1=""; 
        }
        
         if($scope.user.user_mobile==null)
        {
               $scope.error_message2="please type your mobile number"; 
            
        }
         else
        {

            $scope.error_message2=" "; 
        }
       if($scope.user.user_type==null) 
        {
            
           $scope.error_message3="please select user type"; 
        }
        else
        {

            $scope.error_message3=" "; 
        }
         if($scope.user.user_type == 2 && $scope.user.dealer_code==null)  
        {
            
          $scope.error_message4="please enter dealer code"; 
  
        }
         else
        {

            $scope.error_message4=" "; 
        }
        if(($scope.user.user_name!=null) && ($scope.user.user_mobile!=null))
        {
             if($scope.user.user_type == 2 && $scope.user.dealer_code==null) 
             {
                 
                 
             }
            else
           {
              
            $scope.sendEmail(); 
           }
            
        }
        
       
        
     }
    
     $scope.sendEmail = function()
     {
        $scope.attachments = $rootScope.imagedata.concat($rootScope.audiodata);
         
         
        if($scope.user.user_type == 1)
        {
           $scope.user.user_type = "Bharat Ration Direct Customer";     
        }
        else
        {
           $scope.user.user_type = "Bharat Ration Dealer/Corporate";           
        }

         $scope.messagebodyuser = "Name :"+$scope.user.user_name+"<br/>"+"Mobile:"+$scope.user.user_mobile+"<br/>"+"User Type :"+$scope.user.user_type+"<br/>";
         if($scope.user.user_type == "Bharat Ration Dealer/Corporate")   
         {
                  $scope.messagebodydealer = "Dealer Code :"+$scope.user.dealer_code+"<br/>";
          }
         else
         {
                 $scope.messagebodydealer  = "";
          }
         
         if(($scope.user.user_comments !== "") || ($scope.user.user_comments !== undefined))
             {
                 $scope.messagecomment = "Comment :"+$scope.user.user_comments;
             }
         else{
             $scope.messagecomment = "";
         }
         
         $scope.messagebody = $scope.messagebodyuser + $scope.messagebodydealer + $scope.messagecomment;
         
            var email = {
            to: 'tacttechnologies18@gmail.com',
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
     
     
     $window.openlink = function(url)
     {
         alert(url);
         window.open(url,'_system');
     }
     

    }
    
}());