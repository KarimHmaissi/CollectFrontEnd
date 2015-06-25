"use strict";

var module = angular.module('collectFrontEndApp');

module.directive("open", function () {
	return {
		restrict: "A",
		replace: false,
		scope: false,

		link: function ($scope, element, attrs) {

			console.log("hit");

			element.on("click", function (e) {
				console.log("clicked");
				e.preventDefault();

				var $embedLink = $(".embed-link");

				 $embedLink.each(function (i, el) {
					var $el = $(el);

					$el.click();

					
				});

			});
			
		}
	};
})