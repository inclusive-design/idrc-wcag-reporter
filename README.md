# IDRC WCAG Reporter

This repository lets you create WCAG Audit Reports from Markdown files. It is based on [Eleventy WCAG Reporter](https://github.com/hidde/eleventy-wcag-reporter)
by Hidde de Vries.

## Usage

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at [http://localhost:8080](http://localhost:8080).

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t idrc-wcag-reporter .`
* Run the container: `docker run --name idrc-wcag-reporter -p 8000:80 idrc-wcag-reporter`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./_site/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./_site/`
directory to the web root of your server.
