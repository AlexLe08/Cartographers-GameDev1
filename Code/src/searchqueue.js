function Node (data, priority) {
    this.data = data;
    this.priority = priority;
}
Node.prototype.toString = function(){return this.priority}

// takes an array of objects with {data, priority}
function search_t (arr) {
    this.heap = [null];
	this.persistent = 0;
    if (arr) for (i=0; i< arr.length; i++)
        this.push(arr[i].data, arr[i].priority);
}

search_t.prototype = {
    push: function(data, priority) {
        var node = new Node(data, priority + this.persistent);
        this.bubble(this.heap.push(node) -1);      
    },
    
    // removes and returns the data of highest priority
    pop: function() {
		if ( this.heap.length == 1 )
			return undefined;
		var topVal = this.heap[1].data;
		this.persistent += this.heap[1].priority - this.persistent;
		if ( this.heap.length == 2 ) {
			this.heap.pop();
		} else {
			var topVal = this.heap[1].data;
			this.heap[1] = this.heap.pop();
			this.sink(1);
		}
		return topVal;
    },
    
    // bubbles node i up the binary tree based on
    // priority until heap conditions are restored
    bubble: function(i) {
        while (i > 1) { 
            var parentIndex = i >> 1; // <=> floor(i/2)
            
            // if equal, no bubble (maintains insertion order)
            if (!this.isHigherPriority(i, parentIndex)) break;
            
            this.swap(i, parentIndex);
            i = parentIndex;
    }   },
    
    // does the opposite of the bubble() function
    sink: function(i) {
        while (i*2 < this.heap.length) {
            // if equal, left bubbles (maintains insertion order)
            var leftHigher = (i*2+1==this.heap.length)||(!this.isHigherPriority(i*2+1, i*2));
            var childIndex = leftHigher? i*2 : i*2+1;
            
            // if equal, sink happens (maintains insertion order)
            if (this.isHigherPriority(i,childIndex)) break;
            
            this.swap(i, childIndex);
            i = childIndex;
    }   },
        
    // swaps the addresses of 2 nodes
    swap: function(i,j) {
        var temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    },
        
    // returns true if node i is higher priority than j
    isHigherPriority: function(i,j) {
        return this.heap[i].priority < this.heap[j].priority;
    },
	
	size: function() {
		return this.heap.length - 1;
	}
}