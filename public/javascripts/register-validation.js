$(document).ready(function(){
	var username= $("#register-username");
	var username_info= $("<span></span>").text("Username must be at least 8 characters long.");
	username_info.hide();

	username.focus(function(){
		username_info.show();
		username.after(username_info);
	});
});