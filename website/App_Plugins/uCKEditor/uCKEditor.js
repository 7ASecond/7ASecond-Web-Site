
/* Settings structure:
        editorSettings = {
            customConfigurationFile: "",
            width: "",
            height: "",
            language: "",
            font_names: "",
            font_style: "",
            format_tags: "",
            allowedContent: "",
            extraAllowedContent: "",
            toolbar: "",
            toolbarGroups: "",
            removeButtons: "",
            extraPlugins: "",
            removePlugins: "",
            stylesSet: ""
        } 
*/

function createEditor(editorPlaceholderId, editorSettings) {

    // Textaread ID used by the editor
    var editorTextAreaId = editorPlaceholderId;

    // Assign a UniqueId for the textarea (in case there is more than one editor in the same form)
    var date = new Date();
    var uniqueID = "" + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
    $('#' + editorTextAreaId).attr('id', uniqueID);
    editorTextAreaId = uniqueID;

    // Add the attribute: contenteditable="true" 
    $('#' + editorTextAreaId).attr('contenteditable', 'true');

    // Create the inline CKEditor control
    var editor;

    // Loads plugin (UmbracoMedia, UmbracoEmbed, ...)
    if (CKEDITOR.config.plugins != null && CKEDITOR.config.plugins != 'undefined' && jQuery.trim(CKEDITOR.config.plugins) != '')
        CKEDITOR.config.plugins += ',umbracomedia,umbracoembed,umbracosave'; /*umbracomediatagger*/
    else
        CKEDITOR.config.plugins = 'umbracomedia,umbracoembed,umbracosave'; /*umbracomediatagger*/

    if (editorSettings.customConfigurationFile != null && jQuery.trim(editorSettings.customConfigurationFile) != '') {
        // Create the editor using the custom configuration file
        editor = CKEDITOR.inline(editorTextAreaId, {
            customConfig: editorSettings.customConfigurationFile
        });
    }
    else {
        // Create the editor using the other setting
        CKEDITOR.config.width = editorSettings.width;
        CKEDITOR.config.height = editorSettings.height;
        if (editorSettings.language != null && jQuery.trim(editorSettings.language) != '') {
            CKEDITOR.config.language = editorSettings.language;
        }
        if (editorSettings.font_names != null && jQuery.trim(editorSettings.font_names) != '') {
            CKEDITOR.config.font_names = editorSettings.font_names;
        }
        if (editorSettings.font_style != null && jQuery.trim(editorSettings.font_style) != '') {
            CKEDITOR.config.font_style = editorSettings.font_style;
        }
        if (editorSettings.format_tags != null && jQuery.trim(editorSettings.format_tags) != '') {
            CKEDITOR.config.format_tags = editorSettings.format_tags;
        }
        if (editorSettings.allowedContent != null && jQuery.trim(editorSettings.allowedContent) != '') {
            CKEDITOR.config.allowedContent = editorSettings.allowedContent;
        }
        if (editorSettings.extraAllowedContent != null && jQuery.trim(editorSettings.extraAllowedContent) != '') {
            CKEDITOR.config.extraAllowedContent = editorSettings.extraAllowedContent;
        }
        if (editorSettings.toolbar != null && jQuery.trim(editorSettings.toolbar) != '') {
            CKEDITOR.config.toolbar = eval("[['umbracosave','umbracomedia','umbracoembed'], " + editorSettings.toolbar + ",]"); /*'umbracomediatagger'*/
        }
        if (editorSettings.toolbarGroups != null && jQuery.trim(editorSettings.toolbarGroups) != '') {
            CKEDITOR.config.toolbarGroups = eval("[{name: 'umbraco', groups: ['umbraco']}, " + editorSettings.toolbarGroups + ",]");
        }
        if (editorSettings.removeButtons != null && jQuery.trim(editorSettings.removeButtons) != '') {
            CKEDITOR.config.removeButtons = editorSettings.removeButtons;
        }
        if (editorSettings.extraPlugins != null && jQuery.trim(editorSettings.extraPlugins) != '') {
            CKEDITOR.config.extraPlugins = editorSettings.extraPlugins;
        }
        if (editorSettings.removePlugins != null && jQuery.trim(editorSettings.removePlugins) != '') {
            CKEDITOR.config.removePlugins = editorSettings.removePlugins;
        }
        if (editorSettings.stylesSet != null && jQuery.trim(editorSettings.stylesSet) != '') {
            CKEDITOR.config.stylesSet = editorSettings.stylesSet;
        }
        editor = CKEDITOR.inline(editorTextAreaId, CKEDITOR.config);
    }

    // If toolbars haven't been customized then add umbraco toolbar group to the default CKEditor toolbar
    if ((CKEDITOR.config.toolbarGroups == null || CKEDITOR.config.toolbarGroups == 'undefined' || jQuery.trim(CKEDITOR.config.toolbarGroups) == '') &&
        (CKEDITOR.config.toolbar == null || CKEDITOR.config.toolbar == 'undefined' || jQuery.trim(CKEDITOR.config.toolbar) == '')) {
        editor.ui.addToolbarGroup('umbraco', 0);
    }

    // Get the internal texteditor ID 
    var editorId = 'cke_' + editorTextAreaId;

    // Get UmbracoMedia plugin's button IDs
    var editorButtonMediaIdSelector = '#' + editorId + ' .cke_button__umbracomedia';

    // Hook the click event for the UmbracoMedia plugin's button
    $(document).on('click', editorButtonMediaIdSelector, function () {
        umbracoBackofficeDialog('media', 'Media');
    });

    // Get UmbracoEmbed plugin's button IDs
    var editorButtonEmbedIdSelector = '#' + editorId + ' .cke_button__umbracoembed';

    // Hook the click event for the UmbracoEmbed plugin's button
    $(document).on('click', editorButtonEmbedIdSelector, function () {
        umbracoBackofficeDialog('embed', 'Embed');
    });

    // Get UmbracoMediaTagger plugin's button IDs
    var editorButtonMediaTaggerIdSelector = '#' + editorId + ' .cke_button__umbracomediatagger';

    // Hook the click event for the UmbracoMediaTagger plugin's button
    $(document).on('click', editorButtonMediaTaggerIdSelector, function () {
        umbracoBackofficeDialog('mediatagger', 'Media');
    });


    function umbracoBackofficeDialog(dialogType, dialogTitle) {

        // Variables to store references in order to destroy/remove properly objects
        var iframeHandler = null;
        var dialogHandler = null;
        var eventListenerReceiveMessage = null;

        // The iframe is initially hidden in order to avoid the user to see how umbraco backoffice is loading
        iframeHandler = $('<iframe id="umbracoBackofficeIframe" frameborder="0" marginwidth="0" marginheight="0" src="/umbraco/#/uckeditor" style="display:none;"></iframe>');
        var dialog = $("<div style=''><div id='divLoading' class='centered'> Loading ... </div></div>").append(iframeHandler).appendTo("body").dialog({
            autoOpen: false,
            modal: true,
            resizable: true,
            width: Math.round($(window).width() * 0.8),
            height: Math.round($(window).height() * 0.8),
            close: function () {
                // Remove the event listener
                if (eventListenerReceiveMessage) {
                    window.removeEventListener("message", eventListenerReceiveMessage, false);
                }
                // Destroy the dialogHandler 
                if (dialogHandler) {
                    dialogHandler.remove();
                }
                // Destroy the iframeHandler
                if (iframeHandler) {
                    iframeHandler.remove();
                }
            }
        });

        // Load the iframe within a modal dialog
        dialogHandler = dialog.dialog("option", "title", dialogTitle).dialog("open");
        dialogHandler.ready(function () {

            // Look for the iframe
            var iframe = document.getElementById("umbracoBackofficeIframe");

            // Setup a 10 seconds timeout to load the umbraco backoffice and display the umbraco dialog
            var interval = null;
            var timer = setTimeout(function () {
                // Stop the timeout
                clearInterval(interval);
                // Close the dialog 
                if (dialogHandler) {
                    dialogHandler.dialog('close');
                }
            }, 10000);

            // Iterate until the umbraco backoffice scope is loaded or the timeout goes off
            $("#umbracoBackofficeIframe").contents().find("#mainwrapper").hide();
            interval = setInterval(function () {
                $("#umbracoBackofficeIframe").contents().find("#mainwrapper").hide();
                // Get dashboard controller's angular scope (umbraco backoffice)
                var scope = null;
                if (iframe != null && iframe.contentWindow != null && iframe.contentWindow.angular != null) {
                    scope = iframe.contentWindow.angular.element("#uCKEditorDashboard").scope();
                    if (scope != null) {
                        switch (dialogType) {
                            case 'media':
                                scope.openDialogMediaPicker();
                                break;
                            case 'embed':
                                scope.openDialogEmbed();
                                break;
                            case 'mediatagger':
                                scope.openDialogMediaTaggerPicker();
                                break;
                            default:
                        }
                    }
                }
                // Check whether the dialog is loaded
                if (scope != null && scope.umbracoDialogLoaded != false) {
                    // Stop the timeout and the interval
                    clearTimeout(timer);
                    clearInterval(interval);
                    // Now that everything is loaded, display the iframe
                    $("#umbracoBackofficeIframe").show();
                    // Hide the loading message
                    $("#divLoading").hide();
                }
            }, 50);

            // Listen to message from the iframe
            eventListenerReceiveMessage = function (event) {
                // Check the message's origin
                /*if (event.origin !== "http://domain.com:80")
                    return;
                */
                // Insert into the editor the item(s) returned by the dialog
                switch (dialogType) {
                    case 'media':
                        // Check whether an image has been selected
                        if (event.data) {
                            // Selected image
                            var selectedImage = {
                                alt: event.data.altText,
                                src: (event.data.url) ? event.data.url : '/App_Plugins/uCKEditor/CKEditor/plugins/umbracomedia/images/noimage.png',
                                rel: event.data.id
                            };
                            // Create an html img tag with the picked image properties to insert into the editor
                            var htmlImage = editor.document.createElement('img');
                            htmlImage.setAttribute('src', selectedImage.src);
                            htmlImage.setAttribute('alt', selectedImage.alt);
                            editor.insertElement(htmlImage)
                        };
                        break;
                    case 'embed':
                        // Check whether there is an embed object
                        if (event.data) {
                            // Create an html iframe with the url
                            var embedElement = CKEDITOR.dom.element.createFromHtml(event.data, editor.document);
                            editor.insertElement(embedElement);
                        };
                        break;
                    case 'mediatagger':
                        // Check whether an image has been selected
                        if (event.data) {
                            // Selected image
                            var selectedImage = {
                                alt: '',
                                src: (event.data.image) ? event.data.image : '/App_Plugins/uCKEditor/CKEditor/plugins/umbracomediatagger/images/noimage.png',
                                rel: event.data.id
                            };
                            // Create an html img tag with the picked image properties to insert into the editor
                            var htmlImage = editor.document.createElement('img');
                            htmlImage.setAttribute('src', selectedImage.src);
                            htmlImage.setAttribute('alt', selectedImage.alt);
                            editor.insertElement(htmlImage)
                        };
                        break;
                    default:
                }
                // Close the dialog
                if (dialogHandler) {
                    dialogHandler.dialog('close');
                }
            }
            window.addEventListener("message", eventListenerReceiveMessage, false);

        });

    }

    // Get UmbracoSave plugin's button IDs
    var editorButtonSaveIdSelector = '#' + editorId + ' .cke_button__umbracosave';

    // Hook the click event for the UmbracoSave plugin's button
    $(document).on('click', editorButtonSaveIdSelector, function () {
        var contentId = $('#' + editorTextAreaId).attr('data-contentId');
        var contentPropertyAlias = $('#' + editorTextAreaId).attr('data-contentPropertyAlias');
        // Save editor's value 
        saveContentPropertyValue(contentId, contentPropertyAlias, editor.getData());
    });

    return editor;
}


