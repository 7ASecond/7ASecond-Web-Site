using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Umbraco.Core;

namespace website.App_Code
{
    public class UmbracoEventHandlers : ApplicationEventHandler
    {

        protected override void ApplicationInitialized(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            base.ApplicationInitialized(umbracoApplication, applicationContext);
        }
    }
}