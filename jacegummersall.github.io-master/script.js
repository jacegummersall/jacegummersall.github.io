document.addEventListener('DOMContentLoaded',function(event){

    showContent(sessionStorage.getItem("view"));

    var words = ["Welcome, I am", "Jace Gummersall"];

    function typeWriter(text, i, fnCallback) {

        if (i < (text.length)) {
            if(text == words[0]){
                document.getElementById("type-intro1").innerHTML = text.substring(0, i+1) +'<span id="welcome" aria-hidden="true"></span>';
                document.getElementById("welcome").style.borderRight = ".05em solid #000000";
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
            else if (text == words[1]){
                document.getElementById("type-intro2").innerHTML = text.substring(0, i+1) +'<span id="name" aria-hidden="true"></span>';
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            }

        }
        else if (typeof fnCallback == 'function') {
            document.getElementById("welcome").style.borderRight = "";
            setTimeout(fnCallback, 700);
        }        
        if (i == words[words.length-1].length){
            setTimeout(function() {
                var elem = document.createElement("span");
                var pipe = document.createTextNode("|");
                elem.setAttribute("class", "hidden");
                elem.appendChild(pipe);
                var welcome = document.getElementById("type-intro1");
                welcome.innerHTML  = "";
                welcome.appendChild(elem)
                var name = document.getElementById("type-intro2");
                name.innerHTML = "";
                name.appendChild(elem);
            }, 19900);
            
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

var active = false;
var previous = '';

window.addEventListener("orientationchange", function() {
    document.location.reload();
});


function showContent(section){

    sessionStorage.setItem("view", section);

    /*Variables*/
    var ul = document.getElementById('list');
    var about = document.getElementById('about');
    var about_button = document.getElementById('about-button');
    var resume = document.getElementById('resume');
    var resume_button = document.getElementById('resume-button');
    var work = document.getElementById('work');
    var work_button = document.getElementById('work-button');
    var contact = document.getElementById('contact');
    var contact_button = document.getElementById('contact-button');
    var portrait = window.matchMedia("(orientation: portrait)").matches;

    function runMenu(){
        if(active == false){
            open(false);
            previous = section;
        }
        else if(active == true && previous != section){
            open(true)
            previous = section;
        }
        else{
            close();
            previous = '';
        }
    }

    function defaultOrder(){
        ul.children[0].style.order = 1;
        ul.children[1].style.order = 2;
        ul.children[2].style.order = 3;
        ul.children[3].style.order = 4;
    }

    function changeOrder(){
        if(portrait){
            switch(section){
                case 'about':
                    ul.children[0].style.order = 4;
                    ul.children[1].style.order = 1;
                    ul.children[2].style.order = 2;
                    ul.children[3].style.order = 3;
                    break;
                case 'resume':
                    ul.children[0].style.order = 1;
                    ul.children[1].style.order = 4;
                    ul.children[2].style.order = 2;
                    ul.children[3].style.order = 3;
                    break;
                case 'work':
                    ul.children[0].style.order = 1;
                    ul.children[1].style.order = 2;
                    ul.children[2].style.order = 4;
                    ul.children[3].style.order = 3;
                    break;
                case 'contact':
                    ul.children[0].style.order = 1;
                    ul.children[1].style.order = 2;
                    ul.children[2].style.order = 3;
                    ul.children[3].style.order = 4;
                    break;
            }
        }
        else {
            switch(section){
                case 'about':
                    defaultOrder()
                    break;
                case 'resume':
                    ul.children[0].style.order = 2;
                    ul.children[1].style.order = 1;
                    ul.children[2].style.order = 3;
                    ul.children[3].style.order = 4;
                    break;
                case 'work':
                    ul.children[0].style.order = 2;
                    ul.children[1].style.order = 3;
                    ul.children[2].style.order = 1;
                    ul.children[3].style.order = 4;
                    break;
                case 'contact':
                    ul.children[0].style.order = 2;
                    ul.children[1].style.order = 3;
                    ul.children[2].style.order = 4;
                    ul.children[3].style.order = 1;
                    break;
            }
        }
    }

    function portraitHeight(action){
        if(action == 'shrink'){
            for(var i=0; i < ul.children.length; i++){
                if(ul.children[i].style.order == 4){
                    ul.children[i].style.height = '15%';
                }else {
                    ul.children[i].style.height = '5%';
                }
            }
        }else{
           for(var i=0; i < ul.children.length; i++){
                ul.children[i].style.height = '100%';
            } 
        }
    }

    function toggleButtonTransition(value){
        about_button.style.transition = value;
        resume_button.style.transition = value;
        work_button.style.transition = value;
        contact_button.style.transition = value;
    }

    function removeContent(){
        switch(previous){
            case 'about':
                about.style.opacity = '0';
                about.style.zIndex = '-1';
                break;
            case 'resume':
                resume.style.opacity = '0';
                resume.style.zIndex = '-1';
                break;
            case 'work':
                work.style.opacity = '0';
                work.style.zIndex = '-1';
                break;
            case 'contact':
                contact.style.opacity = '0';
                contact.style.zIndex = '-1';
                break;
        }
    }

    function open(check){
        if(check){
            toggleButtonTransition('0s');
        }
        else{
            toggleButtonTransition('1s');
        }
        if(portrait){
            switch(section){
                case 'about':
                    changeOrder();
                    portraitHeight('shrink');
                    resume_button.style.bottom = '0%';
                    work_button.style.bottom = '0%';
                    contact_button.style.bottom = '0%';
                    removeContent();
                    about.style.transition = '2s';
                    about.style.opacity = '1';
                    about.style.zIndex = '2';
                break;
                case 'resume':
                    changeOrder();
                    portraitHeight('shrink');
                    about_button.style.bottom = '0%';
                    work_button.style.bottom = '0%';
                    contact_button.style.bottom = '0%';
                    removeContent();
                    resume.style.transition = '2s';
                    resume.style.opacity = '1';
                    resume.style.zIndex = '2';
                break;
                case 'work':
                    changeOrder();
                    portraitHeight('shrink');
                    about_button.style.bottom = '0%';
                    resume_button.style.bottom = '0%';
                    contact_button.style.bottom = '0%';
                    removeContent();
                    work.style.transition = '2s';
                    work.style.opacity = '1';
                    work.style.zIndex = '2';
                break;
                case 'contact':
                    changeOrder();
                    portraitHeight('shrink');
                    about_button.style.bottom = '0%';
                    resume_button.style.bottom = '0%';
                    work_button.style.bottom = '0%';
                    removeContent();
                    contact.style.transition = '2s';
                    contact.style.opacity = '1';
                    contact.style.zIndex = '2';
                break;
            }
        }
        else {
            switch(section){
                case 'about':
                    changeOrder();
                    about_button.style.height = '100%';
                    resume_button.style.height = '8%';
                    work_button.style.height = '8%';
                    contact_button.style.height = '8%';
                    resume_button.style.bottom = '0%';
                    work_button.style.bottom = '0%';
                    contact_button.style.bottom = '0%';
                    removeContent();
                    about.style.transition = '2s';
                    about.style.opacity = '1';
                    about.style.zIndex = '2';
                break;
                case 'resume':
                    changeOrder();
                    about_button.style.height = '8%';
                    resume_button.style.height = '100%';
                    work_button.style.height = '8%';
                    contact_button.style.height = '8%';
                    about_button.style.bottom = '0%';
                    work_button.style.bottom = '0%';
                    contact_button.style.bottom = '0%';
                    removeContent();
                    resume.style.transition = '2s';
                    resume.style.opacity = '1';
                    resume.style.zIndex = '2';
                break;
                case 'work':
                    changeOrder();
                    about_button.style.height = '8%';
                    resume_button.style.height = '8%';
                    work_button.style.height = '100%';
                    contact_button.style.height = '8%';
                    about_button.style.bottom = '0%';
                    resume_button.style.bottom = '0%';
                    contact_button.style.bottom = '0%';
                    removeContent();
                    work.style.transition = '2s';
                    work.style.opacity = '1';
                    work.style.zIndex = '2';
                break;
                case 'contact':
                    changeOrder();
                    about_button.style.height = '8%';
                    resume_button.style.height = '8%';
                    work_button.style.height = '8%';
                    contact_button.style.height = '100%';
                    about_button.style.bottom = '0%';
                    resume_button.style.bottom = '0%';
                    work_button.style.bottom = '0%';
                    removeContent();
                    contact.style.transition = '2s';
                    contact.style.opacity = '1';
                    contact.style.zIndex = '2';
                break;
            }
        }
        active = true;
    }

    function close(){
        defaultOrder();
        toggleButtonTransition('1s');
        portraitHeight('expand');
        about_button.style.height = '100%';
        resume_button.style.height = '100%';
        work_button.style.height = '100%';
        contact_button.style.height = '100%';
        resume_button.style.bottom = '0';
        work_button.style.bottom = '0';
        contact_button.style.bottom = '0';
        removeContent();
        active = false;
    }

    runMenu();

}
