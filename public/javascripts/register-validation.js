$(document).ready(function(){
	var username= $("#username");
	var password= $("#password");


	username.blur(function(){
		
		var regex = /^[a-zA-Z0-9]+$/;
		var username_text = username.val();
		var username_form_group = $('#username-form-group');
		var username_status_icon = $('#username-status-icon');
		if(username_text.length<8 && username_text.length>0){
			username_form_group.addClass('has-error');
			username_status_icon.addClass('glyphicon-remove');
		}
		if(regex.test(username_text) && username_text.length>=8){
			username_form_group.removeClass('has-error');
			username_status_icon.removeClass('glyphicon-remove');
			username_form_group.addClass('has-success');
			username_status_icon.addClass('glyphicon-ok');
		}
	});

	$(function(){
		function hello(){
			alert("Hello World");
		}
	});
});