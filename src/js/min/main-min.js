function open_news(e){$("#flyout article").html(""),$("#flyout .header h1").text(content_array[e][3]),$("#flyout article").html("</div><article><h2>"+content_array[e][0]+"</h2>"+content_array[e][4]+"</article><div onclick='close_news()' id='close_button'>"),$("#flyout").animate({right:"0"}),$("body").animate("padding","50px")}function close_news(){$("#flyout").animate({right:"-100%"})}function render_news(){for($(".article_list").html(""),i=0;content_array.length>i;i++)$(".article_list").append("<li data-article_number='"+i+"'><h4>"+content_array[i][0]+"</h4><time class='meta'>"+content_array[i][3]+"</time><p>"+content_array[i][2]+"</p></li>");$(".article_list li").click(function(){open_news($(this).attr("data-article_number"))})}function getNews(){$(".article_list").html("<div class='loader'>Loading...</div><p id='news_loading_text'></p>"),content_array.length=0,$.ajax({type:"get",url:"http://wearekiwikiwi.co.uk/feed/",dataType:"xml",success:function(e){$(".article_list").html("");var t=$(e);t.find("item").each(function(){var e=$(this),t={title:e.find("title").text(),link:e.find("link").text(),description:e.find("description").text(),pubDate:e.find("pubDate").text(),content:e.find("encoded").text()},n=[t.title,t.link,t.description,t.pubDate.substring(0,16),t.content];content_array.push(n);var a=JSON.stringify(content_array);window.localStorage.setItem("ots_news_array",a)}),render_news()},error:function(){$(".article_list").html("<div class='loader'>Loading...</div>"),$("#news_loading_text").html("Cannot Load News"),render_news()}})}function closeNav(){$("#NAV").animate({left:"-80%"}),$(".page").animate({"margin-left":"0"}),$(".RETURN").css("display","none")}function openNav(){$("#NAV").animate({left:"0"}),$(".page").animate({"margin-left":"80%"}),$(".RETURN").css("display","block")}function clear_app_data(){localStorage.removeItem("ots_news_array")}function render_user_data(){$("section.master_nav a:nth-child(1)").text("Player ID: "+player.player_id),$("#player nav#header h1").text("Player ID: "+player.player_id)}function get_user_data(){$.ajax({async:!1,global:!1,url:"player_test_data.json",dataType:"json",success:function(e){settings=e.settings,player=e.player,story=e.story}}),render_user_data()}function render_lore_data(){$(".lore").text(lore.meta.version),$(".lore").append(lore.ots.name)}function get_lore_data(){$.ajax({async:!1,global:!1,url:"game_guide.json",dataType:"json",success:function(e){lore=e,console.log(lore)}}),render_lore_data()}function onDeviceReady(){$("#device").html("Device: "+device.model)}var ots_news_array=window.localStorage.getItem("ots_news_array"),content_array=JSON.parse(ots_news_array),i,player,story,settings,Hammer,device,lore;$(document).ready(function(){document.addEventListener("deviceready",onDeviceReady,!1);var e=new Hammer(document.body);if(null===content_array){ots_news_array=[["","","","",""]];var t=JSON.stringify(ots_news_array);window.localStorage.setItem("ots_news_array",t)}$("#RETURN").click(function(){closeNav()}),$("a#NAVBTN").click(function(){openNav()}),$("#SYNC").click(function(){getNews()}),$("#NAV a").click(function(){closeNav()}),$("#close_btn").click(function(){close_news(),console.log("close fired")}),$("#news_button").click(function(){window.location.href="#news",closeNav()}),$("#gameguide_button").click(function(){window.location.href="#gameguide",closeNav()}),$("#player_button").click(function(){window.location.href="#player",closeNav()}),$("#about_button").click(function(){window.location.href="#about",closeNav()}),$("#settings_button").click(function(){window.location.href="#settings",closeNav()}),e.on("swipe",function(e){4===e.direction?openNav():2===e.direction&&closeNav()}),get_lore_data(),get_user_data(),getNews(),$(".clear_app_data").click(function(){navigator.notification.confirm("Clearing this will delete all localdata",clear_app_data)})});