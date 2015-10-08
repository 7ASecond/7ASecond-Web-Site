<%@ Control Language="C#" EnableViewState="false" AutoEventWireup="true" CodeBehind="TwitterSearch.ascx.cs" Inherits="NWS.TwitterGoodies.UserControls.TwitterSearch" %>
<script type="text/javascript">
    new TWTR.Widget({
        version: 2,
        type: 'search',
        rpp: <%= NumberOfTweets %>,
        interval: <%= TweetInterval * 1000%>,
        search: '<%= JReplace(GetCompoundParameters(Search)) %>',
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
            toptweets: <%= ShowTopTweets.ToString().ToLower() %>,
            behavior: '<%= GetBehavior() %>'
        }
    }).render().start();
</script>