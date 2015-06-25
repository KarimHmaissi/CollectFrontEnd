"use strict";

var module = angular.module('collectFrontEndApp');


module.service("urlUtilityService", function() {
	return {


        htmlDecode: function(input) {
        	if(input !== "undefined" && input !== null) {
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
		},

		validUrl: function (url) {
		      return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
		}

	}
});