module.exports = function (grunt) {

    var mozjpeg = require('imagemin-mozjpeg');

    // Project configuration.

    var version = Date.now();
    var fw = {
        srcDir: 'assets/src',
        buildDir: 'assets/build/' + version,
        version: version,
        tempDir: 'assets/temp',
        libDir: 'bower_components',
        mainFile: 'main'
    };

    grunt.initConfig({

        fw: fw,

        clean: {
            start: [
                'assets/build/', 'assets/temp/', 'assets/dev/'
            ],
            end: [
                'assets/temp/'
            ]
        },
        coffee: {

            options: {
                bare: true
            },
            compileJoined: {
                options: {
                    join: true
                },
                files: {
                    "assets/temp/js/_joined.js": 'assets/src/coffee/joined/**/*.coffee'
                }
            },
            glob_to_multiple: {
                expand: true,
                flatten: true,
                cwd: 'assets/src/coffee/single',
                src: ['*.coffee'],
                dest: '<%= fw.buildDir %>/js',
                ext: '.js'
            }


        },

        watch: {
            styles: {
                files: ['assets/src/**/*.scss'],
                tasks: ['libsass', 'concat:css', 'cssmin', 'clean:end'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['assets/src/**/*.coffee'],
                tasks: ['coffee', 'concat:js', 'uglify:dev', 'clean:end'],
                options: {
                    nospawn: true
                }
            },
            livereload: {
                options: { livereload: true },
                files: ['assets/src/**/*']
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
                        dest: '<%= fw.buildDir %>/images'                  // Destination path prefix
                    }
                ]
            }
        },
        libsass: {
            prod: {
                options: {
                    style: 'uncompressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/src/',
                        src: ['*.scss'],
                        dest: '<%= fw.tempDir %>/css/',
                        ext: '.css'
                    }
                ]
            }
        },
        favicons: {
            options: {},
            icons: {
                src: 'assets/src/images/favicon/favicon.png',
                dest: '<%= fw.buildDir %>/favicon'
            }
        },
        uglify: {
            prod: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= fw.buildDir %>/js/sourcemap.map'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= fw.buildDir %>/js',
                        src: [ '**/*.js', '!**/*.min.js' ],
                        dest: '<%= fw.buildDir %>/js',
                        ext: '.min.js'
                    }
                ]
            },
            dev: {
                options: {
                    compress: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= fw.buildDir %>/js',
                        src: [ '**/*.js', '!**/*.min.js' ],
                        dest: '<%= fw.buildDir %>/js',
                        ext: '.min.js'
                    }
                ]
            }

        },
        cssmin: {
            dev: {
                files: {
                    '<%= fw.buildDir %>/css/main.min.css': ['<%= fw.buildDir %>/css/main.css']
                }
            }
        },
        "file-creator": {
            "version": {
                "views/_version.twig": function (fs, fd, done) {
                    fs.writeSync(fd, '{{ fw.set_version("' + fw.version + '") }}');
                    done();
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },

            js: {
                src: ['<%= fw.libDir %>/jquery/jquery.js', '<%= fw.libDir %>/bootstrap-sass/dist/js/bootstrap.js', '<%= fw.tempDir %>/**/*.js'],
                dest: '<%= fw.buildDir %>/js/<%= fw.mainFile %>.js', nonull: true
            },
            css: {
                src: ['<%= fw.tempDir %>/**/*.css'],
                dest: '<%= fw.buildDir %>/css/<%= fw.mainFile %>.css', nonull: true
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-libsass');

    // Events
    grunt.event.on('watch', function (action, filepath) {
        grunt.task.run('devMode');
    });

    grunt.registerTask('devMode', 'Set asset to dev', function (service) {
        console.log("\n-----------------\nDevelopment Mode\n----------------------\n\n");
        fw.version = "dev";
        grunt.config.set('fw.buildDir', "assets/build/" + fw.version);
        grunt.config.set('fw.version', fw.version);

    });

    // Default task(s).
    grunt.registerTask('default', ['clean:start', 'imagemin', 'coffee', 'libsass', 'favicons', 'file-creator', 'concat', 'cssmin', 'uglify:prod', 'clean:end']);
    grunt.registerTask('dev', ['devMode', 'clean:start', 'imagemin', 'coffee', 'libsass', 'favicons', 'file-creator', 'concat', 'uglify:dev', 'cssmin', 'clean:end']);


};