//Hides all apges and shows only desired page
var goToPage = function(pageName,extension,shouldHash){
	//alert("inside goToPage::pageName:"+pageName+",extension:"+extension+",shouldHash:"+shouldHash);
	currOffset=0;
	$('div.contentHolder').hide();
	//if(pageName.substr(0,5)=='forum')
		//$('#forum_content').show();
	if(typeof extension=="undefined")	extension='';
	var nextTitle="Youth Democracy | "+pageName+":"+extension;
		nextTitle.replace(/ /g,"_");
	var nextHASH="#!"+pageName+"="+extension;
	//var nextURL="#!key="+pageName+"&value="+extension;
	var stateObj={key:pageName,value:extension};
	//history.pushState(stateObj,document.title, window.location.href);
	//if(shouldHash!=false)history.replaceState(stateObj,nextTitle, nextURL);
	//alert("last state:"+JSON.stringify(history.state));
	history.pushState(stateObj,nextTitle, nextHASH);
	document.title=nextTitle;
	$('#'+pageName+'_content').fadeToggle('slow');
}

// go to the required ajax state based on the url
var goToAjaxState= function(){
	//alert("Inside goToAjaxState, curent hash:" +window.location.hash);
	var hash = window.location.hash;
	if(hash=='')goToPage('homepage');
	else{
		var index=hash.indexOf('=');
		var pageName=hash.substring(2,index);
		var extension=hash.substring(index+1);
		//alert("pageName:"+pageName+",extension:"+extension);
		//if(extension!=''){
			if (pageName=='leader') {
					leader_load(false,extension.replace("_"," "),-5);
				}
			else if(pageName=='party'){
					party_load(false,extension.replace("_"," "),-5);
				}
		//}
		goToPage(pageName,extension);
	}
}

//Fired every time the back/forward button is pressed
window.onpopstate=function(event){
	//alert("onpopstate:"+JSON.stringify(event.state));
	if(typeof event=="undefined")
		goToPage('homepage');
	else
		goToPage(event.state.key,event.state.value);
}

//for validating pagename before using them
var validatePage= function(pageName){
	if (pageName.toLowerCase()=='homepage')return 'homepage';
	else if (pageName.toLowerCase()=='forum_topic')return 'forum_topic';
	else if (pageName.toLowerCase()=='forum_category')return 'forum_category';
	else if (pageName.toLowerCase()=='leader')return 'leader';
	else if (pageName.toLowerCase()=='party')return 'party';
	//more required
	else return 'Error';
}
