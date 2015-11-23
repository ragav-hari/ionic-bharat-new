(function() {
    bharat.controller('userController', ['$q', '$timeout', '$scope', '$cordovaCapture', '$ionicModal', '$cordovaEmailComposer', '$cordovaCamera', '$cordovaFile', '$window', '$location', '$rootScope', '$cordovaNativeAudio','$cordovaMedia','$cordovaImagePicker','$cordovaFileTransfer','$cordovaSQLite','userService','$ionicUser','$ionicPush','$cordovaNetwork','$ionicLoading','$cordovaPush','$cordovaProgress','$ionicHistory','$ionicLoading','$cordovaInAppBrowser','$state','$cordovaKeyboard',userController]);

    function userController($q, $timeout, $scope, $cordovaCapture, $ionicModal, $cordovaEmailComposer, $cordovaCamera, $cordovaFile,
        $window, $location, $rootScope, $cordovaNativeAudio, $cordovaMedia,$cordovaImagePicker,$cordovaFileTransfer,$cordovaSQLite,userService,$ionicUser,$ionicPush,$cordovaNetwork,$ionicLoading,$cordovaPush,$cordovaProgress,$ionicHistory,$ionicLoading,$cordovaInAppBrowser,$state,$cordovaKeyboard) {
        $scope.audio = [];
        $scope.image = [];
        $rootScope.imagedata = [];
        $rootScope.audiodata = [];
         $rootScope.aud = [];
        $rootScope.audiourl = "";
        $scope.user = {};
        $scope.attachments = [];
       // $scope.user.user_type = 1;
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
        //$scope.user.amountval = 0;
        $scope.user.amount = 0;
        $scope.user.user_type = "1";
        $scope.usertypelists = [];
        $scope.uploading = false;
        var options = {};
        $scope.hideSubmit = [];
        $scope.showSpinner = [];
        $rootScope.image =[];
        $rootScope.audios = [];
        $scope.final_bool=false;
        $scope.header_custom = true;
        
        $rootScope.goback = true;
        
        
        function checkConnection() {
    var networkState = navigator.connection.type;
            

    var states = {};
            return networkState;
        }
        
        $scope.loadSplash = function()
        {

            $timeout(function()
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
                
            }, 3000); 
            
            
        }
        
       
          
        
        
        $scope.addLogContent = function(type,data)
        {
           // alert("DATA"+data);
            $scope.mobileno = window.localStorage.getItem("mobile");
            
            userService.addLogContent({"type":type,"data":data,"mobile":$scope.mobileno,"date":$scope.formatDate(new Date())}).then(function(response){
                //alert("RESP"+JSON.stringify(response));      
                //alert("RESP"+JSON.stringify(response));      
            });
        }
      
        $scope.formatDate = function(date) {
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "  " + strTime;
         // return date.getDate() + "/" +date.getMonth()+1 + "/" + date.getFullYear() + "  " + strTime;
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
        
       
        $scope.showLoading = function() {
   
           $ionicLoading.show(); 
        };
        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };
        
        $scope.loadMobile = function(){
            $rootScope.headershow = true;
            if($rootScope.goback)
            {
                $rootScope.goback = false;
            }
        }
        
        
        $scope.loadOTP = function()
        {
            if(!$rootScope.goback)
            {
                $rootScope.goback = true;
            }    
        }
        
        $scope.loadBharat = function()
        {
            if(!$rootScope.goback)
            {
                $rootScope.goback = true;
            }
        }
        
        $scope.registerPush = function(mobileno)
        {
              push.on('registration', function(data) {
                
                    window.localStorage.setItem("DEVICE_TOKEN",data.registrationId);      
                  
                    var pushdata = {mobileno:mobileno , deviceToken: data.registrationId};
                    userService.registerPush(pushdata).then(function(response){
                          
                        });
              });
        }
        
        $scope.ifMobileExists = function()
        {   
            if($rootScope.goback)
            {
                $rootScope.goback = false;
            }
            
            /*var mobile=window.localStorage.getItem("mobile");
            if(mobile === null)
            {   
              
                $location.path('/mobile');   
            }
            else
            {   
                $location.path('/front'); 
            } */
        }
        
        
       
        
       
        

  // Identifies a user with the Ionic User service
 /* $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ramesh',
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
alert("Registering");
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
  };*/

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
        
        $scope.checkSession = function()
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
        
        
        $scope.InternetConnectionCallback = function(noconnectionerrormessage,errordatamessage)
        {
              var networkState = navigator.connection.type;
             
                if(networkState === "none")
                {
                    alert(noconnectionerrormessage);
                }
                else
                {
                    alert(errordatamessage);   
                }
        }

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
        
        
        $ionicModal.fromTemplateUrl('addressmodal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.addressattachmentmodal = modal;
        });
        $scope.openAddressAttachmentModal = function() {
            
           if(($rootScope.audiodata)||($rootScope.imagedata))
           {
             // alert("audio or image");
            //  alert("audio"+$rootScope.audiodata);
             // alert("image"+$rootScope.imagedata);
              $scope.addressattachmentmodal.show();
           }
           else
           { 
              // alert("Please Select Files for Order");
                $location.path('/front');
                $scope.addressattachmentmodal.hide();
             
           }
          
          
           
        };
        $scope.closeAddressAttachmentModal = function() {
            $scope.addressattachmentmodal.hide();
        };

        
        
        
        $scope.setDataSourceForAudioandImage = function(data,hasaudio,hasimage)
        {
            $rootScope.hasaudio = hasaudio;
            $rootScope.hasimage = hasimage;
       
            if($rootScope.hasaudio)
            {
                $rootScope.audiodata.push(data);  
                window.localStorage.setItem("AUDIO_DATA_STORAGE",$rootScope.audiodata);
                window.localStorage.setItem("HAS_AUDIO",true);
            }
            else if($rootScope.hasimage)
            {
                $rootScope.imagedata.push(data);     
                window.localStorage.setItem("IMAGE_DATA_STORAGE",$rootScope.removeImage);
                window.localStorage.setItem("HAS_IMAGE",true);
            }
            else{alert("PLEASE PASS A VALID DATA");}
      
        }

        $scope.captureAudio = function() {
            if(checkConnection() === "none"){
           alert("Please connect your internet");
            }
       else{
            var options = {
                limit: 1,
                duration: 10
            };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                $rootScope.size += audioData[0].size;
                if ($rootScope.size >= 10000000) 
                {
                    alert("Size Exceeds the Max Limit");
                    
                   
                    $location.path('/front');
                } 
                else 
                {
                     $scope.showuploading();
                      $scope.mobileno = window.localStorage.getItem("mobile");
                      var data = {"user_mobileno":$scope.mobileno};
                      userService.getOrderID(data).then(function(response){   
                          
                          if(response[0].status === "Success")
                          {
                                window.localStorage.setItem("order_id",response[0].order_id);  
                                $scope.file_type = "audio";
                                $scope.neworderid = response[0].order_id;
                                $scope.setDataSourceForAudioandImage(audioData[0],true,false);
                                $scope.uploadData(audioData[0].fullPath,$scope.file_type,$scope.neworderid);
                                $scope.setAllAudio(audioData[0].fullPath);   
                          }
                          else
                          {
                               $scope.hideuploading();
                             
                                window.localStorage.setItem("order_id","");   
                                
                                
                                $location.path('/front');
                          }                          
                       });     
                    $location.path('/bharat');
                }
            }, function(err) {
                var error_type = "Audio";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
                $location.path('/front');
            });  
             
            $location.path('/bharat');
            }
        }

        $scope.captureAudioModal = function() {
            if(checkConnection() === "none"){
           alert("Please connect your internet");
       }
       else{
           
            var options = {
                limit: 1,
                duration: 10
            };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                $scope.showLoading();
                $rootScope.size += audioData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                    $scope.attachmentmodal.hide();
                } else {
                     $scope.file_type = "audio";
                    $scope.neworderid = window.localStorage.getItem("order_id");  
                    $scope.uploadData(audioData[0].fullPath,$scope.file_type,$scope.neworderid);
                    $scope.setDataSourceForAudioandImage(audioData[0],true,false);
                    $scope.setAllAudio(audioData[0].fullPath);
                    $rootScope.hasaudio = true;
                    window.localStorage.setItem("HAS_AUDIO",$rootScope.hasaudio);
                    $scope.hideLoading();
                    $location.path('/bharat');
                }
                $scope.attachmentmodal.hide();
            }, function(err) {
                
               $scope.hideLoading();
               
                var error_type = "Audio";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
                
                $scope.attachmentmodal.hide();
            });
            $scope.attachmentmodal.hide();
            // $location.path('/bharat');
            }    
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
                  window.localStorage.setItem("IMAGE_AUDIO_DATA",$rootScope.imagedata);
                  window.localStorage.setItem("HAS_IMAGE",$rootScope.hasimage);
                 var i=window.localStorage.getItem("HAS_IMAGE");
                 

             }, function(err) {
                var error_type = "Image";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
             });
            $cordovaCamera.cleanup().then(success,failure); // only for FILE_URI
                                            
        
             $location.path('/bharat');
            
        }
        
        $scope.uploadfile = function()
        {
            var filePath = $rootScope.imagedata[0];
            var trustAllHosts=true;
            var options = {};
           
           
             $cordovaFileTransfer.upload('fileupload',filePath, options,trustAllHosts)
                  .then(function(result) {
                    console.log("success");
                
                  }, function(err) {
                 var error_type = "Upload";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
                 
                  }, function (progress) {
                 
                 $timeout(function () {
                    
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })
                 
                 
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
            
            });
            $scope.attachmentmodal.hide();
        }

        $scope.selectimage = function() {
            if(checkConnection() === "none"){
           alert("Please connect your internet");
       }
       else{
            if ($rootScope.size >= 10000000) 
            {
                $location.path('/bharat');
            } 
            else 
            {
                
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
                             
                                    $scope.attachmentmodal.hide();
                                    } else {
                                $rootScope.imagedata.push(success.toURL());
                                window.localStorage.setItem("IMAGE_AUDIO_DATA",$rootScope.imagedata);
                                        $scope.file_type="image";
                                        $scope.neworderid = window.localStorage.getItem("order_id");  
                                        $scope.uploadData(success.toURL(),$scope.file_type,$scope.neworderid);
                                        $scope.setAllImage(success.toURL());
                                        $scope.attachmentmodal.hide();
                                    }
                            }, function(error) {
                               var error_type = "Gallery Image";
                               var error_data = JSON.stringify(err);
                               $scope.addLogContent(error_type,error_data);
                            
                            });
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                },
                function(error) {
                                var error_type = "Gallery Image";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);             
                                $scope.attachmentmodal.hide();
                }

            );
            $scope.attachmentmodal.hide();
            //$location.path('/bharat');
                }
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
        
        
         $scope.audioPlayFromURL = function(uri,$index) {

            var src = uri;
            
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
       if(checkConnection() === "none"){
           alert("Please connect your internet");
       }
       else{
            var options = {limit: 1,quality: 0,height:50,width:50};
            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
                if ($rootScope.size >= 10000000) 
                {
                    alert("Size Exceeds the Max Limit");
                    $location.path('/front'); 
                } 
                else 
                {
                      $scope.showuploading();
                      $scope.mobileno = window.localStorage.getItem("mobile");
                      var data = {"user_mobileno":$scope.mobileno};
                      userService.getOrderID(data).then(function(response){   
                          if(response[0].status === "Success")
                          {
                                window.localStorage.setItem("order_id",response[0].order_id);  
                                $scope.file_type = "image";
                                $scope.neworderid = response[0].order_id;
                                $scope.setDataSourceForAudioandImage(imageData[0].fullPath,false,true);
                                $scope.uploadData(imageData[0].fullPath,$scope.file_type,$scope.neworderid);
                                $scope.setAllImage(imageData[0].fullPath);     
                          }
                          else
                          {
                                window.localStorage.setItem("order_id","");   
                                $location.path('/front');
                          }                          
                       });  
                }
            }, function(err) {
                var error_type = "Image";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
                $location.path('/front');
            });
            $location.path('/bharat');
       }
 }

        
        
       /* $scope.captureImage = function() {
                     $scope.mobileno = window.localStorage.getItem("mobile");
                         
                      var data = {"user_mobileno":$scope.mobileno};
                      alert("DATA"+JSON.stringify($scope.data));
                      userService.getOrderID(data).then(function(response){
                          alert("RESP"+JSON.stringify(response));    
                          if(response[0].status === "Success")
                          {
                                window.localStorage.setItem("order_id",response[0].order_id);  
                                $scope.file_type = "image";
                                $scope.neworderid = response[0],order_id; 
                                alert("NEW ORDER ID"+$scope.neworderid); 
                                $scope.setDataSourceForAudioandImage(imageData[0].fullPath,false,true);
                                $scope.uploadData(imageData[0].fullPath,$scope.file_type,$scope.neworderid);
                                $scope.setAllImage(imageData[0].fullPath); 
                                
                          }
                          else
                          {
                                window.localStorage.setItem("order_id","");   
                                //alert("Failue");
                                $location.path('/front');
                          }
                       }); 
            
            $scope.mobileno = window.localStorage.getItem("mobile");
            alert("MOBILE"+$scope.mobileno);
            var data = {}
            userService.getOrderID(data).then(function(response){
                alert("RESPONSE"+JSON.stringify(response));
            }
        }*/
        
        
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
            if(checkConnection() === "none"){
           alert("Please connect your internet");
       }
       else{
            var options = {limit: 1,quality: 0,height:100,width:100};

            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                } else {
                   //  for(var i = 0 ; i < 4 ; i++)
                     //   {
                    $scope.file_type = "image";
                    $scope.neworderid = window.localStorage.getItem("order_id");  
                    $scope.uploadData(imageData[0].fullPath,$scope.file_type,$scope.neworderid);
                    $rootScope.imagedata.push(imageData[0].fullPath);
                    $scope.setAllImage(imageData[0].fullPath);
                    $rootScope.hasimage = true;
                   
                       // }
                }

               // $scope.attachmentmodal.hide();
            }, function(err) {
               var error_type = "Image";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
                $scope.attachmentmodal.hide();
            });
            $scope.attachmentmodal.hide();
            }
        }

        //todo
        $scope.removeImage = function(index,data) {
            $scope.showLoading();
            $scope.tempsize = $rootScope.size;
            $rootScope.size -= getfileSize($rootScope.imagedata[index]);
            $rootScope.imagedata.splice(index, 1);
           
               $scope.setID(data);
        }
        $scope.setID  = function(data)
        {
            var filename = data.substr(data.lastIndexOf('/') + 1);
            var order_id = window.localStorage.getItem("order_id");
            var data1 ={"file":filename,"order_id":order_id};
            
           userService.deleteImage(data1).then(DeleteResponse);
            function DeleteResponse(resp)
            {
                $scope.hideLoading();
                
            }
        }

        $scope.removeAudio = function(index,data) {
            $scope.tempsize = $rootScope.size;
            $scope.removePlayAudio($rootScope.audiodata[index]);
          
            $rootScope.size -= $rootScope.audiodata[index].size;
            $rootScope.audiodata.splice(index, 1);
              $scope.setIdAudio(data);
        }
        $scope.setIdAudio = function(data)
        {
            var filename = data.name;
            var order_id = window.localStorage.getItem("order_id");
            var data1 ={"file":filename,"order_id":order_id};
            
           userService.deleteImage(data1).then(DeleteResponse);
            function DeleteResponse(resp)
            {
                $scope.hideLoading();
            }
        }

        function deletefile(fileEntry) {
            fileEntry.remove(success, fail);
        }

        function success(entry) {
    
        }

        function fail(error) {
        }
        $scope.getusertype = function() {
            
       
            if ($scope.user.user_type== 2) {
                $scope.usertypedata = true;
            } else {
                $scope.usertypedata = false;
            }
        }

        $scope.zoom = function(url) {
            $scope.zoomimage = url;
            $scope.modal.show();
        }
