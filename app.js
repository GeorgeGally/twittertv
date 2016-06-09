   reverseSearchAPI = function(img){ 
    console.log(img);
    var params = {
        // Request parameters
        "visualFeatures": "Categories",
        "visualFeatures": "Description",
    };

    $.ajax({
        url: "https://api.projectoxford.ai/vision/v1.0/analyze?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5ee4b81572a244fe92c92544f83ccc55");
        },
        type: "POST",
        // Request body
        data: '{ "url":"'+ img +'"}'
        //data: '{ "url": "http://newsrescue.com/wp-content/uploads/2015/04/happy-person.jpg"}'
    })
    .done(function(data) {
        console.log(data);
        //alert("success");
        handleResponse(data);
    })
    .fail(function() {
        alert("error");
    });
};


var width = window.innerWidth;
var height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
$('#pic-holder').width = w;
$('#pic-holder').height = h;

var out_tweet ="";

  Clarifai.initialize({
    'clientId': 'ioizwxZOPvNP4j65eGpOHkcmgUhP_qcQUXZeAL5D',
    'clientSecret': 'S3hmuEd_KtOQYFf0SuU5Bx0SkjKy7EZE_irGeCS3'
  });

if (window.location.hash) {
    var keyword = window.location.hash.substr(1);
  } else {
    var keyword = "love";
}

// var url = "../../twitterzeitgeist/tweets/she_said/" + keyword;
var url = "../../socialzeitgeist/tweets/she_said/" + keyword;

function draw(){
    if (mouseY > h-100) {
        $('.tweet_box').show();
    } else {
        $('.tweet_box').hide();
    }
}


get_tweets = function(){
  
  console.log("=========== out_tweet:" + out_tweet);
  console.log('get_tweets');
  out_tweet = "";
        $('#results').html('');
        $('#date').html('');
        $('#profile').html('Loading...');
        $('.tweet_text').html('');
        $('#profile_img').html("<img src='images/loader3.gif'>");
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            success: function(data) {
                if (data) {
                    update(data);
                }
            }
        });

}


update = function(d){
    newSearch(d['text']);
    updateContent(d);
}


updateContent = function(data){
    var txt = "<span class='tweet_text'>"+twemoji.parse(data['text'])+"</span>"; 
    if (data != undefined) {
        var img ="<img src="+data.image+">";
        var profile ="<b class='profile_name'>"+data.name+"</b> <br><a href='https://twitter.com/"+ data.screen_name+ "' class='screen_name'>@" +data.screen_name+"</a>";
        var link = txt;
        $('#profile_name').html(profile).text();
        $('#profile').html(profile).text();
        $('#info').html(link).text();
        var t = $('#info').html().autoLink();
        $('#info').html(t).text();
        $('#date').html(data.date).text();
        $('#profile_img').html(img); 
    }
}


newSearch = function(txt){
    counter = 0;
    $('#pic-holder').html("");
    words = txt.split(' ');
    var images = [];
    looper(words);
} 

var looper = function(words) {

    qq = words[counter];
    if (qq.charAt(0)=="#") qq = qq.substring(1);
    if (qq.charAt(0)=="@" || qq == "rt" || qq == "RT" || isURL(qq) ) {
        counter = (counter + 1)%words.length;
        qq = words[counter];
    }
    searchWord(qq);
    counter = (counter + 1);
    if(counter< words.length-1){
        setTimeout(function() {
            looper(words);
        }, 4000);
    }
}

var extra = "";

searchWord = function(txt){
  console.log("searchWord: " + txt);
    txt = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    //$('#headline').text(txt);
    //jQuery("#headline").fitText(0.9, { maxFontSize: '340px' });
    txt = extra + " " + txt;
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + txt + '&api_key=dc6zaTOxFJmzC';
    $.ajax({
      url: url,  

      success:function(data) {
        //console.log(data.data.length);
        if (data.data.length > 0) {
            var looper;
        //console.log(data.data.length);
        var rnd = randomInt(data.data.length-1);
        random_img = data.data[rnd];
        //console.log(random_img);
        var img = random_img.images.original.url;
        //console.log(img);
        //var pic =  '<img src=' + img + ' ">';
        var pic = 'url("' + img + '"")';
        //$('body').css('background-url', pic);
        $('body').css('background-image', 'url("' + img + '")');
        $('body').css('background-position', 'center center');
        $('body').css('background-size', 'cover');
        $('body').css('background-repeat', 'no-repeat');
        $('body').css('background-attachment', 'fixed');
        //$('#pic-holder').css('background-image', 'url(' + img + ')');
        var pic =  '<img src=' + img + ' " width="100%" height="100%">';
        //$('#pic-holder').html(pic);
        reverseSearchAPI(img);
        //   $('#pic-holder >img').tailorfit({
        //         maxWidth  : w,
        //         maxHeight : h,
        //         ratio     : w / h
        // });

        hiliter(txt.trim());


        }
      }
   });
  
}


// reverseSearchAPI2 = function(img){
  
//   //console.log("reverseSearchAPI");
//   //console.log(img);
  
//   Clarifai.getTagsByUrl(img).then(
//   handleResponse,
//   handleError
// );


// }

function handleResponse(response){
  //console.log(response);
  console.log(response.description.captions[0]['text']);
  //var tag_length = response.results[0]['result']['tag']['classes'][0].length-1;
  //var found = response.results[0]['result']['tag']['classes'][0][randomInt(tag_length)];
  var found = response.description.captions[0]['text'];
  console.log("found: " + found);
  out_tweet += found + " ";
  $('#headline').text(found);
  //jQuery("#headline").fitText(0.9, { maxFontSize: '340px' });
}


function handleError(response){
  console.log("error");
  console.log(response);
}



var preps = ['to', 'and', 'but', 'in', 'the', 'of', 'a', 'i'];



get_tweets();
$('#btnShare').share();



$(document).keydown(function(event){
   get_tweets();

});



function timer(){
    setTimeout(function() {
        get_tweets();
        var cw = $('#container').width()-60;
        console.log(cw);
        // $('.info_box').css('width', cw);
        timer();
}, 95000);
}

timer();


// UTILS

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

function imgError(image) {
    image.onerror = "";
    image.src = "images/christmas.gif";
    return true;
}


function hiliter(word, element) {
    var rgxp = new RegExp(word, 'g');
    $('.highlight').removeClass('highlight');
    var repl = ' <span class="highlight">' + word + '</span> ';
    info = document.getElementById('info');
    info.innerHTML = info.innerHTML.replace(rgxp, repl);
}