//function getContentPropertyValue(editor, contentId, propertyAlias) {
//    $.ajax({
//        url: "/umbraco/backoffice/uCKEditor/uCKEditorApi/getContentPropertyValue",
//        data: {
//            contentId: contentId,
//            propertyAlias: propertyAlias
//        },
//        type: "GET",
//        dataType: "html",
//        contentType: 'application/json; charset=utf-8',
//        success: function (result, status, xhr) {
//            // Strip ")]}'," from the response (always at the beginning)
//            if (result.indexOf(")]}',\n") == 0) {
//                result = result.substring(6);
//            }
//            // Remove the double quotes at the beginning and at the end
//            result = result.substring(1);
//            result = result.substring(0, result.length - 1);
//            // Set editor value
//            editor.setData(result);
//            //console.log(result);
//        },
//        error: function (xhr, status, error) {
//            console.log(xhr.responseText);
//        }
//    });

//};


function saveContentPropertyValue(contentId, propertyAlias, propertyValue) {

    $.ajax({
        url: "/umbraco/backoffice/uCKEditor/uCKEditorApi/saveContentPropertyValue",
        data: JSON.stringify(JSON.stringify({
            contentId: contentId,
            propertyAlias: propertyAlias,
            propertyValue: propertyValue
        })),
        type: "POST",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result, status, xhr) {
            //console.log(status);
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

};



