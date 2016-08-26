window.onload = main;
function main(){
	var toastsBtn = document.getElementById("toastsBtn");
	toastsBtn.addEventListener("click",addToasts);
}


function addToasts(){
	var toasts = document.getElementsByClassName("toasts-list")[0]
	var newToast = document.createElement("li");
	newToast.classList.toggle("toast");
	newToast.innerHTML = new Date();
	newToast.addEventListener("webkitAnimationEnd",hideToast,false);
	toasts.appendChild(newToast);
}

function hideToast(e){
	setTimeout(function(){
		e.target.classList.add("hide");
		e.target.addEventListener("webkitAnimationEnd",function(e){
			e.target.remove();
		},false);
	},3000);
}