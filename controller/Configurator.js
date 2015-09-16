angular.module('configurator', [])
    .constant('dataUrl', "products.json")
    .controller('configurator', function($scope, $http, dataUrl) {
        $http.get(dataUrl)
            .success(function(res) {
                $scope.data = res;
                //alert($scope.data)
            })
            .error(function(error) {
                $scope.data.error = error;
            });

        $scope.cart = {
            count: 0,
            cost: 0,
            thirdprtycost: 0,
            vtcost: 0,
            vtcount: 0,
            thirdprtycount: 0
        }

        $scope.collapse = false;



    })
    .directive('sectiondetails', function() {
        return {
            restrict: 'E',
            templateUrl: "views/sectionDetails.html",
            controller: function($scope) {

                $scope.priceToNum = function(value) {
                    return Number(value.toString().replace(/[^0-9\.]+/g, ""));
                }



                $scope.initializeCart = function(choice, section, chapter) {
                  var chapterIndex = chapter.name;
                  var SectionIndex = section.name;


                  if (choice.name != "None") {
                      if (typeof $scope.cart[chapterIndex] === 'undefined') {
                          $scope.cart[chapterIndex] = {};
                          $scope.cart[chapterIndex].cost = 0; //chapter cost
                          $scope.cart[chapterIndex].count = 0; //chapter cost

                      } else if (typeof $scope.cart[chapterIndex][SectionIndex] === 'undefined') {
                          $scope.cart[chapterIndex][SectionIndex] = {};
                          $scope.cart[chapterIndex][SectionIndex].cost = 0;
                          $scope.cart[chapterIndex][SectionIndex].count = 0;
                      }
                  }
                  //console.log($scope.cart);
                }



                $scope.addProduct = function(choice, section, chapter) {

                  var chapterIndex = chapter.name;
                  var SectionIndex = section.name;

                    var cart = $scope.cart;
                    var chap = $scope.cart[chapterIndex];
                    var sec = $scope.cart[chapterIndex][SectionIndex];


                    if (sec["lastclicked"] != choice.name) {



                        if (choice.name != "None") {
                            choice.value = $scope.priceToNum(choice.value);


                            cart.count++; //add back count
                            chap.count++; //add back count

                            cart.cost += choice.value; //add new cost
                            chap.cost += choice.value; //remove old chapter cost
                        }

                        if (choice.name == "None") { //if not first selection

                            cart.count--; //remove old count
                            chap.count--; //remove old chapter count

                            cart.cost -= sec.cost; //remove old cost
                            chap.cost -= sec.cost; //remove old chapter cost
                        }

                        sec.lastclicked = choice.name;
                        sec.lastclickedImg = choice.img;
                        sec.lastclickedLink = choice.link;
                        sec.cost = choice.value;

                    }
                }
            }
        }
    });