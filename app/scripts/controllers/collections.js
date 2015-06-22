'use strict';

/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectFrontEndApp
 */
var module = angular.module('collectFrontEndApp');

var validUrl = function (url) {
      return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
};

 module.controller('CollectionsCtrl', function ($scope, Restangular) {
		var collections = Restangular.oneUrl("collections", "http://192.168.0.6:1337/api/v1/collections");
  		
  		collections.getList().then(function (collections) {
  			$scope.collections = collections;
  			console.log($scope.collections);

  		});
  });


module.controller('CollectionsSingleCtrl', function ($scope, Restangular, $routeParams) {
  		var collections = Restangular.oneUrl(
        "collections", "http://192.168.0.6:1337/api/v1/collections/" + $routeParams.id);

  		$scope.id = $routeParams.id;

  		collections.get().then(function (collection) {
  			console.log("hit CollectionsSingleCtrl");
  			console.log(collection);
  			$scope.collection = collection;
  		});
});

module.controller('CollectionNewCtrl', function ($scope, $rootScope, $http, $location, Restangular) {

    if(!$scope.session) {
      $rootScope.previousPath = "/new";
      $location.path('/login');
    }

    var crawlLinkHeaders = {
     "Content-Type": "application/x-www-form-urlencoded"
    };

    $scope.crawledLinks = [];

    $scope.newCollection = {
      title: "Title of your new collection",
      description: "",
      links: []
    };


    

    $scope.submitLinks = function () {
        console.log($scope.links);
        console.log(typeof $scope.links);

         var linkArray = $scope.links.split("\n");

         console.log(linkArray);
         console.log(linkArray.length);

         

         var crawlLink = function (url) {

            console.log(url);

            var xsrf = $.param({url: url});

            console.log("about to process");
            $http({method: "POST",
                  url: "http://192.168.0.6:1337/api/v1/links?access_token=" + $rootScope.session.token,
                  data: xsrf,
                  headers : crawlLinkHeaders })
            .success(function (link) {
                  console.log(link);
                  //add meta link
                  $scope.newCollection.links.push({
                    title: link.details.title,
                    description: link.details.description,
                    group: "misc",
                    linkUrl: link.details.id
                  });

                  //add real link
                  $scope.crawledLinks.push(link.details);
            });
         };

         var i;
         var length = linkArray.length;
         var processedLinks = [];

         for(i = 0; i < length; i++) {
          if(validUrl(linkArray[i])) {
            // processedLinks.push(linkArray[i]);
            crawlLink(linkArray[i]);
          }
         }

         // $scope.processedLinks = processedLinks;

         $scope.links = "";
         // console.log($scope.crawledLinks);


    };

    $scope.saveCollection = function () {
      
        

        var xsrf = $.param($scope.newCollection);

        console.log($scope.newCollection);
        console.log(xsrf);

        // $http({method: "POST",
        //        url: "http://192.168.0.6:1337/api/v1/collections?access_token=" + $rootScope.session.token,
        //        data: xsrf,
        //        headers : crawlLinkHeaders 
        // })
        // .success(function (collection) {
        //     console.log(collection);
        // });

    };
});


// http://www.ng-newsletter.com/posts/restangular.html