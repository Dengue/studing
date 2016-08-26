module.exports = function(grunt) {

    grunt.initConfig({

        jshint:{
            all:['js/**/*.js'],
        },

        uglify:{
        	my_target:{
                files:{
                    'production.min.js' : ['js/models/todo.js','js/collections/todos.js','js/views/todo-view.js',
                    'js/views/app-view.js','js/routers/router.js','js/app.js']
                }
            },
            my_libs_target:{
                files:{
                    'libs.min.js':['bower_components/jquery/jquery.js','bower_components/underscore/underscore.js','bower_components/backbone/backbone.js',
                'bower_components/todomvc-common/base.js','bower_components/backbone.localStorage/backbone.localStorage.js']
                }
            }
        },
        cssmin:{
            css:{
                files:{
                    'bower_components/todomvc-common/base.min.css':['bower_components/todomvc-common/base.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['jshint','uglify','cssmin']);

};