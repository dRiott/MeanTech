# MeanTech
This is a tutorial project that will develop into a D3 Data project.

Modules:
1. Body-Parser: 
    - provides several middlewares to handle request data
    

2. Connect-Flash:
    - Stores temporary messages in a session object called flash. 
    - Messages stored in the flash object will be cleared once they are presented to the user.
    
3. Crypto:
    - Used with Passport to hash passwords.
    
4. EJS:
    - simple templating language that lets you generate HTML markup with plain JavaScript.
    
5. Express:
    - Express is built on top of Connect and it uses its middleware architecture. 
    - Extends Connect to allow a variety of common web application use cases:
      HTML template engines, various data format outputs, routing system, etc
 
6. Express-Session:
   - Required by Connect-Flash.
   
7. Mongoose: 
    - Mongoose is a Node.js ODM (object document mapper) module that translates 
      your objects in code to the document representation of the data in MongoDB.
    - While MongoDB doesn't enforce a schema, Mongoose offers a stricter schema approach.
    
8. Passport:
    - Passport is a Node.js authentication middleware that authenticates requests sent to your Express application. 
    - Offers both local authentication (username/password) [via Module: Passport-local]
      and OAuth authentication (Facebook, Twitter, Github, Google...).        

9. Passport-Twitter:
    - For Twitter OAuth
