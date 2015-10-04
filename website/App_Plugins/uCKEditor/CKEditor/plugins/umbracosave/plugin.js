CKEDITOR.plugins.add('umbracosave', {
    icons: 'umbracosave',
    hidpi: true,
    init: function (editor) {
        editor.addCommand('umbracosave', {
            exec: function (editor) {
            }
        });
        editor.ui.addButton('umbracosave', {
            //label: editor.lang.umbracosave.tooltip,
            label: "Save content in Umbraco",
            command: 'umbracosave',
            toolbar: 'umbraco,0'
        });
    }
});