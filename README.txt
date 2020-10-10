Busy Core
===============
This repo only implements the server/core level functionality for Busy.
This includes the API Routes, the database schemas and libs being used by Busy. 


===TODO===

# Team Management
[-] Schema 
[ ] CRUD
[ ] Billing (Teams to be billed, single users don't)

# Project Management
[-] Schema 
[ ] CRUD

# Issue Tracker 
[-] Schema
[ ] CRUD 

# Comments (Conversation, Limited to Text Comments for initial scope)
[-] Schema
[ ] CRUD 
[ ] Billing


===ARCH===

# Core
The Core is going to be a node binary that you can run on your arch with the runtime packed in 
and thus can be used to create any Client / GUI around it, not going to limit your there.

# Database 
Busy assumes the Database to be PGSQL but since knex takes care of the translations, you can switch the DB to whatever you'd like.

# Routing and Server Base
I went with ftrouter (https://github.com/barelyhuman/ftrouter) which serves as the router on top of node's native http module to 
take care of the REST API. 

# GraphQL?
I found GraphQL to be a little more heavier, while the usecase might help the client to reduce the amount of payload it recieves
,considering the app is built on node, it's already heavy and I wouldn't want to add more bulk. (the project might slowly transition into 
GO Lang if the overall perf drops a lot when serving a lot of users)

===CODE STANDARDS===

I'm just using Standard.js for now.

