var Data = {
	value:0,
	height:0,
	num:0,
	stop_change:'',
	count:0
};
$(function(){
	autoChange(1000);
	pageChange('#page1',0);
	pageChange('#page2',190);
	pageChange('#page3',380);
	pageChange('#page4',570);
	pageChange('#page5',760);
	hideit();
	every_li();
	changeColor();
	showCloth();
	linkChange();
})
function pageChange(id,value){
	$(id).on('click',function(){
		$('#pic_container')[0].style.transform = 'translate3d(0px,-'+value+'px,0px)';
		clearInterval(Data.stop_change);
		$('#nav_container').children().children().removeClass('nav_show');
/*		console.log($('#nav_container').children().children());
*/		$(this).addClass('nav_show');
		return false;
	});
}
function autoChange(time){
	Data.stop_change = setInterval(function(){
		Data.height += 190;
		Data.num++;
		if(Data.num > 4)
			Data.num = 0;
		if(Data.height>760)
			Data.height = 0;
		$('#nav_container').children().children().removeClass('nav_show');
		$('#nav_container').children().children().eq(Data.num).addClass('nav_show');
		$('#pic_container')[0].style.transform = 'translate3d(0px,-'+Data.height+'px,0px)';
	},4000);
}
function hideit(){
	$('.clicktohide').eq(0).on('click',function(){
		$('#left_active').slideToggle(500,function(){
			if($('#left_active').css("display") == "none"){
				$('.clicktohide').eq(0).css("backgroundImage","url(../img/up.gif)");
			}else{
				$('.clicktohide').eq(0).css("backgroundImage","url(../img/down.gif)");
			}
		});
		return false;
	});
	$('.clicktohide').eq(1).on('click',function(){
		$('#left_product').slideToggle(500,function(){
			if($('#left_product').css("display") == "none"){
				$('.clicktohide').eq(1).css("backgroundImage","url(../img/up.gif)");
			}else{
				$('.clicktohide').eq(1).css("backgroundImage","url(../img/down.gif)");
			}
		});
		return false;
	});
}
function linkChange(){
	var setTimer;
	var count=0;
	$('#left_active').hover(
		function(){
			clearInterval(setTimer);
		},
		function(){
			setTimer=setInterval(function(){
				$('#left_active_article').animate({top:"-=20"},500,function(){

					$('#left_active_article a').eq(count).clone().insertAfter($('#left_active_article a:last'));
					count++;
				});
			},4000);
		}
	).trigger("mouseleave");
}
function every_li(){
	$('li:has(ul)').click(function(event){
			if(this == event.target){
				$(this).children().toggle(200);
				$(this).toogleClass('ul_title_hide');
			}
			return false;
		}).css('cursor','pointer');
	$('li:not(:has(ul))').css({
			cursor:'default',
			'list-style':'url(../img/dot_icon.png)'
	});
}
function changeColor(){
	if(document.cookie){
		$('#header,#nav,.left_title,.left_title2,.righttitle').css('background',getCookie("color"));
	}
	$('.colorbox').each(function(){
		$(this).on('click',function(){
			var color_tmp = $(this).css("background") || $(this).css("backgroundColor");
			$('#header,#nav,.left_title,.left_title2,.righttitle').css('background',color_tmp);
			setCookie("color",color_tmp);
			return false;
		})
	})
}
function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
} 
function showCloth(){
	$('#leftbox').on('click',function(){
		Data.value = Data.value + 26.6;
		if(Data.value > 54)
			Data.value = 0;//25.5;
		$('#displayall')[0].style.transform =  'translate3d(-'+Data.value +'%,0px,0px)';
		return false;
	});
	$('#rightbox').on('click',function(){
		Data.value = Data.value - 26.6;
		if(Data.value < 0)
			Data.value = 53.2;//0;
		$('#displayall')[0].style.transform =  'translate3d(-'+Data.value +'%,0px,0px)';
		return false;
	});
}
