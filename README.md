# gulp Demo
Why it pays to use professional tooling even for small and insignificant projects.

I used to write my build tools in Bash and "automate" stuff via Makefiles. I used to create my websites manually without any build tool (since I just edit the HTML, CSS and JS files directly).

It turns out that this is actually a big waste of my time. It also prevents me from adopting standard solutions for common problems. A specific example is the problem of proxies and browsers caching static asstes like CSS and JS files. The symptom is that I have to push repeatedly F5 to see a change in my code.

The best practice solution is to change the filename of the static asset each time the [content changes](https://www.alainschlesser.com/bust-cache-content-hash/). Without automation this is already way beyond my manual editing so that I so far didn't use this simple trick.

This little demo project for a static website shows how easy it is actually to setup and use professional build tooling for websites and how much one can benefit from this.

This project contains [branches](https://git-scm.com/book/id/v2/Git-Branching-Branches-in-a-Nutshell) numbered by the steps in this tutorial, you can switch between the branches to see the individual steps.

## Step 1

Install [NodeJS](https://nodejs.org/), on Ubuntu you can simply `sudo apt install nodejs-legacy npm`.

Create a directory for your project, e.g. `gulp-demo` and change to the directory. Run `npm init -y` to initialize the NodeJS environment. It will create a `package.json` file that describes the project, the node modules it uses and which custom scripts you want to run.