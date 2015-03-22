jQuery(function($){
	$(document).ready(function(){
		
		/* remove img height and width attributes for better responsiveness */
		$('img').each(function(){
			$(this).removeAttr('width')
			$(this).removeAttr('height');
		});		
		
		/* responsive drop-down <== main nav */
		$("<select />").appendTo("#navigation");
		$("<option />", {
		   "selected": "selected",
		   "value" : "",
		   "text" : responsiveLocalize.text
		}).appendTo("#navigation select");
		
		$("#navigation a").each(function() {
			var el = $(this);
			if(el.parents('.sub-menu').length >= 1) {
				$('<option />', {
				 'value' : el.attr("href"),
				 'text' : '- ' + el.text()
				}).appendTo("#navigation select");
			}
			else if(el.parents('.sub-menu .sub-menu').length >= 1) {
				$('<option />', {
				 'value' : el.attr('href'),
				 'text' : '-- ' + el.text()
				}).appendTo("#navigation select");
			}
			else {
				$('<option />', {
				 'value' : el.attr('href'),
				 'text' : el.text()
				}).appendTo("#navigation select");
			}
		});
		
		/* open link */
		$("#navigation select").change(function() {
		  window.location = $(this).find("option:selected").val();
		});

		/* uniform */
		$(function(){
       		 $("#navigation select").uniform();
			 $("#top-navigation select").uniform();
      	});
	
	}); /* END doc ready */
}); /* END function */