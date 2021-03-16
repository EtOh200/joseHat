/* Graph Functions */
class Graph {
  constructor() {
    this.nodes = [];
    this.graph = {}; //used like hash map to keep track of all nodes
  };
  setStart(country) {
    this.start = this.graph[country];
    return this.start;
  };
  setEnd(country) {
    this.end = this.graph[country];
    return this.end;
  };
  addNode(n) {
    //add Node to array.
    this.nodes.push(n);
    let country = n.value;
    // Node into "hash". keeping track of all created nodes.
    this.graph[country] = n;
  };
  getNode(country) {
    //check if Node already created 
    var n = this.graph[country];
    return n;
  };
};

/* Node Functions*/
class Node {
  constructor(value) {
    this.value = value; //saves the node value(country code) ex. 'USA'.
    this.edges = []; //keep track of borders.
    this.searched = false; //keep track if node has been searched in que.
    this.parent = null; //keep track of parent node.
  }
  addEdge(neighbor) {
    this.edges.push(neighbor);
    //check both direction 
    neighbor.edges.push(this);
  }
};

module.exports = {Graph,Node}