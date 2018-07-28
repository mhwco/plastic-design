// JavaScript Document
$(document).ready(function(){
	$(".left-top-dialog,.center-top-dialog,.right-top-dialog,.left-center-dialog,	.center-dialog,.right-center-dialog,.left-bottom-dialog,.center-bottom-dialog,.right-bottom-dialog").hide();
	$("#mask").click(function(){
		$(".left-top-dialog,.center-top-dialog,.right-top-dialog,.left-center-dialog,	.center-dialog,.right-center-dialog,.left-bottom-dialog,.center-bottom-dialog,.right-bottom-dialog").hide(200);
		$("#mask").hide();
	});
});
var rf={
	test:function(){
		alert("sucess!");
	},
	mask:{
		create:function(){
			$("body").prepend('<div id="mask"></div>');
			$("#mask").hide();
		},
		show:function(){
			$("#mask").show();
		},
		hide:function(){
			$("#mask").hide();
		},
		toogle:function(){
			$("#mask").toogle();
		},
		isOpen:functuon(){
			return $("#mask").is(":visible");
		}
	},
	dialog:function(s){
		return {
			toogle:function(with_mask){
				if(with_mask = undefined || with_mask = null){
					with_mask=true;
				}
				$("#"+"dialog-"+s).toggle(200);
				if(with_mask){
					this.mask.toogle();
				}
			},
			open:function(with_mask){
				if(with_mask = undefined || with_mask = null){
					with_mask=true;
				}
				$("#"+"dialog-"+s).show(200);
				if(with_mask){
					this.mask.show();
				}
			},
			close:function(with_mask){
				if(with_mask = undefined || with_mask = null){
					with_mask=true;
				}
				$("#"+"dialog-"+s).hide(200);
				if(with_mask){
					this.mask.hide();
				}
			},
			isOpen:function(){
				return $("#"+"dialog-"+s).is(":visible");
			}
		};
	},
};