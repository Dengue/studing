var NUM_TOWERS = 3;

var TOWER_WIDTH = 240;
var TOWER_HEIGHT = 280;
var TOWER_XWIDTH = 10;

var DISK_WIDTHS = [ 50, 80, 110, 140, 170, 200, 230 ] ;
var DISK_HEIGHT = 36;

$(function() {
	new Game().init();
	$("#startOver").click(function() {
		new Game().init();;
	});

});

function Game() {
	this.numDisks = $("#numDisks").val();
	this.towers = [];
	this.disks = [];
	this.moves = 0;
}

Game.prototype.init = function() {
	this.clean();
	this.createTowers();
	this.createDisks();
	this.initTowers();
	this.initDisks();
	this.positionDisks();
	this.updateDraggableDisks();
};

Game.prototype.clean = function() {
	$("#game").empty();
	$("#images").empty();
	$("#moves").html(0);

};

Game.prototype.createTowers = function() {
	var tower;
	for (var i = 0; i < NUM_TOWERS; i++) {
		var tower = new Tower(i, TOWER_WIDTH, TOWER_HEIGHT, TOWER_XWIDTH, this.handleDrop.bind(this));// ...
		this.towers.push(tower);

		$("#game").append(tower.createElement());

	}
	$("#images").append(tower.createImageElement());

};

Game.prototype.initTowers = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].init();
	}
};

Game.prototype.createDisks = function() {
	for (var i = 0; i < this.numDisks; i++) {

		var disk = new Disk(i, DISK_WIDTHS[i], DISK_HEIGHT, this.handleDrag.bind(this));//...
		this.disks.push(disk);
		$('#game').append(disk.createImageElement());


	}
	for (var j = this.numDisks - 1; j >= 0; j--) {
		this.towers[0].addDisk(this.disks[j]);
		this.disks[j].setTower(this.towers[0]);
	}
};

Game.prototype.initDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].init();
	}
};

Game.prototype.positionDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].position();
	}
};

Game.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].updateDraggableDisks();
	}
};

Game.prototype.handleDrag = function(event, ui) {

	this.getDisk($(event.target)).setDraggableRevert(true);
};

Game.prototype.handleDrop = function(event, ui) {

	var tower = this.getTower($(event.target));
	var disk = this.getDisk(ui.draggable);
	if (tower.getNum() != disk.getTower().getNum()) {
		this.moves++;
		$("#moves").html(this.moves);
		if (tower.canPlaceDisk(disk)) {
			disk.setDraggableRevert(false);
			tower.moveDisk(disk);
			disk.position();
			this.updateDraggableDisks();
			this.checkSolved();
		}
	}
};

Game.prototype.checkSolved = function() {
	for (var i = 1; i < this.towers.length; i++) {
		if (this.towers[i].getDisks().length == this.disks.length) {
			alert("Solved in " + this.moves + " moves.");

			$("#startOver").click();

			break;
		}
	}
};

Game.prototype.getTower = function(elem) {
	return this.towers[getNum(elem)];
};

Game.prototype.getDisk = function(elem) {
	return this.disks[getNum(elem)];
};

function getNum(o) {
	return getLast(o.attr("id"));
}

function getLast(s) {
	return s.charAt(s.length - 1);
}
