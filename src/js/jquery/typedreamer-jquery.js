/**
	* typedreamer-jquery
	* jQuery plugin
	* @author Pierre-Luc BLOT
	* @created 16/05/2016
	*/
	(function(window, jQuery){
		/*
		 * @requires ../purejs/typedreamer.js
		 */
		$.fn.extend({
			typedreamer: function(text, options){
				var typeDreamer = new Typedreamer($(this)[0], text, options);
			}
		});
		$('*[data-typedream-me]').each(function(){
			var text = $(this).text();
			$(this).html('');
			$(this).typedreamer(text, {
				breakable: typeof $(this).attr('data-breakable') !== "undefined"
			});
		});
	})(window, jQuery);
