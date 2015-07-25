/*
// --- AutoPlay -------------------------------------
function reactAppAutoPlayStart(app)
{
  $('navAutoPlay').className = 'AutoPlayOn';
}
function reactAppAutoPlayStop(app)
{
  $('navAutoPlay').className = 'AutoPlayOff';
}
function toggleAutoPlay()
{
  WebShow.app.onAutoPlayStart = reactAppAutoPlayStart;
  WebShow.app.onAutoPlayStop = reactAppAutoPlayStop;
  WebShow.app.toggleAutoPlay();
}

// --- SlideIndex Display -------------------------------------
function updateSlideIndex()
{
  var index = WebShow.app.getCurrSlideIndex() + 1;
  var count = WebShow.app.getSlideCount();
  var text = '[' + index + '/' + count + ']';
  $('wsSlideIndex').innerHTML = text;
}
*/

var wsApp;

function prepareAutoZoom(wsApp)
{
  wsApp.setAutoZoomerUsePredefinedRatio(true);
  wsApp.setAutoZoomWidthRatio(1);
  wsApp.setAutoZoomHeightRatio(1);
  wsApp.setFixedSpaceWidth(110);
  wsApp.setFixedSpaceHeight(68);
}

// --- SlideDir -------------------------------------
function reactSideTabClick(e)
{
  toggleSidePanel();
  //if (Event && Event.stop)
  try { Event.stop(e); } catch(e){};
  return false;
}

var slidePanelVisible = false;

function showSidePanel()
{
  try
  {
    new Effect.Morph('sidePanelClient', {duration: 0.3, style: {width: '250px'}});
  }
  catch(e)
  {
    document.getElementById('sidePanelClient').style.width = '250px';
  }
  slidePanelVisible = true;
  //wsApp.setFixedSpaceWidth(260);
}

function hideSidePanel()
{
  try
  {
    new Effect.Morph('sidePanelClient', {duration: 0.3, style: {width: '0px'}});
  }
  catch(e)
  {
    document.getElementById('sidePanelClient').style.width = '0px';
  }
  slidePanelVisible = false;
  //wsApp.setFixedSpaceWidth(110);
}

function toggleSidePanel()
{
  if (slidePanelVisible)
    hideSidePanel();
  else
    showSidePanel();
}

function reactSideMouseOver(e)
{
  if (!slidePanelVisible)
    showSidePanel();
}

function reactSideMouseOut(e)
{
  if (slidePanelVisible)
    hideSidePanel();
}

