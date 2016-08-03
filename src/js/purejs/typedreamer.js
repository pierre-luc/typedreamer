(function(){
	var Typedreamer = function(element, text, options){
  console.log({
  text: text, options: options
  });
    var breakable = this.breakable = false;
    this.element = element;
    this.text = text;


    if (typeof options !== "undefined"){
    	breakable = typeof options.breakable !== "undefined" && options.breakable;
    }

    var re = /(<[^>]*>)([^<]*)/gm;
    text = text.replace(re, function(match, $1, $2){
    	var ghost = document.createElement('ghost');
      apply(ghost, $2)
    	return $1 + ghost.innerHTML;
    });

    element.innerHTML = text;

    function apply(element, text){
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
    }
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
