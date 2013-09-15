$(document).ready( 
    function(){
    var divh_1 = 0;
    var divh_2 = 0;
    var divh_3 = 0;
    var browserVersion = navigator.appVersion;
    if (browserVersion.indexOf('MSIE 8')>0 || browserVersion.indexOf('MSIE 7')>0) {
        $("#1").mouseover(function(){
            $("div.dev-item").show();								
        }).mouseout(function(){
            $("div.dev-item").parent().find('a').attr("style", "");
            $("div.dev-item").hide();
        });
        $("#2").mouseover(function(){
            $("div.design-item").show();
        }).mouseout(function(){
            $("div.design-item").parent().find('a').attr("style", "");
            $("div.design-item").hide();
        });
        $("#3").mouseover(function(){
            $("div.system-item").show();
        }).mouseout(function(){
            $("div.system-item").parent().find('a').attr("style", "");
            $("div.system-item").hide();
        });						
    } else {		
        $("#1").hoverIntent(function(){
            $("div.dev-item").show();
            if (divh_1 == 0) divh_1 = document.getElementById('primary_item_1').offsetHeight;
            document.getElementById('dev-item-box').style.height = (divh_1-20)+"px";								
        }, function(){
            $("div.dev-item").hide();
        });
        $("#2").hoverIntent(function(){
            $("div.design-item").show();
            if (divh_2 == 0) var divh_2 = document.getElementById('primary_item_2').offsetHeight;
            document.getElementById('design-item-box').style.height = (divh_2-20)+"px";
        }, function(){
            $("div.design-item").hide();
        });
        $("#3").hoverIntent(function(){
            $("div.system-item").show();
            if (divh_3 == 0) var divh_3 = document.getElementById('primary_item_3').offsetHeight;
            document.getElementById('system-item-box').style.height = (divh_3-20)+"px";
        }, function(){
            $("div.system-item").hide();
        });
    }
}); 
startIntervallo();
function stopIntervallo() {
    clearTimeout(sNendTime);  
    //console.log("stop");
}
function startIntervallo(itemcanc) {
            
    sNendTime = setTimeout(function () {
        
        var section_name = $(itemcanc).attr("name");
        $(".primary-item ul").find("li").each(function(){
            if (section_name==$(this).attr("name")) $(this).attr("class", "");						
        });
        $(itemcanc).attr("class", "select");
        var temp = "#"+$(itemcanc).attr("name")+"-box";
        $(temp).html( $(".sub"+ $(itemcanc).attr("id")).html()  );  

        
    }, 300);
}
$(document).ready(
    function(){
        $(".secondary-item").mouseover(function(){
            stopIntervallo();
        }); 
        $(".primary-item ul li").each(function(index){
        var item = $(this).attr("id");
        if ((item != null) &&  (item.indexOf("item") >= 0)) {
            $(this).mouseover(function(){
               stopIntervallo();
               startIntervallo("#"+$(this).attr("id"));
            });
         }
        });
});

function checkSearchForm(path) {
    var txt = document.searchform.s.value;
    txt = txt.replace("'",' ');
    txt = txt.replace(/[^a-zA-Z 0-9]+/g,'');	
    if (txt!="") {
        window.location = path + '?s=' + txt;
    } else {	
        alert("Inserire almeno una chiave di ricerca");
    }
}