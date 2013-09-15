$(document).ready(function(){
	$(document).find(".leaderboard").each(function(){
	$(this).find(".banner-content").each(function(){												   
		var div = $(this);											  
		$(this).find('img').each(function(){
			var src = $(this).attr('src');							  
			if (src.indexOf('grey.gif')>0){
				div.attr('style','display:none;');
			}
		});
	});	
	});
});