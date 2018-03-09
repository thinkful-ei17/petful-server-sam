'use strict';

class _Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
	
  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    } 
    if (this.last) {
      node.next = this.last;
      this.last.previous = node;
    }
    this.last = node;
  }
	
  dequeue() {
    if (this.first === null) {
      return null;
    }
    const node = this.first;
    this.first = this.first.previous;
    if (this.last === node) {
      this.last = null;
    }
    return node.data;
  }
}

const peek = queue => {
  if (queue.first === null) {
    return null;
  }
  return queue.first.data;
};

module.exports = { Queue, peek };