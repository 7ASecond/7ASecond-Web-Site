﻿<%@ Control Language="C#" EnableViewState="false" AutoEventWireup="true" CodeBehind="MyTwitterButton.ascx.cs" Inherits="NWS.TwitterGoodies.UserControls.MyTwitterButton" %>
<a href="http://www.twitter.com/<%= Account%>" target="_blank" title="<%= AltText %>"><img src="http://twitter-badges.s3.amazonaws.com/<%= TwitterImageSrc %>" alt="<%= AltText %>" style="border:0;" /></a>