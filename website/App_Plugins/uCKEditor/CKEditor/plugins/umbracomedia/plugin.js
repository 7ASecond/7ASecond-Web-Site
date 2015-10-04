CKEDITOR.plugins.add('umbracomedia', {
    icons: 'umbracomedia',
    hidpi: true,
    init: function (editor) {
        editor.addCommand('umbracomedia', {
            allowedContent: 'img[*]',
            requiredContent: 'img',
            modes: { wysiwyg: 1 },
            canUndo: true,
            exec: function (editor) {
            }
        });
        editor.ui.addButton('umbracomedia', {
            //label: editor.lang.umbracomedia.tooltip,
            label: "Media picker",
            command: 'umbracomedia',
            toolbar: 'umbraco,1'
        });
    }
});