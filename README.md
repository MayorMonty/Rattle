# Rattle

Custom REPL for Node.js, with support for startup scripts and more (in the future)

# Installation
As of now, I have not configured rattle to replace the `node` binary, the `rnode` command is created on your computer. Installation is very simple, just like all command line tools for Node.js:

    [sudo] npm install -g rattle

Use sudo if you are running OSX/Linux, if Windows run the command as an Administrator

# Startup Scripts and .noderc
When you type `rnode`, it will act like regular `node`, but with one (visual) difference: When you start up the REPL a message will display:

    rattle vX.X.X
This is a part of the global startup script, which you can locate by typing

    rnode --global

Any javascript you type in there will be execute on ALL REPLs across the entire system (that uses rnode)

## Local .noderc
You can place a .noderc in any directory, which will execute whenever REPLs are opened there (not child folders, yet)
