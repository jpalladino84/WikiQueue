/******************************
 * Author: Jeff Palladino
 * Version: 1.0
 * Date: 11/16/2011
 * Desc: Class: Will handle on service requests
 ******************************/
 
// Class Queue
function Queue(){
	this.items = [];	
}

Queue.prototype.setItem = function setItem(e){
	var url = e.linkUrl.toString();		
		// grab browser language
	var lang = navigator.language;
	var id;		
		// match browser language and strip out all un wanted text
	switch(lang.toLowerCase()){
			// English Languages
		case "en-us":
		case "en-gb":
		case "en-au":
		case "en-bz":
		case "en-ca":
			id = url.replace('http://en.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");						
			break;
		case "es-es":
			id = url.replace('http://es.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");						
			break;
			// French Languages
		case "fr":
		case "fr-be":
		case "fr-ca":
		case "fr-fr":
		case "fr-lu":
		case "fr-ch":
		case "fr-mc":					
			id = url.replace('http://fr.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");						
			break;
			// Italian Languages
		case "it":
		case "it-ch":
			id = url.replace('http://it.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");						
			break;
			// Japanese Language
		case "ja":
			id = url.replace('http://ja.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");	
			break;
			// Polish Language
		case "pl":
			id = url.replace('http://pl.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");	
			break;
			// German Language
		case "de":
		case "de-at":
		case "de-de":
		case "de-li":
		case "de-lu":
		case "de-ch":
			id = url.replace('http://de.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");	
			break;
			// Chinese Langauge
		case "za":
		case "zh-hk":
		case "za-cn":
		case "za-sg":
		case "za-tw":
			id = url.replace('http://za.wikipedia.org/wiki/', "");
			id = id.replace(/_/g, " ");	
			break;					
	}	
 		// store the new entry @ID String, @URL String
	localStorage.setItem(id, url);
		// register the entry with the queue object
	this.registerItem(id, e.linkUrl);	
	this.setBadge();
}
	//registers the item with the queue object for later reference
Queue.prototype.registerItem = function registerItem(id,url){
	var i = new Item(id,url);
	this.items.push(i);	
}
	//remove the specified entry from the queue
Queue.prototype.removeItem = function removeItem(e,id){			
		// remove from local storage
	localStorage.removeItem(id);
		// callback to the html page to remove the html entry
	chrome.extension.getViews()[1].removeHTML(id);		
		// update the badge icon
	this.setBadge();	
}

	// grab the number of entries in the queue and set the badge icon
Queue.prototype.setBadge = function setBadge(){
	var len = localStorage.length.toString() 
		// set the badge text
	chrome.browserAction.setBadgeText({text:len});
		// set the badge color
	chrome.browserAction.setBadgeBackgroundColor({color:[255,0,0,255]});									
}

// Class Item
function Item(id, url){
	this.id = id;
	this.url = url;
}

