module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false
                    //optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "assets/site.css": "assets/site.less"
                }
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
                files: {                         // Dictionary of files
                    'dist/img.png': 'src/img.png', // 'destination': 'source'
                    'dist/img.jpg': 'src/img.jpg',
                    'dist/img.gif': 'src/img.gif'
                }
            },
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // Default task(s).
    grunt.registerTask('default', ['less', 'imagemin']);
};