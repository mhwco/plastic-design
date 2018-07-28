// JavaScript Document
$(document).ready(function(){
	"use strict";
	rf.mask.create();
	$("#nav-button-language").click(function(){
		rf.dialog("language-select").open();
	});
});
