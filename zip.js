const compressing = require("compressing");
let tf = function(i) {
    return (i < 10 ? '0' :'') + i
};
let t = new Date();
let date = t.getFullYear().toString().slice(2) + tf((t.getMonth() + 1)) + tf(t.getDate()) + tf(t.getHours()) + tf(t.getMinutes())

compressing.zip
    .compressDir("./dist", "./dist-"+date+".zip")
    .then(() => {
        console.log("success");
    })
    .catch(err => {
        console.error(err);
    });
