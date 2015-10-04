<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Setup.ascx.cs" Inherits="uCKEditor.Installer.Setup" %>
<%@ Register TagPrefix="umb" Assembly="controls" Namespace="umbraco.uicontrols" %>

<div style="padding: 10px 10px 0;">
    <div style="float: left; position: relative;">
        <img src="/App_Plugins/uCKEditor/Installer/Logo.png" alt="uCKEditor" />
    </div>
    <div style="float: left; position: relative; margin: 10px 30px;">
        <h3>uCKEditor successfully installed!</h3>
    </div>
    <div style="clear: both;"></div>
    <asp:Panel runat="server" ID="pnlFinishing">
        <br />
        <p>
            <b>The installer has installed all required files.</b>
            <br />
            <br />
            By checking the option below, the installer will create a new uCKEditor data type (If a uCKEditor data type already exists then no new data type will be created).
        </p>
        <asp:CheckBox ID="chkCreateNewDataType" runat="server" Checked="true" />Create a new uCKEditor data type
        <br />
        <br />
        <br />
        <p>
            <b>Press the 'Finish' button to complete the installation.</b>
        </p>
        <br />
        <asp:Button ID="btnFinish" runat="server" Text="Finish" OnClick="btnFinish_Click" Style="font-size: 15px;" />
    </asp:Panel>
    <asp:Panel runat="server" ID="pnlFinished" Visible="false">
        <div style="padding: 30px; color: #999;">
            <h4>uCKEditor is ready to use.</h4>
        </div>
    </asp:Panel>
</div>
