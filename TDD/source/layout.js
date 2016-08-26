var autocomplete = new AutoCompete();

function createInput(){
	var input = document.createElement('input');
	input.classList.add('input');
	var ul = document.createElement('ul');
	ul.classList.add('autocomplete');
	input.addEventListener('keyup',keyPressHandler);
	document.body.appendChild(input);
	document.body.appendChild(ul);
}
function keyPressHandler(e){

	var inputed = e.target.value;
	var ul = document.querySelector('.autocomplete');
	ul.innerHTML = '';
	var autoCompletedVals = autocomplete.match(inputed);
	for(var i = 0, l = autoCompletedVals.length; i < l; i++){
		var li = document.createElement('li');
		li.classList.add('var');
		li.addEventListener('click',clickHandler);
		li.innerHTML = autoCompletedVals[i] + '';
		ul.appendChild(li);
	}
	if(e.keyCode === 13){
		autocomplete.add(e.target.value);
		e.target.value = '';
	}
}
function clickHandler(e){
	var input = document.querySelector('.input');
	input.value = e.target.innerHTML;
}
createInput();