'use strict';

/*
* Require the path module
*/
const path = require('path');

const exec = require('child_process').exec;

const config = require('_config/_brei.json');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'UCI Enrollment');

/*
 * Call all the stuff "Patterns"
 */
fractal.components.set('title', 'Patterns');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

/*
 * Handlebars Helpers
 */
const helpers = require('./lib/helpers/helpers');
const hbs = require('@frctl/handlebars')({
	helpers: helpers
});

fractal.components.engine(hbs);
fractal.docs.engine(hbs);

/*
 * Final build destination
 */
fractal.web.set('builder.dest', __dirname + config.deploy + '/web');

/*
 * Theme
 */
const mandelbrot = require('@frctl/mandelbrot');

/*
 * Possible skins:
 * aqua | black | blue | default | fuchsia | green | grey | lime | maroon | navy | olive | orange | purple | red | teal | white | yellow
 *
 * default = blue
 *
 * Possible panels: html | view | context | resources | info | notes
 */
const myCustomisedTheme = mandelbrot({
	skin: "black",
	format: "json",
	panels: ["info", "notes", "html", "resources"],
	favicon: '/favicon.ico',
	highlightStyles: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css'
});

fractal.web.theme(myCustomisedTheme);

/*
 * BrowserSync options. What should we do when various static assets update?
 *
 * May need some optimization. Fractal gets REALLY MAD when you update too many things at once.
 */
fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
	ghostMode: false,
	open: "local",
	reloadThrottle: 1000,
	reloadDelay: 1000,
	files: [
		{
			match: ['./assets/scss/**/*.scss'],
			fn: function (event, file) {
				exec('npm run preprocess:css', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					if (stderr) {
						console.error(`ERROR:\n ${stderr}`);
					}
				});
			}
		},
		{
			match: ['./assets/ejs/**/*.js'],
			fn: function (event, file) {
				exec('npm run preprocess:js', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					if (stderr) {
						console.error(`ERROR:\n ${stderr}`);
					}
				});
			}
		},
		{
			match: ['./assets/img/**/*'],
			fn: function (event, file) {
				exec('npm run build:img', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					if (stderr) {
						console.error(`ERROR:\n ${stderr}`);
					}
				});
			}
		}
	]
});
