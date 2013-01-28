//Hides all apges and shows only desired page
var goToForumPage = function(pageName)
{
	$('#Forum-category').hide();
	$('#Forum-topic').hide();
	$('#Forum-posts').hide();
	
	$('#Forum-' + pageName).show();
}