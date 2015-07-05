"use strict";

var module = angular.module('collectFrontEndApp');

module.directive("group", function () {

	return {

		restrict: "A",
		replace: true,
		scope: true,
		templateUrl: "/views/addToGroup.html",

		link: function ($scope, element, attrs) {


			console.log("hit addToGroup directive");

			var $wrapper = $(element).closest(".add-to-group-wrapper");
			


			var grabIndex = function () {
				return $(element).closest(".link").attr("data-link-index");
			};


			var openWidget = function () {
				$wrapper.find(".add-to-group").removeClass("hide");
				$wrapper.find(".add-to-group-btn").addClass("hide");
			};

			var closeWidget = function () {
				$wrapper.find(".add-to-group").addClass("hide");
				$wrapper.find(".add-to-group-btn").removeClass("hide");

				if(!$wrapper.find(".add-new-group").hasClass("hide")) {
					!$wrapper.find(".add-new-group").addClass("hide");
				}
			};



			//click add to group
			element.on("click", function (e) {
				e.preventDefault();
				e.stopPropagation();

				var $el = $(this);

				console.log("clicked link");

				$wrapper.parent().width("100%");

				openWidget();

				
			});

			//click new group + btn
			$wrapper.find(".add-new-group-btn").on("click", function (e) {
				e.preventDefault();
				e.stopPropagation();

				console.log("clicked new group +")
				var $el = $(this);
				$wrapper.find(".add-new-group").removeClass("hide");
				// $wrapper.find(".add-to-group").addClass("hide");

			});


			//new group submit
			$wrapper.find(".add-new-group-form-submit").on("click", function (e) {

				e.preventDefault();
				e.stopPropagation();

				var $el = $(this);

				var groupName = $el.siblings(".group-name").val();

				if(groupName != "" && groupName) {
					$scope.$apply(function () {
						console.log(groupName);
						console.log($scope.groups);


						var index = grabIndex();

						$scope.newCollection.links[index].group = groupName;

						var link = $scope.newCollection.links[index];

						//remove link from scope.newcollection and add it to groups
						var newGroup = {name: groupName, links: [link]};


						$scope.newCollection.links.splice(index, 1);

						$scope.groups.push(newGroup);

						console.log($scope.groups);

						closeWidget();
						
					});
				}

			});


			//added to group
			$wrapper.on("click", ".existing-group-btn", function (e) {
				e.preventDefault();
				e.stopPropagation();

				var $el = $(this);

				var index = grabIndex();

				$scope.$apply(function () {
					var groupName = $el.attr("data-group-name");

					$scope.newCollection.links[index].group = groupName;

					//remove link from scope.newcollection and add it to groups
					var groupIndex = $el.attr("data-group-index");

					var link = $scope.newCollection.links[index];
					$scope.newCollection.links.splice(index, 1);

					$scope.groups[groupIndex].links.push(link);
					


					closeWidget();
				});
				

			

			});
			

			

		}
	}
});