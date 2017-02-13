module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dist : 'dist/v<%= pkg.version %>',

        'userscript-meta': {
            tmp: {
                dest: 'tmp/userscript.meta.js'
            }
        },

        clean: {
            default: ['<%= dist %>'],
            tmp: ['tmp']
        },

        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'tmp/css.css': 'css/css.scss'
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: '0',
                processImport: false,
                roundingPrecision: -1,
                shorthandCompacting: true,
                aggressiveMerging: true,
                advanced: true
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'tmp',
                    src: ['*.css'],
                    dest: 'tmp',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            packed: {
                compress: true,
                preserveComments: 'some',
                files: {
                    'tmp/js/1-med-css.min.js': 'tmp/js/1-med-css.js'
                }
            }
        },

        concat: {
            options: {
                stripBanners: false
            },
            js: {
                src: ['js/**/*.js'],
                dest: 'tmp/js/0-concat.js'
            },

            ferdig: {
                files : {
                    '<%= dist %>/<%= pkg.name %>.user.js': ['tmp/userscript.meta.js', 'tmp/js/1-med-css.js'],
                    '<%= dist %>/<%= pkg.name %>.user.min.js': ['tmp/userscript.meta.js', 'tmp/js/1-med-css.min.js']
                }
            }

        },

        watch: {
            options: {
                debounceDelay: 250,
                livereload: true,
                spawn: false,
                interval: 500
            },
            files: ['js/*.js', 'Gruntfile.js', 'css/*.scss'],
            tasks: ['default']
        },

        jshint: {
            files: ['js/**/*.js', 'Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc',
                debug: true
            }
        },

        preprocess: {
            options: {
                context: {
                    DEBUG: true
                }
            },
            jsCss: {
                src: 'tmp/js/0-concat.js',
                dest: 'tmp/js/1-med-css.js'
            }
        },

        copy: {
            default: {
                expand: true,
                cwd: '<%= dist %>',
                src: ['**'],
                dest: 'dist/latest'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-userscript-meta');
    grunt.loadNpmTasks('grunt-preprocess');

    grunt.registerTask('default', [
        'jshint', 'clean', 'userscript-meta', 'sass', 'cssmin', 'concat:js', 'preprocess:jsCss',
        'uglify', 'concat:ferdig', 'clean:tmp', 'copy'
    ]);
};
