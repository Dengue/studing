function make(){
    var args=[];
    for(var i = 0;i < arguments.length; i++){
        args.push(arguments[i]);
    }  
    return make = function(){
        for(var i = 0;i < arguments.length; i++){
            if(arguments[i] instanceof Function){
                var rez = args.reduce(sum);
                args = [];
                return rez;
            }
            else{
                args.push(arguments[i]);        
            }
        }
        return make;
    }
}
function sum(a,b){
    return a + b;
}