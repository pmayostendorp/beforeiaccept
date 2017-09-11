/**

 * @Author Robert Powell

 Multi-Frame Tweaks added by Travis Grasser(TSG), 10/30/2008

*/
var xmlScrollView = function()
{
  this.outputElement = '';
  this.output        = '';
  this.wrappers      = new Array();
  this.tags          = new Array();
  this.tagValues     = new Array();
  this.conditionals  = new Array();
  this.items         = new Array();
  this.itemRoot      = '';
  this.queryString   = new Array();
  this.topPadding    = true;
  this.bottomPadding = true;
  this.limit         = false;
  this.scroll        = true;
  this.scrollDelay   = 25;
  this.scrollBalancer = false;
  this.scrollIntermittent = false;

  this.outputFromJSXMLProxy = function(stringVar, url)
  {
    var theHead    = document.getElementsByTagName('head').item(0);
    var theScript  = document.createElement("script");
    theScript.type = "text/javascript";
    theScript.src  = url;
    theHead.appendChild(theScript);
    var xmlScrollViewInstance = this;
    var myFunction = function() { xmlScrollViewInstance.outputFromString(eval(stringVar)); }
    window.onload = myFunction;
  };

  this.outputFromString = function(xmlString)
  {
    if (window.ActiveXObject)
    {
      this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      this.xmlDoc.async=false;
      this.xmlDoc.loadXML(xmlString);
    }
    else
    {
      var parser=new DOMParser();
      this.xmlDoc=parser.parseFromString(xmlString,"text/xml");
    }
    this.doOutput();
  };

  this.outputFromPath = function(xmlPath)
  {
      for(i=0;i<this.queryString.length;i++)
      {
        if(xmlPath.search(/\?/) == -1)
        {
          xmlPath += '?';
        }
      value = this.getUrlValue(this.queryString[i]);
      if(value != "") xmlPath += '&' + this.queryString[i+1] +'=' + value;
      i++;
    }

    if (document.implementation && document.implementation.createDocument)
    {
        this.xmlDoc = document.implementation.createDocument("", "", null);
    }
    else if(window.ActiveXObject) // IE
    {
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    }
    else
    {
        return false;
    }
    this.xmlDoc.async = false;
    this.xmlDoc.load(xmlPath);
    this.doOutput();
  };

  this.doOutput = function()
  {
    this.build(this.xmlDoc.documentElement);
    this.parse();
    this.write();

    if(this.scroll)
    {
      this.initScroll();
    }
  };

  this.build = function(tree)
  {
    if(tree.tagName == this.itemRoot)
    {
      if(this.limit && this.items.length === this.limit)
      {
        return;
      }
      this.items[this.items.length] = tree.tagName;
    }
    else if(this.array_key_exists(tree.tagName, this.tags))
    {
      if(tree.childNodes[0] && tree.childNodes[0].nodeValue)
      {
        this.tagValues[tree.tagName][this.tagValues[tree.tagName].length] = tree.childNodes[0].nodeValue;
      }
      else
      {
        this.tagValues[tree.tagName][this.tagValues[tree.tagName].length] = '';
      }
    }

    for(var i=0;i<tree.childNodes.length; i++)
    {
      this.build(tree.childNodes[i])
    }
  }

  this.parse = function()
  {
    for(i=0;i<this.items.length;i++)
    {
      if(this.wrappers.length)
      {
        for(position in this.wrappers)
        {
          // We need to close the previous one
          if(i != 0 && i % position == 0 && (this.wrappers[position][3] == (i - position)))
          {
            this.output += this.wrappers[position][1];
          }

          // We need to open a new one
          if(i % position == 0 || position === 0)
          {
            this.output += this.wrappers[position][0];
            this.wrappers[position][3] = i;
          }
        }
      }

      for(keyVar in this.items)
      {
        var template = this.template;

        for(varKey in this.tags)
        {
          // prototype.js stupidly extends Array.prototype which causes key's to come up in a for loop.
          if(!this.tags.hasOwnProperty(varKey))
          {
            continue;
          }
          var replacement = this.tagValues[varKey][i];
          if(this.array_key_exists(varKey, this.conditionals) && this.trim(this.tagValues[varKey][i]) != '')
          {
            replacement = this.conditionals[varKey][0] + replacement + this.conditionals[varKey][1];
          }
          var search = new RegExp(this.tags[varKey], 'g');
          template = template.replace(search, replacement);
        }
      }
      if(i === 0 && this.scrollIntermittent)
      {
        this.scrollBalancer = template;
      }
      this.output += template;
    }

    // Wrappers are never closed at the end
    if(this.wrappers.length)
    {
      for(position in this.wrappers)
      {
        this.output += this.wrappers[position][1];
      }
    }
  };

  this.write = function()
  {
    if(this.topPadding)
    {
      this.output = '<div style="height:' + this.outputElement.style.height + ';"></div>'  + this.output;
    }

    if(this.bottomPadding)
    {
       this.output += '<div style="height:' + this.outputElement.style.height + ';"></div>';
    }

    if(this.scrollIntermittent)
    {
      // Adds the first item to the bottom so we can get a clean intermittent scroll
      this.output += this.scrollBalancer;
    }
    this.outputElement.innerHTML = this.output;
  }

  this.setOutPutElement = function(element)
  {
    this.outputElement = document.getElementById(element);
    this.outputElementId = element;
  };

  this.setTemplate = function(template)
  {
    this.template = template;
  };

  this.setItemRoot = function(root)
  {
    this.itemRoot = root;
  };

  this.declareVariable = function(tag, variable)
  {
    this.tags[tag] = variable;
    this.tagValues[tag] = new Array();
  };

  this.declareConditionalVariable = function(tag, variable, pre, post)
  {
    this.tags[tag] = variable;
    this.tagValues[tag] = new Array();
    this.conditionals[tag] = new Array(pre, post);
  };

  this.addWrapper = function(position, pre, post)
  {
    this.wrappers[position] = new Array(pre,post,0);
  };

  this.setLimit = function(limit)
  {
    this.limit = limit;
  };



  this.initScroll = function()
  {
    this.scroller = new scroller();
    this.scroller.setElementId(this.outputElementId);
    this.scroller.setScrollDelay(this.scrollDelay);
    this.scroller.setPauseDelay(this.scrollIntermittent);

    if(this.scrollIntermittent)
    {
      this.scroller.startIntermittent(this.scrollIntermittent);
    }
    else
    {
      this.scroller.startScroll();
    }
  };

  this.setScrollIntermittent = function(frequency)
  {
    this.scrollIntermittent = frequency * 1000;
    this.disablePadding();
  };

  this.setScrollDelay = function(delay)
  {
    this.scrollDelay = delay;
  };
  
  this.disableScroll = function()
  {
    this.scroll = false;
    this.disablePadding();
  };

  this.disablePadding = function()
  {
    this.topPadding    = false;
    this.bottomPadding = false;
  };

  this.disableTopPadding = function()
  {
    this.topPadding = false;
  };

  this.disableBottomPadding = function()
  {
    this.bottomPadding = false;
  };

  this.addQueryStringMap = function(key, map)
  {
    // Done like this for a bug in prototype js framework
    this.queryString[this.queryString.length] = key;
    this.queryString[this.queryString.length] = map;
  };

  this.array_key_exists = function(needle, haystack)
  {
    for (keyVar in haystack)
    {
      if (keyVar === needle) return true;
    }
    return false;
  };

  this.trim = function(string)
  {
    if (string) {
        return string.replace(/^\s+|\s+$/g,"");
    }
    return '';
  };

  this.getUrlValue = function(key)
  {
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+key+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
    {
      return "";
    }
    else
    {
      return results[1];
    }
  };
};

