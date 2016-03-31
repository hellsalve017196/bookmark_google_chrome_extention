// for controllers
angular.module('controllers',[])


.controller('loginCtrl',function($scope,$state) {
	$scope.get_in = function() {
		if($scope.user != undefined)
		{
			if($scope.user != '')
			{	
				localStorage.setItem("user",$scope.user);
				$state.go('sync',{},{reload : true});
			}
		}
	}
})


.controller('syncCtrl',function($scope,$firebaseArray,bookmarkByParentService,filterService,createBookmarkService,deleteTreeService) {
	ref = new Firebase('https://urlamammia.firebaseio.com/'+localStorage.getItem("user"));

	$scope.syncUrl = function() 
	{
		// getting url from local server
		bookmarkByParentService.getBookmarks('1',function(local_array) {
			if(local_array.length > 0)
			{
				server_objects = $firebaseArray(ref);

				// when the array gets loaded
				server_objects.$loaded().then(function(server_array) {
						if(server_array.length > 0)
						{
							var temp = {};

							// checking if there is any new bookmark and add it to the server
							temp = filterService.after_filter(local_array,server_array);
							console.log(temp);

							// adding new bookmarks to the server if ant
							if(Object.keys(temp).length > 0)
							{
								for(var key in temp)
								{
									server_objects.$add(temp[key]);	
								}

								$scope.flag = "Successfully added";
							}
						}
						else {
							try 
							{
								for(var r in local_array)
								{
									server_objects.$add(local_array[r]);  // inserting to the server
								}
							}
							catch(e) {
								console.log(e);
							}
							finally{
								 $scope.flag = "Successfully added";
							}
						}
				})	
				}
			
		 });

	}


	// adding from server
	$scope.adding_to_local = function(server_array)
	{
		if(server_array.length > 0) 
					{
						console.log("server_array:"+server_array.length);


						for(var key in server_array) 
						{
							if(server_array[key]["parentId"] != undefined)
							{
								if(typeof server_array[key] === "object")
								{
									temp = {'parentId' : server_array[key]["parentId"],'index' : server_array[key]["index"],'title' : server_array[key]["title"],'url' : server_array[key]["url"]};

									console.log(temp);
									createBookmarkService.createBookmarks(temp,function() {
										//$scope.flag = "Successfully Retrived";
									});	

								}
							}
						}

					}
	}


	// retriving bookmarks
	$scope.retrive_bookmarks = function() {
		bookmarkByParentService.getBookmarks('1',function(local_array) {
			
			server_objects = $firebaseArray(ref);

			server_objects.$loaded().then(function(server_array) {

				if(local_array.length > 0)
				{
					deleteTreeService.deleteBookmarks(local_array,function() {

					});

				}
				

			
				$scope.adding_to_local(server_array);	

			})

		})
	}

})