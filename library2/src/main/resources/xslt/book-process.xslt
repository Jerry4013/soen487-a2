<?xml version="1.0" ?>
<xsl:stylesheet
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:xs="http://www.w3.org/2001/XMLSchema"
        xmlns:math="http://www.w3.org/2005/xpath-functions/math"
        xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
        xmlns:emp="http://www.semanticalllc.com/ns/employees#"
        xmlns:h="http://www.w3.org/1999/xhtml"
        xmlns:fn="http://www.w3.org/2005/xpath-functions"
        xmlns:j="http://www.w3.org/2005/xpath-functions"
        exclude-result-prefixes="xs math xd emp fn j"
        version="3.0"
        expand-text="yes"
>
    <xsl:output method="html" indent="yes" media-type="text/html" encoding="UTF-8" />
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="/bookList/@id" />
                </title>
            </head>
            <body>
                <h1>
                    <xsl:value-of select="/bookList/@id" />
                </h1>
                <xsl:apply-templates select="/bookList/*" />
            </body>
        </html>
    </xsl:template>
    <xsl:template match="books">
        <h2>List of books</h2>
        <ul>
            <xsl:for-each select="book">
                <li><xsl:value-of select="@title"/></li>
            </xsl:for-each>
        </ul>
    </xsl:template>
</xsl:stylesheet>