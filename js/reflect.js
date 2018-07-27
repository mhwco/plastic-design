// JavaScript Document
$(document).ready(function(){
	"use strict";
	$("body").prepend('<div id="mask"></div>');
	$("#mask,.left-top-dialog,.center-top-dialog,.right-top-dialog,.left-center-dialog,	.center-dialog,.right-center-dialog,.left-bottom-dialog,.center-bottom-dialog,.right-bottom-dialog").hide();
	$("#mask").click(function(){
		$(".left-top-dialog,.center-top-dialog,.right-top-dialog,.left-center-dialog,	.center-dialog,.right-center-dialog,.left-bottom-dialog,.center-bottom-dialog,.right-bottom-dialog").hide(200);
		$("#mask").hide();
	});
});
function reflect(){}
reflect.prototype={
	test:function(){
		"use strict";
		alert("sucess!");
	},
	dialog:function(s){
		"use strict";
		return {
			toogle:function(){
				$(s).toggle(200);
				$("#mask").toogle();
				/*if($("#mask").is(":visible")){
					$("#mask").hide();
				}else{
					$("#mask").show();
				}*/
			},
			open:function(){
				$(s).show(200);
				$("#mask").show();
			},
			close:function(){
				$(s).hide(200);
				$("#mask").hide();
			},
			isOpen:function(){
				return $(s).is(":visible");
			}
		};
	}
};
var rf=new reflect();