"use strict";

module.exports = function(grunt) {
  grunt.config.set("jsdoc", {
    dist: {
      src: ["src/*.js"],
      options: {
        destination: "docs"
      }
    },
    ghpages: {
      src: ["src/*.js"],
      options: {
        destination: "gh-pages/docs"
      }
    }
  });

  grunt.loadNpmTasks("grunt-jsdoc");
};