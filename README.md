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

## Step 2

Let's create a source directory named `src` and add a simple website with an HTML file for the content, a CSS file for the styling and a JS file for browser-side code.

You can simply copy my example [src](blob/master/src/) folder or add your own.

Open the `index.html` file in a browser to see that it works and looks like this:

![image](https://user-images.githubusercontent.com/101384/30482826-d5d9ae86-9a24-11e7-947a-7b2294ce7bd9.png)

## Step 3

I found [gulp](https://gulpjs.com/) to be the "right" combination between features and ease-of-use. To get started with gulp we simply install a bunch of node modules and create a simple Javascript file that automates *building our website*: `npm install -D del gulp gulp-apimocker gulp-footer gulp-if gulp-load-plugins gulp-rev gulp-rev-replace
`

Thanks to the `-D` option npm saves this list of modules in the `package.json` file so that we can later on, e.g. after a fresh checkout, reinstall all of that with a simple `npm install`.

Gulp recipes (called "tasks") are actually a Javascript program stored ina "gulp file", which is simple a file named `gulpfile.js` in the top level directory of a project. An initial gulp file can be as simple as this:

```javascript
const gulp = require('gulp');

gulp.task('clean', function() {
  return require('del')(['out']);
});

gulp.task('build', ['clean'], function(){
  return gulp.src(['src/**'])
    .pipe(gulp.dest('out'));
})

gulp.task('default', ['build']);
```

I find this easy enough to read, please look at other gulp tutorials and the [documentation](https://github.com/gulpjs/gulp/tree/master/docs) for more details.

To run this program from the command line we add this custom script to the `package.json`:

```json
{
  ...
  "scripts": {
    "build": "gulp build"
  }
  ...
}
```

The effect is that we can invoke gulp to run the `build` task like this:

```
$ npm run build

> gulp-intro@1.0.0 build /.../gulp-demo
> gulp build

[14:58:11] Using gulpfile /.../gulp-demo/gulpfile.js
[14:58:11] Starting 'clean'...
[14:58:11] Finished 'clean' after 26 ms
[14:58:11] Starting 'build'...
[14:58:11] Finished 'build' after 30 ms
```

Now you can inspect the *built* website in the `out/` directory. It will look exactly like the website in the `src/` directory because the only thing that we ask gulp to do is to copy the files from `src/` to `out/`.

## Step 4

Just copying files is obviously not interesting. The first really useful feature is a local development webserver to see the website in a browser. It should automatically run the build task whenever I change a file in the `src/` directory.

I like the [apimocker](https://github.com/gstroup/apimocker) webserver. It can not only serve static files but also allows to [mock]() API calls or to pass API calls to a real backend server.

The following gulp file adds a new task `apimocker` that not only starts the web server but also starts a *watcher* that re-runs the build task each time some source file changes:

```javascript
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return require('del')(['out']);
});

gulp.task('build', ['clean'], function(){
  return gulp.src(['src/**'])
    .pipe(gulp.dest('out'));
})

gulp.task('apimocker', ['build'], function(){
  gulp.watch('src/**', ['build'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  return $.apimocker.start({
    staticDirectory: 'out',
    staticPath: '/'
  });
});

gulp.task('default', ['build']);
```

We can again add this task as a custom script in npm via this addition to the `package.json`:

```json
{
  ...
  "scripts": {
    "build": "gulp build",
    "dev": "gulp apimocker"
  },
  ...
}
```

Run the development server with `npm run dev`. Open a web browser and go to http://localhost:8888 to see the website. If you now change a file in the `src/` directory then you can see how gulp immediately rebuilds the website so that you can now reload the website in the browser.