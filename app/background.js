var app = angular.module('backgroundApp',['firebase'])

// run config
app.run(function($firebaseArray) {
	
	// setting a username
	var set_user = function() {
		if(localStorage.getItem("user") == undefined)
		{
			user = prompt("set a username");

			if(user != '')
			{
				localStorage.setItem("user",user);
			}
			else {
				set_user();
			}
		}
	}

	set_user();


	// firebase ref
	ref = new Firebase('https://urlamammia.firebaseio.com/'+localStorage.getItem("user"));

	// all the chrome events

	// adding new bookmark
	chrome.bookmarks.onCreated.addListener(function(id,bookmark) {
		server_object = $firebaseArray(ref);

		server_object.$loaded().then(function(on_server) {
			if(on_server.length > 0)
			{
				var red_flag = false;

				for(var o_s in on_server)
				{
					if(on_server[key]["parentId"] != undefined)
					{
						if(on_server[o_s]["dateAdded"] === bookmark["dateAdded"])
						{
							red_flag = true;
							break;
						}
					}

				}

				if(!red_flag)
				{
					console.log(red_flag)
					server_object.$add(bookmark);
				}
				
			}
			else {
				server_object.$add(bookmark);
			}
		})
	})


	// deleting new bookmark
	chrome.bookmarks.onRemoved.addListener(function(id,remove_info) {
		console.log(remove_info);
		server_object = $firebaseArray(ref);

		server_object.$loaded().then(function(on_server) {
			for(var key in on_server)
			{
				if(on_server[key] != undefined)
				{
					if(id === on_server[key]["id"])
					{
						server_object.$remove(on_server[key]).then(function(ref) {
							console.log("deleted");
						})

						break;
					}
				}
			}
		})
	})

})
