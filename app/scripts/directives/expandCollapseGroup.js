"use strict";

var module = angular.module('collectFrontEndApp');

module.directive("expand", function () {
	return {
		restrict: "A",
		replace: false,
		scope: true,

		link: function ($scope, element, attrs) {

			var $element = $(element);

			$element.on("click", function (e) {


				e.preventDefault();

				var $el = $(this);

				$el.closest(".group").toggleClass("collapsed");
			});


		}
	}
})