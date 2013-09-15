var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(b){for(var a=0;a<b.length;a++){var c=b[a].string,d=b[a].prop;this.versionSearchString=b[a].versionSearch||b[a].identity;if(c){if(-1!=c.indexOf(b[a].subString))return b[a].identity}else if(d)return b[a].identity}},
searchVersion:function(b){var a=b.indexOf(this.versionSearchString);if(-1!=a)return parseFloat(b.substring(a+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",
identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",
identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();

var browser = BrowserDetect.browser + ' ' + BrowserDetect.version;

if ('undefined' !== typeof _newslettertitle_) {
var title = _newslettertitle_; } else {
var title = document.title;
title = title.replace(/(.*) - .*/g, '$1');
}



function TrackEvent(Category, Action, Label, Value, NonInt) {
_gaq.push(['_trackEvent', Category, Action, Label, Value, true]);
}

function trackOutboundLink(link, category, action) {
  try {
    _gaq.push(["_trackEvent", category, action])
  }catch(err) {
  }
  setTimeout(function() {
    document.location.href = link.href
  }, 200)
}

jQuery(function($) {
  $("li.forum-item > a").click(function() {
	_gaq.push(['_deleteCustomVar', 1]);
	_gaq.push(['_deleteCustomVar', 2]);
	_gaq.push(['_deleteCustomVar', 3]);
    TrackEvent("cta", "forum", title, 1)
  })
});



//Funzioni per il tracciamento della paginazione negli articoli
jQuery(function($) {
  if(window.location.href.indexOf("18966") > -1 || window.location.href.indexOf("16026") > -1) {
    $(".page-slider a").click(function() {
      trackOutboundLink(this, "Paginazione", "01-numbers");
      return false
    })
  $(".slider-item .left-side a").click(function() {
    trackOutboundLink(this, "Paginazione", "01-arrow-prev");
    return false
  });
  $(".slider-item .content-slider a").click(function() {
    trackOutboundLink(this, "Paginazione", "01-text");
    return false
  });
  $(".slider-item .central-slider a").click(function() {
    trackOutboundLink(this, "Paginazione", "01-indice");
    return false
  });
  $(".slider-item .right-side a").click(function() {
    trackOutboundLink(this, "Paginazione", "01-arrow-next");
    return false
  })
  }
});