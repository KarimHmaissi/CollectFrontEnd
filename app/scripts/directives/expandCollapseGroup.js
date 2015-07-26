"use strict";

var module = angular.module('collectFrontEndApp');

module.directive("expand", function () {
	return {
		restrict: "A",
		replace: false,
		scope: true,

		link: function ($scope, element, attrs) {
			var openClose = function (openClose) {

				var i;
				var length = $scope.collection.groups.length;

				for(i = 0; i < length; i++) {
					$scope.$apply(function () {
						$scope.collection.groups[i].showLinks = openClose;
						
					});
				}
				

			};

			element.on("click", function (e) {
				e.preventDefault();

				if($(element).attr("data-open-close") === "open") {
					openClose(true);
				} else {
					openClose(false);
				}

				// openClose(true);
			});

			

			

			

		}
	}
})