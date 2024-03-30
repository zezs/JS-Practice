const figlet = require("figlet");
const c = require('colors')
const jokes = require("give-me-a-joke");



figlet("1234567890usvkadnvkjndfkvnkadnvkadnfkjvndkjvjkdsjkvjksdjkevjkekvnejkevnjkenvkjenjkfnekjnvjkasnvanewjkvnejknvjkesnjkvnsaekjnv", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data.rainbow);
  });

 