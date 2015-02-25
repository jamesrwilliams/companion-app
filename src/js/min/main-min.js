/*
 * OTS App Javascript Core File
 * 
 * @version		0.1
 * @package		com.jamesrwilliams.OTS
 * @description	Web interface for a local iOS Game companoion app			
 * @author 		James Williams (@James_RWilliams)
 * @copyright 	Copyright (c) 20/02/2015
 *
 */		

// http://stackoverflow.com/questions/9473582/ios-javascript-bridge

var ots_news_array = window.localStorage.getItem("ots_news_array");
var content_array = JSON.parse(ots_news_array);
var debug_version = 0.1;
var i;

	/*
	 *  Get News Function
	 * 
	 *	
	 *  @returns null
	 */
	 
	function rednder_news(){
		
		$(".article_list").html("");
	
		for(i = 0; content_array.length > i; i++){
	
			$(".article_list").append("<li><a href='" + content_array[i][1] + "'><h4>" + content_array[i][0] + "</h4><time class='meta'>" + content_array[i][3] + "</time><p>"+ content_array[i][2] +"</p></a></li>");
	
		}
	
	}
	
	function getNews(){
		
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
		            
		            rednder_news();
		            
		        },
		        // error: function(xhr, status) { rednder_news(); }
			    error: function(){ render_news(); }    
			});	
			
		} else {
			
			rednder_news();	
			
		}
		
	}
	
	
	
	/*
	 *  
	 *	
	 *  @returns null
	 */		
	 
	function writeDebug(){
		
		$(".version").html("Version: " + debug_version);
		
	}	
	
	/*
	 * Utility Function that closes the navigation pane. 
	 *	
	 *  @returns null
	 */			
	
	function closeNav(){
		
		$('#NAV').animate({"left": '-80%'});
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
		$('.page').animate({"margin-left": "80%"});
		$('.RETURN').css("display","block");
		
	}
	
	function clear_app_data(){
		
		localStorage.removeItem(ots_news_array);
		
	}
	
	/*
	 * Document Init Function. Runs on page load. 
	 *	
	 *  @returns null
	 */		
	
	
	$(document).ready(function(){
		
		if(content_array === null){
	
			content_array = [["","","","",""]];
			var str = JSON.stringify(content_array);
			window.localStorage.setItem("ContentArray",str);
			
		}
		
		// DEBUG - iOS Directory search fallback function.
		
		$("img").error(function(){$(this).unbind("error").attr("src","img/"+$(this).attr("src"));});
		
		if(localStorage.getItem("OTS_introVideoHasPlayed") === null){
			
			// Play video if not played before
			window.location.href = "#STARTSCREEN";
			
		}else {
			
			// If video has been played got to
			window.location.href = "#news";
			
		}
		
		$("#VIDEOSTART").click(function(){
			
			window.location.href = "#INTRO";
			$("#videoTrailer").get(0).play();
			
		});
		
		$("#NAVBTN").click(function(){openNav();});
		$("#RETURN").click(function(){closeNav();});
		
		$("#videoTrailer").bind("ended", function() {
			
			window.location.href = "#PAGE1";
			localStorage.setItem("OTS_introVideoHasPlayed", "true");
			
		});
		
		writeDebug();
	
		getNews();
				
	});

