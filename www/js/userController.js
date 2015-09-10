(function() {
    bharat.controller('userController', ['$q', '$timeout', '$scope', '$cordovaCapture', '$ionicModal', '$cordovaEmailComposer', '$cordovaCamera', '$cordovaFile', '$window', '$location', '$rootScope', '$cordovaNativeAudio','$cordovaMedia','$cordovaImagePicker','$cordovaFileTransfer','userService',userController]);

    function userController($q, $timeout, $scope, $cordovaCapture, $ionicModal, $cordovaEmailComposer, $cordovaCamera, $cordovaFile,
        $window, $location, $rootScope, $cordovaNativeAudio, $cordovaMedia,$cordovaImagePicker,$cordovaFileTransfer,userService) {
        $scope.audio = [];
        $scope.image = [];
        $rootScope.imagedata = [];
        $rootScope.audiodata = [];
         $rootScope.aud = [];
        $rootScope.audiourl = "";
        $scope.user = {};
        $scope.attachments = [];
        $scope.user.user_type = 1;
        $rootScope.hasaudio = false;
        $rootScope.hasimage = false;
        $rootScope.size = 0;
        $scope.showPlayIcon = [];
        $scope.hidemikeIcon = [];
        $scope.usertypedata = false;
        $scope.audioicon = "ion-play customIcon";
        $rootScope.mobileno= "";
        $scope.showDiv=false;
        $scope.hideOTP=false;
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


        $scope.captureAudio = function() {
            var options = {
                limit: 1,
                duration: 10
            };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                $rootScope.size += audioData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                    $location.path('/front');
                } else {
                    $rootScope.audiodata.push(audioData[0]);
                    $rootScope.hasaudio = true;
                    $location.path('/bharat');
                }
            }, function(err) {
                // $location.path('/front');
            });
            // $scope.modal.hide();    
            $location.path('/bharat');

        }

        $scope.captureAudioModal = function() {
            var options = {
                limit: 1,
                duration: 10
            };

            $cordovaCapture.captureAudio(options).then(function(audioData) {

                $rootScope.size += audioData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                    $scope.attachmentmodal.hide();
                } else {
                    $rootScope.audiodata.push(audioData[0]);
                    $rootScope.hasaudio = true;
                    $location.path('/bharat');
                }
                $scope.attachmentmodal.hide();
            }, function(err) {
                $scope.attachmentmodal.hide();
            });
            $scope.attachmentmodal.hide();
            // $location.path('/bharat');
        }


        $scope.urlForImage = function(imageName) {
            var filename = imageName.substring(imageName.lastIndexOf('/') + 1);
            console.log("TRUEORIGIN" + filename);
            return trueOrigin;
        }


        $scope.getCameraImage = function()
        {
            var options = {
                  quality: 20,
                  destinationType: Camera.DestinationType.FILE_URI,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: false,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 100,
                  targetHeight: 100,
                  popoverOptions: CameraPopoverOptions,
                };
            
             $cordovaCamera.getPicture(options).then(function(imageURI) {
                 //var image = document.getElementById('myImage');
                 //image.src = imageURI;
                 alert("CAMERA"+JSON.stringify(imageURI));
                  $rootScope.imagedata.push(imageURI);
                  $rootScope.hasimage = true;

             }, function(err) {
                    // error'
                 
                 alert("ERROR"+JSON.stringify(err));
             });
            $cordovaCamera.cleanup().then(success,failure); // only for FILE_URI
                                            
        
             $location.path('/bharat');
            
        }
        
        $scope.uploadfile = function()
        {
            var filePath = $rootScope.imagedata[0];
            alert("FILE"+filePath);
             $cordovaFileTransfer.upload('192.168.1.2/br/fileupload.php', filePath, options)
                  .then(function(result) {
                    alert("RES"+JSON.stringify(result));
                  }, function(err) {
                    alert("ERR"+JSON.stringify(err));
                  }, function (progress) {
                    //alert(JSON.stringify(result));
                  });

            
        }
        
        $scope.selectimage1 = function() {
            var options = {
                   maximumImagesCount: 10,
                   width: 800,
                   height: 800,
                   quality: 80
                  };
            $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                 $rootScope.imagedata.push(results[i]);
              }
            }, function(error) {
              alert(JSON.stringify(error));
            });
            $scope.attachmentmodal.hide();
        }

        $scope.selectimage = function() {

            if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                    $location.path('/bharat');
                } else {
                
            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) {
                        alert(JSON.stringify(results));
                  
                        var filename = results[i].substring(results[i].lastIndexOf('/') + 1);

                        $cordovaFile.moveFile(cordova.file.cacheDirectory, filename, "file:///storage/emulated/0/Pictures")
                            .then(function(success) {
                                console.log("Native URL: " + success.toURL());
                                getfileSize(success.toURL());
                                $scope.tempsizeimage = $rootScope.size;

                                $rootScope.size += $scope.tempsizeimage;
                                 if ($rootScope.size >= 10000000) {
                                    alert("Size Exceeds the Max Limit");
                                    $scope.attachmentmodal.hide();
                                    } else {
                                $rootScope.imagedata.push(success.toURL());
                                        $scope.attachmentmodal.hide();
                                    }
                            }, function(error) {
                                alert("Please attach Valid File");
                            });
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                },
                function(error) {
                    console.log('Error: ' + error);
                    $scope.attachmentmodal.hide();
                }

            );
            $scope.attachmentmodal.hide();
            //$location.path('/bharat');
                }
        };

        $scope.showPlayIcon = function(index)
        {
            
        }

        function getfileSize(Uri) {
            window.resolveLocalFileSystemURI(Uri, function(fileEntry) {
                fileEntry.file(function(fileObj) {
                    $rootScope.size = fileObj.size;
                });
            });
        }

        $scope.createdirectory = function() {
            // checkIfFileExists("file:///storage/emulated/0/Pictures");
        }

        $scope.audioClick = function(uri,$index) {

            var src = uri.localURL;
            
            var media_playing = "";
            var media_toplay = "";
         
       
            if($rootScope.audiourl == "")
            {
                media_playing = new Media(src,function() {},function(err) {}); //play audio
                $scope.audioicon = "ion-stop customIcon";
                $rootScope.audiourl = media_playing;
                $scope.audioplay(media_playing,src); 
                $scope.audioicon = "ion-play customIcon";
            }
            else
            {
                if($rootScope.audiourl.src == src)
                {
                    $scope.audioicon = "ion-play customIcon";
                    $scope.audiostop($rootScope.audiourl);
                    $rootScope.audiourl = "";
                }
                else
                {
                    $scope.audiostop($rootScope.audiourl);
                    $scope.audioicon = "ion-stop customIcon";
                    media_toplay = new Media(src,function() {},function(err) {}); 
                    $rootScope.audiourl = media_toplay;
                 
                    $scope.audioplay(media_toplay,src); // new media playing
                    $scope.audioicon = "ion-play customIcon";
                }
               
                 
            }
        }

        $scope.removePlayAudio = function(url)
        {
            if($rootScope.audiourl.src === url.localURL)
            {
                $scope.audiostop($rootScope.audiourl);        
            }
        }
        
        $scope.audioplay = function(media,uri){
            media.play();
        }
        
        $scope.audiopause = function(media,uri){
            media.pause();
        }
         
        $scope.audiostop = function(media){
            media.stop();
        }
        
       
        
        $scope.captureImage = function() {
            var options = {limit: 1,quality: 0,height:50,width:50};
             alert("inside captureimage function");
            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
                alert("image size is"+$rootScope.size);
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                    $location.path('/front');
                    
                } else {
                  //  for(var i = 0 ; i < 4 ; i++)
                    //    {
                             $rootScope.imagedata.push(imageData[0].fullPath);
                             $rootScope.hasimage = true;
                      //  }
                
                 //  $scope.openCamera($rootScope.imagedata);
                 //  alert("image data"+JSON.stringify($rootScope.imagedata));
                    
                }

            }, function(err) {
                alert("CAMERA ERROR"+JSON.stringify(err));
                $location.path('/front');
            });
            //$scope.modal.hide();   
           //  alert("image data"+$rootScope.imagedata);
            $location.path('/bharat');
           //  $scope.openCamera(imageData);

        }

        $scope.openCamera = function(imageData) {

            var r = confirm("Do you want to add more photos");
            if (r == true) {
                $scope.captureImage();
            } else {
                $rootScope.imagedata.push(imageData);
                alert("set data"+$rootScope.imagedata);
                $location.path('/bharat');
                
            }

        }
        
        $scope.openCameraModal = function(imageData) {

            var r = confirm("Do you want to add more photos");
            if (r == true) {
                $scope.captureImageModal();
            } else {
                $scope.attachmentmodal.hide();
            }

        }

        $scope.captureImageModal = function() {
            var options = {limit: 1,quality: 0,height:100,width:100};

            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                } else {
                   //  for(var i = 0 ; i < 4 ; i++)
                     //   {
                    $rootScope.imagedata.push(imageData[0].fullPath);
                    $rootScope.hasimage = true;
                    alert("the img data"+$rootScope.imagedata);
                       // }
                }

               // $scope.attachmentmodal.hide();
            }, function(err) {
                $scope.attachmentmodal.hide();
            });
            $scope.attachmentmodal.hide();
        }

        $scope.removeImage = function(index) {
            $scope.tempsize = $rootScope.size;
            $rootScope.size -= getfileSize($rootScope.imagedata[index]);
            $rootScope.imagedata.splice(index, 1);
        }

        $scope.removeAudio = function(index) {
            $scope.tempsize = $rootScope.size;
            $scope.removePlayAudio($rootScope.audiodata[index]);
          //  alert(JSON.stringify($rootScope.audiodata[index]));
            $rootScope.size -= $rootScope.audiodata[index].size;
            $rootScope.audiodata.splice(index, 1);
        }

        function deletefile(fileEntry) {
            console.log(fileEntry);
            fileEntry.remove(success, fail);
        }

        function success(entry) {
            console.log("Removal succeeded");
        }

        function fail(error) {
            console.log("Error removing file: " + error.code);
        }

        $scope.getusertype = function() {
            if ($scope.user.user_type == 2) {
                $scope.usertypedata = true;
            } else {
                $scope.usertypedata = false;
            }
        }

        $scope.zoom = function(url) {
            $scope.zoomimage = url;
            $scope.modal.show();
        }

        $scope.onchagevalidation = function() {
            if ($scope.user.user_name == null) {
                $scope.error_message1 = "please type your name";

            } else {

                $scope.error_message1 = "";
            }

            if ($scope.user.user_mobile == null) {
                $scope.error_message2 = "please type your mobile number";

            } else {

                $scope.error_message2 = " ";
            }
            if ($scope.user.user_type == null) {

                $scope.error_message3 = "please select user type";
            } else {

                $scope.error_message3 = " ";
            }
            if ($scope.user.user_type == 2 && $scope.user.dealer_code == null) {

                $scope.error_message4 = "please enter dealer code";

            } else {

                $scope.error_message4 = " ";
            }
        }

        $scope.validationChecking = function() {

            if ($scope.user.user_name == null) {
                $scope.error_message1 = "please type your name";

            } else {

                $scope.error_message1 = "";
            }

            if ($scope.user.user_mobile == null) {
                $scope.error_message2 = "please type your mobile number";

            } else {

                $scope.error_message2 = " ";
            }
            if ($scope.user.user_type == null) {

                $scope.error_message3 = "please select user type";
            } else {

                $scope.error_message3 = " ";
            }
            if ($scope.user.user_type == 2 && $scope.user.dealer_code == null) {

                $scope.error_message4 = "please enter dealer code";

            } else {

                $scope.error_message4 = " ";
            }
            if (($scope.user.user_name != null) && ($scope.user.user_mobile != null)) {
                if ($scope.user.user_type == 2 && $scope.user.dealer_code == null) {


                } else {

                    $scope.sendEmail();
                }

            }



        }

        $scope.sendEmail = function() {
            
          
            for(var i = 0 ; i < $rootScope.audiodata.length ; i++)
            {
                      $rootScope.aud.push($rootScope.audiodata[i].fullPath);
            }
           
            $scope.attachments = $rootScope.imagedata.concat($rootScope.aud);
         //   alert("AUDIO"+JSON.stringify($rootScope.audiodata));

            if ($scope.user.user_type == 1) {
                $scope.user.user_type = "Bharat Ration Direct Customer";
            } else {
                $scope.user.user_type = "Bharat Ration Dealer/Corporate";
            }

            $scope.messagebodyuser = "Name :" + $scope.user.user_name + "<br/>" + "Mobile:" + $scope.user.user_mobile + "<br/>" + "User Type :" + $scope.user.user_type + "<br/>";
            if ($scope.user.user_type == "Bharat Ration Dealer/Corporate") {
                $scope.messagebodydealer = "Dealer Code :" + $scope.user.dealer_code + "<br/>";
            } else {
                $scope.messagebodydealer = "";
            }

            if (($scope.user.user_comments !== "") || ($scope.user.user_comments !== undefined)) {
                $scope.messagecomment = "Comment :" + $scope.user.user_comments;
            } else {
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
            }, function() {
                // alert("EMAIL Not Available");
            });

            $cordovaEmailComposer.open(email).then(null, function() {
                // alert("EMAIL OPEN");
            });
        }


        $window.openlink = function(url) {
            alert(url);
            window.open(url, '_system');
        }
        
        $scope.validateMobile=function()
        {
            console.log("the mobile number is"+$scope.user.user_mobileno);
                   $rootScope.mobileno=$scope.user.user_mobileno;
                    console.log("rootscope number");
                    console.log($rootScope.mobileno);
            if($scope.user.user_mobileno==undefined)
                {
                    
                    $scope.ermessage="Enter 10 digit mobile number";
                }
            else
                {
             
                    userService.sendMobilenumber($scope.user).then(sendMobilenumberres);
                    function sendMobilenumberres(responsedata)
                    {
                        
                        console.log("DAT"+responsedata.status);
                        if(responsedata.status=="Success")
                            {
                               
                                $location.path('/otp');
                            }
                        else
                            {
                                
                            }
                    }
                    
                }
           
        }
         $scope.signin=function()
         { 
           console.log("hi"+$scope.user.num);
           console.log("hi2"+$scope.user.pass);
         }
          $scope.validateOtp=function()
         { 
              alert("OTP"+$rootScope.mobileno);
                $scope.ermessage=" ";
               if($scope.user.user_otp==undefined)
                   {
                          $scope.ermessage="Enter Valid OTP";
                   }
                  else
                  {
                      console.log("otp is"+$scope.user.user_otp);
                      console.log("the mobile isssss"+$rootScope.mobileno);
                      var data={"user_otp":$scope.user.user_otp,"user_mobileno":$rootScope.mobileno}
                      $scope.ermessage=" ";
                      
                       userService.verifyOtp(data).then(validateOtpres);
                    function validateOtpres(responsedata)
                    {
                      
                        console.log("DAT success in controller"+responsedata.status);
                        if(responsedata.status=="Success")
                            {
                               
                            $scope.showDiv=true;
                            $scope.hideOTP=true;
                            }
                        else
                            {
                                
                            }
                    }
                    
                  }
            
         }
          $scope.setPassword=function()
          {  
             
             console.log("Pass"+$scope.user.user_password);
             console.log("CPass"+$scope.user.user_cpassword); 
             console.log("mobile"+$rootScope.mobileno);
              
              if($scope.user.user_password ==null)
                  {
                      $scope.ermessage="Please Enter Password";
                  }
              else if($scope.user.user_password!=$scope.user.user_cpassword)
                {
                      $scope.ermessage="Password Does not Match ";
                 }
              else
                {
                   var data={"user_password":$scope.user.user_password,"user_mobileno":$rootScope.mobileno}
                   $scope.ermessage=" ";
                    userService.setPassword(data).then(setPasswordResp)
                    function setPasswordResp(responsedata)
                    {
                      
                        console.log("DAT success in controller PAAS"+responsedata);
                      
                    }

                }
             
          }
        
    }

}());