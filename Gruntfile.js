'use strict';

var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), '.grunt', 'config'),
    loadGruntTasks: {
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    }
  });

  grunt.registerTask('dev',[]);
  grunt.registerTask('test',[
    'jshint',
    'nodeunit'
  ]);
  grunt.registerTask('build',[]);

  grunt.registerTask('default', ['test']);

};
