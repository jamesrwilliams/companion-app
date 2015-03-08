/*
 * OTS App Javascript Core File
 * 
 * @version		1
 * @package		com.tap-code.hybridcompanion
 * @description	The Hybrid Companion Web Application			
 * @author 		James Williams (@James_RWilliams)
 * @copyright 	Copyright (c) 08/03/2015
 *
 */

var ots_news_array = window.localStorage.getItem("ots_news_array");
var content_array = JSON.parse(ots_news_array);
var i, player, story, settings, hammertime, Hammer, Connection, device;

	
	var onSuccess = function(position) {
	    
	    $("#lat").text("Latitude: " + position.coords.latitude);
	    $("#long").text("Longitude: " + position.coords.longitude);
	};
	
	/*
	 *  
	 *	
	 * 
	 */		
	
	function onDeviceReady() {
		
	    $("#device").html("Device: " + device.model);
	    checkConnection();
	    
	    navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
	}
	
	/*
	 *  
	 *	
	 * 
	 */		

	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}
	
	/*
	 *  
	 *	
	 * 
	 */		
	
	function open_news(news_number){
		
		$(".news_article").html("<a class='article_close'>X</a>" + content_array[news_number][4]);
		$(".news_article").slideToggle();
		
	}
	
	/*
	 *  
	 *	
	 * 
	 */		
	
	function close_news(){
		
		$(".news_article").slideToggle();
		$(".news_article").html("");
		
		
	}
	
	/*
	 *  Get News Function
	 * 
	 *	
	 * 
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
	
	/**
	 *	
	 *	AJAX Request to get game news from a server then rendering it behind a loader. 	
	 *
	 * 	1. Adds Loader anmation to the list. 
	 *
	 * 	2. AJAX request to the server that returns the xml
	 *
	 *	3. On suscessful AJAX finds the listed elemetns of
	 *	   the feed and saves them to the localstorage string.
	 *
	 * 	4. (Fallback) If the AJAX is unsucessful it loads the perviously loaded content to the list.
	 */			
	
	function getNews(){
		
		/* 1 */
		$(".article_list").html("<div class='loader'>Loading...</div><p id='news_loading_text'></p>");
		content_array.length = 0;
		
		$.ajax({
		    
		    /* 2 */   
	        type: "get",
	        url: "http://wearekiwikiwi.co.uk/feed/",
	        dataType: "xml",
	        success: function(data) {
	            
	            /* 3 */ 
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
					
					var temp_array = [item.title,item.link,item.description,item.pubDate.substring(0, 16),item.content]; 
					
					content_array.push(temp_array);
					
					var temp_string = JSON.stringify(content_array);
					window.localStorage.setItem("ots_news_array",temp_string);
				 				            		        
			    });
	            
	            render_news();
	          
	        },
		    error: function(){ 
			
				/* 4 */
				$(".article_list").html("<div class='loader'>Loading...</div>");
			    $("#news_loading_text").html("Cannot Load News");
			    render_news();
			    
			}    
		});	
		
	}		
	
	/**
	 * Animates the closing of the navigation pane. 	
	 * 
	 */				
	
	function closeNav(){
		
		$('#NAV').animate({"left": '-90%'});
		$(".page").animate({"margin-left":"0"});
		$('.RETURN').css("display","none");
		
	}
	
	/**
	 * Aniamtes the opening of the navigation pane. 	
	 * 
	 */				
	 
	function openNav(){
		
		$('#NAV').animate({"left": '0'});
		$('.page').animate({"margin-left": "90%"});
		$('.RETURN').css("display","block");
		
	}
	
	/**
	 * Clears the localstorage element used by the news storage. 	
	 * 
	 */				
	
	function clear_app_data(){
		
		localStorage.removeItem('ots_news_array');
		
		console.log("Clear Has Fired");
		
	}
	
	/**
	 *  	
	 * 
	 */				
	
	function render_user_data(){
		
		$("section.master_nav a:nth-child(1)").text("Player ID: " + player.player_id);
		$("#player nav#header h1").text("Player ID: " + player.player_id);
		
	}
	
	/**
	 *	
	 * 
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
	
	/**
	 *	
	 * 
	 */			
	
	function check_system(){
		
		var dt = new Date();
		var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
		
		// Update Debug Vaules
		$("#lastUpdate").text("Last Updated: " + time);
		
	}
	
	/**
	 *	
	 * 
	 */			
	
	function checkConnection() {
	    var networkState = navigator.connection.type;
	
	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.CELL]     = 'Cell generic connection';
	    states[Connection.NONE]     = 'No network connection';
	    
	    $("#network").html("Network: " + states[networkState]);
	}
	
	/**
	 *	
	 * 
	 */			
	
	$(document).ready(function(){
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
		var hammertime = new Hammer(document.getElementById('super_view'));
		
		if(content_array === null){
	
			ots_news_array = [["","","","",""]];
			var str = JSON.stringify(ots_news_array);
			window.localStorage.setItem("ots_news_array",str);
			
		}
		
		$(".clear_app_data").click(	function(){	
			
			navigator.notification.confirm("Clearing this will delete all localdata", clear_app_data);
			
		});
		
		$("#RETURN").click(			function(){	closeNav();			});
		$("a#NAVBTN").click(		function(){	openNav();			});
		$(".article_close").click(	function(){	close_news();		});
		$("#SYNC").click(			function(){	getNews();			});
		$("#NAV a").click(			function(){	closeNav();			});
		
		
		
		check_system();
		get_user_data();
		getNews();
		
		checkConnection();
		
		setInterval(function (){ 	check_system();}, 			10000);	
		
		hammertime.on('swipe', function(ev) {
		    
		    if(ev.direction === 4){
			    
			    openNav();
			    
		    }
		    else if(ev.direction === 2){
			    
			    closeNav();
			    
		    }
		   
	});				

});