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
