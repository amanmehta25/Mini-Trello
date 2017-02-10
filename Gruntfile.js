// Generated on 2017-02-09 using generator-angular 0.14.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        sass: 'grunt-contrib-sass',
        minjson: 'grunt-minjson',
        scsslint: 'grunt-scss-lint'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json')
          .appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/modules/**/*.js'],
                tasks: ['newer:jshint:all', 'newer:jscs:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/**/*.scss'],
                tasks: ['sass', 'newer:copy:styles', 'postcss']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '<%= yeoman.app %>/modules/**/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect()
                            .use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect()
                            .use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect()
                            .use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/modules/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/modules/**/*.js'
                ]
            },
            test: {
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                  require('autoprefixer-core')({ browsers: ['last 1 version'] })
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            first: {
                src: [
                    '<%= yeoman.dist %>/images/{,*/}*/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/fonts/{,*/}*.*',
                    '<%= yeoman.dist %>/json/{,*/}*.json',
                ]
            },
            second: {
                src: [
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/modules/{,*/}*.js'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin'],
                            json: []
                        },
                        post: {
                            js: [{
                                name: 'concat',
                                createConfig: function (context) {
                                    context.options.generated.options = {
                                        sourceMap: true
                                    };
                                }
                            }, {
                                name: 'uglify',
                                createConfig: function (context, block) {
                                    context.options.generated.options = {
                                        sourceMap: true,
                                        sourceMapIncludeSources: true,
                                        sourceMapIn: '.tmp/concat/' +
                                            block.dest.replace('.js', '.js.map')
                                    };
                                }
                            }]
                        }
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            js: ['<%= yeoman.dist %>/modules/{,*/}*.js'],
            json: ['<%= yeoman.dist %>/json/{,*/}*.json'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ],
                patterns: {
                    js: [
                        [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g,
                        'Replacing references to images'
                        ],
                        [/(json\/[^''""]*\.(json))/g,
                          'Replacing references to json'
                        ]
                    ],
                    css: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/g,
                          'Update the CSS to reference our revved images'
                        ]
                    ]
                }
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            options: {
                optimizationLevel: 5
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*/{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*/{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        minjson: {
            compile: {
                files: {
                    // Minify one json file
                    '<%= yeoman.dist %>/json/users.json': '<%= yeoman.app %>/json/users.json',
                    '<%= yeoman.dist %>/json/boards.json': '<%= yeoman.app %>/json/boards.json'
                }
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: 'miniTrello',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'modules/modules.js'
                },
                cwd: '<%= yeoman.app %>',
                src: ['views/**/*.html', 'modules/**/*.html'],
                dest: '.tmp/templateCache.js'
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/modules',
                    src: '*.js',
                    dest: '.tmp/concat/modules'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // SCSS Lint
        scsslint: {
            allFiles: [
                '<%= yeoman.app %>/styles/abstracts/*.scss',
                '<%= yeoman.app %>/styles/base/*.scss',
                '<%= yeoman.app %>/styles/components/*.scss',
                '<%= yeoman.app %>/styles/layout/*.scss',
                '<%= yeoman.app %>/styles/pages/*.scss',
                '<%= yeoman.app %>/styles/themes/*.scss',
                '<%= yeoman.app %>/styles/vendor/*.scss',
                '<%= yeoman.app %>/styles/main.scss',
            ],
            options: {
                bundleExec: false,
                config: '.scss-lint.yml',
                reporterOutput: 'scss-lint-report.xml',
                colorizeOutput: true
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        '*.json',
                        'images/{,*/}*.{webp}',
                        'fonts/{,*/}*.*',
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>/ico',
                    src: ['*.*'],
                    dest: '<%= yeoman.dist %>/ico'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/components-font-awesome/fonts/',
                    src: ['*.*'],
                    dest: '<%= yeoman.dist %>/fonts'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/media',
                    src: ['*.*'],
                    dest: '<%= yeoman.dist %>/media'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*/{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles',
                'sass'
            ],
            test: [
                'copy:styles',
                'sass'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin',
                'sass'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: ['{,*/}*/{,*/}*.scss', '{,*/}*.scss'],
                    dest: '.tmp/styles/',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server',
        function () {
            grunt.task.run([
                'scsslint',
                'newer:jshint',
                'newer:jscs',
                'clean:server',
                'wiredep',
                'concurrent:server',
                'postcss:server',
                'connect:livereload',
                'watch'
            ]);
        });

    grunt.registerTask('server',
        'DEPRECATED TASK. Use the "serve" task instead',
        function (target) {
            grunt.log.warn(
                'The `server` task has been deprecated. Use `grunt serve` to start a server.'
            );
            grunt.task.run(['serve:' + target]);
        }
    );

    grunt.registerTask('test', [
        'scsslint',
        'newer:jshint',
        'newer:jscs',
        'clean:server',
        'wiredep',
        'concurrent:test',
        'postcss',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', 'Compile then start a connect web server',
        function () {
            return grunt.task.run(['build-all']);
        }
    );

    grunt.registerTask('build-all', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'minjson',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev:first',
        'usemin',
        'filerev:second',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:jscs',
        'test',
        'build'
    ]);
};
