CKEDITOR.plugins.add('umbracoembed', {
    icons: 'umbracoembed',
    hidpi: true,
    init: function (editor) {
        editor.addCommand('umbracoembed', {
            allowedContent: 'iframe[*]',
            requiredContent: 'iframe',
            modes: { wysiwyg: 1 },
            canUndo: true,
            exec: function (editor) {
            }
        });
        editor.ui.addButton('umbracoembed', {
            //label: editor.lang.umbracoembed.tooltip,
            label: "Embed",
            command: 'umbracoembed',
            toolbar: 'umbraco,3'
        });
    }
});