/*  
        $scope.onchagevalidation = function() 
        {
             if ($scope.user.user_type)
             {

                $scope.usertype_eror = " ";
            }
            else 
            {
               $scope.usertype_eror = "please select user type";
                
            }
            if ($scope.user.user_type == 2 && $scope.user.dealer_code == null)
            {

                $scope.dealercode_error = "please enter dealer code";

            }
            else
            {

                $scope.dealercode_error = " ";
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
        */
        
        /*$scope.getUserPrefilledData = function()
        {

            var mobile=window.localStorage.getItem("mobile");
            var data = {"user_mobileno":mobile};
            userService.getUserPrefilledData(data).then(function(response){
               alert("RESP"+JSON.stringify(response));
            });
        }*/

        $scope.sendEmail = function() {
            
        
            for(var i = 0 ; i < $rootScope.audiodata.length ; i++)
            {
                      $rootScope.aud.push($rootScope.audiodata[i].fullPath);
            }
           
            $scope.attachments = $rootScope.imagedata.concat($rootScope.aud);
       

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
               
            }, function() {
              
            });

            $cordovaEmailComposer.open(email).then(null, function() {
               
            });
        }
        
        $scope.uploadDataNew = function(count)
        {
            
             for(var i = 0 ; i < $rootScope.audiodata.length ; i++)
            {
                      $rootScope.aud.push($rootScope.audiodata[i].fullPath);
            }
           
            $scope.attachments = $rootScope.imagedata.concat($rootScope.aud);
            
            $scope.hideSubmit[count] = true;
            //$scope.showSpinner[count] = true;
            //console.log("SHOWSPINNER"+$scope.showSpinner[count]+"COunt"+count);
            $scope.uploadData($scope.attachments[count]);
            //$scope.showSpinner[count] = false;
        }
        
        
        $scope.uploadData = function(data,type,order_id)
        {
             angular.element(document.querySelector('#next-button')).css('display','none');
            /*    var hasaudio = window.localStorage.getItem("HAS_AUDIO");
              var hasimage = window.localStorage.getItem("HAS_IMAGE");
            
               if(hasaudio)
               {
                 $scope.file_type="audio"; 
               }
               if(hasimage)
               {
                $scope.file_type="image";    
                   
               }
               */
         
           // $cordovaProgress.showSimple(true);
            var params = {};
            
            params.order_id = order_id;
            params.filetype = type;
            
            var filePath = data;
            var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
           
             var options = {
                fileKey: "uploadedfile",
                fileName : filename,
                params :  params,
                httpMethod : "POST" 
            };
             
             
            $scope.showuploading();
            
            var server   =  "http://cloudservices.ashinetech.com/Bharat/service/uploadfile.php";
             $cordovaFileTransfer.upload(server,filePath,options)
            .then(function(result) {
               
              
                $scope.hideuploading();
               // var myEl = angular.element( document.querySelector( '#next-button'));
               // myEl.css('display','block'));
                angular.element(document.querySelector('#next-button')).css('display','block');
                 
            }, function(err) {
                var error_type = "Upload";
                var error_data = JSON.stringify(err);
                $scope.addLogContent(error_type,error_data);
                 $scope.hideuploading();
                
            }, function(progress) {
             
                $scope.progressval = Math.round((progress.loaded/progress.total) * 100);
                 

                    if(checkConnection() === "none")
                    {
                        $scope.hideuploading();                      
                    }
                    else
                    {
       
                    }
             });

         
        }

        
        $scope.getORDERID1 =function()
        {
               var order_id1 = window.localStorage.getItem("order_id");
               var oid = {"order_id":order_id1};
            
               userService.getAllDatas(oid).then(getdataResponse);
               function getdataResponse(resp)
               {
                    window.localStorage.setItem("final_data",JSON.stringify(resp));
               }
            
        }

        $window.openlink = function(url) {
      
            window.open(url, '_system');
        }
    
        $scope.validateMobile=function()
        { 
    
            window.localStorage.setItem("mobileno",$scope.user.user_mobileno);
            if($scope.user.user_mobileno==undefined)
                {
                    
                    $scope.ermessage="Enter 10 digit mobile number";
                }
            else
                {
                    $scope.showLoading();
                    userService.sendMobilenumber($scope.user).then(sendMobilenumberres);
                    function sendMobilenumberres(responsedata)
                    {
                        
                      
                        if(responsedata.status=="Success")
                            {
                               
                                $location.path('/otp');
                                $scope.hideLoading();
                            }
                        else
                            {
                                alert("Sorry please try again");
                                console.log("LOGIN RESPONSE"+responsedata);
                                $scope.hideLoading();
                            }
                    }
                   
                    
                }
           
        }
         $scope.signin=function()
         { 
           console.log("hi"+$scope.user.num);
           console.log("hi2"+$scope.user.pass);
         }
         $scope.user.user_otp = [];

         
         $rootScope.OTPNumbers = [];   
         $scope.disableotp=true;
         $scope.createOTPNumber = function(number)
         {
             var length = $rootScope.OTPNumbers.length;
            console.log(length);
             if(length === 5)
             {
                 
             }
             else
             {
                $scope.user.user_otp[length] = number;
                $rootScope.OTPNumbers.push(number);    
                $scope.disableotp=true;
             }
             
             if(length === 4)
                 {
                     $scope.disableotp=false;
                 }
         }
         
         $scope.deleteOTPNumber = function()
         { 
             $rootScope.OTPNumbers.pop();
             var length = $rootScope.OTPNumbers.length;
             $scope.user.user_otp[length] = '';
              $scope.disableotp=true;
         }
         
         $scope.clearOTPNumber = function()
         {
             $rootScope.OTPNumbers = [];
             $scope.user.user_otp  = [];
             $scope.disableotp=true;
         
         }

         $scope.checkOTP = function()
         {
             
         }
         
         $scope.validateOtp=function()
         {     
                if($scope.user.user_otp.length === 5)
                {
                        
                
              $scope.userotp = $scope.user.user_otp.join('');
               $scope.ermessage = " ";
               if($scope.userotp == undefined)
                   {
                          $scope.ermessage="Enter Valid OTP";
                   }
                  else
                  {
                      console.log("otp is"+$scope.userotp);
                     var mobile=window.localStorage.getItem("mobileno");
                      var data={"user_otp":$scope.userotp,"user_mobileno":mobile}
                      $scope.ermessage=" ";
                      $scope.showLoading();
                    userService.verifyOtp(data).then(validateOtpres);
                    function validateOtpres(responsedata)
                    {
                      
                       
                        if(responsedata.status === "Success")
                            {  $scope.hideLoading();
                               
                                window.localStorage.setItem("mobile",mobile);
                                
                                var push = PushNotification.init({ "android": {"senderID": "235999860706"}} ); 
                                push.on('registration', function(data) {
                                   
                                    window.localStorage.setItem("DEVICE_TOKEN",data.registrationId);      
                                 
                                    var pushdata = {mobileno:mobile , deviceToken: data.registrationId};
                                    userService.registerPush(pushdata).then(function(response){
                                          
                                    });
                                });
                                
                              
                               $location.path('/front');  
                            }
                        else
                            {
                                $scope.hideLoading();
                                alert("Enter Valid OTP");
                                $scope.clearOTPNumber();
                            }
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
               
              
              }

              
          }
          
          $scope.loadImageAudioData = function()
          {
              var hasaudio = window.localStorage.getItem("HAS_AUDIO");
              var hasimage = window.localStorage.getItem("HAS_IMAGE")
              if(hasaudio !== null && hasaudio !== undefined)
              {
                  $rootScope.audiodata.push(window.localStorage.getItem("IMAGE_AUDIO_DATA"));    
                  $rootScope.hasaudio = true;
              }
              else
              {
                 $rootScope.imagedata.push(window.localStorage.getItem("IMAGE_AUDIO_DATA"));    
                  $rootScope.hasimage = true;
                
              }
          }
          
          $scope.loadData = function()
          {   
              
              $scope.user.user_mobileno = window.localStorage.getItem("mobile");
              $scope.final_data = window.localStorage.getItem("final_data");
            
              if(checkConnection() != "none")
                  {
                      $scope.showuploadingover();
                      var data = {"user_mobileno":$scope.user.user_mobileno};
                      $scope.neworderid = window.localStorage.getItem("order_id");
                      var order_data = {"order_id":$scope.neworderid};
                      
                      userService.preloadData().then(preloadResponse);
                      userService.getUserPrefilledData(data).then(userPreloadResponse);
                     // userService.getAllDatas(order_data).then(getdataResponse);
                  }
              else
                  {
                      alert("Internet Disconnected");
                      $location.path('/bharat'); 
                  }
              
              
            
             function getdataResponse(response)
             {
                 $scope.imageaudiodata = [];

                 if(response[0].status === "success")
                 {
                    if(response[0].item_type === "image")
                    {
                        $scope.imagedatas = true;
                        $scope.audiodatas  = false;
                    }
                    else
                    {
                       $scope.imagedatas  = false;
                       $scope.audiodatas  = true;    
                    }
                    $scope.imageaudiodata = response;     
                 }
                 else
                 {
                     $scope.imageaudiodata = [];
                 }
             }
              
             function userPreloadResponse(response)
              {
                 // $scope.user.user_type=1;
                  /*
                 
                 $scope.user.user_first_name = response.user_first_name;
                 $scope.user.user_email = response.user_email;
                 $scope.user.user_address1 = response.user_address;  
                 $scope.user.user_type = response.user_type;
                 $scope.user.user_pincode = response.user_pincode;
                 $scope.user.user_landmark = response.user_landmark;   
                 */
        
                  if(response.user_first_name)
                  {
                     $scope.user.user_first_name = response.user_first_name;  
                  }
                  else
                  {
                       $scope.user.user_first_name =" ";
                  }
                   if(response.user_email)
                  {
                       $scope.user.user_email = response.user_email; 
                  }
                  else
                  {
                     $scope.user.user_email =" ";
                  }
                   if(response.user_address)
                  {
                          $scope.user.user_address1 = response.user_address;  
                  }
                  else
                  {
                     $scope.user.user_address1 =" ";
                  }
                  if(response.user_type)
                  {
                               $scope.user.user_type = response.user_type;
                  }
                  else
                  {
                          $scope.user.user_type = " ";
                  }
                  if(response.user_pincode)
                  {
                               $scope.user.user_pincode = response.user_pincode;
                  }
                  else
                  {
                         $scope.user.user_pincode = " ";
                  }
                   if(response.user_landmark)
                  {
                                  $scope.user.user_landmark = response.user_landmark;   
                  }
                  else
                  {
                            $scope.user.user_landmark = " ";   
                  }
                 // $scope.hideLoading();  
                  $scope.hideuploadingover();
              }
               
              function preloadResponse(response)
              {
                
                 /*$scope.user.country_id=response.country_id;
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
                  */
              //  $scope.user.user_type = window.localStorage.getItem("user_type"); 
         
              }
              
              userService.getGiftandAmount().then(GiftResponse);
              function GiftResponse(response)
              {

                  $scope.amountinfo = response;
                 // $scope.amount.amount_range = $scope.amountinfo.amount_from+"-"+$scope.amountinfo.amount_to;
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
             $scope.user.giftdatas = data[$index].gift_id;
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
                          
              userService.createProfile(data).then(createProfileResponse);
               function createProfileResponse(response)
               {
            
                 $location.path('/front');
               }
               
               
           }
          $scope.updateProfile=function()
          { 
            
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
          
          
          $scope.getOrderId = function(mobileno)
          {
              var data = {"user_mobileno":mobileno};
              return $scope.createOrderID(data);   
          }
          
          
          $scope.createOrderID = function(data)
          {    
              userService.getOrderID(data).then(function(response){
                  
                        if(response[0].status === "Success")
                        {
                            window.localStorage.setItem("order_id",response[0].order_id);  
                            $scope.status = true;
                        }
                        else
                        {
                            window.localStorage.setItem("order_id","");   
                            $scope.status = false;
                        }
                        return $scope.status;
              });  
          }
          
          $scope.getWordFromNumber = function(number)
          {
              
              $scope.wordfromnumber =  convertNumbertoWord(number);
        
          }
          
          
          $rootScope.showuploading= function() {
            $ionicLoading.show({
              template: '<span>Uploading file please wait</span>'
            });
          };
          $rootScope.hideuploading = function(){
            $ionicLoading.hide();
          };
        $rootScope.showuploadingover= function() {
            $ionicLoading.show({
              template: 'Uploading File Completed '
            });
          };
          $rootScope.hideuploadingover = function(){
            $ionicLoading.hide();
          };
        
          $scope.addAddressDetail = function()
          {
              
            $scope.showLoading();
              $scope.user_order_id =  window.localStorage.getItem("order_id"); 
              if($scope.user_order_id  == 0){alert("Invalid Order"); location.path("/bharat");}
            
              
              var data = {"user_order_id":$scope.user_order_id,"user_mobileno":$scope.user.user_mobileno,"user_first_name":$scope.user.user_first_name,"user_email":$scope.user.user_email,"user_address":$scope.user.user_address1,"user_pincode":$scope.user.user_pincode,"user_landmark":$scope.user.user_landmark,"user_account_type":$scope.user.user_type,"user_dealercode":$scope.user.dealer_code,"user_comments":$scope.user.user_comments,"user_amount_range":$scope.user.amount,"user_gift":$scope.user.giftdatas};
              
              userService.updateAddressDetails(data).then(function(response){
                  localStorage.removeItem("order_id");
                  if(response.data.status == "Success")
                  {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache(); 
                      $rootScope.imagedata=[];
                      $rootScope.audiodata=[];
                      window.localStorage.setItem("IMAGE_AUDIO_DATA"," ");
                      window.localStorage.setItem("AUDIO_DATA_STORAGE"," ");
                      window.localStorage.setItem("HAS_AUDIO"," ");
                      window.localStorage.setItem("IMAGE_DATA_STORAGE"," ");
                      window.localStorage.setItem("HAS_IMAGE"," ");
                      window.localStorage.setItem("order_id",""); 
                      window.localStorage.setItem("IMG"," ");
                      window.localStorage.setItem("AUD"," ");
                      $scope.hideLoading();
                    alert("Your order has been successfully placed"); 
                     $scope.addressattachmentmodal.hide();
                    $location.path('/front');   
                  }
                  else
                  {
                      $scope.hideLoading();
                    alert("Order placing failed please try again"); 
                  
                   // $location.path('/front');   
                  }
              });
          }
          
          $scope.getAllOrders = function()
          {
              if(!$rootScope.goback)
              {
                 $rootScope.goback = true;
              }
              $scope.showLoading();
              $scope.allorder = [];
              var data = {"user_mobileno":window.localStorage.getItem('mobile')};
             // alert("DATA"+JSON.stringify(data));
              userService.getAllOrders(data).then(function(response){
                    $scope.allorders = response.data; 
                    if($scope.allorders[0].status=="Failure")
                    {
                      $scope.noorders=true;
                        
                    }
                    else
                    {
                       $scope.noorders=false; 
                    }
                    
                 
                    
                    $scope.hideLoading(); 
              });
          }
          
          $scope.viewSingleOrderDetail = function(orderid)
          {
              $scope.showLoading();
              userService.viewSingleOrderDetail({"order_id":orderid}).then(function(response){
                $scope.singleorder = response;
                  window.localStorage.setItem("singleorder",JSON.stringify($scope.singleorder));
                  $scope.hideLoading();
                  $location.path('/viewsingleorderdetail');  
              });
              
          }
          
          $scope.acceptOrder = function(orderid)
          {
               $scope.showLoading();
              var data = {"order_id":orderid};
              userService.acceptOrder(data).then(function(response){
                   $scope.hideLoading();
                   $location.path('/viewallorders');  
              });
          }
          
          $scope.rejectOrder = function(orderid)
          {
               $scope.showLoading();
              var data = {"order_id":orderid};
              userService.rejectOrder(data).then(function(response){
                   $scope.hideLoading();
                  $location.path('/viewallorders');  
              });
          }
          
          $scope.singleorderpage = function()
          {
              if(!$rootScope.goback)
              {
                 $rootScope.goback = true;
              }
              
              $scope.showLoading();
              $scope.singleorder = [];
              var response = JSON.parse(window.localStorage.getItem("singleorder"));  
                if(response === "null" || response === null)
                {  
                   $scope.noorders = true;    
                   $scope.singleorderstatus = false;   
                   $scope.invoiceoption = false;    
                }
                else
                {
                      if(response[0].Status === "Success")
                      {
                           $scope.singleorder = response;
                           $scope.singleorderstatus = true;    
                           if(response[0].order_status === "106")
                           {
                               $scope.invoiceoption = true;    
                           }
                           else
                           {
                               $scope.invoiceoption = false;       
                           }
                      }
                      else
                      {
                            $scope.singleorder = [];
                            $scope.singleorderstatus = false;   
                      }
                }
                 $scope.hideLoading(); 
    
              $location.path('/viewsingleorderdetail');      
          }
          
          $scope.downloadfile = function(url,filename)
          {   
            
              
              var targetPath = "/" + filename;
              var trustHosts = true
              var options = {};
              
                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                  .then(function(result) {
                
                  }, function(err) {
                
                  }, function (progress) {
                    $timeout(function () {
                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    })
                  });

              
          }
          $scope.setAllImage= function(data)
          {
            $rootScope.image.push(data);
            
              window.localStorage.setItem("IMG",$rootScope.image);
        
            
          }
           $scope.setAllAudio= function(data)
          {
         
            $rootScope.audios.push(data);
            
              window.localStorage.setItem("AUD",$rootScope.audios);
             
            
          }
           
          $scope.openFileinBrowser = function(url)
          {
              window.open(url, '_system', 'location=yes');
          }
           
        
            $scope.buttons = [1,2,3,4,5,6,7,8,9];
            $scope.user.user_mobileno = {};
            $scope.user.user_mobileno = "Mobile Number";
            $rootScope.tempnumber         = [];
            $scope.mobile_next = true;
        
            $scope.checkMobileNextButton = function()
            {
                if($rootScope.tempnumber.length === 10)
                {
                    $scope.mobile_next = false;    
                }
                else
                {
                    $scope.mobile_next = true;    
                }
            }
        
            $scope.createPhoneNumber = function(number)
            {
                if($scope.user.user_mobileno.length === 10)
                {
                        
                }
                else
                {
                        $rootScope.tempnumber.push(number);
                        $scope.user.user_mobileno = $rootScope.tempnumber.join(''); 
                        $scope.checkMobileNextButton();
                        document.getElementById('phonelab').style.color='white';
                        document.getElementById('phonelabel').style.border = '1px solid white';   
                }
                             
            }
            
            $scope.deletePhoneNumber = function()
            {
                $rootScope.tempnumber.pop();
                $scope.checkMobileNextButton();
               //:todo    
               if($rootScope.tempnumber.length > 0)
               {    
                   $scope.user.user_mobileno = $rootScope.tempnumber.join('');  
               }
               else
               {
                   $scope.user.user_mobileno = "Mobile Number";  
                   document.getElementById('phonelab').style.color='#d2d2d2';
                   document.getElementById('phonelabel').style.border = '1px solid #d2d2d2';  
               }
            }
            
            $scope.clearPhoneNumber = function()
            {
                $rootScope.tempnumber         = [];
                $scope.mobile_next = true;
                $scope.user.user_mobileno = "Mobile Number"; 
                document.getElementById('phonelab').style.color='#d2d2d2';
                document.getElementById('phonelabel').style.border = '1px solid #d2d2d2'; 
            }

            
          $scope.finalValidation = function()
          {  
              
              if($scope.user.user_type==2)
                  {
                     if($scope.user.dealer_code)
                     {
                         
                     }
                      else
                      {
                          $scope.dealercode_error="Please Enter Dealer Code";
                          document.getElementById('code').style.display= 'block';
                      }
                      
                  }
           
              if($scope.user.amount != 0)
              {
                  if($scope.user.giftdatas)  
                  {
                      
                  }
                  else
                  {
                      
                        $scope.gift_error = "Please Select Gift Amount"; 
                        document.getElementById('gift_error').style.display= 'block';
                  }
             }
             else
              {
                  
              }

              if($scope.user.user_first_name)
              {
           
                    $scope.name_error = " ";
              }
                 
             else
             {
                      $scope.name_error = "Please Enter Your Name";
                      document.getElementById('name').style.display= 'block';
                     

              }
               if($scope.user.user_mobileno)
              {
                  
                   $scope.mobile_error = " ";
              }
                 
             else
             {
               $scope.mobile_error ="Please Enter Your Mobile Number";
               document.getElementById('mobile').style.display= 'block';
               
               
              }
               if($scope.user.user_email)
              {
                  
                  $scope.email_error = " ";
              }
                 
             else
             {
               
                  $scope.email_error = "Please Enter Your Email ";
                 document.getElementById('email').style.display= 'block';
               
              }
               if($scope.user.user_address1)
              {
                  $scope.address_error = " ";
              }
                 
             else
             {
               
               $scope.address_error = "Please Enter Your Address";
               document.getElementById('address').style.display= 'block';
              }
               if($scope.user.user_pincode)
              {
                  $scope.pincode_error = " ";
                  
              }  
             else
             {
               
               $scope.pincode_error = "Please Enter Your Pincode";
               document.getElementById('pincode').style.display= 'block';
               
              }
               if($scope.user.user_landmark)
              {
                 $scope.landmark_error = " ";
                  
              }
                 
             else
             {
               
                    $scope.landmark_error = "Please Enter Your Landmark";
                    document.getElementById('landmark').style.display= 'block';
               
              }
              if(
                ($scope.user.user_first_name)&&
                ($scope.user.user_mobileno)&&
                ($scope.user.user_email)&&
                ($scope.user.user_address1)&&
                ($scope.user.user_pincode)&&
                ($scope.user.user_landmark))
              {
                  if(($scope.user.user_type==2)&&($scope.user.dealer_code))
                  {
                     
                      $scope.final_bool=true;
                       
                  }
                  else
                  {
                      $scope.final_bool=false;
                      
                  }
                  
                if(($scope.user.amount !=0) && ($scope.user.giftdatas))
                 {
                      $scope.final_bool=true;
                 }
                 else if($scope.user.amount == 0)
                 {
                     $scope.final_bool=true;
                 }
                else  
                {
                        $scope.gift_error = "Please Select Gift Amount"; 
                       $scope.final_bool=false;
                 }
                      
                 if($scope.final_bool)
                 {
                  
                      $scope.addAddressDetail();
                     
                  }
                  else
                 {
                   
                    
                 }
                  
              }
              else
              {
              }

        
    }
     
          
          
          
         
    }
}());