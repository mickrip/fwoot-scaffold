module.exports = function (grunt) {

    var mozjpeg = require('imagemin-mozjpeg');
    var version = Date.now();

    // Project configuration.
    grunt.initConfig({
        clean: {
            build: [
                'assets/dist/'
            ]
        },
        coffee: {

            compileJoined: {
                options: {
                    join: true
                },
                files: {
                    'assets/dist/js/joined.js': 'assets/src/coffee/joined/**/*.coffee'
                }
            },
            glob_to_multiple: {
                expand: true,
                flatten: true,
                cwd: 'assets/src/coffee',
                src: ['*.coffee'],
                dest: 'assets/dist/js',
                ext: '.js'
            }


        },
        watch: {
            styles: {
                files: ['assets/site.less', 'assets/bootstrap.less', 'assets/variables.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        imagemin: {                          // Task
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    use: [mozjpeg()]
                },
                files: {}
            },
            dynamic: {                         // Another target
                files: [
                    {
                        expand: true,                  // Enable dynamic expansion
                        cwd: 'assets/src/images',                   // Src matches are relative to this path
                        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                        dest: 'assets/dist/images'                  // Destination path prefix
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'uncompressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/src/',
                        src: ['*.scss'],
                        dest: 'assets/dist/css/',
                        ext: '_' + version + '.css'
                    }
                ]
            }
        },
        favicons: {
            options: {},
            icons: {
                src: 'assets/src/images/favicon/favicon.png',
                dest: 'assets/dist/images/favicon'
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'path/to/sourcemap.map'
                },
                files: {
                    'assets/dist/js/main.js': ['src/input.js']
                }
            }
        },
        "file-creator": {
            "basic": {
                "views/_version.twig": function (fs, fd, done) {
                    fs.writeSync(fd, '{% set version = "' + version + '" %}');
                    done();
                }
            }
        }


    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-favicons');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Default task(s).
    grunt.registerTask('default', ['clean','imagemin', 'coffee', 'sass', 'favicons', 'uglify', 'file-creator']);
};