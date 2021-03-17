const fs = require('fs')
//date from countries.json will be read before proceeding. 
//if SQL or noSQL database was used, db should be connected before proceeding. 
const country = fs.readFileSync('countries.json');
const data = JSON.parse(country);

//imports function from tree.js
const { Graph,Node } = require('./tree');

const Controller = {};

Controller.getGraph = (req, res, next) => {
  const graph = new Graph();

  const country = data; 
  if(!country) {
    //if country is undefined = file not created or not read 
      //return error message 
      console.log(res.locals.tree)
    return res.status(400).send('Database error')
  }

  for(let i = 0; i < country.length; i++) {
    let dst = country[i].destination; // dst = destination value, 'USA'
    let border = country[i].borders; //borders of each element
    let countryNode = new Node(dst); // Node is created with dst as value
    graph.addNode(countryNode); //add each Node to tree and hash

    for(let j = 0; j < border.length; j++) { //for each border element
      let borderCountry = border[j]; //for each border 'country'
      let borderNode = graph.getNode(borderCountry); //check if 'country' node exist 
    
      if(borderNode === undefined) {
        //if 'country' node is not found in graph's "hash", create one
        borderNode = new Node(borderCountry)
      }
      countryNode.addEdge(borderNode) //for each Country Node created, add Node to edges
    }
  }
  //save created graph to res message
  res.locals.tree = graph;
  next();
};

//graph could be saved after running once
  //have a checker function to see database(countries) has been updated
    //if not, use the same graph
      //else re-run getGraph 

Controller.getLocation = (req, res, next) => {
  const dataGraph = res.locals.tree; // graph passed from getGraph
  const requestedDestination = req.route.path;
  //clean up path, not case sensitive
  const cleanedDestination = requestedDestination.replace(/[^a-zA-Z ]/,"")

  //set error handling. if dataGraph is undefined, return error msg
  if(!dataGraph) {
    return res.status(400).send('Error retrieving Country List')
  }

  let start = dataGraph.setStart('USA'); //set start point on graph
  let end = dataGraph.setEnd(cleanedDestination) //set end point on graph
  
  let queue = []; //use array as que to execute breadth-first-search

  start.searched = true;
  queue.push(start);

  while(queue.length > 0) {
    //while que is not empty, shift the first node (deque)
    let currentNode = queue.shift();
    if(currentNode === end) {
      //if currentNode is same as value (end path), break loop
      break;
    }
    //else, if currentNode is not the end Node(path) we want to check all border
    let currentEdge = currentNode.edges; 
    for(let i = 0; i < currentEdge.length; i++) {
      let neighbor = currentEdge[i];
      //check if edges(neighbor) has been checked
      if(neighbor.searched === false) {
      //if not checked, push to que and update node property
        neighbor.searched = true;
        neighbor.parent = currentNode;
        queue.push(neighbor);
      }
    }
  }
  let nodePath = [];
  //End(final destination) is pushed to the start (0th ele) of array
  nodePath.push(end);
  //Move to last "end" node. Kept track with each node's parent property
  let nextEnd = end.parent;
  //Well there is a parent, back track through tree(graph)
  while(nextEnd !== null) {
    nodePath.push(nextEnd);
    nextEnd = nextEnd.parent; 
  }

  //Set return path(array) 
  let countryPath = [];
  for(let i = nodePath.length -1; i >= 0; i--) {
    //start from end of array because how nodePath is pushed
    let nodeValue = nodePath[i].value;
    countryPath.push(nodeValue);
  }
  //return message through response. 
  res.locals.path = countryPath;
  res.status(200).send({
    'Destination': cleanedDestination,
    'Path': res.locals.path
  })
};

module.exports = Controller;