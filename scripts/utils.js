
var gUtils = {};

gUtils.OrderingBuffer = function(isNext, callback){
    this.buffer = [];
    this.lastPopped = null;
    this.isNext = isNext;
    this.callback = callback;
}

gUtils.OrderingBuffer.prototype.add = function(obj){
    this.buffer.push(obj);
    var n;
    while(n=this._getNext()){
        this.callback(undefined, n);
    }
}

gUtils.OrderingBuffer.prototype._getNext = function(){
    for(var i=0; i<this.buffer.length; i++){

        var a = this.lastPopped,
            b = this.buffer[i];

        if(this.isNext(a, b)){
            this.lastPopped = this.buffer[i];
            return this.buffer.splice(i, 1)[0];
        }
    }
}
