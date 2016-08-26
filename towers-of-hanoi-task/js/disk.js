function Disk(num, width, height, dragHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.dragHandler = dragHandler;
	this.tower = null;
}

Disk.prototype.getNum = function() {
	return this.num;
};

Disk.prototype.getTower = function() {
	return this.tower;
};

Disk.prototype.setTower = function(tower) {
	this.tower = tower;
};


Disk.prototype.getImageElement = function() {
	return $("#diskimg" + this.num);
};


Disk.prototype.createImageElement = function() {
	return $("<img id='diskimg" + this.num +"' width = '" + this.width + "' height = '" +this.height+ "' src='img/disk" + this.num + ".gif'  />");
};

Disk.prototype.init = function() {
	this.setDraggable(true);
};

Disk.prototype.setDraggable = function(enabled) {
	var elem = this.getImageElement();
	if(enabled){
		elem.draggable({drag:this.dragHandler});
	}
	else{
		if(elem.hasClass('ui-draggable')){
			elem.draggable('destroy');
		}
	}



};

Disk.prototype.setDraggableRevert = function(enabled) {
	var img = this.getImageElement();
	img.draggable('option','revert',enabled);


};

Disk.prototype.position = function() {
	var elem = this.getImageElement();
	var top = this.tower.calcDiskTop(this.num, this.height);
	var left = this.tower.calcDiskLeft(this.width);



	elem.css({position:"absolute",top:top,left:left});

};