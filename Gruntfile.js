module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Shell commands.
        shell: {
            jekyllServe: {
                command: 'jekyll serve'
            },

            gruntRecessApp: {
                command: 'grunt recess:app'
            },

            gruntConcat: {
                command: 'grunt concat'
            }
        },

        // Watch task.
        watch: {
            files: [
                './source/*.html',
                './source/_includes/*.html',
                './source/_layouts/*.html',
                './source/_less/modules/*.less',
                './source/_less/*.less',
                './source/_js/*.js',
                './source/index.html',
                './_config.yml',
            ],

            tasks: ['shell:gruntConcat', 'shell:gruntRecessApp', 'shell:jekyllServe'],

            options: {
                interrupt: true,
                atBegin: true
            }
        },

        // Less lint and compile.
        recess: {
          options: {
                compile: true,
                compress: true
          },

          app: {
            src: ['./source/_less/main.less'],
            dest: './source/css/main.css'
          }
        },

        // Concat for the JS files.
        concat: {
            dist: {
                src: [
                    './source/_js/console-errors.js',
                    './source/_js/window-onload.js',
                    './source/_js/document-ready.js',
                    './source/_js/window-resize.js',
                    './source/_js/widgets-config.js',
                    './source/_js/google-maps.js'
                ],

              dest: './source/js/main.js',
            }
        }
    });

    // NPM Dependencies.
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Tasks.
    grunt.registerTask('default', ['shell']);
    grunt.registerTask('app', ['recess:app']);
};
