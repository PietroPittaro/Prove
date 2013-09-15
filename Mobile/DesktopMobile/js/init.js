$(function(){
	
	$('.slider').mobilyslider({
		content: '.sliderContent',
		children: 'div',
		transition: 'fade',
		animationSpeed: 1500,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		bullets: false,
		arrows: true,
		arrowsHide: true,
		prev: 'prev',
		next: 'next',
		animationStart: function(){},
		animationComplete: function(){}
	});
	
});

$(function(){
	
	$('.slidertwo').mobilyslider({
		content: '.sliderContent.slidertwo',
		children: 'div',
		transition: 'fade',
		animationSpeed: 500,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		bullets: false,
		arrows: true,
		arrowsHide: false,
		prev: 'prev',
		next: 'next',
		animationStart: function(){},
		animationComplete: function(){}
	});
	
});
