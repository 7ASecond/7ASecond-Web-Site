<%@ Control Language="C#" EnableViewState="false" AutoEventWireup="true" CodeBehind="TwitterList.ascx.cs" Inherits="NWS.TwitterGoodies.UserControls.TwitterList" %>
<script type="text/javascript">
    new TWTR.Widget({
        version: 2,
        type: 'list',
        rpp: <%= NumberOfTweets %>,
        interval: <%= TweetInterval * 1000 %>,
        title: '<%= JReplace(Title) %>',
        subject: '<%= JReplace(Subject) %>',
        width: <%= GetWidth() %>,
        height: <%= WidgetHeight %>,
        theme: {
            shell: {
                background: '<%= ThemeShellBackground %>',
                color: '<%= ThemeShellColor %>'
            },
            tweets: {
                background: '<%= ThemeTweetsBackground %>',
                color: '<%= ThemeTweetsColor %>',
                links: '<%= ThemeTweetsLinks %>'
            }
        },
        features: {
            scrollbar: <%= IncludeScrollbar.ToString().ToLower() %>,
            loop: <%= LoopResults.ToString().ToLower() %>,
            live: <%= PollForNew.ToString().ToLower() %>,
            hashtags: <%= ShowHashtTags.ToString().ToLower() %>,
            timestamp: <%= ShowTimestamps.ToString().ToLower() %>,
            avatars: <%= ShowAvatars.ToString().ToLower() %>,
            behavior: '<%= GetBehavior() %>'
        }
    }).render().setList('<%= Account %>', '<%= ListName %>').start();
</script>