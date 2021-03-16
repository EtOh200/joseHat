# Country List - Overview

## Project Domain
Public Domain hosted on Heroku.
- https://josehatchry.herokuapp.com/
- Possible endpoint: [CAN, USA, MEX, BLZ, GTM, SLV, HND, NIC, CRI, PAN]
- *End point are not case sensitive*
__
## Problem

With provided Country List, find all the Country a driver mush travel through to reach final destination.
- CAN – Canada borders the United States
- USA – The United States borders Canada and Mexico
- MEX – Mexico borders the United States, Guatemala, and Belize
- BLZ – Belize borders Mexico and Guatemala
- GTM – Guatemala borders Mexico, Belize, El Salvador, and Honduras
- SLV – El Salvador borders Guatemala and Honduras
- HND – Honduras borders Guatemala, El Salvador, and Nicaragua
- NIC – Nicaragua borders Honduras and Costa Rica
- CRI – Costa Rica borders Nicaragua and Panama
- PAN – Panama borders Costa Rica

___
## Requirements

Create an endpoint where we can send a country code and see the list of countries.

- Domain end point:
  - ```www.yourdomainname.com/{destination}```
  - ```{destination}``` is a 3 digit country code in North America.
- Should return:
  - ```["USA", ... , "destination"]```
- Example:
  - ```www.yourdomainname.com/BLZ```
  - ```["USA", "MEX", "BLZ"]```
__
## Implementation
### File Structure 
- server.js:
  - This file hosts the server with Node.js using express. It response to any invalid endpoints as ```404 error``` and returns ```Not Found```.
- countries.json:
  - This file is served as lightweight database. The given countries with borders are saved as an ```[Array]```. 
- tree.js:
  - This file contains two ```Class``` Components: ```Node``` & ```Graph```. It is necessary to create a ```tree``` like object. 
- routers.js: 
  - This file contains all possible endpoints. Clearly displays the controller function used.
- controller.js:
  - This file has the function ```getGraph``` that creates ```tree``` like object.
  - It also has the function ```getLocation``` that preforms *Breadth-First-Search* on ```tree``` object. 

***Project is implemented with the mindset to scale as Data Expands***
