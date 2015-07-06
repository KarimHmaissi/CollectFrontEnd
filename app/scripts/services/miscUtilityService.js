"use strict";

var module = angular.module('collectFrontEndApp');


module.service("miscUtilityService", function() {
	return {


        indexOfObject: function (object, objectArray, property) {
        	var i,
        		length = objectArray.length;

        	if(objectArray.length > 0 && _.has(object, property)) {


        		for(i = 0; i < length; i++) {

        			if(_.has(objectArray[i], property)) {

        				if(objectArray[i][property] === object[property]) {
        					return i;
        				}
        			}
        			
        		}
        	}

        	return -1;
        },

        // [{linkUrl: {property: value}}]	
        indexOfLink: function (link, linkArray, property) {
        	return this.indexOfObject(link.linkDetails, _.pluck(linkArray, "linkDetails"), property);
        }

	}
});