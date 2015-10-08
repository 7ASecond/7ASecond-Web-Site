<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet [
  <!ENTITY nbsp "&#x00A0;">
]>
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxml="urn:schemas-microsoft-com:xslt"
	xmlns:umbraco.library="urn:umbraco.library"
	exclude-result-prefixes="msxml umbraco.library">


  <xsl:output method="html" omit-xml-declaration="yes"/>

  <xsl:param name="currentPage"/>

  <xsl:template match="/">

    <ul class="archive">
      <xsl:for-each select="$currentPage/ancestor-or-self::node [@nodeTypeAlias = 'Blog']/node [@nodeTypeAlias = 'DateFolder']">
        <xsl:sort select="@nodeName" data-type="number" order="descending" />
        <xsl:for-each select="./node [@nodeTypeAlias = 'DateFolder']">
          <xsl:sort select="@nodeName" data-type="number" order="descending" />
          <li class="month">
            <xsl:variable name="monthname" select="umbraco.library:FormatDateTime(concat(./../@nodeName,'-',@nodeName,'-11T10:24:46'),'MMMM yyyy')" />
            <a href="{umbraco.library:NiceUrl(@id)}">
              <xsl:value-of select="$monthname"/>
            </a>&nbsp;<span>
              (<xsl:value-of select="count(.//node [@nodeTypeAlias = 'BlogPost'])"/>)
            </span>
          </li>
        </xsl:for-each>
      </xsl:for-each>
    </ul>

  </xsl:template>

</xsl:stylesheet>