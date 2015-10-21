(function(){
	$(init);

	function init()
		{
			$("#findMovieBtn").click(function(){
				var title = $("#title").val();
				findMoviesByTitle(title, renderMoviesByTemplate);
			});
		}
		
	function findMoviesByTitle(title,callbackfunc)
	{
		$.ajax({
				url: "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0",
			dataType: "jsonp",
			success: function(response)
			{
				callbackfunc(response);
			}
		})
	}
	
	var template = null;
	var container = null;
	
	function renderMoviesByTemplate(movies)
	{
		if(template == null)
		{
			template = $(".template").clone();
			container = $(".template-container");
		}
		container.empty();
		for(var m in movies)
		{
			var movie = movies[m];
			console.log(movie);
			
			var instance = template.clone();
			
			instance
			.find(".title")
			.html(movie.title)
			.attr("href",movie.urlIMDB);
			
			instance.find(".plot").html(movie.plot);
			instance.find(".poster").attr("src",movie.urlPoster);
			container.append(instance);
		}
	}
})();