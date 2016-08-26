var wrapper = document.querySelector('.wrapper');
var ul = document.querySelector('ul');


var swiper = {
	startPoint:0,
	endPoint:0,
	position:0,
	start:function(e){
		swiper.startPoint = e.clientX;
		wrapper.style.cursor = '-webkit-grabbing';
		e.preventDefault();
	},
	end:function(e){
		swiper.endPoint = e.clientX;
		swiper.doSwipe();
		wrapper.style.cursor = '-webkit-grab';
		e.preventDefault();
	},
	doSwipe:function(){
		var ul = document.querySelector('ul');
		var shift = swiper.endPoint - swiper.startPoint;
		if(Math.abs(shift) > 20){
			if(shift > 0){
				swiper.position += 100;
			}
			else{
				swiper.position -=100;
			}
		}
		ul.style.marginLeft = swiper.position + 'px';

	}

}
var paging = {
	currentPage:0,
	goToPage:0,
	onClickHandler:function(e){
		if(e.target instanceof HTMLUListElement){
			return;
		}
		var components = document.querySelectorAll('.component');
		paging.goToPage = Array.prototype.indexOf.call(components,e.target);
		if(paging.goToPage === 0 || paging.goToPage === 1){
			ul.style.marginLeft = 0 + 'px';
		}
		if(paging.goToPage === components.length - 1 || paging.goToPage === components.length -2){
			ul.style.marginLeft = -(components.length -5)*100 + 'px';
		}
		if(paging.goToPage - 2 >= 0 && paging.goToPage + 2 < components.length){
			var razn = paging.goToPage - 2;
			ul.style.marginLeft = -razn * 100 + 'px';
		}
		paging.currentPage = paging.goToPage;
	}
}
wrapper.onmousedown = swiper.start;

wrapper.onmouseup = swiper.end;

ul.onclick = paging.onClickHandler;
console.log(ul.children);
