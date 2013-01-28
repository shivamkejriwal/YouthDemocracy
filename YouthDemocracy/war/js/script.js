var ydInit=function(){
	//alert("initilized");
	goToAjaxState();	
	//$("#leader_btn").bind('click',leader_load(false) );
	//$("#party_btn").bind('click',party_load(false) );
}
var fb_login_handler= function() {
	
    if(FB.getAuthResponse() != null) {	
    	FB.api('/me',function(response) {
		   	var formData=new Array();
		   	formData.push(new paramContainer('id',response.id));
		   	formData.push(new paramContainer('First_Name',response.first_name));
		   	formData.push(new paramContainer('Last_Name',response.last_name));
		   	formData.push(new paramContainer('Gender',response.gender));
		   	formData.push(new paramContainer('Email',response.email));
		   	formData.push(new paramContainer('Hometown',response.hometown.name));
			formData.push(new paramContainer('action','PUT'));
			//sendData("/user",formData,function(){},function(){});
			$.ajax({url:"/user",type:"POST",data:formData,success:null,error:null});
		});	
    }  
    
}

//A parameter container to help serialization
var paramContainer=function(name,value){
	this.name=name;
	this.value=value;
}

//Shows value
var showValue =function(newValue,locID){
	document.getElementById(locID).innerHTML=newValue;
}

var slide=function(ele){
	$('#'+ele).slideToggle('slow');
}
var toggleTextArea= function(textArea) {
	var area;
	if(!area) {
		area1 = new nicEditor({fullPanel : true}).panelInstance(textArea,{hasPanel : true});
	} else {
		area.removeInstance(textArea);
		area = null;
	}
}

//Gets data from the server
var getData = function(url,currData,successFn,errorFn){
	//alert("Inside getData");
	$.ajax({
		url : url,
		type : "GET",
		data:currData,
		success : function(resp){
					if(successFn){
						successFn(resp);
						FB.XFBML.parse();//Parse FB Like
						//gapi.plusone.go();//Parse G+
						twttr.widgets.load();//Parse twitter
					}
					else alert("Sucess");
				},
		error 	: function(e){
					if(errorFn)errorFn(e);
					else alert("Error");
				}
	});
}

//Send data to the server
var sendData = function(url,currData,successFn,errorFn){
	//alert("Inside sendData");
	$.ajax({
		url : url,
		type : "POST",
		data:currData,
		success : function(resp){
					if(successFn)successFn(resp); 
					else alert("Sucess");
				},
		error 	: function(e){
					if(errorFn)errorFn(e);
					else alert("Error");
				}
		});
}
//--------------------------------------------

var leader_offset=0;
var leader_load=function(toAppend,searchFor,tempOffset){
	//alert("inside leader load::searchFor:"+searchFor);
	//$.data("#leader_content_grid", "pagenum", { current: 0});
	if(typeof tempOffset!="undefined")leader_offset=tempOffset;
	if(typeof searchFor=="undefined")searchFor="";
	var filterParam=new Array();
	filterParam.push(new paramContainer('searchBy',"Name"));
	filterParam.push(new paramContainer('searchFor',searchFor));
	filterParam.push(new paramContainer("offset",leader_offset));
	//alert("making request,filter size:"+filterParam.length);
	populateGrid('leader',filterParam,false,'leader_user_data',toAppend);
	leader_offset+=5;
}
var party_offset=0;
var party_load=function(toAppend,searchFor,tempOffset){
	//alert("inside party load::searchFor:"+searchFor);
	if(typeof tempOffset!="undefined")party_offset=tempOffset;
	if(typeof searchFor=="undefined")searchFor="";
	var filterParam=new Array();
	filterParam.push(new paramContainer('searchBy',"Name"));
	filterParam.push(new paramContainer('searchFor',searchFor));
	filterParam.push(new paramContainer("offset",party_offset));
	//alert("making request,filter size:"+filterParam.length);
	populateGrid('party',filterParam,false,'party_user_data',toAppend);
	party_offset+=5;
}

var AssimilateData=function(){
	//alert("inside AssimilateData");
	$('#AssimilateStatus').html("Processing");
	function successFN(){$('#AssimilateStatus').html("Done");}
	function errorFN(){$('#AssimilateStatus').html("Error");}
	//getData("/assimilatedata",null,successFN,errorFN);
	$.ajax({url:"/assimilatedata",type:"GET",data:null,success:successFN,error:errorFN});
}

