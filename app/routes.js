// all the routes
angular.module('routes',[])

// routes
.config(function($stateProvider,$urlRouterProvider) {
	
	$stateProvider

			.state('login',{
				url : '/login',
				templateUrl : 'login.html',
				controller : 'loginCtrl'
			})

			.state('sync',{
				url : '/sync',
				templateUrl : 'sync.html',
				controller : 'syncCtrl'
			})

			if(localStorage.getItem("user") == undefined)
			{
				$urlRouterProvider.otherwise('/login');
			}
			else {
				$urlRouterProvider.otherwise('/sync');
			}

})

// run
.run(function($rootScope) {
		
})