var scroller = function()
{
  this.element        = '';
  this.elementHeight  = '';
  this.scrollDelay    = 25;
  this.pauseDelay     = 5000;
  this.setupDelayOne  = false;
  this.setupDelayOTwo = false;
  this.scrollInterval = false; // Internal timer
  this.pauseInterval  = null; // Internlal timer
  this.init = function(elementId, scrollDelay, pauseDelay)
  {
    this.setElementId(elementId);
    this.setScrollDelay(scrollDelay);
    this.setPauseDelay(pauseDelay * 1000);

  };

  this.setElementId = function(elementId)
  {
    this.element = document.getElementById(elementId);
    this.elementHeight = parseInt(this.element.style.height); // optimization
  };

  this.setScrollDelay = function(scrollDelay)
  {
    this.scrollDelay = scrollDelay;
  };

  this.setPauseDelay = function(pauseDelay)
  {
    var scrollTime = this.elementHeight * this.scrollDelay;
    this.pauseDelay = pauseDelay + scrollTime;
  };

  this.startIntermittent = function(setup)
  {
    element = this.element;
    elementHight = this.elementHeight;
    scrollDelay = this.scrollDelay;
    //This var was moved up, out of the if section to allow for access on both parts of the condition --TSG
    instance = this;
    if(setup)
    {
      this.element.scrollTop = 0; // when refrshing the page or loading go to the top
      //Line changed to use moveTheFrame in new way --TSG
      this.setupDelayOne = setTimeout(function() {moveTheFrame(instance);}, setup);
      this.setupDelayTwo = setTimeout("instance.startIntermittent()", setup);
    }
    else
    {
      //Line changed to use moveTheFrame in new way --TSG
      this.pauseInterval = self.setInterval(function() {moveTheFrame(instance);}, this.pauseDelay);
    }
  };

  this.stopIntermittent = function()
  {
    if(this.setupDelayOne || this.setupDelayTwo)
    {
      clearTimeout(this.setupDelayOne);
      clearTimeout(this.setupDelayTwo);
    }
    clearInterval(this.pauseInterval);
  };

  //This method was rewritten --TSG
  this.startScroll = function()
  { 
        var obj = this;
        this.scrollInterval = setTimeout(function() {scrollTheFrame(obj);}, this.scrollDelay);;
  };

  //This method was rewritten --TSG
  this.stopScroll = function()
  {
    clearTimeout(this.scrollInterval);
  };

};

//This Function was rewritten --TSG
function moveTheFrame(obj)
{
  var i = 0;
  var scrollDelay = obj.scrollDelay;
  if(obj.element.scrollTop % obj.elementHeight)
  {
    obj.element.scrollTop = 0;
  }
  do
  {
    setTimeout( function() {scrollTheFrame(obj);}, scrollDelay);
    scrollDelay = scrollDelay*2;
    ++i;
  }
  while(i < obj.elementHeight);
}

//This function was rewritten --TSG
function scrollTheFrame(obj)
{
        clearTimeout(obj.scrollInterval);
        obj.element.scrollTop = obj.element.scrollTop >= obj.element.scrollHeight - obj.elementHeight ? 1 : obj.element.scrollTop + 1;
        obj.scrollInterval = setTimeout(function() {scrollTheFrame(obj);}, obj.scrollDelay);
}

