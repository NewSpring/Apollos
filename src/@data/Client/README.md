## Data Client

### Important!

The data client uses introspection to identify what the client schema should look like 
(this is important for fragments and being able to resolve and update them easily). If your schema fragments change, make sure 
to create a new introspection result and deploy it to your clients by following [this](https://www.apollographql.com/docs/react/recipes/fragment-matching.html) snippet of code. The result should be posted at `./index.js#L19`.


