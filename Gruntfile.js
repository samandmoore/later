module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    webpack: {
      dev: {
        entry: "./src/index.js",
        sourceMapFilename: "index.js.map",
        output: {
          path: "public/assets/javascript/",
          filename: "index.js",
          pathinfo: true
        },
        module: {
          loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
          ]
        },
        resolve: {
          modulesDirectories: ['node_modules', 'vendor']
        },
        cache: true,
        watch: true,
        debug: true
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      assets: {
        files: ['src/**/*.js'],
        tasks: ['webpack:dev']
      }
    }
  });

  grunt.registerTask('default', ['webpack:dev', 'watch']);
}
