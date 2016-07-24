#!/usr/bin/env node
const repl    = require("repl"),
      vm      = require("vm"),
      fs      = require("fs"),
      path    = require("path"),
      spawn   = require("child_process").spawn,
      package = require("./package");


function insertFile(file, context) {
  fs.readFile(file, function(err, contents) {
    if (err)
      throw err;
    vm.runInContext(contents, context);
  });
}


if (process.argv.includes("--global")) {
  console.log(path.resolve(__dirname, ".noderc"));
/** Hijack the REPL, if asked **/
 } else if (process.argv.length < 3 || process.argv.includes("-i") || process.argv.includes("--interactive")) {

  console.log(`rattle v${package.version}`);

  var cmdline = repl.start("> "),
      context = cmdline.context;

  /** Insert config files **/
  fs.access(localrc = path.resolve(process.cwd(), ".noderc"), function(noLocal) {
    if (!noLocal) {
      insertFile(localrc, context);
    }
  });
  fs.access(globalrc = path.resolve(__dirname, ".noderc"), function(noGlobal) {
    if (!noGlobal && globalrc !== localrc) {
      insertFile(globalrc, context);

    }
  });



} else {
  /** Defer to node.js **/

  var node = spawn("node", process.argv.slice(2));

  node.stdout.pipe(process.stdout);

  node.stderr.pipe(process.stderr);
}
