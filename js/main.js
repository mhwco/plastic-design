// JavaScript Document
$(document).ready(function(){
	"use strict";
	rf.dialog("language-select").create().build({
		type:1,
		position:2,
		title:'<marquee scrollamount="5px" onmouseover="this.stop()" onmouseout="this.start()">اختر لغة 选择一个语言 Select a language Sélectionnez une langue Выберите язык Selecciona un idioma</marquee>',
		positive:"OK",
		items:["English(en)","中文(中国)(zh-CN)"],
		onReturn:function(method,item){
			if(method!==-1){
				var lang=["en","zh_cn"];
				location.pathname="/"+lang[item]+"/"+location.pathname.split("/")[2];
			}
		}
	});
	$("#nav-button-language").click(function(){
		rf.dialog("language-select").open();
	});
});
