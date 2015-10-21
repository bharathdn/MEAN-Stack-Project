(function(){
	$(init);
	
	function init()
	{
		$("#searchMovie").click(searchMovie);
		
		var movieTitle =$("#movieTitle");
		var tbody =$("#container"); //table.find("tbody");
		var template = $("#template").clone();
		//tbody.empty();
	
	
		function searchMovie()
		{
			console.log("Search Button Clicked");
			var title = movieTitle.val();
			console.log("Searching for movie: "+title);
			
			$.ajax({
				url: "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0",
						
			dataType: "jsonp",
			//success: renderMoviesWithTemplate
			success: renderMovies	
			});
		}
		
		function renderMoviesWithTemplate(movies)
		{
			console.log(movies);
			
			tbody.empty();
			
			for(var movie in movies)
			{
				var movie = movies[movie];
				var title = movie.title;
				var plot = movie.plot;
				var posterURL = movie.urlPoster;
				var imdbURL = movie.urlIMDB;
				
				var tr = template.clone();
				
				tr.find(".link")
				.attr("href",imdbURL)
				.html(title);
				
				tr.find(".plot")
				.html(plot);
				
				tr.find(".poster")
				.attr("src", posterURL);
				
				tbody.append(tr);
			}
		}
		
		function renderMovies(movies){
			console.log(movies);
			
			tbody.empty();
			
			for(var m in movies)
			{
				var movie = movies[m];
				var title = movie.title;
				var plot = movie.plot;
				var posterURL = movie.urlPoster;
				var imdbURL = movie.urlIMDB;
				
				
				var tr = $("<tr>");
				var titleLink = $("<a>").attr("href",imdbURL).html(title);
				var titleTD =$("<td>").append(titleLink);
				var plotTD = $("<td>"+plot+ "</td>");
				var img = $("<img>").attr("src",posterURL);
				var posterTD = $("<td>").append(img);
				
				tr.append(titleTD);
				tr.append(plotTD);
				tr.append(posterTD);
				
				tbody.append(tr);
			}
		}
	}
})();