var getNearestLeader=function(formID,statusID){
	//alert("inside getNearestLeader");
	$('#'+statusID).html("Finding leader.");
	var formEleList = $('#'+formID).serializeArray();
	var filterParam=new Array();
	filterParam.push(new paramContainer('searchBy',"Leader"));
	for(var i=0;i<formEleList.length;i++){
		filterParam.push(new paramContainer(formEleList[i].name,formEleList[i].value)); 
	} 
	
	
	/*var successFn=function(resp){
		var data=resp.data[0];
		alert("Closest match is "+data.Name+" with Trait "+data.Trait);*/
		var successFn= function(resp){
			$('#'+statusID).html("Found Leader");
			var data=resp.data[0];
			var Name=data.Name.replace(/ /g,"_");
			//var linkURL="http://www.youthdemocracy.in/#!leader="+Name;
			var linkURL="http://www.youthdemocracy.in/object/leader/"+Name+".html";
			var htm='';
				
		    	htm+='<h3 style="margin-top:20px;">Nearest match to your desired leader.</h3>'
				    +'	<table style="border: 1px solid black;background-color: rgb(243, 243, 243);"><tr>'
				    +'		<td><img src="'+data.Image_URL+'" alt="'+data.Name+'" /></td>'
				    +'		<td><table >'
				    +'			<tr><td>Name:</td><td>'+data.Name+'</td></tr>'
				    +'			<tr><td>Party:</td><td>'+data.Party+'</td></tr>'
				    +'			<tr><td>Education:</td><td>'+data.Education+'</td></tr>'
				    +'			<tr><td>Military:</td><td>'+data.Military+'</td></tr>'
				    +'			<tr><td>Economy:</td><td>'+data.Economy+'</td></tr>'
				    +'			<tr><td>Industry:</td><td>'+data.Industry+'</td></tr>'
				    +'			<tr><td>Religion:</td><td>'+data.Religion+'</td></tr>'
				    +'			<tr><td>Health:</td><td>'+data.Health+'</td></tr>'
				    +'			<tr><td>Environment:</td><td>'+data.Environment+'</td></tr>'
				    +'			<tr><td></td><td><div style="vertical-align: bottom;float:left;"><fb:like href="'+linkURL+'" send="false" layout="button_count" width="90" show_faces="false"></fb:like></div>'
					+'			<div style="vertical-align: bottom;float:left;"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+linkURL+'" data-text="Check out '+data.Name+' at "></a></td></tr></div>'
				    +'		</table></td>'
				    +'	</tr></table>'
				    +'	<em style="width:400;border-right:1px solid;border-bottom:1px solid;border-left:1px solid;cursor:pointer;padding:0px 10px 0px 10px;box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);" onclick=\'slideInfo("'+Name+'_NN")\'>See Details & Comments</em>'
				    +'			<table id="'+Name+'_NN_info1" class="info" style="border: 1px solid; width:800px;display:none;">'
				    +'					<tr><td style="border-bottom: 1px solid;">Desciption</td><td style="border-bottom: 1px solid;">'+data.Desciption+'</td></tr>'
				    +'					<tr><td style="border-bottom: 1px solid;">Professed Manifesto</td><td style="border-bottom: 1px solid;">'+data.Professed_Manifesto+'</td></tr>'
				    +'					<tr><td>Actual Manifesto</td><td>'+data.Actual_Manifesto+'</td></tr>'
				    +'			</table>'
				    +'			<div id="'+Name+'_NN_info2" style="display:none;width:800px;border:1px solid;background-color:rgb(243, 243, 243);box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);"><fb:comments href="'+linkURL+'" num_posts="2" width="800" colorscheme="light"></fb:comments></div>';
			$('#user_find_display').append(htm);
			$('#'+statusID).html("Done.");
		}
		
	 	function errorFN(){
	 		$('#'+statusID).html("Error");
	 	}
	 	
	 getData("/findnearestneighbor",filterParam,successFn,errorFN);
	 //$.ajax({url:"/findnearestneighbor",type:"GET",data:filterParam,success:successFN,error:errorFN});
}

