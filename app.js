const Koa = require('koa');
const bodyParser = require("koa-body-parser");
const validator = require("validatorjs"); 
const app = new Koa();

app.use(bodyParser());
const validateRules = {
    id: "required|integer",
    name: "required|string",
    email: "required|email"
};

app.use((ctx) => {
    const data = ctx.request.body;
    const valid = new validator(data, validateRules);
    if (valid.passes()) {
      ctx.status = 200;
      ctx.body = {
        ID: data.id,
        Name: data.name,
        Email: data.email
      }; 
    } else {
      ctx.status = 400;
      ctx.body = "data is invalid";
    }
});

app.listen(8000,()=>{
  console.log("running port 8000")
});
