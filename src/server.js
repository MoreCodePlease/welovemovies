const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    
  })
  .catch(console.error);

 knex.seed.run().then((response) =>{
  console.log("seeds", app.response);
  app.listen(PORT, listener);
}).catch(console.error);
 

