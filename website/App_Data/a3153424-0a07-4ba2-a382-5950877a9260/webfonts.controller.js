angular.module("umbraco")
    .controller("Kogler.GoogleWebFontsController",
        function($scope, $http) {
            $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD8l25_r2wb5nOR6a9-WUU4KoHp4J80iRo').success(function (data) {

                var fonts = [];

                if (data.kind === "webfonts#webfontList") {
                    $.each(data.items, function(index, value) {
                        if (value.variants.length > 1) {
                            fonts.push(value);
                        }
                    });
                }
                $scope.fonts = fonts;
            });
        });