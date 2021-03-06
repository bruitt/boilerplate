let { execSync } = require("child_process")

function t() {
  let op = process.argv[2]

  let getModifiedFilesInTreeCommand = "git diff-tree -r --name-only --no-commit-id HEAD@{1} HEAD"

  if (op === "checkout") {
    console.log(111, process.env.GIT_PARAMS)
    let params = process.env.GIT_PARAMS.split(" ")

    if (params[2] === "0") {
      console.log("Exit early if this was only a file checkout, not a branch change ($3 == 1)")
      return
    }
    getModifiedFilesInTreeCommand = `git diff-tree -r --name-only --no-commit-id ${params[0]} ${params[1]}`
  }


  let sources = execSync(getModifiedFilesInTreeCommand, { encoding: "utf-8" })

  console.log(222, process.argv, sources)
}

t()