function adjustSidePanelSize()
{
  Prototype.Browser.IE6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 6;
  if (Prototype.Browser.IE6)
  {
  	var height = Element.getStyle($('wsStage'), 'height');
  	$('sidePanelClient').style.height = height;
  	//$('sidePanelScroller').style.height = height;
  	$('slideListScrollButtonPanel').hide();
  }
}

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
  //$('logPanel').style.display = 'inherit';
  //new Effect.Morph('logPanel', {duration: 0.3, style: {height: '200px'}});
  logPanelVisible = true;  
}
function hideLogPanel()
{
  //new Effect.Morph('logPanel', {duration: 0.3, style: {height: '0px'}});
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
  //$('logPanel').style.display = 'none';
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

// --- Slidelist scroll -------------------------------------
var defaultStep = 6;
var scrollStepMaxCount = 0;
var scrollStepCount = 0;
var step = defaultStep;
var scrollTimer;
function scrollElementDown(elemId)
{
  scrollStepCount++;
  if (scrollStepMaxCount && (scrollStepCount < scrollStepMaxCount))
  {
    document.getElementById(elemId).scrollTop+=step;
    scrollTimer = setTimeout('scrollElementDown("'+ elemId + '")', 10);
  }
}

function scrollElementUp(elemId)
{
  scrollStepCount++;
  if (scrollStepMaxCount && (scrollStepCount < scrollStepMaxCount))
  {
    document.getElementById(elemId).scrollTop-=step;
    scrollTimer = setTimeout('scrollElementUp("' + elemId + '")', 10);
  }
}
function scrollElementToTop(elemId)
{
  document.getElementById(elemId).scrollTop = 0;
}
function scrollElementToBottom(elemId)
{
  document.getElementById(elemId).scrollTop = document.getElementById(elemId).scrollHeight;
}

function scrollSlideListToTop(e)
{
  scrollElementToTop('sidePanelScroller');
}
function scrollSlideListToBottom(e)
{
  scrollElementToBottom('sidePanelScroller');
}
function scrollPageUp(e)
{
  stopScrollSlideList();
  scrollStepMaxCount = 20;
  scrollElementUp('sidePanelScroller');
  /*
  var elem = document.getElementById('sidePanelScroller');
  elem.scrollTop -= 75;
  */
  try { Event.stop(e); } catch(e){};
  return false;
}
function scrollPageDown(e)
{
  stopScrollSlideList();
  scrollStepMaxCount = 20;
  scrollElementDown('sidePanelScroller');
  /*
  var elem = document.getElementById('sidePanelScroller');
  elem.scrollTop += 75;
  */
  try { Event.stop(e); } catch(e){};
  return false;
}
function startScrollUpSlideList(e)
{
  //alert(document.getElementById('sidePanelScroller'));
  stopScrollSlideList();
  scrollElementUp('sidePanelScroller');
  try { Event.stop(e); } catch(e){};
  return false;
}
function startScrollDownSlideList(e)
{
  stopScrollSlideList();
  scrollElementDown('sidePanelScroller');
  try { Event.stop(e); } catch(e){};
  return false;
}
function stopScrollSlideList(e)
{
  if (scrollTimer)
    clearTimeout(scrollTimer);
  scrollStepCount = 0;
  try { Event.stop(e); } catch(e){};
  return false;
}

// iscroll on ipad or iphone
var iscrollerSlideList = null;
var iscrollerLog = null;
function initIScroll()
{
  setTimeout(function()
    { 
      if (window.iScroll)
      {
        iscrollerSlideList = new iScroll(document.getElementById('wsSlideDir'));
        iscrollerSlideLog = new iScroll(document.getElementById('wsLog'));
      }
    },
    100);
}
function refreshIScroll()
{
  if (iscrollerSlideList)
  {
    iscrollerSlideList.refresh();
  }
  if (iscrollerLog)
  {
    iscrollerLog.refresh();
  }
}

function preventHref(e)
{
  try { Event.stop(e); } catch(e){};
  return false;
}

// --- Initial Events -------------------------------------

function reactWsAppLoaded(e)
{  
  if (WebShow.app)
  {
    wsApp = WebShow.app;
    wsApp.onAppReady = reactOnWsAppReady;
    adjustSidePanelSize();
    initIScroll();
    prepareAutoZoom(WebShow.app);
    //WebShow.app.onSlideSwitched = reactWsAppSlideSwitched;
  }
}

function reactOnWsAppReady(app)
{
  refreshIScroll();
}

/*
function reactWsAppSlideSwitched(app, newSlide, oldSlide)
{
  updateSlideIndex();
}
*/

function init()
{
	try  // avoid IE raise exception while designing
	{
		//if (Event && Event.observe)
		{
	    Event.observe('tabSlideDir', 'click', reactSideTabClick);
      Event.observe('logCloser', 'click', reactLogCloserClick);
      Event.observe('navLog', 'click', reactToggleLogBtnClick);
      
      Event.observe('btnSlideListScrollToTop', 'click', scrollSlideListToTop);
      Event.observe('btnSlideListScrollToBottom', 'click', scrollSlideListToBottom);
      Event.observe('btnSlideListScrollUp', 'click', scrollPageUp);
      Event.observe('btnSlideListScrollDown', 'click', scrollPageDown);
      /*
      Event.observe('btnSlideListScrollUp', 'click', preventHref);
      Event.observe('btnSlideListScrollUp', 'mouseover', startScrollUpSlideList);
      Event.observe('btnSlideListScrollUp', 'mouseout', stopScrollSlideList);
      Event.observe('btnSlideListScrollDown', 'click', preventHref);
      Event.observe('btnSlideListScrollDown', 'mouseover', startScrollDownSlideList);
      Event.observe('btnSlideListScrollDown', 'mouseout', stopScrollSlideList);
      */
	    /*
	    Event.observe('sidePanelClient', 'mouseover', reactSideMouseOver);
	    Event.observe('sidePanelTabs', 'mouseover', reactSideMouseOver);
	    Event.observe('sidePanel', 'mouseout', reactSideMouseOut);
	    //Event.observe('sidePanelTabs', 'mouseout', reactSideMouseOut);
	    */
	    Event.observe(document.documentElement, WebShow.AppLauncher.APP_LAUNCH_EVENT, reactWsAppLoaded);
      
      //installSlideNavEventHandlers();
		}
  }
  catch(e)
  {
    document.getElementById('tabSlideDir').onclick = reactSideTabClick;
    document.getElementById('logCloser').onclick = reactLogCloserClick;
    document.getElementById('navLog').onclick = reactToggleLogBtnClick;
    
    document.getElementById('btnSlideListScrollToTop').onclick = scrollSlideListToTop;
    document.getElementById('btnSlideListScrollToBottom').onclick = scrollSlideListToBottom;
    document.getElementById('btnSlideListScrollUp').onclick = scrollPageUp;
    document.getElementById('btnSlideListScrollDown').onclick = scrollPageDown;
    /*
    document.getElementById('btnSlideListScrollUp').onclick = preventHref;
    document.getElementById('btnSlideListScrollUp').onmouseover = startScrollUpSlideList;
    document.getElementById('btnSlideListScrollUp').onmouseout = stopScrollSlideList;
    document.getElementById('btnSlideListScrollDown').onclick = preventHref;
    document.getElementById('btnSlideListScrollDown').onmouseover = startScrollDownSlideList;
    document.getElementById('btnSlideListScrollDown').onmouseout = stopScrollSlideList;
    */
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