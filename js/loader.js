var loc = document.location.hash.substr(1);
var filename = 'art/' +  loc + '.js';
fileref = document.createElement('script')
fileref.setAttribute("type","text/javascript")
fileref.setAttribute("src", filename);
document.getElementsByTagName("body")[0].appendChild(fileref);
