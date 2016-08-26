function Iterator(array,cyclic,func){
    this.start = 0;
    this.array = array;
    this.cyclic = cyclic || false;
    this.getParams = func;
    Array.observe(array,this.reactOnChanges);
}
Iterator.prototype.reactOnChanges = function(changes){
    for(var i = 0; i < changes.length; i++){
        if(changes[i].type === 'update')
            continue;
        
    }

}
Iterator.prototype.customize = function(){
    var winParams = this.getParams();
    this.step = winParams[0];
    this.winLength = winParams[1];
    this.end = this.start + this.winLength;
}
Iterator.prototype.current = function(){
     return this.array.slice(this.start,this.end);
}
Iterator.prototype.next = function(){
    if(this.cyclic){
        Iterator.prototype.next = function(){
            var current;
            this.customize();
            this.end = this.end % this.array.length;
            if(this.start < this.end){
                current =  this.current();
            }
            else{
                current = this.array.slice(this.start).concat(this.array.slice(0,this.end));
            }
            this.start = (this.start + this.step) % this.array.length;
            this.end = (this.end + this.step) % this.array.length;
            return current;
        }
    }
    else{
        Iterator.prototype.next = function(){
            var current;
            this.customize();
            if(this.hasNext()){
                var current = this.current();
                this.start += this.step;
                this.end += this.step;
            }
            else {
                this.start = this.array.length - this.winLength;
                this.end = this.array.length; 
                current = this.current();
            }
            return current;
        }
    }
    return this.next();
};
Iterator.prototype.prev = function(){
    if(this.cyclic){
        Iterator.prototype.prev = function(){
            var current;
            this.customize();
            if(this.start < 0)
                this.start = this.array.length + this.start;
            if(this.end < 0)
                this.end = this.array.length + this.end;
            if(this.end > this.array.length)
                this.end = this.end - this.array.length;
            if(this.start < this.end){
                current = this.current();
            }
            else{
                current = this.array.slice(this.start).concat(this.array.slice(0,this.end));
            }
            this.start = this.start - this.step;
            return current;
        }
    }
    else{
        Iterator.prototype.prev = function(){
            this.customize();
            if(this.hasPrev()){
                var current = this.current();
                this.start -= this.step;
                this.end -= this.step;
            }
            else {
                this.start = 0;
                this.end = this.start + this.winLength; 
                var current = this.current();
            }
            return current;
        }
    }
    return this.prev();
}
Iterator.prototype.hasPrev = function(){
    return this.start >= 0;
}
Iterator.prototype.hasNext = function(){
    return this.end <= this.array.length;
}
Iterator.prototype.reset = function(){
    this.start = 0 ;
    this.end = this.start + this.winLength;
}

function chngWinParam() {
    var rez = [];
    rez.push(2);
    rez.push(5);
    return rez;
}





var array = [0,1,2,3,4,5,6,7,8];
var it = new Iterator(array,true,chngWinParam);

array.splice(3,2);
array.splice(5,1,10);
array.push(100);
array[7] = 20;