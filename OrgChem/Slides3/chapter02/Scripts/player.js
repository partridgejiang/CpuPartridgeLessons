var wsApp;

// Log Panel
var logPanelVisible = false;
function showLogPanel()
{
  //if (Element && Element.show)
  try
  {
    Element.show('logPanel');
    Element.addClassName('navLog', 'Checked');
  }
  //else
  catch(e)
  {
    var elem = document.getElementById('logPanel');
    elem.style.display = '';
    elem.className = 'Checked';
  }
  logPanelVisible = true;  
}
function hideLogPanel()
{
  //if (Element && Element.hide)
  try
  {
    Element.hide('logPanel');
    Element.removeClassName('navLog', 'Checked');
  }
  //else
  catch(e)
  {
    var elem = document.getElementById('logPanel');
    elem.style.display = 'none';
    elem.className = '';
  }
  logPanelVisible = false;
}
function toggleLogPanel()
{
  if (logPanelVisible)
    hideLogPanel();
  else
    showLogPanel();
}

function loggerOnError(message)
{
  showLogPanel();
}

function reactLogCloserClick(e)
{
  hideLogPanel();
  try { Event.stop(e); } catch(e){};
  return false;
}

function reactToggleLogBtnClick(e)
{
  toggleLogPanel();
  try { Event.stop(e); } catch(e){};
  return false;
}

// presentation stage
function getPresentationStage()
{
  return document.getElementById('wsStage');
}

function getControllPanel()
{
  return document.getElementById('controlPanel');
}

function getControlContent()
{
  return document.getElementById('controlContent');
}

function getSlideListButton()
{
  return document.getElementById('navSlideList');
}

function getSlideListGroup()
{
  return document.getElementById('slideListGroup');
}

function getSlideListElem()
{
  return document.getElementById('wsSlideDir');
}

// Slide List
function getComputeStyle(element, styleName)
{
  if (element.currentStyle)
    return element.currentStyle[styleName];
  else if (element.ownerDocument.defaultView.getComputedStyle)
    return element.ownerDocument.defaultView.getComputedStyle(element, null)[styleName];
}

/*
function adjustSlideListSize()
{
  //console.log('resize');
  var stage = getPresentationStage();
  var height = parseFloat(getComputeStyle(stage, 'height')) / 2;
  if (stage.style.zoom)
    height = height * stage.style.zoom;
  getSlideListElem().style.maxHeight = height + 'px';
  console.log(getSlideListElem().style.maxHeight);
}
*/

function reactWindowResize(e)
{
  //adjustSlideListSize();
}

//
function setControllerVisible(visible)
{
  if (visible)
    getControlContent().style.visibility = 'visible';
  else
    getControlContent().style.visibility = 'hidden';
}

function hideController()
{
  setControllerVisible(false);
}

function showController()
{
  setControllerVisible(true);
}

function setSlideListVisible(visible)
{
  if (visible)
    getSlideListElem().style.display = 'block';
  else
    getSlideListElem().style.display = 'none';
}

function hideSlideList(e)
{
  try
  {
    var evt = e || window.event;
    var prevElem = e.relatedTarget || e.toElement;
    if (WebShow.ElementUtils.isChildOrSelf(getSlideListGroup(), prevElem))
      return;
  }
  catch(e) {};
  
  setSlideListVisible(false);
}

function showSlideList(e)
{
  try
  {
    var evt = e || window.event;
    var prevElem = e.relatedTarget || e.fromElement;
    if (WebShow.ElementUtils.isChildOrSelf(getSlideListGroup(), prevElem))
      return;
  }
  catch(e) {};
  
  setSlideListVisible(true);
}

// IE6 png fix
function fixIe6Png()
{
  try
  {
    WebShow.IePngFixer.fix(getControllPanel(), {'transparentImgSrc': 'StyleSheets/Images/transparent.gif'});
  }
  catch(e) {};
}

// --- Initial Events -------------------------------------

function prepareAutoZoom(wsApp)
{
  wsApp.setAutoZoomerUsePredefinedRatio(true);
  wsApp.setAutoZoomWidthRatio(1);
  wsApp.setAutoZoomHeightRatio(1);
  wsApp.setFixedSpaceWidth(0);
  wsApp.setFixedSpaceHeight(0);
}

function reactWsAppLoaded(e)
{
  if (WebShow.app)
  {
    wsApp = WebShow.app;
    prepareAutoZoom(wsApp);
  }
}

function init()
{
  fixIe6Png();
  try  // avoid IE raise exception while designing
  {
    //if (Event && Event.observe)
    {
      getControllPanel().onmouseover = showController;
      getControllPanel().onmouseout = hideController;
      /*
      
      */
      Event.observe(getSlideListGroup(), 'mouseover', showSlideList);
      Event.observe(getSlideListGroup(), 'mouseout', hideSlideList);
      Event.observe('logCloser', 'click', reactLogCloserClick);
      Event.observe(document.documentElement, WebShow.AppLauncher.APP_LAUNCH_EVENT, reactWsAppLoaded);    
      //Event.observe(window, 'resize', reactWindowResize);
      //installSlideNavEventHandlers();
    }
  }
  catch(e)
  {
    document.getElementById('logCloser').onclick = reactLogCloserClick;
    //window.onresize = reactWindowResize;
    if (getSlideListGroup())
    {
      getSlideListGroup().onmouseover = showSlideList;
      getSlideListGroup().onmouseout = hideSlideList;
    }
  }
  try
  {
    if (WebShow.Logger)
    {
      WebShow.Logger.element = document.getElementById('wsLog');
      WebShow.Logger.onError = loggerOnError;
    }
    if (WebShow.app)  // already loaded
      reactWsAppLoaded();
  }
  catch(e) {}
}

//if (Event && Event.observe)
try
{
  Event.observe(document, 'dom:loaded', init);
}
catch(e)
{  
  window.onload = init;
}