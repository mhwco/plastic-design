// JavaScript Document
$(document).ready(function(){
	"use strict";
	rf.dialog("language-select").create().build({
		type:1,
		position:2,
		title:"Select a language:",
		positive:"OK",
		items:["English(en)","中文(中国)(zh-CN)"],
		onReturn:function(method,item){
			if(method!==-1){
				switch(item){
					case 1:
						location.pathname="/zh_cn/"+location.pathname.split("/")[2];
						break;
				}
			}
		}
	});
	$("#nav-button-language").click(function(){
		rf.dialog("language-select").open();
	});
});
