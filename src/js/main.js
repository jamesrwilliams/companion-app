/*
 * OTS App Javascript Core File
 * 
 * @version		0.1
 * @package		com.jamesrwilliams.OTS
 * @description	Web interface for a local iOS Game companoion app			
 * @author 		James Williams (@James_RWilliams)
 * @copyright 	Copyright (c) 29/02/2015
 *
 */		

// TODO - http://stackoverflow.com/questions/9473582/ios-javascript-bridge

var ots_news_array = window.localStorage.getItem("ots_news_array");
var content_array = JSON.parse(ots_news_array);
var debug_version = 0.1;
var i, player, story, settings;


	/*
	 *  Get News Function
	 * 
	 *	
	 *  @returns null
	 */
	 
	function render_news(){
		
		$(".article_list").html("");
	
		for(i = 0; content_array.length > i; i++){
	
			$(".article_list").append("<li data-article_number='" + i + "'><h4>" + content_array[i][0] + "</h4><time class='meta'>" + content_array[i][3] + "</time><p>"+ content_array[i][2] +"</p></li>");
	
		}
		
		$(".article_list li").click(function(){
		
			open_news($(this).attr("data-article_number"));
				
		});
	
	}
	
	function open_news(news_number){
		//TODO REMOVE ONLCIK AND USE JQUERY DETECTOR
		$(".news_article").html("<a onclick='close_news()'>X</a>" + content_array[news_number][4]);
		$(".news_article").slideToggle();
		
	}
	
	function close_news(){
		
		$(".news_article").slideToggle();
		$(".news_article").html("");
		
		
	}
	
	
	
	/*
	 * AJAX News Request from WordPress site. 
	 *	
	 *  @returns null
	 */		
	
	function getNews(){
		
		$(".article_list").html("<div class='loader'>Loading...</div>");
		
		if(navigator.onLine === true){
			
			content_array.length = 0;
			
			$.ajax({
			        
		        type: "get",
		        url: "http://wearekiwikiwi.co.uk/feed/",
		        dataType: "xml",
		        success: function(data) {
			        
		            /*
			         * AJAX Connection Successful
			         */
		             
		            $(".article_list").html("");
											
						var $XML = $(data);
						$XML.find("item").each(function() {
						
						var $this = $(this),
						item = {
						    title:       $this.find("title").text(),
						    link:        $this.find("link").text(),
						    description: $this.find("description").text(),
						    pubDate:     $this.find("pubDate").text(),
						    content:	 $this.find("encoded").text(),
						};
						/*
						* 0 = Title
						* 1 = Link
						* 2 = Description
						* 3 = Date
						* 4 = Content
						*/
						var temp_array = [item.title,item.link,item.description,item.pubDate.substring(0, 16),item.content]; 
						
						content_array.push(temp_array);
						
						var temp_string = JSON.stringify(content_array);
						window.localStorage.setItem("ots_news_array",temp_string);
					 				            		        
				    });
		            
		            render_news();
		          
		            
		        },
		        // error: function(xhr, status) { rednder_news(); }
			    error: function(){ 
				
					$(".article_list").html("<div class='loader'>Loading...</div>");
				    
				    render_news();
				    
				}    
			});	
			
		} else {
			
			render_news();	
			
		}
		
	}		
	
	/*
	 * Utility Function that closes the navigation pane. 
	 *	
	 *  @returns null
	 */			
	
	function closeNav(){
		
		$('#NAV').animate({"left": '-90%'});
		$(".page").animate({"margin-left":"0"});
		$('.RETURN').css("display","none");
		
	}
	
	/*
	 * Opens the navigation pane. 
	 *	
	 *  @returns null
	 */		
	 
	function openNav(){
		
		$('#NAV').animate({"left": '0'});
		$('.page').animate({"margin-left": "90%"});
		$('.RETURN').css("display","block");
		
	}
	
	/*
	 *	Clears the localStorage object.   
	 *	
	 *  @returns null
	 */		
	
	function clear_app_data(){
		
		localStorage.removeItem(ots_news_array);
		
	}
	
	function render_user_data(){
		
		$("section.master_nav a:nth-child(1)").text("Player ID: " + player.player_id);
		$("#player nav#header h1").text("Player ID: " + player.player_id);
		
	}
	
	/*
	 *  Ajax the game api for player data.
	 *	
	 *  @returns null
	 */		

	function get_user_data(){
		
	    $.ajax({
		   
	        'async': false,
	        'global': false,
	        'url': "test_data.json",
	        'dataType': "json",
	        'success': function (temp_data) {
	            
	            settings = temp_data.settings;
	            player = temp_data.player;
	            story  = temp_data.story;
	            
	        }
	    });
	    
	    render_user_data();
		
	}
	
	function check_system(){
		
		var dt = new Date();
		var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
		
		// Update Debug Vaules
		$("#lastUpdate").text("Last Updated: " + time);
		$("#network").text("Online: " + navigator.onLine);
		$("#app_version").text("Version: " + debug_version);
		
	}
	
	/*
	 * Document Init Function. Runs on page load. 
	 *	
	 *  @returns null
	 */		
	
	$(document).ready(function(){
		
		// window.location.href = "#profile";
		
		if(content_array === null){
	
			ots_news_array = [["","","","",""]];
			var str = JSON.stringify(ots_news_array);
			window.localStorage.setItem("ots_news_array",str);
			
		}
		
		// DEBUG - iOS Directory search fallback function.
		$("img").error(function(){$(this).unbind("error").attr("src","img/"+$(this).attr("src"));});
		
		$(".clear_app_data").click(function(){clear_app_data();});
		
		$("#NAVBTN").click(function(){openNav();});
		$("#RETURN").click(function(){closeNav();});
		$(".master_nav a").click(function(){closeNav();});
		
		check_system();
		get_user_data();
		getNews();
		
		setInterval(function (){
			
			check_system();	
			
		}, 10000);	
	
		
		var hammertime = new Hammer(document.getElementById('super_view'));
			hammertime.on('swipe', function(ev) {
			    
			    if(ev.direction === 4){
				    
				    openNav();
				    
			    }
			    else if(ev.direction === 2){
				    
				    closeNav();
				    
			    }
			   
		});
				
	});
	
	
	
	function connectWebViewJavascriptBridge(callback) {
	   
	    if (window.WebViewJavascriptBridge) {
	        callback(WebViewJavascriptBridge);
	    } else {
	        document.addEventListener('WebViewJavascriptBridgeReady', function() {
	            callback(WebViewJavascriptBridge);
	        }, false);
	    }
	    
	}
	
	connectWebViewJavascriptBridge(function(bridge) {
	
	    /* Init your app here */
	
	    bridge.init(function(message, responseCallback) {
		    
	        console.log('Received message: ' + message);   
	        
	        if (responseCallback) {
	        
	            responseCallback("Right back atcha");
	        
	        }
	    });
	    
	    bridge.send('Hello from the javascript');
	    
	    bridge.send('Please respond to this', function responseCallback(responseData) {
	    
	        console.log("Javascript got its response", responseData);
	        
	        $("#source_return").text(responseData);
	        
	    
	    });
	
	});