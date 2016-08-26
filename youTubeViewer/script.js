window.youTubeViewer = function(){
function createHeader(){
	var header = document.createElement('header');
	var div = document.createElement('div');
	var input = document.createElement('input');
	input.classList.add('input-req');
	input.addEventListener('keypress',keyPressHandler);
	div.appendChild(input);
	header.appendChild(div);
	document.body.appendChild(header);
}
function createFooter(){
	var footer = document.createElement('footer');
	var viewSpaceForPaging = document.createElement('div');
	var rightBtn = document.createElement('div');
	rightBtn.innerHTML = '>';
	var leftBtn = document.createElement('div');
	leftBtn.innerHTML = '<';
	rightBtn.classList.add('myButton');
	rightBtn.classList.add('right');
	leftBtn.classList.add('myButton');
	leftBtn.classList.add('left');
	viewSpaceForPaging.classList.add('view-space-paging');
	footer.appendChild(leftBtn);
	footer.appendChild(viewSpaceForPaging);
	footer.appendChild(rightBtn);
	var pagingList = document.createElement('ul');
	pagingList.classList.add('paging-list');
	viewSpaceForPaging.appendChild(pagingList);
	document.body.appendChild(footer);
}
function keyPressHandler(e){
	if(e.keyCode===13 && e.target.value != ''){
		corsRequest.sendCorsRequest(e.target.value,corsRequest.convertYouTubeResponseToClipList);
	}
}
function removeChildren(node) {
    while (node.firstChild) {
    	node.removeChild(node.firstChild);
	}
}

var corsRequest = {
	clipList:[],
	createCorsRequest:function(){
		var req = new XMLHttpRequest();
		if ('withCredentials' in req) {
			return req;
		}
		else if (typeof XDomainRequest != 'undefined'){
			req = new XDomainRequest();
			return req;
		}
		else{
			return null;
		}
	},
	sendCorsRequest:function(searchText,callback){
		var req = corsRequest.createCorsRequest();
		req.onreadystatechange = function(){
			if(req.readyState === 4){
				if(req.status >= 200 && req.status <= 300 || req.status === 304){
					corsRequest.clipList = callback(JSON.parse(req.responseText));
					mainContent.drawContent(corsRequest.clipList);
					paging.drawPaging();
				}
			}
		}
		req.open('GET','http://gdata.youtube.com/feeds/api/videos/?v=2&alt=json&max-results=15&start-index=1&q=' + searchText);
		req.send(null);
	},
	convertYouTubeResponseToClipList:function(rawYouTubeData){
		var clipList = [];
        var entries = rawYouTubeData.feed.entry;
        if (entries) {
            for (var i = 0, l = entries.length; i < l; i++){
                var entry = entries[i];
                var date = new Date(Date.parse(entry.updated.$t));
                var shortId = entry.id.$t.match(/video:.*/).toString().split(":")[1];
                clipList.push({
                    id: shortId,
                    youtubeLink: 'http://www.youtube.com/watch?v=' + shortId,
                    title: entry.title.$t,
                    thumbnail: entry.media$group.media$thumbnail[1].url,
                    description: entry.media$group.media$description.$t,
                    author: entry.author[0].name.$t,
                    publishDate: date.toUTCString(),
                    viewCount: entry.yt$statistics.viewCount
                });
            }
        }
        return clipList;
	}
};

var mainContent = {
	actualSizeOfComponent:0,
	actualSizeOfViewSpace:0,
	listLength:0,
	actualComponentsInView:0,
	getListLength:function(){
		var ul = document.querySelector('.clip-list');
		mainContent.listLength = ul.children.length;
	},
	canculateActualComponents:function(){
		mainContent.actualComponentsInView = Math.floor(mainContent.actualSizeOfViewSpace / (mainContent.actualSizeOfComponent));
	},
	onResizeHandler:function(e){
		var viewspace = document.querySelector('.view-space');
		var computedStyle = getComputedStyle(viewspace)
		if(mainContent.actualSizeOfViewSpace !== parseInt(computedStyle.width,10)){
			mainContent.getSizeOfComponentsFromCSS();
			mainContent.getSizeOfViewSpaceFromCSS();
			mainContent.getListLength();
			mainContent.canculateActualComponents();
			paging.drawPaging();
		}
	},
	drawContent:function(clipList){
		if(!clipList)
			return;
		if(clipList.length === 0){
			var main = document.createElement('div');
			main.classList.add('main-content');
			var viewSpace = document.createElement('div');
			viewSpace.classList.add('view-space');
			var UlClipList = document.createElement('ul');
			UlClipList.classList.add('clip-list');
			viewSpace.appendChild(UlClipList);
			main.appendChild(viewSpace);
			document.body.appendChild(main);
		}
		else{
			var main = document.querySelector('.main-content');
			var ul = document.querySelector('.clip-list');
			removeChildren(ul);			
			for(var i = 0,l = clipList.length; i < l; i++){
				var li = document.createElement('li');		
				li.appendChild(mainContent.createComponent(clipList[i]));
				ul.appendChild(li);
				
			}
			document.querySelector('.view-space-paging').style.display = 'block';
			main.addEventListener('mousedown',swiper.start);
			main.addEventListener('mouseup',swiper.end);
			main.addEventListener('touchstart',swiper.touchStartHandler);
			main.addEventListener('touchend',swiper.touchEndHandler);
			swiper.reset();
			paging.reset();
			mainContent.getSizeOfComponentsFromCSS();
			mainContent.getSizeOfViewSpaceFromCSS();
			mainContent.getListLength();
			mainContent.canculateActualComponents();
			window.addEventListener('resize',mainContent.onResizeHandler);
		}

	},
	getSizeOfComponentsFromCSS:function(){
		var component = document.querySelector('.component');
		var computedStyle = getComputedStyle(component)
		mainContent.actualSizeOfComponent = parseInt(computedStyle.width,10) + parseInt(computedStyle.marginLeft,10) + parseInt(computedStyle.marginRight,10);
	},
	getSizeOfViewSpaceFromCSS:function(){
		var viewspace = document.querySelector('.view-space');
		var computedStyle = getComputedStyle(viewspace)
		mainContent.actualSizeOfViewSpace = parseInt(computedStyle.width,10);
	},
	createComponent:function(rawYouTubeData){
		var color = ['#4a99be','#87ceeb','#cde2ed','yellow','#82c1df ','#8cbed6','green','orange','#95bacc'];
		var component = document.createElement('div');
		component.classList.add('component');
		component.setAttribute('id',rawYouTubeData.id);
		component.style.backgroundColor = color[Math.floor(Math.random() * 8)];
		component.innerHTML = '<div class= "title" >' + rawYouTubeData.title + ' </div>';
		var video = document.createElement('div');
		video.classList.add('video');
		video.innerHTML = '<img class="imges" src= "http://img.youtube.com/vi/' +rawYouTubeData.id + '/0.jpg" > \
    		<iframe src= "" allowfullscreen=" "frameborder="0"></iframe> '
		component.appendChild(video);
    	component.innerHTML += '<div class = "description"> ' + rawYouTubeData.description.substring(10,rawYouTubeData.description.length - 10)+ '</div> \
   	 	<div class= "author">' + rawYouTubeData.author + '</div> \
   	 	<div class= "data">' + rawYouTubeData.publishDate + '</div> \
    	<div class= "views">' + rawYouTubeData.viewCount + '</div>' ;
    	component.addEventListener('click',function(e){mainContent.videoHandler(e,rawYouTubeData,this) });
		return component;
	},
	videoHandler:function(e,rawYouTubeData,elem){
		var videos = document.querySelectorAll('.video');
		for(var i = 0,l = videos.length; i < l; i++){
			videos[i].getElementsByTagName('img')[0].style.height = '250px';
			videos[i].getElementsByTagName('iframe')[0].style.height = '0px';
			videos[i].getElementsByTagName('iframe')[0].src = '';
		}
		elem.getElementsByTagName('iframe')[0].style.height = '250px';
		elem.getElementsByTagName('img')[0].style.height = '0px';
		var url = rawYouTubeData.youtubeLink;
		url = url.replace("watch?v=", "embed/"); 
		elem.getElementsByTagName('iframe')[0].src = url;
	}
};
var swiper = {
	startPoint:0,
	endPoint:0,
	position:0,
	start:function(e){
		var wrapper = document.querySelector('.main-content');
		swiper.startPoint = e.clientX;
		wrapper.style.cursor = '-webkit-grabbing';
		e.preventDefault();
	},
	end:function(e){
		var wrapper = document.querySelector('.main-content');
		swiper.endPoint = e.clientX;
		swiper.doSwipe();
		wrapper.style.cursor = '-webkit-grab';
		e.preventDefault();
	},
	touchStartHandler:function(e){
		if (e.targetTouches.length == 1) {
    		var touch = e.targetTouches[0];
    		swiper.startPoint = touch.clientX;
    	}
    	e.preventDefault();
	},
	touchEndHandler:function(e){
    		var touch = e.changedTouches[0];
			swiper.endPoint = touch.clientX;
			swiper.doSwipe();
    	e.preventDefault();
	},
	doSwipe:function(){
		var ul = document.querySelector('.clip-list');
		var shift = swiper.endPoint - swiper.startPoint;
		if(Math.abs(shift) > 100){
			if(shift > 0){
				swiper.position = Math.min(0,swiper.position+mainContent.actualSizeOfComponent*mainContent.actualComponentsInView);
				if(paging.currentPage > 0){
					document.querySelectorAll('.paging-list > li')[paging.currentPage].classList.remove('current');
					paging.currentPage--;
					document.querySelectorAll('.paging-list > li')[paging.currentPage].classList.add('current');
				}
			}
			else{
				swiper.position = Math.max((mainContent.listLength - mainContent.actualComponentsInView)*(-mainContent.actualSizeOfComponent),swiper.position-mainContent.actualSizeOfComponent*mainContent.actualComponentsInView);
				if(paging.currentPage < paging.pagingLength-1){
					document.querySelectorAll('.paging-list > li')[paging.currentPage].classList.remove('current');
					paging.currentPage++;
					document.querySelectorAll('.paging-list > li')[paging.currentPage].classList.add('current');
				}
			}
		}
		ul.style.marginLeft = swiper.position + 'px';
		paging.goToPage = paging.currentPage;
		paging.movePaging();
	},
	reset:function(){
		swiper.position = 0;
		var ul = document.querySelector('.clip-list');
		ul.style.marginLeft = swiper.position + 'px';
	}
};
var paging = {
	currentPage:0,
	goToPage:0,
	pagingLength:0,
	actualSizeOfPagingComponent:0,
	getSizeOfPagingComponentsFromCSS:function(){
		var component = document.querySelector('.paging-component');
		var computedStyle = getComputedStyle(component)
		paging.actualSizeOfPagingComponent = parseInt(computedStyle.width,10) + parseInt(computedStyle.marginLeft,10) + parseInt(computedStyle.marginRight,10) +
		2*parseInt(computedStyle.borderWidth,10);
		return paging.actualSizeOfPagingComponent;
	},
	drawPaging:function(){
		var ul = document.querySelector('.paging-list');
		removeChildren(ul);
		var color = ['blue','red','aqua','yellow','white','black','green','orange','purple'];
		paging.pagingLength = Math.ceil(mainContent.listLength/mainContent.actualComponentsInView);
		for(var i = 0; i < paging.pagingLength; i++){
			var li = document.createElement('li');
			li.classList.add('paging-component');
			ul.appendChild(li);
		}
		paging.currentPage = Math.floor(paging.currentPage/mainContent.actualComponentsInView);
		ul.children[paging.currentPage].classList.add('current');
		ul.style.marginLeft = - (paging.currentPage) * paging.getSizeOfPagingComponentsFromCSS() + 'px';
		ul.addEventListener('click',paging.onClickHandler);
		var right = document.querySelector('.right');
		var left = document.querySelector('.left');
		right.addEventListener('click',paging.buttonsHandler);
		left.addEventListener('click',paging.buttonsHandler);
	},
	onClickHandler:function(e){
		if(e.target instanceof HTMLUListElement){
			return;
		}
		var ulPaging = document.querySelector('.paging-list');
		ulPaging.children[paging.currentPage].classList.remove('current');
		paging.goToPage = Array.prototype.indexOf.call(ulPaging.children,e.target);
		paging.movePaging();
		paging.currentPage = paging.goToPage;
		ulPaging.children[paging.currentPage].classList.add('current');
		var ulClips = document.querySelector('.clip-list');
		swiper.position =  Math.max((mainContent.listLength - mainContent.actualComponentsInView)*(-mainContent.actualSizeOfComponent),-paging.currentPage * mainContent.actualComponentsInView * mainContent.actualSizeOfComponent);
		ulClips.style.marginLeft = swiper.position + 'px';
	},
	buttonsHandler:function(e){
		var ulPaging = document.querySelector('.paging-list');
		ulPaging.children[paging.currentPage].classList.remove('current');
		if(e.target.classList.contains('right')){
			if(paging.currentPage === paging.pagingLength - 1){
				ulPaging.children[paging.currentPage].classList.add('current');
				return;
			}
			paging.currentPage++;
		}
		if(e.target.classList.contains('left')){
			if(paging.currentPage === 0){
				ulPaging.children[paging.currentPage].classList.add('current');
				return;
			}
			paging.currentPage--;
		}	
		ulPaging.children[paging.currentPage].classList.add('current');
		paging.goToPage = paging.currentPage;
		paging.movePaging();
		var ulClips = document.querySelector('.clip-list');
		swiper.position =  Math.max((mainContent.listLength - mainContent.actualComponentsInView)*(-mainContent.actualSizeOfComponent),-paging.currentPage * mainContent.actualComponentsInView * mainContent.actualSizeOfComponent);
		ulClips.style.marginLeft = swiper.position + 'px';

	},
	reset:function(){
		paging.currentPage = 0;
		var ul = document.querySelector('.paging-list');
		ul.style.marginLeft = 0 + 'px';
	},
	movePaging:function(){
		var ulPaging = document.querySelector('.paging-list');
		if(paging.goToPage === 0 || paging.goToPage === 1){
			ulPaging.style.marginLeft = 0 + 'px';
		}
		if(paging.goToPage === ulPaging.children.length - 1 || paging.goToPage === ulPaging.children.length -2){
			ulPaging.style.marginLeft = -(ulPaging.children.length -5)*paging.getSizeOfPagingComponentsFromCSS() + 'px';
		}
		if(paging.goToPage - 2 >= 0 && paging.goToPage + 2 < ulPaging.children.length){
			var razn = paging.goToPage - 2;
			ulPaging.style.marginLeft = -razn * paging.getSizeOfPagingComponentsFromCSS() + 'px';
		}
	}
}

createHeader();
mainContent.drawContent(corsRequest.clipList);
createFooter();
}
youTubeViewer();