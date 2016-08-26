function List(){
	this.Head = null;
	this.Tail = null;
};
List.prototype.append = function(item){
	var tempNode = {item:item,next:null,prev:null};
	if(this.Head===null){
		this.Head = this.Tail = tempNode;
	}
	else{
		this.Tail.next = tempNode;
		tempNode.prev = this.Tail;
		this.Tail = tempNode;
	}
	return this;
};
List.prototype.head = function(){
	return this.Head;
};
List.prototype.tail = function(){
	return this.Tail;
};
List.prototype.deleteAt = function(index){
	if(typeof index !== "number"){
		console.log("error.number expected.")
		return this;
	}
	var runer = this.Head;
	var deleted;
	if(runer === null)
		return this;
	for(var i = 0 ;i<index;i++){
		runer = runer.next;
		if(runer === null)
			return this;
	}
	if(runer === this.Head && runer === this.Tail){
		this.Head = this.Tail = null;
		return this;
	}
	if(runer === this.Head){
		this.Head = runer.next;
		runer.next.prev = runer.prev;
		return this;
	}
	if(runer === this.Tail){
		this.Tail = runer.prev;
		runer.prev.next = runer.next;
		return this;
	}
	runer.prev.next = runer.next;
	runer.next.prev = runer.prev;
	return this;

};
List.prototype.at = function(index){
	if(typeof index !== "number"){
		console.log("error.number expected.")
		return undefined;
	}
	var runer = this.Head;
	if(runer === null)
		return undefined;
	for(var i = 0 ;i<index;i++){
		runer = runer.next;
		if(runer === null)
			return undefined;
	}
	return runer.item;
}
List.prototype.insertAt = function(item,index){
	var tempNode = {item:item,next:null,prev:null};
	var runer = this.Head;
	for(var i = 0 ;i<index;i++){
		runer = runer.next;
		if(runer === null){
			this.append(item);
			return this;
		}
	}
	if(runer === this.Head){
		tempNode.next = this.Head;
		this.Head.prev=tempNode;
		this.Head = tempNode;
		return this;
	}
	runer.prev.next = tempNode;
	tempNode.prev = runer.prev;
	tempNode.next=runer;
	runer.prev = tempNode;
	return this;

}
List.prototype.reverse = function(){
	var runer = this.Head;
	while(runer){
		var temp = runer.next;
		runer.next = runer.prev;
		runer.prev = temp;
		runer = runer.prev;
	}
	temp = this.Head;
	this.Head = this.Tail;
	this.Tail = temp;
	return this;
}
List.prototype.each = function(func){
	var runer = this.Head;
	while(runer){
		runer.item=func(runer.item);
		runer = runer.next;
	}
	return this;
}
List.prototype.indexOf = function(item){
	var runer = this.Head;
	var index = 0;
	while(runer){
		if(runer.item===item)
			return index;
		runer = runer.next;
		index ++;
	}
	return undefined;
}
var list = new List();

list.append(2).append(4).append(6).insertAt(10,100).reverse().each(function sq(a){return a*a;});
list.at(100);
list.indexOf(2);