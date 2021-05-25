(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

})(jQuery);

// accounts

var Application = ( function () {
	var canvas;
	var ctx;
	var imgData;
	var pix;
	var WIDTH;
	var HEIGHT;
	var flickerInterval;

	var init = function () {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		canvas.width = WIDTH = 700;
		canvas.height = HEIGHT = 500;
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.fill();
		imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
		pix = imgData.data;
		flickerInterval = setInterval(flickering, 30);
	};

	var flickering = function () {
		for (var i = 0; i < pix.length; i += 4) {
			var color = (Math.random() * 255) + 50;
			pix[i] = color;
			pix[i + 1] = color;
			pix[i + 2] = color;
		}
		ctx.putImageData(imgData, 0, 0);
	};

	return {
		init: init
	};
}());

Application.init();