/*
|	Main.js for OTS Application	
|
|	Author: James R. Williams @james_rwilliams
|	Date: 30 Nov 14
|
*/

/* Contents
|
|	1. Utility Functions
|	2. Working Area
|	3. Init Phase
|
*/

function getNews(){
	
	var feedurl = "http://wearekiwikiwi.co.uk/feed/";
	var feeddata = '<channel> <title>KiwiKiwi</title> <atom:link href="http://wearekiwikiwi.co.uk/feed/" rel="self" type="application/rss+xml"/> <link>http://wearekiwikiwi.co.uk</link> <description>Just another WordPress site</description> <lastBuildDate>Sun, 15 Feb 2015 12:17:49 +0000</lastBuildDate> <language>en-GB</language> <sy:updatePeriod>hourly</sy:updatePeriod> <sy:updateFrequency>1</sy:updateFrequency> <generator>http://wordpress.org/?v=4.1</generator> <item> <title>Vestibulum id ligula porta felis euismod semper.</title> <link> http://wearekiwikiwi.co.uk/2015/02/vestibulum-id-ligula-porta-felis-euismod-semper/ </link> <comments> http://wearekiwikiwi.co.uk/2015/02/vestibulum-id-ligula-porta-felis-euismod-semper/#comments </comments> <pubDate>Sun, 15 Feb 2015 12:17:49 +0000</pubDate> <dc:creator> <![CDATA[ james.williams ]]> </dc:creator> <category> <![CDATA[ Uncategorised ]]> </category> <guid isPermaLink="false">http://wearekiwikiwi.co.uk/?p=4</guid> <description> <![CDATA[ Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris &#8230; <a href="http://wearekiwikiwi.co.uk/2015/02/vestibulum-id-ligula-porta-felis-euismod-semper/" class="more-link">Continue reading <span class="screen-reader-text">Vestibulum id ligula porta felis euismod semper.</span></a> ]]> </description> <content:encoded> <![CDATA[ <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p> <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper.</p> <p>Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p> ]]> </content:encoded> <wfw:commentRss> http://wearekiwikiwi.co.uk/2015/02/vestibulum-id-ligula-porta-felis-euismod-semper/feed/ </wfw:commentRss> <slash:comments>0</slash:comments> </item> <item> <title>Hello world!</title> <link>http://wearekiwikiwi.co.uk/2015/02/hello-world/</link> <comments> http://wearekiwikiwi.co.uk/2015/02/hello-world/#comments </comments> <pubDate>Sun, 01 Feb 2015 12:35:17 +0000</pubDate> <dc:creator> <![CDATA[ james.williams ]]> </dc:creator> <category> <![CDATA[ Uncategorised ]]> </category> <guid isPermaLink="false">http://wearekiwikiwi.co.uk/?p=1</guid> <description> <![CDATA[ Welcome to WordPress. This is your first post. Edit or delete it, then start blogging! ]]> </description> <content:encoded> <![CDATA[ <p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!</p> ]]> </content:encoded> <wfw:commentRss> http://wearekiwikiwi.co.uk/2015/02/hello-world/feed/ </wfw:commentRss> <slash:comments>1</slash:comments> </item> </channel>';
	
	$.get(feeddata, function (data) {
	    $(data).find("item").each(function () { // or "item" or whatever suits your feed
	        
	        var el = $(this);
	
	        console.log("------------------------");
	        console.log("title      : " + el.find("title").text());
	        console.log("author     : " + el.find("author").text());
	        console.log("description: " + el.find("description").text());
	    });
	});	
}


/*
	----------------------------------------------------------------------------------------------
	------------------------------------  Utility Functions --------------------------------------
	----------------------------------------------------------------------------------------------	
*/

/*
==	
==	-----------
==
==	
*/


function checkInternetStatus(){
	
	console.log(navigator.onLine);
	
	if(navigator.onLine = "true"){
		
		setMessageArea("Internet Connection Active");
		
	}else{
		
		setMessageArea("Internet Connection Offline");
		
	}

}

/*
==	Utility Function for System feedback on device
==	----------- 
==
==	Sets the .message_area to variable string
*/

function setMessageArea(message){
	
	$(".message_area").text(message);
	
}

/*
==	
==	-----------
==
==	
*/


function updateLocalStorage(data){
	
	localStorage.setItem("temp", data);
	
}


/*
==	
==	-----------
==
==	
*/


function getLocalStorage(){
	
	var value = localStorage.getItem("temp");
	setMessageArea("Local Storage Loaded: " + value);
	
}

/*
==	
==	-----------
==
==	
*/


function writeToLocalStorage(){
	
	var value = $(".localstorage_test").val();
	setMessageArea("Local Storage Set Too: " + value);
	updateLocalStorage(value);
	
}

/*
==	
==	-----------
==
==	
*/


function clearLocalStorage(){
	
	localStorage.setItem("temp","");
	
}

/*
==	
==	-----------
==
==	
*/


function closeNav(){
	
	$('#NAV').animate({"left": '-80%'});
	$(".page").animate({"margin-left":"0"});
	$('.RETURN').css("display","none");
	
}

/*
==	Open Nav Utility Class
==	-----------
==
==	
*/


function openNav(){
	
	$('#NAV').animate({"left": '0'});
	$('.page').animate({"margin-left": "80%"});
	$('.RETURN').css("display","block");
	
}


/*
	----------------------------------------------------------------------------------------------
	------------------------------------  WORKING AREA -------------------------------------------
	----------------------------------------------------------------------------------------------	
*/
	
	

  

/*
	----------------------------------------------------------------------------------------------
	------------------------------------ END WORKING AREA ----------------------------------------
	----------------------------------------------------------------------------------------------	
*/



/*
==	Opperational Javascript
==	-----------
==
==	Main Process functions and detections happen in the block below.
*/


$(document).ready(function(){
	
	if(localStorage.getItem("OTS_introVideoHasPlayed") === null){
		
		// Play video if not played before
		window.location.href = "#STARTSCREEN";
		
	}else {
		
		// If video has been played got to
		window.location.href = "#PAGE1";

		
	}
	
	$("#VIDEOSTART").click(function(){
		
		window.location.href = "#INTRO";
		$("#videoTrailer").get(0).play();

		
	});
	
	$("#NAVBTN").click(function(){
		
		openNav();
		
	});
	
	$("#RETURN").click(function(){
		
		closeNav();
		
	});
	
	$("#videoTrailer").bind("ended", function() {
		
		window.location.href = "#PAGE1";
		localStorage.setItem("OTS_introVideoHasPlayed", "true");
		
	});
	
	// getNews();
			
});

