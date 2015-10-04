CKEDITOR.plugins.add('umbracomediatagger', {
    icons: 'umbracomediatagger',
    hidpi: true,
    init: function (editor) {
        editor.addCommand('umbracomediatagger', {
            allowedContent: 'img[*]',
            requiredContent: 'img',
            modes: { wysiwyg: 1 },
            canUndo: true,
            exec: function (editor) {
            }
        });
        editor.ui.addButton('umbracomediatagger', {
            //label: editor.lang.umbracomediatagger.tooltip,
            label: "Media picker",
            command: 'umbracomediatagger',
            toolbar: 'umbraco,2'
        });
    }
});