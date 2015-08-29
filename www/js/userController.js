(function() {
    bharat.controller('userController', ['$q', '$timeout', '$scope', '$cordovaCapture', '$ionicModal', '$cordovaEmailComposer', '$cordovaCamera', '$cordovaFile', '$window', '$location', '$rootScope', '$cordovaNativeAudio', '$cordovaMedia', userController]);

    function userController($q, $timeout, $scope, $cordovaCapture, $ionicModal, $cordovaEmailComposer, $cordovaCamera, $cordovaFile,
        $window, $location, $rootScope, $cordovaNativeAudio, $cordovaMedia) {
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

        $scope.audioClick = function(uri) {

            var src = uri.localURL;
            
            var media_playing = "";
            var media_toplay = "";
         
       
            if($rootScope.audiourl == "")
            {
                media_playing = new Media(src,function() {},function(err) {}); //play audio
                $rootScope.audiourl = media_playing;
                $scope.audioplay(media_playing,src);         
            }
            else
            {
                $scope.audiostop($rootScope.audiourl);
                
                 media_toplay = new Media(src,function() {},function(err) {}); 
                 $rootScope.audiourl = media_toplay;
                 $scope.audioplay(media_toplay,src); // new media playing
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
            var options = {
                limit: 4
            };

            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                    $location.path('/front');
                    
                } else {
                    for(var i = 0 ; i < 4 ; i++)
                        {
                             $rootScope.imagedata.push(imageData[i].fullPath);
                             $rootScope.hasimage = true;
                        }
                
                 //   $scope.openCamera(imageData);
                }

            }, function(err) {
                $location.path('/front');
            });
            //$scope.modal.hide();         
            $location.path('/bharat');

        }

        $scope.openCamera = function(imageData) {

            var r = confirm("Do you want to add more photos");
            if (r == true) {
                $scope.captureImage();
            } else {
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
            var options = {
                limit: 4
            };

            $cordovaCapture.captureImage(options).then(function(imageData) {
                $rootScope.size += imageData[0].size;
                if ($rootScope.size >= 10000000) {
                    alert("Size Exceeds the Max Limit");
                } else {
                     for(var i = 0 ; i < 4 ; i++)
                        {
                    $rootScope.imagedata.push(imageData[0].fullPath);
                    $rootScope.hasimage = true;
                        }
                }

                $scope.attachmentmodal.hide();
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


    }

}());