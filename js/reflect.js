"use strict";
// JavaScript Document
$(document).ready(function(){
	$("body").prepend('<div id="mask"></div>');
	$("#mask").hide();
	$("#mask").click(function(){
		$(".hide-on-mask").hide(200);
		$("#mask").hide();
	});
	$(".dialog").hide();
});
var rf={
	test:function(){
		alert("sucess!");
	},
	mask:{
		show:function(){
			$("#mask").show();
		},
		hide:function(){
			$("#mask").hide();
		},
		toogle:function(){
			$("#mask").toogle();
		},
		isOpen:function(){
			return $("#mask").is(":visible");
		}
	},
	dialog:function(s){
		if($("#dialog-"+s).length>0 && !($("#dialog-"+s).is(".dialog"))){
			throw new Error("The selected element '"+s+"' is not a dialog. It requires a existing element with class 'dialog' or unexisting element ready to create");
		}else{
			return {
				getId:function(){
					return "dialog-"+s;
				},
				create:function(){
					$("body").prepend('<div id="'+this.getId()+'" class="dialog white-b radius" style="display:none"></div>');
					return this;
				},

				build:function(set){
					/**
					set:
					Number type:什么类型的对话框。0:alert,1:select,2:list,3:prompt,4:progress。默认值为0
					String positive:正按钮（例如：确定，是…）。默认值为"OK"
					String negative:负按钮（例如：取消，否…）。
					String neutral:中立按钮（例如：跳过…）。
					Number position:位置。默认值为4。
						0:left top,			1:center top,			2:right top,

						3:left center,		4:center,				5:right center,

						6:left bottom,		7:center bottom,		8:right bottom。
					String title:标题。
					String text:描述文本。
					String[] items:欲选项目(type==1 || type=2)。
					String className:额外的对话框样式类。
					Number progressStyle:进度样式(type==4)。0:等待型,1:进度型。默认值为0。
					Boolean allowReturnOnClickMask:是否允许在点击mask是返回。true为是，false为否。前提是在调用时with_mask参数需要为空或者true。默认值为true
					<无返回值> onReturn:f(Number method,Object item):当用户退出dialog时触发。method是用户的退出方式。-1:Mask(allowReturnOnClickMask==true),0:Positive,1:Negative,2:Neutral。
					item是用户返回的内容。当type==1 || type=2时，Number item是用户选中项目的序号。当type==3时，String item是用户输入的内容。当type==0 || type==4时，item==undefined
					*/
					switch(set.position){
						case 0://lt
							$("#"+this.getId()).addClass("left-top-dialog");
							break;
						case 1://ct
							$("#"+this.getId()).addClass("center-top-dialog");
							break;
						case 2://rt
							$("#"+this.getId()).addClass("right-top-dialog");
							break;
						case 3://lc
							$("#"+this.getId()).addClass("left-center-dialog");
							break;
						case 4://cc
							$("#"+this.getId()).addClass("center-dialog");
							break;
						case 5://rc
							$("#"+this.getId()).addClass("right-center-dialog");
							break;
						case 6://lb
							$("#"+this.getId()).addClass("left-bottom-dialog");
							break;
						case 7://cb
							$("#"+this.getId()).addClass("center-bottom-dialog");
							break;
						case 8://rb
							$("#"+this.getId()).addClass("right-bottom-dialog");
							break;
						default:
							$("#"+this.getId()).addClass("center-dialog");
					}
					$("#"+this.getId()).addClass(set.className);
					$("#"+this.getId()).append("<h2>"+set.title+"</h2>");
					$("#"+this.getId()).append('<div class="dialog-content">'+set.text+"</div>");
					switch(set.type){
						case 0://alert
							break;
						case 1://select
							$("#"+this.getId()).append("<select></select>");
							for(var i=0;i<set.items.length;i++){
								$("#"+this.getId()+" select").append('<option name="item-'+i+'">'+set.items[i]+'</option>');
							}
							break;
						case 2://list
							break;
						case 3://prompt
							break;
						case 4://progress
							break;
					}
				},
				toogle:function(with_mask){
					if(with_mask === undefined || with_mask === null){
						with_mask=true;
					}
					$("#"+this.getId()).toggle(200);
					if(with_mask){
						rf.mask.toogle();
					}
				},
				open:function(with_mask){
					if(with_mask === undefined || with_mask === null){
						with_mask=true;
					}
					$("#"+this.getId()).show(200);
					if(with_mask){
						rf.mask.show();
					}
				},
				close:function(with_mask){
					if(with_mask === undefined || with_mask === null){
						with_mask=true;
					}
					$("#"+this.getId()).hide(200);
					if(with_mask){
						rf.mask.hide();
					}
				},
				isOpen:function(){
					return $("#"+this.getId()).is(":visible");
				}
			};
		}
	},
};