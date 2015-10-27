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
          getUserPrefilledData:getUserPrefilledData,
          getCustomerType:getCustomerType,
          createProfile:createProfile,
          getGiftandAmount :getGiftandAmount,
          getOrderID : getOrderID,
          updateAddressDetails : updateAddressDetails,
          deleteOrderItemandUpdateorder : deleteOrderItemandUpdateorder,
          registerPush : registerPush,
          getAllOrders : getAllOrders,
          viewSingleOrderDetail : viewSingleOrderDetail ,
          getAllDatas  : getAllDatas,
          deleteImage  : deleteImage,
          acceptOrder  : acceptOrder,
          rejectOrder  : rejectOrder    
        };
        
         function  sendMobilenumber(datas)
        {  
           
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
       
             return mobileresponse.data;
        }
        function sendMobilenumberError(err)
        {
         
            return err;
       
        }
        
        
         function  verifyOtp(datas)
        {  
            
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
             return otpresponse.data;
        }
        function  verifyOtpError(err)
        {
            return err;
        }
        
         function  setPassword(datas)
        {   
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
             return response.data;
        }
        function  setPasswordError(err)
        {
            return err;
        }
        
         
         function   sendProfileData(datas)
        {   
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
             return response.data;
        }
        function   sendProfileDataError(err)
        {
              return err;
        }
       
        function    getGiftandAmount()
        {   
            
              return $http({
                method : 'GET',
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getGiftandAmount.php'
              })
              .then(GiftandAmountResponse)
              .catch(GiftandAmountError);
            
        }
        function   GiftandAmountResponse(response)
        {
             
             return response.data;
        }
        function   GiftandAmountError(err)
        {  
              return err;
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
            return err;
       
        }
        
          function   fileUpload(datas)
        {  

            
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
             return response.data;
        }
        function   fileUploadResponse(err)
        {
            return err;
        }
        
        function getUserPrefilledData(datas)
        {
           
            return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getUserPreloadData.php'
              })
             .then(PrefilledDataResponse)
              .catch(PrefilledDataError);
        }
         function  PrefilledDataResponse(response)
        {
             return response.data;
        }
        function   PrefilledDataError(err)
        {  
        
            return err;

        }
    
        
        function   getCustomerType()
        {              
              return $http({
                method : 'GET',
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getUserType.php'
              })
              .then(CustomerTypeResponse)
              .catch(CustomerTypeError);
            
        }
        function   CustomerTypeResponse(response)
        {
      
             return response.data;
        }
        function   CustomerTypeError(err)
        {
           return err;
        }
        
         function  createProfile(datas)
        {  
            
              return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/updateUserType.php'
              })
              .then(createProfileResponse)
              .catch(createProfileError);
            
        }
        function  createProfileResponse(response)
        {
             return response.data;
        }
        function  createProfileError(err)
        {

            return err;
        }
        
        
         function getOrderID(data)
        {              
              return $http({
                method : 'POST',
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getOrderID.php',
                data   : data  
              })
              .then(getOrderIDResponse)
              .catch(getOrderIDError);
            
        }
        function   getOrderIDResponse(response)
        {
             return response.data;
        }
        
        function   getOrderIDError(err)
        {
              return err;
       
        }
        
        function updateAddressDetails(data)
        {
               return $http({
                 method : 'POST',
                 url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/updateAddressDetails.php',
                 data   : data 
               })
              .then(function(response){return response;})
              .catch(function(error){return error});
        }
        
        function deleteOrderItemandUpdateorder(data)
        {
             return $http({
                 method : 'POST',
                 url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/deleteOrderItemandUpdateorder.php',
                 data   : data 
               })
              .then(function(response){return response;})
              .catch(function(error){return error});
        }
        
        function registerPush(data)
        {
            return $http({
                 method : 'POST',
                 url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/RegisterforPush.php',
                 data   : data 
               })
              .then(function(response){return response;})
              .catch(function(error){return error});
        }
        
        function getAllOrders(data)
        {
             return $http({
                 method : 'POST',
                 url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getallorders.php',
                 data   : data 
               })
              .then(function(response){return response;})
              .catch(function(error){return error;});
        }
        
        function getAllOrdersForMobile(data)
        {
            return $http({
                 method : 'POST',
                 url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getallordersformobile.php',
                 data   : data 
               })
              .then(function(response){return response.data;})
              .catch(function(error){return error;});
        }
        
        function viewSingleOrderDetail(data)
        {
            return $http({
                 method : 'POST',
                 url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/viewSingleOrderDetail.php',
                 data   : data 
               })
              .then(function(response){return response.data;})
              .catch(function(error){return error});
        }
         function  getAllDatas(datas)
        {          
              return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/getAllDatas.php'
              })
              .then(getAllDatasResponse)
              .catch(getAllDatasError);
            
        }
        function  getAllDatasResponse(response)
        {
         
             return response.data;
        }
        function getAllDatasError(err)
        {
            return err;
           
        }
         function  deleteImage(datas)
        {      
            alert("called");
            return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/deleteImages.php'
              })
              .then(deleteImageResponse)
              .catch(deleteImageError);
            
        }
        function  deleteImageResponse(response)
        { 

             return response.data;
        }
        
        function deleteImageError(err)
        {
            return err;
    
        }
        
        function acceptOrder(datas)
        {
             return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/acceptorder.php'
              })
              .then(function(response){return response.data})
              .catch(function(error){return error});
        }
        
        function rejectOrder(datas)
        {
            return $http({
                method : 'POST',
                data:datas,
                url    : 'http://www.cloudservices.ashinetech.com/Bharat/service/rejectorder.php'
              })
              .then(function(response){return response.data;})
              .catch(function(error){return error;});  
        }
       
    }
	
}());
