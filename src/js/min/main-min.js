function render_news(){for($(".article_list").html(""),i=0;content_array.length>i;i++)$(".article_list").append("<li data-article_number='"+i+"'><h4>"+content_array[i][0]+"</h4><time class='meta'>"+content_array[i][3]+"</time><p>"+content_array[i][2]+"</p></li>");$(".article_list li").click(function(){open_news($(this).attr("data-article_number"))})}function open_news(e){$(".news_article").html("<a onclick='close_news()'>X</a>"+content_array[e][4]),$(".news_article").slideToggle()}function close_news(){$(".news_article").slideToggle(),$(".news_article").html("")}function getNews(){$(".article_list").html("<div class='loader'>Loading...</div>"),navigator.onLine===!0?(content_array.length=0,$.ajax({type:"get",url:"http://wearekiwikiwi.co.uk/feed/",dataType:"xml",success:function(e){$(".article_list").html("");var t=$(e);t.find("item").each(function(){var e=$(this),t={title:e.find("title").text(),link:e.find("link").text(),description:e.find("description").text(),pubDate:e.find("pubDate").text(),content:e.find("encoded").text()},n=[t.title,t.link,t.description,t.pubDate.substring(0,16),t.content];content_array.push(n);var a=JSON.stringify(content_array);window.localStorage.setItem("ots_news_array",a)}),render_news()},error:function(){$(".article_list").html("<div class='loader'>Loading...</div>"),render_news()}})):render_news()}function closeNav(){$("#NAV").animate({left:"-90%"}),$(".page").animate({"margin-left":"0"}),$(".RETURN").css("display","none")}function openNav(){$("#NAV").animate({left:"0"}),$(".page").animate({"margin-left":"90%"}),$(".RETURN").css("display","block")}function clear_app_data(){localStorage.removeItem(ots_news_array)}function render_user_data(){$("section.master_nav a:nth-child(1)").text("Player ID: "+player.player_id),$("#player nav#header h1").text("Player ID: "+player.player_id)}function get_user_data(){$.ajax({async:!1,global:!1,url:"test_data.json",dataType:"json",success:function(e){settings=e.settings,player=e.player,story=e.story}}),render_user_data()}function check_system(){var e=new Date,t=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();$("#lastUpdate").text("Last Updated: "+t),$("#network").text("Online: "+navigator.onLine),$("#app_version").text("Version: "+debug_version)}function connectWebViewJavascriptBridge(e){window.WebViewJavascriptBridge?e(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){e(WebViewJavascriptBridge)},!1)}var ots_news_array=window.localStorage.getItem("ots_news_array"),content_array=JSON.parse(ots_news_array),debug_version=.1,i,player,story,settings;$(document).ready(function(){if(null===content_array){ots_news_array=[["","","","",""]];var e=JSON.stringify(ots_news_array);window.localStorage.setItem("ots_news_array",e)}$("img").error(function(){$(this).unbind("error").attr("src","img/"+$(this).attr("src"))}),$(".clear_app_data").click(function(){clear_app_data()}),$("#RETURN").click(function(){closeNav()}),$("a#NAVBTN").click(function(){openNav()}),$("#NAV a").click(function(){closeNav()}),check_system(),get_user_data(),getNews(),setInterval(function(){check_system()},1e4);var t=new Hammer(document.getElementById("super_view"));t.on("swipe",function(e){4===e.direction?openNav():2===e.direction&&closeNav()})}),connectWebViewJavascriptBridge(function(e){e.init(function(e,t){console.log("Received message: "+e),t&&t("Right back atcha")}),e.send("Hello from the javascript"),e.send("Please respond to this",function t(e){console.log("Javascript got its response",e),$("#source_return").text(e)})});