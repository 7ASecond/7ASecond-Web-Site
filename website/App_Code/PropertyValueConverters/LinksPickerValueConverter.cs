﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Umbraco.Core;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;
using Umbraco.Web.Templates;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Models;
using Umbraco.Web;

public class LinksPickerItem
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("target")]
    public string Target { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }

    [JsonProperty("isMedia")]
    public bool IsMedia { get; set; }

    public IPublishedContent Content { get; set; }
}

[PropertyValueType(typeof(IEnumerable<LinksPickerItem>))]
[PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Request)]
public class LinksPickerValueConverter : PropertyValueConverterBase
{
    public UmbracoHelper umbHelper;
    public LinksPickerValueConverter()
    {
        umbHelper = new UmbracoHelper(UmbracoContext.Current);
    }

    public override bool IsConverter(PublishedPropertyType propertyType)
    {
        return propertyType.PropertyEditorAlias == "REM.LinksPicker";
    }

    public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
    {
        if (source == null) return null;
        var sourceString = source.ToString();


        var links = JsonConvert.DeserializeObject<IEnumerable<LinksPickerItem>>(sourceString);

        foreach (var link in links)
        {
            try
            {
                link.Content = (
                    link.IsMedia
                    ? umbHelper.TypedMedia(link.Id)
                    : umbHelper.TypedContent(link.Id)
                );

                link.Url = link.Content.Url;
            }
            catch (Exception)
            {
            }
            
        }

        return links;
    }

    public override object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
    {
        // source should come from ConvertSource and be a string (or null) already
        return JsonConvert.SerializeObject(source);
    }

    public override object ConvertSourceToXPath(PublishedPropertyType propertyType, object source, bool preview)
    {
        // source should come from ConvertSource and be a string (or null) already
        throw new NotImplementedException();
    }
}
