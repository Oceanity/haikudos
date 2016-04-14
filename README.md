Haikudos
======

A fairly simplistic Node.js module I made for my chatbot to allow it to write Haikus on request and at specific times.  It uses preset word patterns to ensure the result makes sense to the reader.

To add to your node, run the following
```npm install haikudos --save```

And then it can be used as follows
```javascript
var Haikudos = require('haikudos');

Haikudos(function(haiku) {
  console.log(haiku);
});
```
