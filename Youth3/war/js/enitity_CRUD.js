//--------------------------------Interface---------------------------------
var currOffset=0;

var search = function(entity,htmlID){
	//alert("Inside search::entity:"+entity+",canmodify:"+canModify+",htmlID:"+typeof htmlID);
	var formEleList = $('form#'+entity+'_search_form').serializeArray();
	 var filterParam=new Array();
	 for(var i=0;i<formEleList.length;i++){
		 filterParam.push(new paramContainer(formEleList[i].name,formEleList[i].value)); 
	 }
	 filterParam.push(new paramContainer("offset",currOffset)); 
	 //if(canModify==null)canModify=false;
	 populateGrid(entity,filterParam,htmlID);
	 currOffset+=10;
}

//Populates the data grid
var populateGrid = function(entity,filter,htmlID){
	//alert("Inside populateGrid, entity:"+entity+",filter length:"+filter.length);
	var successFn= function(resp){
		//alert("populateGrid successFn");
		var data='';
		if(resp){
			//alert("data length:"+resp.data.length+",data[0] length:"+resp.data[0].length);
			if(typeof resp.data[0].length=="undefined")
				data=resp.data;
			else
				data=resp.data[0];
			//alert("data length:"+data.length);
		}
		var htm='';
		if(data.length>0){
				htm+=fillGridCell(entity,data);
		}
		else{htm+='Please be patient, we are working tirelessly to get more data for you.';}
		//alert("htm:"+htm);
		//alert("data length:"+data.length);
		
		if(typeof htmlID=="undefined")
			$('#'+entity+'_grid_tbody').html(htm);
		else{
			$('#'+htmlID).html(htm);
			/*
			for (var i=0;i<data.length;i++){
				var Name=data[i].Name.replace(/ /g,"_");
				$('#TwitterFeed_'+Name).html('<iframe src="object/liveFeed/'+Name+'.html" height="409" width="700" frameBorder="0"></iframe>'); 
			}
			*/
		}
			
		
		$( "#Leader_tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
		$( "#Leader_tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		$( "#Party_tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
		$( "#Party_tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		/*
		for (var i=0;i<data.length;i++){
			var Name=data[i].Name.replace(/ /g,"_");
			$('#TwitterFeed_'+Name).jTweetsAnywhere({
				searchParams:'q=Rahul Gandhi',
			    count: 20,
			    showTweetFeed: {
			        showProfileImages: true,
			        showUserScreenNames: true,
			        paging: {
			            mode: 'endless-scroll'
			        }
			    },
			    onDataRequestHandler: function(stats) {
			        if (stats.dataRequestCount < 11) {
			            return true;
			        }
			        else {
			            alert("To avoid struggling with Twitter's rate limit, we stop loading data after 10 API calls.");
			        }
			    }
			});
			
		}*/
	}
	var errorFn = function(e) {
		//alert("populateGrid Error:"+e);
		//successFn(e);
		if(typeof htmlID=="undefined")
				$('#'+entity+'_grid_tbody').html("Error");
			else
				$('#'+htmlID).html("Error");
		}
	getData("/"+entity,filter,successFn,errorFn);
}

var fillGridCell = function(entity,data){
	//alert("inside fillGridCell::"+"entity:"+entity+",data:"+data);
	htm='';
	if(entity=='leader'){
			htm+='<div id="Leader_tabs">';
			htm+='<ul>';
			for (var i=0;i<data.length;i++){
				var Name=data[i].Name.replace(/ /g,"_");
				//htm+='<li><a href="leader='+Name+'">'+data[i].Name+'</a></li>';
				htm+='<li><a href="#Leader_tabs-'+i+'">'+data[i].Name+'</a></li>';
			}
			htm+='</ul>';	
			for (var i=0;i<data.length;i++){
				var Name=data[i].Name.replace(/ /g,"_");
				var linkURL="http://www.youthdemocracy.in/object/leader/"+Name+".html";
				//htm+='<div id="leader='+Name+'">';
				htm+='<div id="Leader_tabs-'+i+'">';
				htm+='<h2>'+data[i].Name+'</h2>';
				/*
				htm+='<table><tr>';
				htm+='<td>';
				htm+='<img src="'+data[i].Image_URL+'" alt="'+data[i].Name+'" />';
				htm+=leaderSliders(data[i]);
				htm+='</td>';
				htm+='<td class="Twitter_iFrame">';
				htm+='<iframe src="object/liveFeed/'+Name+'.html" height="409" width="250" frameBorder="0"></iframe>';				
				htm+='</td>';
				htm+='</tr></table>';
				*/
				htm+='<img src="'+data[i].Image_URL+'" alt="'+data[i].Name+'" />';
				htm+=leaderSliders(data[i]);
				htm+='<div id="TwitterFeed_'+Name+'" style="padding-bottom:10px;"><iframe src="object/liveFeed/'+Name+'.html" height="409" width="700" frameBorder="0"></iframe></div>';				
				
				htm+='<div><fb:comments href="'+linkURL+'" num_posts="2" width="700" colorscheme="light"></fb:comments></div>'
				//htm+='<div class="TwittedFeed" id="TwitterFeed_'+Name+'"></div>';
				htm+='</div>';
				
			}
			htm+='</div>';
	}
	if(entity=='party'){
		htm+='<div id="Party_tabs">';
		htm+='<ul>';
		for (var i=0;i<data.length;i++){
			var Name=data[i].Name.replace(/ /g,"_");
			//htm+='<li><a href="leader='+Name+'">'+data[i].Name+'</a></li>';
			htm+='<li><a href="#Party_tabs-'+i+'">'+data[i].Name+'</a></li>';
		}
		htm+='</ul>';	
		for (var i=0;i<data.length;i++){
			var Name=data[i].Name.replace(/ /g,"_");
			var linkURL="http://www.youthdemocracy.in/object/party/"+Name+".html";
			//htm+='<div id="leader='+Name+'">';
			htm+='<div id="Party_tabs-'+i+'">';
			htm+='<h2>'+data[i].Name+'</h2>';
			/*
			htm+='<table><tr>';
			htm+='<td>';
			htm+='<img src="'+data[i].Image_URL+'" alt="'+data[i].Name+'" />';
			htm+=partySliders(data[i]);
			htm+='</td>';
			htm+='<td class="Twitter_iFrame">';
			htm+='<iframe src="object/liveFeed/'+Name+'.html" height="409" width="250" frameBorder="0"></iframe>';				
			htm+='</td>';
			htm+='</tr></table>';
			*/
			htm+='<img src="'+data[i].Image_URL+'" alt="'+data[i].Name+'" />';
			htm+=partySliders(data[i]);
			htm+='<div id="TwitterFeed_'+Name+'" style="padding-bottom:10px;"><iframe src="object/liveFeed/'+Name+'.html" height="409" width="700" frameBorder="0"></iframe></div>';				
			
			
			htm+='<div><fb:comments href="'+linkURL+'" num_posts="2" width="700" colorscheme="light"></fb:comments></div>'
			htm+='</div>';
		}
		htm+='</div>';
	}
	return htm;
}

var leaderSliders= function(data){
	//alert("inside leaderSliders::data:"+data);
	var Name=data.Name.replace(/ /g,"_");
	var linkURL="http://www.youthdemocracy.in/object/leader/"+Name+".html";
	htm='';
	htm+=''
	+'						<table>'
	+'							<tr><td>Name:</td><td>'+data.Name+'</td>'
	+'							<td><div style="vertical-align: bottom;float:left;"><fb:like href="'+linkURL+'" send="false" layout="button_count" width="90" show_faces="false"></fb:like></div>'
	+'							<div style="vertical-align: bottom;float:left;"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+linkURL+'" data-text="Check out '+data.Name+' at "></a></td></tr></div>'
	+'							<tr><td>Party:</td><td>'+data.Party+'</td></tr>'
	+'							<tr><td>Education:</td><td>'+data.Education+'</td>'
	+'								<td><input name="Education" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Education","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Education">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Military:</td><td>'+data.Military+'</td>'
	+'								<td><input name="Military" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Military","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Military">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Economy:</td><td>'+data.Economy+'</td>'
	+'								<td><input name="Economy" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Economy","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Economy">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Industry:</td><td>'+data.Industry+'</td>'
	+'								<td><input name="Industry" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Industry","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Industry">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Religion:</td><td>'+data.Religion+'</td>'
	+'								<td><input name="Religion" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Religion","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Religion">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Health:</td><td>'+data.Health+'</td>'
	+'								<td><input name="Health" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Health","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Health">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Environment:</td><td>'+data.Environment+'</td>'
	+'								<td><input name="Environment" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Environment","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Environment">0</span></td>'
	+'							</tr>'
	+'							<tr><td></td><td align="center">'
	+'								<input type="button" id="'+Name+'_submitBtn" name="Submit" value="Submit Opinon" onclick=\'userDataForm("leader","'+data.Name+'","'+Name+'_form_status") \' style="height: 25px; width: 100px;" />'
	+'							</td><td id="'+Name+'_form_status">Unchanged</td></tr>'
	+'						</table>';
	return htm;
}

var partySliders= function(data){
	//alert("inside partySliders::data:"+data);
	var Name=data.Name.replace(/ /g,"_");
	var linkURL="http://www.youthdemocracy.in/object/party/"+Name+".html";
	htm='';
	htm+=''
	+'						<table>'
	+'							<tr><td>Name:</td><td>'+data.Name+'</td>'
	+'							<td><div style="vertical-align: bottom;float:left;"><fb:like href="'+linkURL+'" send="false" layout="button_count" width="90" show_faces="false"></fb:like></div>'
	+'							<div style="vertical-align: bottom;float:left;"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+linkURL+'" data-text="Check out '+data.Name+' at "></a></td></tr></div>'
	+'							<tr><td>Party:</td><td>'+data.Party+'</td></tr>'
	+'							<tr><td>Education:</td><td>'+data.Education+'</td>'
	+'								<td><input name="Education" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Education","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Education">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Military:</td><td>'+data.Military+'</td>'
	+'								<td><input name="Military" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Military","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Military">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Economy:</td><td>'+data.Economy+'</td>'
	+'								<td><input name="Economy" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Economy","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Economy">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Industry:</td><td>'+data.Industry+'</td>'
	+'								<td><input name="Industry" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Industry","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Industry">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Religion:</td><td>'+data.Religion+'</td>'
	+'								<td><input name="Religion" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Religion","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Religion">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Health:</td><td>'+data.Health+'</td>'
	+'								<td><input name="Health" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Health","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Health">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Environment:</td><td>'+data.Environment+'</td>'
	+'								<td><input name="Environment" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Environment","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Environment">0</span></td>'
	+'							</tr>'
	+'							<tr><td></td><td align="center">'
	+'								<input type="button" id="'+Name+'_submitBtn" name="Submit" value="Submit Opinon" onclick=\'userDataForm("leader","'+data.Name+'","'+Name+'_form_status") \' style="height: 25px; width: 100px;" />'
	+'							</td><td id="'+Name+'_form_status">Unchanged</td></tr>'
	+'						</table>';
	return htm;
}

/*
//leader grid form
var leaderFillGrid=function(entity,data){
	//alert("inside leaderFillGrid");
	var Name=data.Name.replace(/ /g,"_");
	//var linkURL="http://www.youthdemocracy.in/#!leader="+Name;
	var linkURL="http://www.youthdemocracy.in/object/leader/"+Name+".html";
	htm='';
	htm+=''
	+'			<form name="'+Name+'_user_form" id="'+Name+'_user_form" style="margin-top: 20px;">'
	+'				<table><tr>'
	+'					<td><table style="border: 1px solid black;background-color: rgb(243, 243, 243);"><tr>'
	+'						<td><img src="'+data.Image_URL+'" alt="'+data.Name+'" /></td>'
	+'						<td><table >'
	+'							<tr><td>Name:</td><td>'+data.Name+'</td>'
	+'							<td><div style="vertical-align: bottom;float:left;"><fb:like href="'+linkURL+'" send="false" layout="button_count" width="90" show_faces="false"></fb:like></div>'
	+'							<div style="vertical-align: bottom;float:left;"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+linkURL+'" data-text="Check out '+data.Name+' at "></a></td></tr></div>'
	+'							<tr><td>Party:</td><td>'+data.Party+'</td></tr>'
	+'							<tr><td>Education:</td><td>'+data.Education+'</td>'
	+'								<td><input name="Education" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Education","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Education">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Military:</td><td>'+data.Military+'</td>'
	+'								<td><input name="Military" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Military","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Military">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Economy:</td><td>'+data.Economy+'</td>'
	+'								<td><input name="Economy" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Economy","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Economy">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Industry:</td><td>'+data.Industry+'</td>'
	+'								<td><input name="Industry" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Industry","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Industry">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Religion:</td><td>'+data.Religion+'</td>'
	+'								<td><input name="Religion" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Religion","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Religion">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Health:</td><td>'+data.Health+'</td>'
	+'								<td><input name="Health" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Health","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Health">0</span></td>'
	+'							</tr>'
	+'							<tr><td>Environment:</td><td>'+data.Environment+'</td>'
	+'								<td><input name="Environment" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Environment","'+Name+'_form_status")\' />'
	+'										<span id="'+Name+'_Environment">0</span></td>'
	+'							</tr>'
	+'							<tr><td></td><td align="center">'
	+'								<input type="button" id="'+Name+'_submitBtn" name="Submit" value="Submit Opinon" onclick=\'userDataForm("leader","'+data.Name+'","'+Name+'_form_status") \' style="height: 25px; width: 100px;" />'
	+'							</td><td id="'+Name+'_form_status">Unchanged</td></tr>'
	+'						</table></td>'
	+'					</tr></table>'
	+			'<em style="width:800;border: 1px solid black;cursor:pointer;padding:0px 10px 0px 10px;box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);background-color: rgb(51, 51, 51);color:rgb(255, 255, 255);" onclick=\'slideInfo("'+Name+'")\'>See Details & Comments on '+data.Name+'</em>		'
    +'			<table id="'+Name+'_info1" class="info" style="border: 1px solid; width:800px;display:none;">'
    +'					<tr><td style="border-bottom: 1px solid;">Desciption</td><td style="border-bottom: 1px solid;">'+data.Desciption+'</td></tr>'
    +'					<tr><td style="border-bottom: 1px solid;">Professed Manifesto</td><td style="border-bottom: 1px solid;">'+data.Professed_Manifesto+'</td></tr>'
    +'					<tr><td>Actual Manifesto</td><td>'+data.Actual_Manifesto+'</td></tr>'
    +'			</table>'
    +'			<div id="'+Name+'_info2" style="display:none;width:800px;border:1px solid;background-color:rgb(243, 243, 243);box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);"><fb:comments href="'+linkURL+'" num_posts="2" width="800" colorscheme="light"></fb:comments></div>'
	+'					</td><td>'
	+'						<iframe src="object/liveFeed/'+Name+'.html" height="320" width="250" frameBorder="0"></iframe>'
	+'					</td></tr></table>'
	+'				'
	+'			</form>';
	//alert(htm);
	return htm;
}


//party grid form
var partyFillGrid=function(entity,data){
	//alert("inside partFillGrid");
	var Name=data.Name.replace(/ /g,"_");
	//var linkURL="http://www.youthdemocracy.in/#!party="+Name;
	var linkURL="http://www.youthdemocracy.in/object/party/"+Name+".html";
	
	htm='';
	htm+=''
	+'			<form name="'+Name+'_user_form" id="'+Name+'_user_form" style="margin-top: 20px;">'
	+'				<table><tr>'
	+'					<td><table style="border: 1px solid black;background-color: rgb(243, 243, 243);"><tr>'
	+'						<td><img src="'+data.Image_URL+'" alt="'+data.Name+'" /></td>'
	+'						<td><table >'
	+'							<tr><td>Name:</td><td>'+data.Name+'</td>'
	+'						<td><div style="vertical-align: bottom;float:left;"><fb:like href="'+linkURL+'" send="false" layout="button_count" width="90" show_faces="false"></fb:like></div>'
	+'						<div style="vertical-align: bottom;float:left;"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+linkURL+'" data-text="Check out '+data.Name+' at "></a></td></tr></div>'
	+'						<tr><td>Education:</td><td>'+data.Education+'</td>'
	+'							<td><input name="Education" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Education","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Education">0</span></td>'
	+'						</tr>'
	+'						<tr><td>Military:</td><td>'+data.Military+'</td>'
	+'							<td><input name="Military" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Military","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Military">0</span></td>'
	+'						</tr>'
	+'						<tr><td>Economy:</td><td>'+data.Economy+'</td>'
	+'							<td><input name="Economy" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Economy","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Economy">0</span></td>'
	+'						</tr>'
	+'						<tr><td>Industry:</td><td>'+data.Industry+'</td>'
	+'							<td><input name="Industry" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Industry","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Industry">0</span></td>'
	+'						</tr>'
	+'						<tr><td>Religion:</td><td>'+data.Religion+'</td>'
	+'							<td><input name="Religion" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Religion","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Religion">0</span></td>'
	+'						</tr>'
	+'						<tr><td>Health:</td><td>'+data.Health+'</td>'
	+'							<td><input name="Health" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Health","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Health">0</span></td>'
	+'						</tr>'
	+'						<tr><td>Environment:</td><td>'+data.Environment+'</td>'
	+'							<td><input name="Environment" type="range" min="0" max="10" value="0" onchange=\'formValueChange(this.value,"'+Name+'_Environment","'+Name+'_form_status")\' />'
	+'									<span id="'+Name+'_Environment">0</span></td>'
	+'						</tr>'
	+'						<tr><td></td><td align="center">'
	+'							<input type="button" id="'+Name+'_submitBtn" name="Submit" value="Submit Opinon" onclick=\'userDataForm("party","'+data.Name+'","'+Name+'_form_status") \' style="height: 25px; width: 100px;" />'
	+'						</td><td id="'+Name+'_form_status">Unchanged</td></tr>'
	+'					</table></td>'
	+'				</tr></table>'
	+			'<em style="width:800;border: 1px solid black;cursor:pointer;padding:0px 10px 0px 10px;box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);background-color: rgb(51, 51, 51);color:rgb(255, 255, 255);" onclick=\'slideInfo("'+Name+'")\'>See Details & Comments on '+data.Name+'</em>		'
    +'			<table id="'+Name+'_info1" class="info" style="border: 1px solid; width:800px;display:none;">'
    +'					<tr><td style="border-bottom: 1px solid;">Desciption</td><td style="border-bottom: 1px solid;">'+data.Desciption+'</td></tr>'
    +'					<tr><td style="border-bottom: 1px solid;">Professed Manifesto</td><td style="border-bottom: 1px solid;">'+data.Professed_Manifesto+'</td></tr>'
    +'					<tr><td>Actual Manifesto</td><td>'+data.Actual_Manifesto+'</td></tr>'
    +'			</table>'
    +'			<div id="'+Name+'_info2" style="display:none;width:800px;border:1px solid;background-color:rgb(243, 243, 243);box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);"><fb:comments href="'+linkURL+'" num_posts="2" width="800" colorscheme="light"></fb:comments></div>'
	+'					</td><td>'
	+'						<iframe src="object/liveFeed/'+Name+'.html" height="320" width="250" frameBorder="0"></iframe>'
	+'					</td></tr></table>'
	+'				'
	+'			</form>';
	//alert(htm);
	return htm;
}
*/
var formValueChange=function(newValue,spanID,statusID){
	//alert("newValue:"+newValue+",spanID:"+spanID+",statusID:"+statusID);
	document.getElementById(spanID).innerHTML=newValue;
	document.getElementById(statusID).innerHTML="Not Submitted";
}

//Validates the content of the form
var formValidate = function(entity) {
	//alert("Inside FormValidate");
	createEntity(entity);
}

// entry form for userData
var userDataForm = function(entity,entityName,formStatus){
	//alert("Inside userForm:"+"entity="+entity+",entityName="+entityName);
	var formID=entityName.replace(/ /g,"_")+'_user_form';
	
	var successFn=function(){
		document.getElementById(formStatus).innerHTML="Submitted";
	}
	var errorFn=function(){
		document.getElementById(formStatus).innerHTML="Error";
	}
	
	var dataFunc=function(response) {
	   	var formData=new Array();
		var formEle=$('form#'+formID+' :input').serializeArray();
	   	formData.push(new paramContainer('User_ID',response.id));
	   	formData.push(new paramContainer('Entity_Type',entity));
	   	formData.push(new paramContainer('Entity_Name',entityName));
	   	for(var i=0;i<formEle.length;i++){
			formData.push(new paramContainer(formEle[i].name,formEle[i].value));
			//alert("datafunc:"+formEle[i].name+","+formEle[i].value)
		}
		formData.push(new paramContainer('action','PUT'));
		//sendData("/userdata",formData,successFn,errorFn);
		$.ajax({url:"/userdata",type:"POST",data:formData,success:successFn,error:errorFn});
	}
	   
	
	FB.login(function(response) {
		   if (response.authResponse) {
		     FB.api('/me', dataFunc);
		   } else {
			   $('#'+formStatus).html('Please log in..');
		   }
		 }, {perms:'email,user_hometown'});

	
	
	/*
	FB.getLoginStatus(function(resp) {
		  if (resp.status === 'connected') {
			  alert("connected");
			  FB.api('/me', dataFunc(resp.authResponse));
		  } else if (resp.status === 'not_authorized') {
			  alert("not_authorized");
			  $('#'+formStatus).html('Please re-login..');
		  } else {
			  alert("nothing");
			  $('#'+formStatus).html('Please log in..');
		  }
		 });*/
	
	
	/*
    if(FB.getAuthResponse() != null) {	FB.api('/me', dataFunc);} 
    else {	$('#'+formStatus).html('Please log in..');
    }*/
	
}

//--------------------------------C.R.U.D---------------------------------


//Saves data to the server
var createEntity = function(entity,formID){
	//alert("Inside createEntity");
	var formData=new Array();
	var formElements='';
	if(typeof htmlID=="undefined")
		formElements = $('form#'+entity+'_create_form :input');
	else
		formElements = $('form#'+formID+' :input');
		
	var formEle=formElements.serializeArray();
	for(var i=0;i<formEle.length;i++){
		//alert("type:"+formElements[i].type);
		if(formElements[i].type=='textarea'){
			//alert("inside text content");
			var val=nicEditors.findEditor(entity+'_'+formEle[i].name).getContent();
			//var val=formEle[i].value;
			//val=val.replace(/\n\r?/g, '<br/>');
			//alert("value is:"+val);
			formData.push(new paramContainer( formEle[i].name,val ));
			//alert("sent "+ formEle[i].name+",val:"+val);
		}
		else
		formData.push(new paramContainer(formEle[i].name,formEle[i].value));
	}
	formData.push(new paramContainer('action','PUT'));
	sendData("/"+entity,formData,null,null);
}

//Reads a single data from the server
var readEntity = function(entity,searchBy,searchFor){
	//alert("Inside readEntity");
	var filterParam=new Array();
	filterParam.push(new paramContainer('searchBy',searchBy));
	filterParam.push(new paramContainer('searchFor',searchFor));
	goToPage(entity,searchFor);
	populateGrid(entity,filterParam,false);
}

//updates the data in the server
var updateEntity = function(entity,id){
	//alert("Inside updateEntity");
	
	var successFn = function(resp) {
		//alert("Inside successFn:"+resp.data[0].Name);
		var data=resp.data[0];
		var formElements = $('form#'+entity+'_create_form :input');
		for(var i=0;i<formElements.length;i++){
			if(formElements[i].type !="button" && formElements[i].type !="radio" && formElements[i].type !="reset"){
				var ele=$(formElements[i]);
				formElements[i].value=eval('data.'+ele.attr('name'));
				
				if(ele.type=='textarea'){
					var val=nicEditors.findEditor(entity+'_'+ele.name).getContent();
					alert("Inside textarea:"+val);
					nicEditors.findEditor(entity+'_'+ele.name).setContent(val);
				}
			}
		}
		;}
	var currData = new Array();
	currData.push(new paramContainer('searchFor',id));
	currData.push(new paramContainer("offset",0)); 
	getData("/"+entity,currData,successFn,null);
}

//deletes data from server
var deleteEntity = function(entity,id){
	//alert("Inside deleteEntity");

	var currData=new Array();
	currData.push(new paramContainer('searchFor',id));
	currData.push(new paramContainer('action','DELETE'));
	sendData("/"+entity,currData,null,null);
}