(function(){
	
	 bharat.factory('userService',['$q','$http',userService]);
    
    function userService($q,$http){
        
        return{
          sendMobilenumber : sendMobilenumber,
          verifyOtp :  verifyOtp,
          setPassword : setPassword,
          sendProfileData : sendProfileData,
          preloadData : preloadData,
          fileUpload :  fileUpload,
          getUserPrefilledData:getUserPrefilledData
        };
        
         function  sendMobilenumber(datas)
        {  
           
            alert("CALLING"+JSON.stringify(datas));
            
              return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/addPhoneNumber.php'
              })
              .then(sendMobilenumberResponse)
              .catch(sendMobilenumberError);
            
        }
        
        function sendMobilenumberResponse(mobileresponse)
        {
         // alert("SUCCESS",JSON.stringify(mobileresponse));
             return mobileresponse.data;
        }
        function sendMobilenumberError(err)
        {
          //  alert("ERROR RESPONSE"+JSON.stringify(err));
       
        }
        
        
         function  verifyOtp(datas)
        {  
           
           // alert("CALLING"+JSON.stringify(datas));
            
              return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/verifyOTP.php'
              })
              .then(verifyOtpResponse)
              .catch(verifyOtpError);
            
        }
        function  verifyOtpResponse(otpresponse)
        {
       //   alert("SUCCESS in service"+JSON.stringify(otpresponse));
             return otpresponse.data;
        }
        function  verifyOtpError(err)
        {
          //  alert("ERROR"+JSON.stringify(err));
       
    
        }
        
         function  setPassword(datas)
        {  
           
          //  alert("tttttttttttttttt"+JSON.stringify(datas));
            
              return $http({
                method : 'POST',
                data:datas,
                url    : 'addpassword'
              })
              .then(setPasswordResponse)
              .catch(setPasswordError);
            
        }
        function  setPasswordResponse(response)
        {
          console.log("Pass INSERT SUCCESS"+JSON.stringify(response));
             return response.data;
        }
        function  setPasswordError(err)
        {
            console.log("ERROR IN PASSS Service"+JSON.stringify(err));
       
    
        }
        
         
         function   sendProfileData(datas)
        {  
           
            console.log("tttttttttttttttt"+JSON.stringify(datas));
            
              return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/addUserDetails.php'
              })
              .then(sendProfileDataResponse)
              .catch(sendProfileDataError);
            
        }
        function   sendProfileDataResponse(response)
        {
          console.log("Pass INSERT SUCCESS"+JSON.stringify(response));
             return response.data;
        }
        function   sendProfileDataError(err)
        {
            console.log("ERROR IN PASSS Service"+JSON.stringify(err));
       
    
        }
        
        
        
        function   preloadData()
        {              
              return $http({
                method : 'GET',
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getpreloaddata.php'
              })
              .then(preloadDataResponse)
              .catch(preloadDataError);
            
        }
        function   preloadDataResponse(response)
        {
        
             return response.data;
        }
        function   preloadDataError(err)
        {
            console.log("ERROR IN PASSS Service"+JSON.stringify(err));
       
        }
        
          function   fileUpload(datas)
        {  
           
            console.log("FFFF"+JSON.stringify(datas));
            
              return $http({
                method : 'POST',
                data:datas,
                url    : 'updateprofile'
              })
              .then(fileUploadResponse)
              .catch(fileUploadError);
            
        }
        function  fileUploadResponse(response)
        {
          console.log("Pass INSERT SUCCESS"+JSON.stringify(response));
             return response.data;
        }
        function   fileUploadResponse(err)
        {
            console.log("ERROR IN PASSS Service"+JSON.stringify(err));
       
    
        }
        
        function getUserPrefilledData(datas)
        {
              return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getUserPreloadData.php'
              })
              .then(function(response){return response})
              .catch(function(error){return error});
        }
        
        
    }
	
}());
