(function() {
    bharat.controller('userController', ['$q', '$timeout', '$scope', '$cordovaCapture', '$ionicModal', '$cordovaEmailComposer', '$cordovaCamera', '$cordovaFile', '$window', '$location', '$rootScope', '$cordovaNativeAudio','$cordovaMedia','$cordovaImagePicker','$cordovaFileTransfer','$cordovaSQLite','userService','$ionicUser','$ionicPush','$cordovaNetwork',userController]);

    function userController($q, $timeout, $scope, $cordovaCapture, $ionicModal, $cordovaEmailComposer, $cordovaCamera, $cordovaFile,
        $window, $location, $rootScope, $cordovaNativeAudio, $cordovaMedia,$cordovaImagePicker,$cordovaFileTransfer,$cordovaSQLite,userService,$ionicUser,$ionicPush,$cordovaNetwork) {
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
        $scope.user.amount_id=[];
        $scope.user.amount_range=[];
        $scope.amountinfo = [];
        $scope.giftitems = [];
        $scope.giftdata = [];
        $scope.usertypelists = [];
        var options = {};
        function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
            return networkState;
        }
        
        
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
        
        $scope.ifMobileExists = function()
        {
            var mobile=window.localStorage.getItem("mobile");
            if(mobile === null)
            {
                $location.path('/mobile');     
            }
            else
            {
                $location.path('/front'); 
            }
        }
        
        
        
        


  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Hari',
      bio: '8056598186'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        alert(notification);
        return true;
      }
    });
  };

        /*
        window.parsePlugin.initialize("bharat", "Ragav$12345", function() {
      console.log('Parse initialized successfully.');
            alert("Parse initialized successfully.");


      window.parsePlugin.subscribe('SampleChannel', function() {
        console.log('Successfully subscribed to SampleChannel.');
           alert("Successfully subscribed to SampleChannel..");

          window.parsePlugin.getInstallationId(function(id) {
            // update the view to show that we have the install ID
            alert('Retrieved install id: ' + id);

               var install_data = {
                  installation_id: id,
                  channels: ['SampleChannel']
               }
              
          }, function(e) {
            alert('Failure to retrieve install id.');
          });

      }, function(e) {
          alert('Failed trying to subscribe to SampleChannel.');
      });

    }, function(e) {
        alert('Failure to initialize Parse.');
    });
        
        
        */
        

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
            var trustAllHosts=true;
            var options = {};
           
            alert("FILE"+filePath);
             $cordovaFileTransfer.upload('fileupload',filePath, options,trustAllHosts)
                  .then(function(result) {
                    console.log("success");
                    alert("sssssss");
                    alert("RES"+JSON.stringify(result));
                  }, function(err) {
                 console.log("Error");
                    alert("fffff");
                    alert("ERR"+JSON.stringify(err));
                   
                  }, function (progress) {
                 console.log("progress");
                 alert("proeeeeeeeeeeeeeeg");
                 $timeout(function () {
                     alert("prog");
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })
                 
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
                                alert("Please attach Valid File"+JSON.stringify(error));
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
               // $scope.audioicon = "ion-play customIcon";
            }
            else
            {
                if($rootScope.audiourl.src == src)
                {
                  //  $scope.audioicon = "ion-play customIcon";
                    $scope.audiostop($rootScope.audiourl);
                    $rootScope.audiourl = "";
                }
                else
                {
                    $scope.audiostop($rootScope.audiourl);
                 //   $scope.audioicon = "ion-stop customIcon";
                    media_toplay = new Media(src,function() {},function(err) {}); 
                    $rootScope.audiourl = media_toplay;
                 
                    $scope.audioplay(media_toplay,src); // new media playing
                  //  $scope.audioicon = "ion-play customIcon";
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
           alert("play");
            
            media.play();
            $scope.audioicon = " ";
            $rootScope.audioiconplay="ion-stop customIcon";
          
        }
        
        $scope.audiopause = function(media,uri){
            media.pause();
        }
         
        $scope.audiostop = function(media){
             $rootScope.audioiconplay=" ";
            media.stop();
            $rootScope.audioiconplay="ion-play customIcon";
        }
        
       
        
        $scope.captureImage = function() {
            var options = {limit: 1,quality: 0,height:50,width:50};
          //   alert("inside captureimage function");
            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
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
            
            alert("Get user type called");
            alert("usertype id is"+$scope.user.usertype_id);
            if ($scope.user.usertype_id== 2) {
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
            if ($scope.user.user_first_name == null) {
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

            if ($scope.user.user_first_name == null) {
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
        
        $scope.getUserPrefilledData = function()
        {

            var mobile=window.localStorage.getItem("mobile");
            var data = {"user_mobileno":mobile};
            userService.getUserPrefilledData(data).then(function(response){
             //   alert("RESP"+JSON.stringify(response));
            });
        }

        $scope.sendEmail = function() {
            
          alert("SEND EMAIL CALLED");
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
            
            $scope.uploadData($scope.attachments);

            window.localStorage.setItem("user_first_name",$scope.user.user_first_name); 
            window.localStorage.setItem("user_email",$scope.user.user_email); 
            window.localStorage.setItem("user_address1",$scope.user.user_address1); 
            window.localStorage.setItem("user_address2",$scope.user.user_address2); 
            window.localStorage.setItem("country_id",$scope.user.country_id); 
            window.localStorage.setItem("state_id",$scope.user.state_id); 
            window.localStorage.setItem("city",$scope.user.city); 
            window.localStorage.setItem("user_pincode",$scope.user.user_pincode); 
            window.localStorage.setItem("user_landmark",$scope.user.user_landmark); 
            window.localStorage.setItem("user_type",$scope.user.user_type); 
            
          /*  $scope.messagebodyuser = "Name :" + $scope.user.user_first_name + "<br/>"  + "Mobile:" + $scope.user.user_mobile + "Email :" + $scope.user.user_email + "<br/>" + "Address Line 1 :" + $scope.user.user_address1 + "<br/>" + "Address Line 2 :" + $scope.user.user_address2 + "Pincode" + $scope.user.user_pincode + "LandMark" + $scope.user.user_landmark + "User Type :" + $scope.user.user_type + "<br/>";*/
            
            $scope.messagebodyuser = "Name :" + "Arun" + "<br/>" + "Mobile no " + "8220178274 " + "<br/>" 
            + "Email: " + "arun@gmail.com"  + "<br/>" + "Address Line 1 " + $scope.user.user_address1 + "<br/>" 
            + "Address Line 2 " + $scope.user.user_address2 + "<br/>" + "city " + $scope.user.city + 
                "<br/>" + "State" + "Tamilnadu" + "<br/>" + "Country" +"India" + "<br/>" + "Pincode :" + $scope.user.user_pincode + "<br/>" + "LandMark :" + $scope.user.user_landmark + "<br/>" + "User Type :" + "Bharat Ration Direct Customer" + "<br/>";
                
            if ($scope.user.user_type == "Bharat Ration Dealer/Corporate") {
                $scope.messagebodydealer = "Dealer Code :" + $scope.user.dealer_code + "<br/>";
            } else {
                $scope.messagebodydealer = "";
            }

            if (($scope.user.user_comments !== "") || ($scope.user.user_comments !== undefined)) {
                $scope.messagecomment = "Comment :" + $scope.user.user_comments + "<br/>";
            } else {
                $scope.messagecomment = "";
            }

            $scope.amtrange=  "Amount Range :" + window.localStorage.getItem("amountrangevalue") + "<br/>";
            if($scope.amtrange == "Enquire")
                {
                    $scope.amtprice = "";
                }
            else
                {
                    $scope.amtprice = "Gift Items :" +  window.localStorage.getItem("giftname");
                }
            
            $scope.messagebody = $scope.messagebodyuser + $scope.messagebodydealer + $scope.messagecomment + $scope.amtrange + $scope.amtprice;
            

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
        
        $scope.uploadData = function(data)
        {
            alert("DATA"+JSON.stringify(data));
            var filePath = data[0];
            var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
            alert("FILEPATH"+filename);
             var options = {
                fileKey: "uploadedfile"
            };
            
            
            var server   =  "http://cloudservices.ashinetech.com/Bharat/service/uploadfile.php";
            alert(filePath);
             $cordovaFileTransfer.upload(server,filePath,options)
            .then(function(result) {
                
                alert("RESULT"+JSON.stringify(result));
            }, function(err) {
                alert("ERROR"+JSON.stringify(err));
            }, function (progress) {
               // alert("PROGRESS"+JSON.stringify(progress));
                 $scope.progress = Math.round((progress.loaded/progress.total) * 100);
             });
            alert("COMPLETE");
        }


        $window.openlink = function(url) {
            alert(url);
            window.open(url, '_system');
        }
        
        $scope.validateMobile=function()
        {
            console.log("the mobile number is"+$scope.user.user_mobileno);
                 //  $rootScope.mobileno=$scope.user.user_mobileno;
                 //   console.log("rootscope number");
                 //   console.log($rootScope.mobileno);
            window.localStorage.setItem("mobile",$scope.user.user_mobileno);
            if($scope.user.user_mobileno==undefined)
                {
                    
                    $scope.ermessage="Enter 10 digit mobile number";
                }
            else
                {
                    
                    userService.sendMobilenumber($scope.user).then(sendMobilenumberres);
                    function sendMobilenumberres(responsedata)
                    {
                        
                        alert("DATASSS"+JSON.stringify(responsedata));
                        alert("SSS"+responsedata.staus);
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
                $scope.ermessage=" ";
               if($scope.user.user_otp==undefined)
                   {
                          $scope.ermessage="Enter Valid OTP";
                   }
                  else
                  {
                      console.log("otp is"+$scope.user.user_otp);
                     var mobile=window.localStorage.getItem("mobile");
                      var data={"user_otp":$scope.user.user_otp,"user_mobileno":mobile}
                      $scope.ermessage=" ";
                      
                       userService.verifyOtp(data).then(validateOtpres);
                    function validateOtpres(responsedata)
                    {
                      
                        alert("DAT success in controller"+responsedata.status);
                        if(responsedata.status === "Success")
                            {
                                alert("SUCCESS");
                               $location.path('/profileinitial');  
                            }
                        else
                            {
                                $location.path('/profileinitial');  
                            }
                    }
                    
                  }
            
         }
          $scope.setPassword=function()
          {  
             
             console.log("Pass"+$scope.user.user_password);
             console.log("CPass"+$scope.user.user_cpassword); 
              var mobile=window.localStorage.getItem("mobile");
              console.log("mob"+mobile);
              
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
                   var data={"user_password":$scope.user.user_password,"user_mobileno":mobile}
                   $scope.ermessage=" ";
                    userService.setPassword(data).then(setPasswordResp)
                    function setPasswordResp(responsedata)
                    {
                       if(responsedata.status=="Success")
                            {
                            
                              
                                $location.path('/profile');
                            }
                        else
                            {
                                
                            }
                        
                      
                    }

                }
             
          }

           
          $scope.loadUserType = function()
          {
            userService.getCustomerType().then(customerTypeResponse);
            function customerTypeResponse(response)
             {
                 $scope.usertypelists = response;    
                 // alert("Json is"+JSON.stringify($scope.usertypelists));
              
              }

              
          }
          
          $scope.loadData = function()
          {    
             $scope.user.user_mobileno=window.localStorage.getItem("mobile");
              if(checkConnection() != "none")
                  {
                      userService.preloadData().then(preloadResponse);
                  }
              else
                  {
                      alert("Internet Disconnected");
                      $location.path('/front'); 
                  }
              
             
               
              function preloadResponse(response)
              {
                
                 $scope.user.country_id=response.country_id;
                 $scope.user.country_name=response.country_name;
                
                  $scope.user.state_id=response.states[0].state_id;
                  $scope.user.state_name=response.states[0].state_name;
                  
                  $scope.citylist=response.states[0].city;
                
                  
                $scope.user.user_first_name = window.localStorage.getItem("user_first_name"); 
                $scope.user.user_email =  window.localStorage.getItem("user_email"); 
                $scope.user.user_address1 = window.localStorage.getItem("user_address1"); 
                $scope.user.user_address2 = window.localStorage.getItem("user_address2"); 
            //    $scope.user.country_id = window.localStorage.getItem("country_id"); 
              //  $scope.user.state_id = window.localStorage.getItem("state_id"); 
                 $scope.user.city = window.localStorage.getItem("city"); 
                $scope.user.user_pincode = window.localStorage.getItem("user_pincode"); 
                $scope.user.user_landmark = window.localStorage.getItem("user_landmark"); 
                  
              //  $scope.user.user_type = window.localStorage.getItem("user_type"); 
           // alert("USER"+JSON.stringify($scope.user));
              }
              
              userService.getGiftandAmount().then(GiftResponse);
              function GiftResponse(response)
              {

                  $scope.amountinfo = response;
                  
                  window.localStorage.setItem("amountData",JSON.stringify(response));
                  
              }
              
          }
        
          $scope.getGift=function()
          {
        
              $scope.giftdatalist = JSON.parse(window.localStorage.getItem("amountData"));
              $scope.count = ($scope.user.amount)-1;
              if($scope.count === -1)
              {
                  $scope.giftdata = "";
                  $scope.giftList=false;
                  window.localStorage.setItem("amountrangevalue","Enquire");
              }
              else
              {
                  $scope.giftdata = $scope.giftdatalist[$scope.count].gift;
                  $scope.giftList=true;
                 window.localStorage.setItem("amountrangevalue",$scope.giftdatalist[$scope.count].amount_range);
              }
              
          }
         $scope.selectList=function(data,$index)
         {
           $scope.finalGift=data;
             $scope.selected = $index;
           window.localStorage.setItem("giftname",$scope.finalGift);     
           
          }
        
          
           $scope.createProfile=function()
           {
               
            if($scope.user.usertype_id==1)
             {
                 $scope.user.user_code1="empty";
              }
               else
               {
                    $scope.user.user_code1=$scope.user.user_code;
                       
               }
               var mobile=window.localStorage.getItem("mobile");

               
              var data = {
                  "user_name":$scope.user.user_name,
                  "user_type":$scope.user.usertype_id,
                  "user_code":$scope.user.user_code1,
                  "user_email":$scope.user.user_email,
                  "user_mobileno":mobile
              };
               
               alert("LOL"+data);
                alert("LOL333"+JSON.stringify(data));
               
              userService.createProfile(data).then(createProfileResponse);
               function createProfileResponse(response)
               {
                //  alert("THEEEE RESPONSE"+JSON.stringify(response));
                   
                    
                               
                                $location.path('/front');
                       
                   
               }
               
               
           }
          $scope.updateProfile=function()
          { 
              // alert("inside update pro");
              if($scope.user.user_first_name==undefined)
                   {
                          $scope.ermessage="First Name Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
              if($scope.user.user_mobileno==undefined)
                   {
                          $scope.ermessage="Mobile Number Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
               if($scope.user.user_email==undefined)
                   {
                          $scope.ermessage="Email Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
               if($scope.user.user_address1==undefined)
                   {
                          $scope.ermessage="Address1 Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
               if($scope.user.user_address2==undefined)
                   {
                          $scope.ermessage="Address2 Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
               if($scope.user.user_pincode==undefined)
                   {
                          $scope.ermessage="Pincode Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
               if($scope.user.user_landmark==undefined)
                   {
                          $scope.ermessage="Landmark Required ";
                   }
                  else 
                  {
                       $scope.ermessage=" ";
                  }
          
              
              
              if(($scope.user.user_first_name != null)&&($scope.user.user_mobileno != null)&&($scope.user.user_email != null)&&($scope.user.user_address1 != null)&&($scope.user.user_address2 != null)&&
                 ($scope.user.user_pincode != null)&&($scope.user.user_landmark != null))
                  {
                         
                         $scope.sendData();
                    
                  }
              
          }
          $scope.sendData=function()
          {  
         
           var data={"user_first_name":$scope.user.user_first_name,"user_mobileno":$scope.user.user_mobileno
                    ,"user_email":$scope.user.user_email,"user_address1":$scope.user.user_address1,"user_address2":$scope.user.user_address2,"user_country":$scope.user.country_id,"user_state":$scope.user.state_id,"user_city":$scope.user.city.city_id,
                    "user_pincode":$scope.user.user_pincode,"user_landmark":$scope.user.user_landmark}
           console.log("user data"+data);
           // alert("user data"+data);
           userService.sendProfileData(data).then(sendDataResponse);
              
              function sendDataResponse(response)
              {
                 
                  console.log("RES"+JSON.stringify(response));
                  if(response.status=="Success")
                            {
                                window.localStorage.setItem("user_first_name",$scope.user.user_first_name); 
                                window.localStorage.setItem("user_email",$scope.user.user_email); 
                                window.localStorage.setItem("user_address1",$scope.user.user_address1); 
                                window.localStorage.setItem("user_address2",$scope.user.user_address2); 
                                window.localStorage.setItem("country_id",$scope.user.country_id); 
                                window.localStorage.setItem("state_id",$scope.user.state_id); 
                                window.localStorage.setItem("city",$scope.user.city); 
                                window.localStorage.setItem("user_pincode",$scope.user.user_pincode); 
                                window.localStorage.setItem("user_landmark",$scope.user.user_landmark); 
                                window.localStorage.setItem("user_type",$scope.user.user_type); 
    
                                $location.path('/front');
                            }
                        else
                            {
                                alert("Not SUccess");
                            }
                  
              }
              
              
          }
        
    }
    

}());