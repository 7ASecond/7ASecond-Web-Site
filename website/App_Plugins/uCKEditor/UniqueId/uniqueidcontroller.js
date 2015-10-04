angular.module("umbraco").controller("uCKEditor.UniqueId",

function ($scope, notificationsService, uCKEditorResource) {

    $scope.isLoaded = false;

    // Check whether the model has a value
    if (!$scope.model.value || $scope.model.value == "") {
        // If the model doesn't have any value then create a new unique Id
        uCKEditorResource.getUniqueId($scope.model.config.type).then(
            function (response) {
                $scope.model.value = JSON.parse(response.data);
                $scope.isLoaded = true;
            }, function (error) {
                notificationsService.error("Error", "Error generating unique id.");
                console.log(error);
            });
    }
    else {
        $scope.isLoaded = true;
    }

});
