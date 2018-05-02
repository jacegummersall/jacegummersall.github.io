document.addEventListener('DOMContentLoaded',function(event){

    var words = ["Welcome, I'm", "Jace Gummersall"];

    function typeWriter(text, i, fnCallback) {

        if (i < (text.length)) {
            if(text == "Welcome, I'm"){
                document.getElementById("type-intro1").innerHTML = text.substring(0, i+1) +'<span id="letter" aria-hidden="true"></span>';
                document.getElementById("letter").style.borderRight = ".05em solid #000000";
                if (text[i] == ","){
                    setTimeout(function() {
                        typeWriter(text, i + 1, fnCallback)
                    }, 1000);
                }
                else {
                    setTimeout(function() {
                        typeWriter(text, i + 1, fnCallback)
                    }, 100);
                }
            }
            else if (text == "Jace Gummersall"){
                document.getElementById("type-intro2").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            }

        }
        else if (typeof fnCallback == 'function') {
            document.getElementById("letter").style.borderRight = "";
            setTimeout(fnCallback, 700);
        }
    }

    function StartTextAnimation(i) {
        if (typeof words[i] == 'undefined'){
            setTimeout(function() {
                StartTextAnimation(0);
            }, 20000);
        }
        else if (i < words[i].length) {
            typeWriter(words[i], 0, function(){
                StartTextAnimation(i + 1);
            });
        }
    }

    StartTextAnimation(0);
});
