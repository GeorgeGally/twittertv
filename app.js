
var width = window.innerWidth;
var height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;

if (window.location.hash) {
    var keyword = window.location.hash.substr(1);
  } else {
    var keyword = "love";
}

var url = "../../socialzeitgeist/tweets/she_said/" + keyword;


function draw(){
    if (mouseY > h-100) {
        $('.tweet_box').show();
    } else {
        $('.tweet_box').hide();
    }
}


get_tweets = function(){
   
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
    txt = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    $('#headline').text(txt);
    jQuery("#headline").fitText(0.9, { maxFontSize: '340px' });
    txt = extra + " " + txt;
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + txt + '&api_key=dc6zaTOxFJmzC';
    $.ajax({
      url: url,  
      success:function(data) {
        //console.log(data.data.length);
        if (data.data.length > 0) {
            var looper;
        console.log(data.data.length);
        var rnd = randomInt(data.data.length-1);
        random_img = data.data[rnd];
        //console.log(random_img);
        var img = random_img.images.original.url;
        //console.log(img);
        img =  '<img src=' + img + ' ">';
        $('#pic-holder').html(img);
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


reverseSearchAPI = function(img){
  
  console.log("reverseSearchAPI");

    // var key = "5ee4b81572a244fe92c92544f83ccc55";
    var key = "d701e77a5a5f45bb83c3fcb9d53700e1";
  
     var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {

                console.log(this.response, typeof this.response);

                var response = document.querySelector('#response');
                var img = new Image();
                var url = window.URL || window.webkitURL;
                img.src = url.createObjectURL(this.response);
                response.appendChild(img);
              }
            }
            xhr.open('POST', 'https://api.projectoxford.ai/vision/v1.0/generateThumbnail?width=5&height=5&smartCropping=true');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "382f5abd65f74494935027f65a41a4bc");
            xhr.responseType = 'blob';
            xhr.send('{"url": "https://oxfordportal.blob.core.windows.net/emotion/recognition1.jpg"}');
       // $.ajax({
       //      url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
       //      beforeSend: function(xhrObj){
       //          // Request headers
       //          //xhrObj.setRequestHeader("Access-Control-Allow-Origin", "*");
       //           xhrObj.setRequestHeader("Authorization", "Negotiate");
       //          //xhrObj.setRequestHeader("Access-Control-Allow-Origin","*");
       //          xhrObj.setRequestHeader("Content-Type","application/json");
       //          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5ee4b81572a244fe92c92544f83ccc55");
       //      },
       //      type: "POST",
       //      // Request body
       //       data: '{"url": "http://media0.giphy.com/media/xT5LMJXCtdabV6YYJa/giphy.gif"}',
       //  })
       //  .done(function(data) {
       //      //alert("success");
       //      console.log(data);
       //  })
       //  .fail(function(error) {
       //    console.log(error);
       //      //console.log(error.getAllResponseHeaders());
       //      //alert("fail");
       //  });

}


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

