// JavaScript Document
/*!
*Plastic Design
*Reflect JavaScript Library v0.0.1_pre
*https://pd.mhwco.org/en/design/reflect
*Copyright(c)MHW Cooperation Organization
*Released Under MIT License
*https://pd.mhwco.org/en/copyright
*View on GitHub
*https//github.com/mhwco/plastic-design
*/
"use strict";
var reg_allowReturnOnClickMask;
$(document).ready(function(){
	$("body").prepend('<div id="mask"></div>');
	$("#mask").hide();
	$("#mask").click(function(){
		if(reg_allowReturnOnClickMask){
			$(".hide-on-mask").hide(200);
			$("#mask").hide();
		}
	});
	$(".dialog").hide();
	rf.RfTypeNotMatchError.prototype=new Error();
	rf.RfTypeNotMatchError.prototype.constructor=rf.RfTypeNotMatchError;
	rf.RfEntityNotFoundError.prototype=new Error();
	rf.RfEntityNotFoundError.prototype.constructor=rf.RfEntityNotFoundError;
	rf.RfEntityAlreadyExistError.prototype=new Error();
	rf.RfEntityAlreadyExistError.prototype.constructor=rf.RfEntityAlreadyExistError;
});
var rf={
	/*Rf Errors start*/
	RfTypeNotMatchError:function(m){
		if(m){
			this.message=m;
		}else{
			this.message="The selected element is not a specified Reflect entity";
		}
		this.name="RfTypeNotMatchError";
	},
	RfEntityNotFoundError:function(m){
		if(m){
			this.message=m;
		}else{
			this.message="The selected element is not found.";
		}
		this.message=m;
		this.name="RfEntityNotFoundError";
	},
	RfEntityAlreadyExistError:function(m){
		if(m){
			this.message=m;
		}else{
			this.message="The selected element that should have been created already exists.";
		}
		this.message=m;
		this.name="RfEntityAlreadyExistError";
	},
	/*Rf Errors end*/
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
			throw new rf.RfTypeNotMatchError("The selected element with the id '"+this.getId(s)+"' is not a dialog. It requires a existing element with class 'dialog' or unexisting element ready to create");
		}else{
			return {
				getId:function(){
					return "dialog-"+s;
				},
				create:function(){
					if($("#"+this.getId()).length>0){
						throw new rf.RfEntityAlreadyExistError("The selected dialog '"+s+"' already exists.");
					}
					$("body").prepend('<div id="'+this.getId()+'" class="dialog white-b radius" style="display:none"></div>');
					return this;
				},

				build:function(set){
					if($("#"+this.getId()).length===0){
						throw new rf.RfEntityNotFoundError("The selected dialog '"+s+"' is not found.");
					}
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
					var i;
					var return_item,
						return_method;
					$("#"+this.getId()).removeClass("left-top center-top right-top left-center center-center right-center left-bottom center-bottom right-bottom");
					switch(set.position){
						case 0://lt
							$("#"+this.getId()).addClass("left-top");
							break;
						case 1://ct
							$("#"+this.getId()).addClass("center-top");
							break;
						case 2://rt
							$("#"+this.getId()).addClass("right-top");
							break;
						case 3://lc
							$("#"+this.getId()).addClass("left-center");
							break;
						case 4://cc
							$("#"+this.getId()).addClass("center-center");
							break;
						case 5://rc
							$("#"+this.getId()).addClass("right-center");
							break;
						case 6://lb
							$("#"+this.getId()).addClass("left-bottom");
							break;
						case 7://cb
							$("#"+this.getId()).addClass("center-bottom");
							break;
						case 8://rb
							$("#"+this.getId()).addClass("right-bottom");
							break;
						default:
							$("#"+this.getId()).addClass("center-center");
					}//set dialog position class
					
					$("#"+this.getId()).addClass(set.className);//add user personality class
					
					if(set.text && $("#"+this.getId()+" .dialog-content").length===0){//if sets text and no tag
						$("#"+this.getId()).prepend('<div class="dialog-content"></div>');
					}
					$("#"+this.getId()+" .dialog-content").html(set.text);
					
					if(set.title && $("#"+this.getId()+" h2").length===0){//if sets title and no tag
						$("#"+this.getId()).prepend("<h2></h2>");
					}
					$("#"+this.getId()+" h2").html(set.title);
					
					if(set.allowReturnOnClickMask===null || set.allowReturnOnClickMask===undefined){//set default value is true
						set.allowReturnOnClickMask=true;
					}
					reg_allowReturnOnClickMask=set.allowReturnOnClickMask;//register it for mask use
					if(set.allowReturnOnClickMask){//set hide-on-mask class
						$("#"+this.getId()).addClass("hide-on-mask");
					}			
					if($("#"+this.getId()+" .dialog-func").length===0){
						$("#"+this.getId()).append('<div class="dialog-func"></div>');
					}
					switch(set.type){//set dialog type
						case 0://alert
							break;//for alert title and text are enough
						case 1://select
							if($("#"+this.getId()+" .dialog-func select").length===0 && set.items){//if no tag
								$("#"+this.getId()+" .dialog-func").html("");//clear the already-have-content 
								$("#"+this.getId()+" .dialog-func").prepend("<select></select>");
							}
							for(i=0;i<set.items.length;i++){//add each option
								$("#"+this.getId()+" .dialog-func select").append('<option name="'+i+'">'+set.items[i]+'</option>');
							}
							return_item=0;
							break;
						case 2://list
							if($("#"+this.getId()+" .dialog-func ul").length===0 && set.items){
								$("#"+this.getId()+" .dialog-func").html("");//clear the already-have-content 
								$("#"+this.getId()+" .dialog-func").prepend("<ul></ul>");
							}
							for(i=0;i<set.items.length;i++){//add each li
								$("#"+this.getId()+" .dialog-func ul").append('<li name="'+i+'">'+set.items[i]+'</li>');
							}
							return_item=NaN;
							break;
						case 3://prompt
							if($("#"+this.getId()+" .dialog-func input[type='text']").length===0){
								$("#"+this.getId()+" .dialog-func").html("");//clear the already-have-content 
								$("#"+this.getId()+"  .dialog-func").append('<input type="text"></ul>');
							}
							break;
						case 4://progress
							break;
					}
					
					//check if have button container and if no add it
					if($("#"+this.getId()+" .dialog-button-container").length===0){
						$("#"+this.getId()).append('<div class="dialog-button-container"></div>');
					}
					//check different type button containers and if no add
					if($("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container").length===0){
						$("#"+this.getId()+" .dialog-button-container").append('<div class="positive-and-negative-botton-container"></div>');
					}
					if($("#"+this.getId()+" .dialog-button-container .neutral-botton-container").length===0 && set.neutral){
						//if have neutral then check if have
						$("#"+this.getId()+" .dialog-button-container").append('<div class="neutral-botton-container"></div>');
					}
					//check if have button if no add
					if($("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container .dialog-negative").length===0 && set.negative){
						//check if have negative when sets negative
						$("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container").append('<div class="dialog-negative dialog-button"></div>');
					}
					$("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container .dialog-negative").html(set.negative);
					if($("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container .dialog-positive").length===0){
						//check if have positive
						//must have positive
						$("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container").append('<div class="dialog-positive dialog-button"></div>');
						if(!set.positive){//set positive default value
							set.positive="OK";
						}
					}
					$("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container .dialog-positive").html(set.positive);
					if($("#"+this.getId()+" .dialog-button-container .neutral-botton-container .dialog-neutral").length===0 && set.neutral){
						//check if have neutral when sets neutral
						$("#"+this.getId()+" .dialog-button-container .neutral-botton-container").append('<div class="dialog-neutral dialog-button"></div>');
					}
					$("#"+this.getId()+" .dialog-button-container .neutral-botton-container .dialog-neutral").html(set.neutral);
					//select register
					$("#"+this.getId()+" .dialog-func select").change(function(){
						if($(this).get(0).selectedIndex){
							return_item=$(this).get(0).selectedIndex;
						}
					});
					//list register
					$("#"+this.getId()+" .dialog-func ul li").click(function(){
						$("#"+rf.dialog(s).getId()+" .dialog-func ul li").removeAttr("selected");//new selected so remove former selected from attr
						$(this).attr("selected","selected");//set new selected attr
						return_item=Number($(this).attr("name"));//regester return_item
					});
					//prompt register
					$("#"+this.getId()+" .dialog-func input[type='text']").change(function(){
						return_item=$(this).val();
					});
					//register button onclick
					$("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container .dialog-negative").click(function(){//negative
						set.onReturn(1,return_item);
						rf.dialog(s).close();
					});
					$("#"+this.getId()+" .dialog-button-container .positive-and-negative-botton-container .dialog-positive").click(function(){//positive
						set.onReturn(0,return_item);
						rf.dialog(s).close();
					});
					$("#"+this.getId()+" .dialog-button-container .neutral-botton-container .dialog-neutral").click(function(){//neutral
						set.onReturn(2,return_item);
						rf.dialog(s).close();
					});
					return this;
				},
				toogle:function(with_mask){
					if($("#"+this.getId()).length===0){
						throw new rf.RfEntityNotFoundError("The selected dialog '"+s+"' is not found.");
					}
					if(!with_mask){
						with_mask=true;
					}
					$("#"+this.getId()).toggle(200);
					if(with_mask){
						rf.mask.toogle();
					}
				},
				open:function(with_mask){
					if($("#"+this.getId()).length===0){
						throw new rf.RfEntityNotFoundError("The selected dialog '"+s+"' is not found.");
					}
					if(!with_mask){
						with_mask=true;
					}
					$("#"+this.getId()).show(200);
					if(with_mask){
						rf.mask.show();
					}
				},
				close:function(with_mask){
					if($("#"+this.getId()).length===0){
						throw new rf.RfEntityNotFoundError("The selected dialog '"+s+"' is not found.");
					}
					if(!with_mask){
						with_mask=true;
					}
					$("#"+this.getId()).hide(200);
					if(with_mask){
						rf.mask.hide();
					}
				},
				isOpen:function(){
					if($("#"+this.getId()).length===0){
						throw new rf.RfEntityNotFoundError("The selected dialog '"+s+"' is not found.");
					}
					return $("#"+this.getId()).is(":visible");
				}
			};
		}
	},
};