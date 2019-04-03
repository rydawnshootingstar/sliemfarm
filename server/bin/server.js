const app = require('../app/index');

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`server is up on port ${port}`);
});