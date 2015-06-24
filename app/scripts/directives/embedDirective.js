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
			var embed = "";
			var isImage = false;
			var isVideo = false;
			var isGallery = false;
			var isEmbedly = false; 
			var largeThumbnail = false;  

			var updatedImgurLink = embedUtilityService.fixImgur(link.linkUrl.url);

			//imgur
			if(updatedImgurLink) {
				embed = updatedImgurLink;
				isImage = true;
				console.log("found an imgur image: " + link.linkUrl.url);
			}

			//embedly embed
			else if(link.linkUrl.embedPresent) {
				console.log("found an embedly embed: " + link.linkUrl.url);
				console.log(link.linkUrl.embedHtml);
				embed = link.linkUrl.embedHtml;
				isEmbedly = true;
			}

			//img
			else if(embedUtilityService.checkIsImg(link.linkUrl.url)) {
				//link is an image
				console.log("found an image: " + link.linkUrl.url);
				embed = link.linkUrl.url;
				isImage = true;
			}

			//video embed
			else if (link.linkUrl.providerUrl.indexOf("www.youtube.com") > -1) {


				var videoId = link.linkUrl.url.split("v=")[1];

				if(videoId) {

					console.log("found an video embed: " + link.linkUrl.url);
					embed = "<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/" 
					                    + videoId + "\" frameborder=\"0\" allowfullscreen></iframe>";
					isVideo = true;
				}

			}

			//last ditch efforts
			else {


				var newImage = new Image();
				newImage.src = link.linkUrl.thumbnail;

				if(newImage.width > 205) {
				    largeThumbnail = true;
				} else {
				    //no media to embed hide element
				    element.hide();
				}
			

				// var updatedImgurLink = embedUtilityService.fixImgur(link.linkUrl.url);

				// if(updatedImgurLink) {
				// 	embed = updatedImgurLink;
				// 	isImage = true;
				// 	console.log("found an imgur image: " + link.linkUrl.url);
				// } else {
					
				// }

			}



			//add embed to dom

			var shown = false;

			element.on("click", function (e) {
				console.log("show");
				console.log(embed);

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
						// var decodedHtml = embedUtilityService.htmlDecode(embed);
						// console.log(decodedHtml);

						var embedElement = $(embed);
						console.log(embedElement);

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