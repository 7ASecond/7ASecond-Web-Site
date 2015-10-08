<%@ Control Language="C#" EnableViewState="false" AutoEventWireup="true" CodeBehind="TwitterProfile.ascx.cs" Inherits="NWS.TwitterGoodies.UserControls.TwitterProfile" %>
<script type="text/javascript">
 new TWTR.Widget({
        version: 2,
        type: 'profile',
        rpp: <%= NumberOfTweets %>,
        interval: <%= TweetInterval * 1000 %>,      
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
    }).render().setUser('<%= Account %>').start();
</script>