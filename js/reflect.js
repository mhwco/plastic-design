// JavaScript Document
$(document).ready(function(){
	alert("q");
	$("body").prepend('<div id="mask"></div>');
	$("#mask,.left-top-dialog,.center-top-dialog,.right-top-dialog,.left-center-dialog,	.center-dialog,.right-center-dialog,.left-bottom-dialog,.center-bottom-dialog,.right-bottom-dialog").hide();
	$("#mask").click(function(){
		$(".left-top-dialog,.center-top-dialog,.right-top-dialog,.left-center-dialog,	.center-dialog,.right-center-dialog,.left-bottom-dialog,.center-bottom-dialog,.right-bottom-dialog").hide(200);
		$("#mask").hide();
	});
});
var rf={
	test:function(){
		alert("sucess!");
	},
	dialog:function(s){
		return {
			toogle:function(){
				$("#"+"dialog-"+s).toggle(200);
				$("#mask").toogle();
			},
			open:function(){
				$("#"+"dialog-"+s).show(200);
				$("#mask").show();
			},
			close:function(){
				$("#"+"dialog-"+s).hide(200);
				$("#mask").hide();
			},
			isOpen:function(){
				return $("#"+"dialog-"+s).is(":visible");
			}
		};
	}
};