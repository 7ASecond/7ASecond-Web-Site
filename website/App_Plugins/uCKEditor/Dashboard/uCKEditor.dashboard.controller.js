'use strict';
(function () {

    //Main controller
    function uCKEditorDashboardController($log, $rootScope, $scope, dialogService, $window, assetsService) {

        // Load the css that converts the right hand side dialog into a full screen dialog
        assetsService.loadCss("/App_Plugins/uCKEditor/Dashboard/uCKEditor.dashboard.css");

        // This value is checked by the javascript executed when the user clicks on the button in order to check if the requested Umbraco's dialog (mediaPicker, embedDialog, ...) is loaded
        $scope.umbracoDialogLoaded = false;

        $scope.openDialogMediaPicker = function () {
            // Open Umbraco's media picker dialog
            dialogService.mediaPicker({
                // Media picker dialog settings
                onlyImages: true,
                showDetails: true,
                // Media picker callback
                callback: function (item) {
                    // Return the value to the iframe's parent posting a message
                    $window.parent.postMessage(item, '*');
                }
            });
            // To let know the caller than the dialog is loaded
            $scope.umbracoDialogLoaded = true;
        }

        $scope.openDialogEmbed = function () {
            // Open Umbraco's Embed dialog
            dialogService.embedDialog({
                // Embed dialog callback
                callback: function (item) {
                    // Insert embed element
                    if (item) {
                        // Return the value to the iframe's parent posting a message
                        $window.parent.postMessage(item, '*');
                    };
                }
            });
            // To let know the caller than the dialog is loaded
            $scope.umbracoDialogLoaded = true;
        }

        $scope.openDialogMediaTaggerPicker = function () {
            // Open Umbraco's media tagger picker dialog
            dialogService.open({
                // Dialog
                template: '/App_Plugins/MediaTagger/Dialog/_dialog.html',
                show: true,
                // Dialog Callback
                callback: function (item) {
                    console.log(item);
                    // Return the value to the iframe's parent posting a message
                    $window.parent.postMessage(item, '*');
                }
            });
            // To let know the caller than the dialog is loaded
            $scope.umbracoDialogLoaded = true;
        }

    };

    //register the controller
    angular.module("umbraco").controller('uCKEditor.DashboardController', uCKEditorDashboardController);

})();



