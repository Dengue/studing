(function(){

window.onload = createToDoList;
window.onunload = function() {
  localStorage.todosText = todosText;
  localStorage.dones = dones;
}


var todos;
var todosText = [];
var dones = [];

function createToDoList(){
	document.body.innerHTML = '<section id="main" class = "main"></section>';
	document.getElementById('main').innerHTML = '<header id = "header"></header> \
	<section id = "todo-list-background"></section> \
	<footer id = "footer"></footer>';
	var listBackground =  document.getElementById('todo-list-background');
	listBackground.innerHTML = '<input class = "input" type ="text" placeholder="What needs to be done?" autofocus></input>';
	listBackground.innerHTML += '<ul id="todo-list" class="todo-list"></ul>'
	listBackground.innerHTML += '<div class ="show-buttons" id ="all">All</div><div class ="show-buttons" id ="unfinished">Active</div>';
	listBackground.innerHTML += '<div class ="show-buttons" id ="finished">Completed</div>';
	var todoList = document.getElementById('todo-list');
	todos = todoList.getElementsByTagName('li');
	if(localStorage.todosText)
		createToDosFromStorage(todoList);	
	setShowHandlers();
	listBackground.firstChild.addEventListener('keypress',function(e){ keyHandler(e,todoList); },true);
}
function keyHandler(e,todoList){
	var enterKey = 13;
	if(e.keyCode===enterKey && e.target.value != ''){
		todosText.push(e.target.value);

		var li = document.createElement('li');

		var view = createView(e);

		var deleteBtn = createDeleteBtn();

		var done = creteDone();
		dones.push('0');

		var confirmBtn = createCongirmBtn(done);

		li.addEventListener('mouseenter',function(){
			confirmBtn.classList.toggle('hidden');
			deleteBtn.classList.toggle('hidden');
		},false);
		li.addEventListener('mouseleave',function(){
			confirmBtn.classList.toggle('hidden');
			deleteBtn.classList.toggle('hidden');
		},false);
		li.appendChild(deleteBtn);
		li.appendChild(confirmBtn);
		li.appendChild(view);
		li.appendChild(done);
		todoList.appendChild(li);


		e.target.value = '';
		
	}
}
function deleteHandler(e){
	var indexToDelete = Array.prototype.indexOf.call(todos,e.target.parentNode);
	todosText.splice(indexToDelete,1);
	dones.splice(indexToDelete,1);
	e.target.parentNode.remove();
}
function confirmHandler(e,done){

	var indexToConfirm = Array.prototype.indexOf.call(todos,e.target.parentNode);
	if(dones[indexToConfirm] === '0')
		dones[indexToConfirm] = '1';
	else
		dones[indexToConfirm] = '0';
	done.classList.toggle('hidden');
}
function createCongirmBtn(done){
	var confirmBtn = document.createElement('button');
	confirmBtn.classList.add('btn');
	confirmBtn.classList.add('confirm');
	confirmBtn.classList.add('hidden');
	confirmBtn.addEventListener('click',function(e){ confirmHandler(e,done); })
	return confirmBtn;
}
function createView(e){
	var view = document.createElement('span');
	view.classList.add('view');
	view.innerHTML = e.target.value;
	return view;
}
function createDeleteBtn(){
	var deleteBtn = document.createElement('button');
	deleteBtn.classList.add('btn');
	deleteBtn.classList.add('close');
	deleteBtn.classList.add('hidden');
	deleteBtn.addEventListener('click',deleteHandler)
	return deleteBtn;
}
function creteDone(){
	var done = document.createElement('span');
	done.classList.add('view');
	done.classList.add('done');
	done.classList.toggle('hidden');
	done.innerHTML = "Done!";
	return done;
}
function createToDosFromStorage(todoList){
	var todosTextFromStorage = localStorage.todosText.split(',');
	var donesFromStorage = localStorage.dones.split(',');
	for(var i =0;i<todosTextFromStorage.length;i++){
		todosText.push(todosTextFromStorage[i]);
		dones.push(donesFromStorage[i]);

		var li = document.createElement('li');

		var view = document.createElement('span');
		view.classList.add('view');
		view.innerHTML = todosTextFromStorage[i];

		var deleteBtn = createDeleteBtn();

		var done = creteDone();
		if(donesFromStorage[i] === '1')
			done.classList.toggle('hidden');

		var confirmBtn = createCongirmBtn(done);

		(function(deleteBtn,confirmBtn){
			li.addEventListener('mouseenter',function(){
			confirmBtn.classList.toggle('hidden');
			deleteBtn.classList.toggle('hidden');
		},false);
		})(deleteBtn,confirmBtn);
		(function(deleteBtn,confirmBtn){
			li.addEventListener('mouseleave',function(){
			confirmBtn.classList.toggle('hidden');
			deleteBtn.classList.toggle('hidden');
		},false);
		})(deleteBtn,confirmBtn);
		li.appendChild(deleteBtn);
		li.appendChild(confirmBtn);
		li.appendChild(view);
		li.appendChild(done);
		todoList.appendChild(li);
	}
}
function setShowHandlers(){
	var all = document.getElementById('all');
	var unfinished = document.getElementById('unfinished');
	var finished = document.getElementById('finished');

	unfinished.addEventListener('click',function(e){
		for(var i = 0;i < todos.length;i++){
			todos[i].classList.remove('none');
			if(!todos[i].getElementsByClassName('done')[0].classList.contains('hidden'))
				todos[i].classList.add('none');
		}
	});
	finished.addEventListener('click',function(e){
		for(var i = 0;i < todos.length;i++){
			todos[i].classList.remove('none');
			if(todos[i].getElementsByClassName('done')[0].classList.contains('hidden'))
				todos[i].classList.add('none');
		}
	});
	all.addEventListener('click',function(e){
		for(var i = 0;i < todos.length;i++){
			todos[i].classList.remove('none');
		}
	});
}


})();