var getNearestParty=function(formID,statusID){
	//alert("inside getNearestParty");
	$('#'+statusID).html("Finding Party");
	var formEleList = $('#'+formID).serializeArray();
	var filterParam=new Array();
	filterParam.push(new paramContainer('searchBy',"Party"));
	for(var i=0;i<formEleList.length;i++){
		filterParam.push(new paramContainer(formEleList[i].name,formEleList[i].value)); 
	} 
	
	
	/*var successFn=function(resp){
		var data=resp.data[0];
		alert("Closest match is "+data.Name+" with Trait "+data.Trait);*/
		var successFn= function(resp){
			$('#'+statusID).html("Found Party");
			var data=resp.data[0];//alert("Closest match is "+data.Name+" with Trait "+data.Trait);
			var Name=data.Name.replace(/ /g,"_");
			//var linkURL="http://www.youthdemocracy.in/#!party="+Name;
			var linkURL="http://www.youthdemocracy.in/object/party/"+Name+".html";
			var htm='';
				
		    	htm+='<h3 style="margin-top:20px;">Nearest match to your desired party.</h3>'
				    +'	<table style="border: 1px solid black;background-color: rgb(243, 243, 243);"><tr>'
				    +'		<td><img src="'+data.Image_URL+'" alt="'+data.Name+'" /></td>'
				    +'		<td><table >'
				    +'			<tr><td>Name:</td><td>'+data.Name+'</td></tr>'
				    +'			<tr><td>Education:</td><td>'+data.Education+'</td></tr>'
				    +'			<tr><td>Military:</td><td>'+data.Military+'</td></tr>'
				    +'			<tr><td>Economy:</td><td>'+data.Economy+'</td></tr>'
				    +'			<tr><td>Industry:</td><td>'+data.Industry+'</td></tr>'
				    +'			<tr><td>Religion:</td><td>'+data.Religion+'</td></tr>'
				    +'			<tr><td>Health:</td><td>'+data.Health+'</td></tr>'
				    +'			<tr><td>Environment:</td><td>'+data.Environment+'</td></tr>'
				    +'			<tr><td></td><td><div style="vertical-align: bottom;float:left;"><fb:like href="'+linkURL+'" send="false" layout="button_count" width="90" show_faces="false"></div>'
					+'			<div style="vertical-align: bottom;float:left;"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+linkURL+'" data-text="Check out '+data.Name+' at "></a></div></td></tr>'
				    +'		</table></td>'
				    +'	</tr></table>'
				    +'	<em style="width:400;border-right:1px solid;border-bottom:1px solid;border-left:1px solid;cursor:pointer;padding:0px 10px 0px 10px;box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);" onclick=\'slideInfo("'+Name+'_NN")\'>See Details & Comments</em>'
				    +'			<table id="'+Name+'_NN_info1" class="info" style="border: 1px solid; width:800px;display:none;">'
				    +'					<tr><td style="border-bottom: 1px solid;">Desciption</td><td style="border-bottom: 1px solid;">'+data.Desciption+'</td></tr>'
				    +'					<tr><td style="border-bottom: 1px solid;">Professed Manifesto</td><td style="border-bottom: 1px solid;">'+data.Professed_Manifesto+'</td></tr>'
				    +'					<tr><td>Actual Manifesto</td><td>'+data.Actual_Manifesto+'</td></tr>'
				    +'			</table>'
				    +'			<div id="'+Name+'_NN_info2" style="display:none;width:800px;border:1px solid;background-color:rgb(243, 243, 243);box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.5);"><fb:comments href="'+linkURL+'" num_posts="2" width="800" colorscheme="light"></fb:comments></div>';
			$('#user_find_display').append(htm);
			$('#'+statusID).html("Done.");
		}
		
		
	 
	 	function errorFN(){
	 		$('#'+statusID).html("Error");
	 	}
	 	
	 
	 getData("/findnearestneighbor",filterParam,successFn,errorFN);
	 //$.ajax({url:"/findnearestneighbor",type:"GET",data:filterParam,success:successFN,error:errorFN});
}

var slideInfo=function(infoName){
	//alert("inside slideInfo");
	$('#'+infoName+'_info1').fadeToggle('slow');
	$('#'+infoName+'_info2').fadeToggle('slow');
}

var FindNearestNeighbor=function(formID,statusID){
	//alert("inside FindNearestNeighbor:"+formID);
	$('#user_find_display').fadeToggle('fast');
	$('#user_find_display').html('');
	$('#'+statusID).html("Finding");
	getNearestLeader(formID,statusID);
	getNearestParty(formID,statusID);
	$('#user_find_display').fadeToggle('slow');
}



var runBackup=function(){
	$('#backupData_Display').html("Processing");
	$.ajax({url:"/backupdata"
		,type:"POST",data:null
		,success:function(){$('#backupData_Display').html("Backup Created");}
		,error:function(){$('#backupData_Display').html("Post Error");}
		});
	
}

var getBackup=function(){
	$('#backupData_Display').html("Displaying Backup");
	$.ajax({url:"/backupdata"
		,type:"GET",data:null
		,success:function(resp){//$('#backupData_Display').html("Done");
			$('#backupData_Display').html(resp.data[0].Data);
			}
		,error:function(){$('#backupData_Display').html("Post Error");}
		});
}

var testLike =function(){
	//alert('Inside testLike');
	FB.api(
        '/me/youthdemocracy:Like',
        'post',
        { Leader: 'http://www.youthdemocracy.in/#!leader=Narendra_Modi' },
        function(response) {
        	alert('Inside response function:'+response.id);
        	var msg = "\n\nType: " + response.error.type + "\n\nMessage: " + response.error.message;
           if (!response || response.error) {
              alert('Error occured:'+msg);
           } else {
              alert('Successful! Action ID: ' + response.id);
           }
        });
}