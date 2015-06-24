"use strict";

var module = angular.module('collectFrontEndApp');

module.directive("embed", function (embedUtilityService) {
	
	return {
		restrict: "A",
		replace: false,
		scope: true,

		link: function ($scope, element, attrs) {
			var link = $scope.link;

			//flags
			var embed = null;
			var isImage = false;
			var isVideo = false;
			var isGallery = false;
			var isEmbedly = false; 
			var largeThumbnail = false;  


			//check type of embed
			if(link.linkUrl.embedPresent) {
				embed = link.linkUrl.embedHtml;
				isEmbedly = true;
			}

			//img
			else if(embedUtilityService.checkIsImg(link.linkUrl.url)) {
				//link is an image
				embed = link.linkUrl.url;
				isImage = true;
			}

			//video embed
			else if (link.linkUrl.providerUrl.indexOf("www.youtube.com") > -1) {

				var videoId = link.linkUrl.url.split("v=")[1];

				if(videoId) {
					embed = "<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/" 
					                    + post.videoId + "\" frameborder=\"0\" allowfullscreen></iframe>";
					isVideo = true;
				}

			}

			//last ditch efforts
			else {
				//is imgur link? Try and fix

				var updatedImgurLink = embedUtilityService.fixImgur(link.linkUrl.url);

				if(updatedImgurLink) {
					embed = updatedImgurLink;
					isImage = true;
				} else {
					var newImage = new Image();
					newImage.src = post.thumbnail;
					newImage.src = link.linkUrl.thumbnail;

					if(newImage.width > 205) {
					    largeThumbnail = true;
					} else {
					    //no media to embed hide element
					    element.hide();
					}
				}

			}



			//add embed to dom

			var shown = false;

			element.on("click", function (e) {
				console.log("show");

				e.preventDefault();

				if(!shown) {
					shown = true;

					var embedContainer = $("<div />", {class: "embed-container margin-top-sm"});

					$(this).text("close");


					//show img
					if(isImage)  {
						var embedElement = $("<img src='" + embed + "' />");

						var fullResoLink = $("<a />", {
							href: link.linkUrl.url, 
							text: "View full resolution", class: "row"
						});

						embedElement.appendTo(embedContainer);
						fullResoLink.appendTo(embedContainer);

						$(this).children(".feed-preview-img").hide(300);
						$(this).append(embedContainer);

						embedElement.load(function () {
							//img loaded
						}).error(function () {
							//error
						})
					}

					//show embedly embed - iframe
					else if(isEmbedly) {
						var embedElement = $(embedUtilityService.htmlDecode(embed));

						embedElement.appendTo(embedContainer);

						$(this).closest(".link").append(embedContainer);
					}


					//show video
					else if(isVideo) {

						var embedElement = $(embed);

						embedElement.appendTo(embedContainer);

						$(this).children(".feed-preview-img").hide(300);
						$(this).append(embedContainer);
					}


					//show large thumbnail

					else if(largeThumbnail) {
						var embedElement = $('<img />').attr({ 'src': link.linkUrl.thumbnail, 'alt':link.linkUrl.title })
						embedElement.appendTo(embedContainer);
						$(this).closest(".post").append(embedContainer);
					}


				} else {
					shown = false;
					$(this).text("show");
					$(this).closest(".link").find(".embed-container").remove();
				}



			});


		}

	}


});