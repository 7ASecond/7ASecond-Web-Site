using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;


namespace website.App_Start
{
    public class BundleConfig
    {
       public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include("~/scripts/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/scripts/jquery-unobtrusive.js",
                "~/scripts/jquery-validate"));
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/scripts/modernizr-*.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/scripts/bootstrap.js",
                "~/scripts/respond.js"));
            bundles.Add(new StyleBundle("~/content/css").Include(
                "~/content/bootstrap.css",
                "~/content/style.css"));
            bundles.Add(new ScriptBundle("~/bundles/angular.script").Include(
                "~/scripts/angular.js",
                "~/scripts/angular-route.js",
                "~/scripts/angular-ui/ui.bootstrap.tpls.js"));
        }
    }
}