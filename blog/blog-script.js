var firebaseConfig = {
	apiKey: "AIzaSyDKN09254h3sNUr1acLPFjLWSduqSNd4NQ",
	authDomain: "jace-blog.firebaseapp.com",
	databaseURL: "https://jace-blog.firebaseio.com",
	projectId: "jace-blog",
	storageBucket: "jace-blog.appspot.com",
	messagingSenderId: "508211074252",
	appId: "1:508211074252:web:91af52c76c49f213831e69",
	measurementId: "G-MBRH9TMTEY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Initialize");

firebase.database();

//var userId = firebase.auth().currentUser.uid;

var username = "jgummersall";
var blurb = "Lots to include in the blurb of the week, as for sports we started the week with the end of the...";
var body = "Lots to include in the blurb of the week, as for sports we started the week with the end of the Dame D.O.L.L.A (Damien Lillard) and DJ Diesel (Shaquille O’Neal) rap battle (2 songs each), if you missed it it is wort catching up on (warning there is some foul language). Although many have debated who one the battle, the real answer is simple, Shaq’s old school beats and Dame’s smooth bars gave us, the people, the real victory. In other sports news the MLB playoffs have started and the mariners continue their run of missing the playoffs. Fun to have watched Bryce Harper sign a 330 million dollar contract to leave the Washington Nationals over the offseason, only to watch Washington playing great in the playoffs. Makes you wonder how Philly fans will be feeling for the next 13 years. More important though is we learned the root of tanners inability to pick a team stems from his mother, who has no team loyalty in her blood. Life could be rough for young tanner as he tries to make it in todays world with such a flaccid spine./n/nPre request, when it comes to sports food, I want to focus on food to consume when watching the game from the comfort of a couch, so stadium food will have to be another topic for the future. Ultimately I believe it can be broken down into two categories. Meals and snacks. Depending on your crowd and the vibe you want to have will determine if you should have a meal or a snack. Meals have less options and are typically limited to things you can grill (in my experience.) Snacks however offer a wide variety of options. The most commonly included snack is the chip. With its diverse ability to act as a spoon and shovel, bean dip, salsa, humus, or guac into your mouth or be able to eat various flavors of chips from sour cream and cheddar to salt and vinegar, all forms of chips are a must. The other benefit you get from snacks is your ability to touch different themes. You can go from a Mexican theme, with tacos, taquitos, etc, to a more American vibe of good old fashioned chicken wings. The best way to provide quality food for you event is unfortunately out of your hands.  The outcome of the game dictates what people will be feeling in their stomach afterwords so even if you slave away at the perfect game day food, remember that there is nothing that tastes better than victory./n/n/tIt reminds me of another iconic moment in his life one we all have recalled countless times. Upon thinking of tanners history I found a folly in his claim that I want to debug here. Per usual, mom and dad were out of town, gallivanting around the tropics of the world, leaving us kids to man the ship at home and try and keep it a float.  Upon the return of our parents they were pleasantly surprised to see a relatively clean house and kids with all there appendages still attached. It wasn’t till mom and dad sat us all down and started to give out souvenirs (gifts) from the adventures that Tanner felt the need to share an important fact, “Mom, dad, I have something to admit,” with a sobering look on his face, and catching us all off guard,we waited to hear would fall out of his mouth next. I think in that moment we all feared the worst, the thought that we all might get in trouble for something none of us knew about, or worse, next time mom and dad might left town, they would leave us with a babysitter. Tanner continued. “I did all of the work,” he proclaimed. Perplexity struck all of our faces, and as the comment sunk in, no one knew what he was referring to. Tanner, as I know believe, had tried to fool his parents and get the best gifts from the trip by appearing to be better than everyone else, when in fact we all pulled our own weight (there is no way 10 year old tanner drove any one anywhere when Mckenzie was the only licensed driver.) Tanners plan only worked slightly, even though our parents bought his story like it was a Kmart blue light special, gifts were distributed evenly amongst the kids. The next few weeks earned tanner some time off of chores and helped him fell like his claim paid off in some way. I must admit this event was a while ago, and although some of the member comes back a little bit spotty, it wasn’t till I rewatched an old video that I found proof that tanners boyhood claim, and one of his most quoted lines was riddled with deception./n/n/tIn a separate occasion tanner shared his true feelings about work around the house, and helping out. In a video you can find on facebook, we once spent an afternoon chopping down the tree in front of our house. Although lots can be said about this experience, to keep the blurb brief I will sum it up. I was cutting down the tree, while Mckenzie, Kelby and Tanner “supervised” (Lets be real though only one person can swing an axe at a tree at the time, and i had the most truth to get behind the axe so it was naturally my calling) In the video everyone the supervisors share their feeling about the tree and tanner says “I think its stupid cause it just causes more work” This with out knowing it, tanner testified against himself, almost as if the glove OJ tried on fit without an issues. Tanner may have his own version, but as we are learning if it is 10 year old him talking, his word must be taking with caution."
var title = "Biting the Curb";
var subtitle = "The first real attempt at a blurb";
var date = "October";

//writeNewPost(username, blurb, body, title, subtitle, date);

function articlePreview(){
	var value = firebase.database().ref('/blog').once('value').then(function(snapshot) {
		var data = snapshot.val() || false;
		if(data){
			for (var article in data) {
				var link = document.createElement("a");
				link.setAttribute("href","blog-article.html?article=" + article);
	    		var div = document.createElement("div");
				div.setAttribute("class", "card");
				var htwo = document.createElement("h2");
				htwo.innerHTML = data[article]['title'];
				var hfive = document.createElement("h5");
				hfive.innerHTML = data[article]['subtitle'] + ", " + data[article]['date_posted'];
				var p = document.createElement("p");
				p.innerHTML = data[article]['blurb'];
				div.appendChild(htwo);
				div.appendChild(hfive);
				div.appendChild(p);
				link.appendChild(div);
				var parent = document.getElementById("articles");
				parent.appendChild(link);
			}
			
		}else{
			var p = document.createElement("p");
			p.innerHTML = "SERVER ERROR PLEASE CONTACT THE SITE ADMINSTRATOR FOR SUPPORT";
			var parent = document.getElementById("articles");
			p.setAttribute("class", "card");
			parent.appendChild(p);
		}
	});
	
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function displayArticle(){
	var article = getUrlVars()['article'];
	console.log(article)
	var value = firebase.database().ref('/blog/'+article).once('value').then(function(snapshot) {
		var data = snapshot.val() || false;
		if(data){
			var htwo = document.getElementById("title");
			htwo.innerHTML = data['title'];
			var hsix = document.getElementById("subtitle");
			hsix.innerHTML = data['subtitle'] + ", " + data['date_posted'];
			var p = document.getElementById("body");
			p.innerHTML = data['body'];
		}else{
			var p = document.getElementById("body");
			p.innerHTML = "SERVER ERROR PLEASE CONTACT THE SITE ADMINSTRATOR FOR SUPPORT";
		}
	});
}

function writeNewPost(username, blurb, body, title, subtitle, date) {

	console.log("in");
  // A post entry.
  var postData = {
    author: username,
    blurb: blurb,
    body: body,
    title: title,
    subtitle: subtitle,
    date_posted: date
  };

  var article = "article2";

  // Get a key for a new Post.
  //var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates["/blog/" + article + "/"] = postData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}