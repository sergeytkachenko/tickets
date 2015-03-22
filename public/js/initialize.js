jQuery(function($){
	$(document).ready(function(){
		
		/* scroll to top */
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('a[href=#toplink]').fadeIn();
			} else {
				$('a[href=#toplink]').fadeOut();
			}
		});
		$('a[href=#toplink]').on('click', function(){
			$('html, body').animate({scrollTop:0}, 'normal');
			return false;
		});
		
		/* animate comments scroll */
		$(".comment-scroll a").click(function(event){		
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 'normal');
		});
		
		/* superFish */
		$("ul.sf-menu").superfish({
			autoArrows: false,
			delay: 200,
			dropShadows: false,
			speed: 'fast',
			animation: {
				opacity:'show',
				height:'show'
			},
		});
		
		/* fitvids */
		$(".fitvids").fitVids();
			
	}); /*  end doc ready */
}); /*  end function */


jQuery(function($){
	$(window).load(function() {
		/* fixed header */
		function wpex_staticheader() {
			var $header_height = $('#header-wrap').outerHeight();
			$('#header-wrap').css({
				position: 'fixed',
				top: 0,
				left: 0
			});
			$('#wrap').css({
				paddingTop: $header_height
			});	
		}
		if ($(window).width() > 767) {
			wpex_staticheader();
			$(window).resize(function () {
				wpex_staticheader();
			});
			$(window).bind('orientationchange', function(event) {
				var $header_height = $('#header-wrap').outerHeight();
				$('#wrap').css({
					paddingTop: $header_height
				});	
			});
		}
	}); /*  END window ready */
}); /*  END function */
