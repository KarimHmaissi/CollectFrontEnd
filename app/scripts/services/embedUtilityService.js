"use strict";

var module = angular.module('collectFrontEndApp');


module.service("embedUtilityService", function() {
	return {


        htmlDecode: function(input) {
        	console.log("hit htmlDecode");
        	console.log(input);
        	if(input !== "undefined" && input !== null) {
        		console.log("decoding html");
        		var e = document.createElement("div");
	          	e.innerHTML = input;
	          	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        	} else {
        		return "error";
        	}
        },

        containsStr: function(needle, haystack) {
			return (haystack.indexOf(needle) >= 0)
		},

        //change this
        fixImgur: function(url) {
			if (this.containsStr("imgur.com", url)) {
				//check if its a gallery
				url = url.replace('http://imgur.com', 'http://i.imgur.com')
				url = url.replace('/g/memes', '')
				if (this.containsStr("imgur.com/a/", url) === true || this.containsStr("gallery", url) === true) {
					return false
				} else {
					url = url.replace(/(\?.*)|(#.*)|(&.*)/g, "")
					//first remove query parameters from the url
					if(url.indexOf("gifv") > -1) {
						console.log("found gifv");
						url = url.replace("gifv", "gif");
						return url;
					} else {
						return url + ".jpg";
					}
					
				}

			}
			return false;
		},

		checkIsImg: function(url) {
			return (url.match(/\.(jpeg|jpg|gif|png|gifv)$/) !== null);
		}

	}
});