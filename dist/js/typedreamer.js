(function(){
	var Typedreamer = function(element, text, options){
    var breakable = this.breakable = false;
    this.element = element;
    this.text = text;

    if (typeof options !== "undefined"){
    	breakable = typeof options.breakable !== "undefined" && options.breakable;
    }

		element.innerHTML = '';

    var words = text.split(' ');
    words.forEach(function(w, k){
    	var word = document.createElement('span');
      word.setAttribute('class', 'word');
      element.appendChild(word);
      w.split('').forEach(function(e){
        var character = e.replace(' ', '&nbsp;');
        var cssClass = e.replace(' ', 'space');
        var letter = document.createElement('span');
        letter.setAttribute('class', 'letter-' + cssClass);
        letter.innerHTML = character;
        word.appendChild(letter);
      });

      if (k < words.length - 1){
        var space = document.createElement('span');
        space.setAttribute('class', 'space');
        space.innerHTML = breakable ? "" : "&nbsp;";
      	element.appendChild(space);
      }
    });
  };
  Typedreamer.prototype.getElement = function(){
  	return this.element;
  };

  Typedreamer.prototype.getText = function(){
  	return this.text;
  };

  if (typeof window.Typedreamer === "undefined"){
  	window.Typedreamer = Typedreamer;
  }
})();

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
