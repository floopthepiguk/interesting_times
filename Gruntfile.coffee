module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      compile:
        files: 'app/lib/application.js': ['app/app.coffee', 'app/**/*.coffee']

    sass:
      dist:
        files:
          'css/lib/application.css': 'css/src/application.scss'
        options:
          style: 'compressed'

    bower_concat:
      all:
        dest: 'app/lib/bower_components.js'

    uglify:
      options:
        banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
      build:
        src:  'app/lib/application.js'
        dest: 'app/lib/application.min.js'
      bower:
        src:  'app/lib/bower_components.js'
        dest: 'app/lib/bower_components.min.js'
        


    watch:
      sass:
        files: ['css/src/*.scss','css/src/**/*.scss']
        tasks: ['sass']
      coffee:
        files: ['app/*.coffee','app/**/*.coffee']
        tasks: ['coffee','uglify:build']
  

  # Load the plugins
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-bower-concat'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task(s).
  grunt.registerTask 'default', ['sass','coffee','bower_concat','uglify']
  return
