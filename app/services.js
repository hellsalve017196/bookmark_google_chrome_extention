// for all the services
angular.module('services',[])

.service('bookmarkTreeService',function() {
	
	this.getTree = function(callback) {
		chrome.bookmarks.getTree(function(res) {
				callback(res);
		})
	}

})

// getting all the urls from the deafult folder
.service('bookmarkByParentService',function() {

	obj = {};

	obj.getBookmarks = function(id,callback) {
		chrome.bookmarks.getChildren(id,function(result) {
					callback(result);
		       })
	}

	return obj;

})


// creating bookmarks
.service('createBookmarkService',function() {

	obj = {};

	obj.createBookmarks = function(object,callback) {
		chrome.bookmarks.create(object,function(result) {
			callback();
		})
	}

	return obj;

})

// deleting current tree
.service('deleteTreeService',function() {
	obj = {};

	obj.deleteBookmarks = function(local_array,callback) {
		for(var l_a in local_array)
		{
			chrome.bookmarks.remove(local_array[l_a]["id"],function() {
				console.log("works");
			})
		}

		callback();
	}

	return obj;
})

// filtering server array and local array
.service('filterService',function() {
	this.temp = [];

	this.after_filter = function(local_array,server_array) {
		if(local_array.length > 0 && server_array.length > 0)
						{
							
							// checking if there is any new bookmark and add it to the server

							for(var r in local_array)
							{
								for(var s_a in server_array)
								{
									if(local_array[r]["dateAdded"] === server_array[s_a]["dateAdded"])
									{
										if(Object.keys(this.temp).length > 0)
										{
											if(local_array[r]["dateAdded"] in this.temp)
											{
												delete this.temp[local_array[r]["dateAdded"]];
											}
										}

										break;
									}
									else {
										if(Object.keys(this.temp).length == 0)
										{
											this.temp[local_array[r]["dateAdded"]] = local_array[r];
										}
										else if(Object.keys(this.temp).length > 0)
										{
											if(!(local_array[r]["dateAdded"] in this.temp))
											{
												this.temp[local_array[r]["dateAdded"]] = local_array[r];
											}
										}
									}
								}
							}

							
						}

						return this.temp;
	}
})
