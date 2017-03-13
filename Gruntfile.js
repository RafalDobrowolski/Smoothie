module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {      
    dist: {        
      options: {      
        sassDir: 'sass',
        cssDir: 'css',
        environment: 'production',
		config: 'config.rb'
      }
    },
    dev:{              
      options: {
        sassDir: 'sass',
        cssDir: 'css'
      }
    }
  },
	  
    watch: {
		options: { livereload: true },
    	sass:{
    		files: ['sass/*.scss'],
    		tasks: ['sass', 'cssmin']
    	},
		html: {
        files: ['*.html']
      }
    },
	connect: { // Create server that will serve
               // requests to our compiled app
      server: {
        options: {
		  port: 4000,
          base: 'servicecar'
        }
      }
    },
    sass: {
    	dist: {
            options: {                 
                compass: true,
            },
    		files: {
    			'css/style.css' : 'sass/style.scss'
    		}
    	}
    },

    concat: {
    	options: {
    		separator: ';',
    		stripBanners: true,
    		 banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    	},

    	dist: {
    		src: ['js/*.js'],
    		dest: 'js/main.min.js'
    	}
    },


    uglify:{
    	options: {
    		manage: false,
    		preserveComments: 'all' //preserve all comments on JS files
    	},
    	my_target:{
    		files: {
    			'js/main.min.js' : ['js/*.js']
    		}
    	}
    },
    fontface: {
		dist: {
		  options: {
		  fontDir: 'fonts/Smoothie.ttf',
		  template: "@font-face {" +
						  "font-family: 'Smoothie';" +
						  "url('{{font}}.ttf')  format('truetype')," +
						"}"
		  }
		}
    
  },
  cssmin:{
    	my_target:{
    		files: [{
    			expand: true,
    			cwd: 'css/',
    			src: ['*.css', '!*.min.css'],
    			dest: 'css/',
    			ext: '.min.css'

    		}]
    	}
    }

  });

  // Load the plugin that provides the "compass" task.
  grunt.loadNpmTasks('grunt-contrib-compass');

     // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

     // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');

    // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

      // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

   // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-fontface');
   // Default task(s).
  grunt.registerTask('default', ['watch','connect','uglify','fontface','cssmin']);
};