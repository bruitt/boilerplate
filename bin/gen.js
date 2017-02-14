let generateBlock = require("./generator/block")
let generateEntry = require("./generator/entry")
let generateReducer = require("./generator/reducer")

let genType = process.argv[2]
if (genType === "block") {
  generateBlock(process.argv[3])
} else if (genType === "entry") {
  generateEntry(process.argv[3])
} else if (genType === "reducer") {
  generateReducer(process.argv[3])
} else {
  throw new Error("Unknown generator type")
}


// if (genType === "block")
//   { generateBlock(process.argv[3])
//   }
// else if (genType === "entry")
//   { generateEntry(process.argv[3])
//   }
// else if (genType === "reducer")
//   { generateReducer(process.argv[3])
//   }
// else
//   { throw new Error("Unknown generator type")
//   }
