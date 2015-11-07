(function(){
	
	angular.module("imdbApp",[]);
	
	angular
	.module("imdbApp")
	.controller("movieSearchController",movieSearchController);
	
	function movieSearchController($scope, $http)
	{
		console.log("Hi from movieSearchController")
		
		$scope.searchMovie = function(){
		var title = $scope.title;
		console.log("searching for movie: "+title);
		/*$http.get("http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0").success(function(response)
			{
				console.log(response);
				//$scope.movies = response;
			});
			console.log("search complete");
		}2
		*/
		
		var url = "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0";
			
		
		$http.jsonp(url+"&callback=JSON_CALLBACK").success
		//$http.jsonp(url).success
		(function(response) {
				console.log(response);
				$scope.movies = response;
				}).error(function(){
					console.log("request failed");
				});	
		
			//$scope.movies = movies;			
		}
		}	
})();