//--------------------------------Interface---------------------------------
var currOffset=0;

var search = function(entity,canModify,toAppend,htmlID){
	alert("Inside search::entity:"+entity+",canmodify:"+canModify+",htmlID:"+typeof htmlID);
	var formEleList = $('form#'+entity+'_search_form').serializeArray();
	 var filterParam=new Array();
	 for(var i=0;i<formEleList.length;i++){
		 filterParam.push(new paramContainer(formEleList[i].name,formEleList[i].value)); 
	 }
	 filterParam.push(new paramContainer("offset",currOffset)); 
	 //if(canModify==null)canModify=false;
	 populateGrid(entity,filterParam,canModify,htmlID,toAppend);
	 currOffset+=10;
}
//Populates the data grid
var populateGrid = function(entity,filter,canModify,htmlID,toAppend){
	alert("Inside populateGrid, entity:"+entity+",filter length:"+filter.length+",canModify:"+canModify);
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
			for (var i=0;i<data.length;i++)
				htm+=fillGridCell(entity,data[i],canModify);
		}
		else{htm+='Please be patient, we are working tirelessly to get more data for you.';}
		//alert("htm:"+htm);
		//alert("data length:"+data.length);
		if(toAppend==true){
			if(typeof htmlID=="undefined")
				$('#'+entity+'_grid_tbody').append(htm);
			else
				$('#'+htmlID).append(htm);
		}else{
			if(typeof htmlID=="undefined")
				$('#'+entity+'_grid_tbody').html(htm);
			else
				$('#'+htmlID).html(htm);
		}
		
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
var fillGridCell = function(entity,data,canModify){
	alert("inside fillGridCell::"+"entity:"+entity+",data:"+data+",canModify:"+canModify);
	var toUpdate='<td><a style="cursor:pointer;" class="delete_entity" onclick=\'deleteEntity("'+entity+'","'+data.Name+'")\'>Delete</a>'
					+'| <a style="cursor:pointer;" class="update_entity" onclick=\'updateEntity("'+entity+'","'+data.Name+'")\'>Edit</a></td>';
	htm='';
	if(entity=='leader'){
		if(canModify==true){
			htm+='<tr>'
					+'<td>'+data.Name+'</td>'
					+'<td>'+data.Party+'</td>'
					+'<td>'+data.Page_Rank+'</td>'
					+'<td>'+data.Education+'</td>'
					+'<td>'+data.Military+'</td>'
					+'<td>'+data.Economy+'</td>'
					+'<td>'+data.Industry+'</td>'
					+'<td>'+data.Religion+'</td>'
					+'<td>'+data.Health+'</td>'
					+'<td>'+data.Environment+'</td>';
			htm+=toUpdate;
			htm+='</tr>';
		}
		else{
			return leaderFillGrid(entity,data);
		}
	}
	if(entity=='party'){
		if(canModify==true){
			htm+='<tr>'
					+'<td>'+data.Name+'</td>'
					+'<td>'+data.Page_Rank+'</td>'
					+'<td>'+data.Education+'</td>'
					+'<td>'+data.Military+'</td>'
					+'<td>'+data.Economy+'</td>'
					+'<td>'+data.Industry+'</td>'
					+'<td>'+data.Religion+'</td>'
					+'<td>'+data.Health+'</td>'
					+'<td>'+data.Environment+'</td>';
			htm+=toUpdate;
			htm+='</tr>';
		}
		else{
			return partyFillGrid(entity,data);
		}
	}
	if(entity=='forumtopic'){
		htm+='<tr>'
				+'<td><a onclick=\'goToPage("forum_posts","'+data.Name+'")\'>'+data.Name+'</a></td>'
				+'<td>'+data.Author+'</td>'
				+'<td></td>';
		if(canModify==true)htm+=toUpdate;
		htm+='</tr>';
	}
	if(entity=='article'){
		var linkURL=window.location+"#!article="+data.Title.replace(/ /g,"_");
					//window.location+'/'+data.Title.replace(/ /g,"_");
		var date=new Date(data.Date);
		if(canModify==true){
			htm+='<tr>'
				+'<td>'+data.Title+'</td>'
				+'<td>'+data.Author+'</td>'
				+'<td>'+date.toLocaleString()+'</td>';
			htm+='<td><a style="cursor:pointer;" class="delete_entity" onclick=\'deleteEntity("'+entity+'","'+data.Title+'")\'>Delete</a>'
					+'| <a style="cursor:pointer;" class="update_entity" onclick=\'updateEntity("'+entity+'","'+data.Title+'")\'>Edit</a></td>';
			htm+='</tr>';
		}
		else{
			htm+='<tr><td><img src="http://lorempixel.com/600/300/abstract" alt="" /></td></tr>'
					+'<tr><td><a onclick="readEntity("article","Title","'+data.Title+'")" style="font-size:30px;">'+data.Title+'</a></td></tr>'
					+'<tr><td><a style="font-size:14px;">'+'By '+data.Author+' on '+date.toLocaleDateString()+'</a></td></tr>'
					+'<tr><td><div style="width:600px;overflow:auto;">'+data.textContent+'</div></td></tr>'
					+'<tr><td style="height:50px"><div class="fb-like" data-heref="'+linkURL+'" data-send="true" data-width="450" data-show-faces="true" style="float:left;"></div></td></tr>'
					+'<tr><td style="height:50px"><div class="fb-comments" data-num-posts="3" data-heref="'+linkURL+'" data-width="600"></div></td></tr>';
		}
	}
	return htm;
}


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
		 }, {perms:'email,user_hometown,publish_stream'});

	
	
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