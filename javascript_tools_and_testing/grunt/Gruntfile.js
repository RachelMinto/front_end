module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "public/javascripts/application.js": ["public/javascripts/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/all.js"
      }
    }
  });
  // Load any Grunt plugins by name here
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-bower-concat");

  // Register task names here. These are run by calling the task by name when
  // using the Grunt CLI. The "default" task is run when running the Grunt CLI
  // without a task name.
  grunt.registerTask("default", ["bower_concat", "uglify"]);
};