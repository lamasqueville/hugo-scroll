/**
 * Main JS file for GhostScroll behaviours
 */

var $post = $('.post');
var $first = $('.post.first');
var $last = $('.post.last');
var $fnav = $('.fixed-nav');
var $postholder = $('.post-holder');
var $sitehead = $('#site-head');

/* Globals jQuery, document */
(function ($) {
	"use strict";
	function srcTo (el) {
		$('html, body').animate({
			scrollTop: el.offset().top
		}, 1000);
	}
	function srcToAnchorWithTitle (str) {
		var $el = $('#' + str);
		if ($el.length) {
			srcTo($el);
		}
	}
	$(document).ready(function(){

		$postholder.each(function (e) {
			if(e % 2 != 0)
				$(this).addClass("odd");
		});

		$('a.btn.site-menu').click(function (e) {
			srcToAnchorWithTitle($(e.target).data('title').toLowerCase().split(' ').join('-'));
		});
		
		$('#header-arrow').click(function () {
			srcTo($first);
		});

		$('.post-title').each(function () {
			var t = $(this).text();
			var id = $(this).attr("id");
			var index = $(this).parents('.post-holder').index();
			$fnav.append("<a class='fn-item fn-item--" + index +"' item_index='"+index+"'>"+t+"</a>")
			$(this).parents('article').attr('id',t.toLowerCase().split(' ').join('-'));
			$('.fn-item--' + index).click(function () {
				var i = $(this).attr('item_index');
				var s = $(".post[item_index='"+i+"']");

				$('html, body').animate({
					scrollTop: s.offset().top
				}, 400);
			});
		});

		if($sitehead.length) {
			$(window).scroll( function () {
				var w = $(window).scrollTop();
				var g = $sitehead.offset().top;
				var h = $sitehead.offset().top + $sitehead.height()-100;

				if(w >= g && w<=h) {
					$('.fixed-nav').fadeOut('fast');
				} else if($(window).width()>500) {
					$('.fixed-nav').fadeIn('fast');
				}

				$post.each(function () {
					var f = $(this).offset().top;
					var b = $(this).offset().top + $(this).height();
					var t = $(this).parent('.post-holder').index();
					var i = $(".fn-item[item_index='"+t+"']");

					$(this).attr('item_index', t);

					if(w >= f && w<=b) {
						i.addClass('active');
					} else {
						i.removeClass('active');
					}
				});
			});
		}

		$('ul li').before('<span class="bult fa fa-asterisk icon-asterisk"></span>');
		$('blockquote p').prepend('<span class="quo icon-quote-left"></span>');
		$('blockquote p').append('<span class="quo icon-quote-right"></span>');
	});

	$post.each(function () {
		var postText = $(this).html();
		var fa  = [];
		for(var i=0; i < icons.length; i++) {
			fa[i]       = {};
			fa[i].str   = "@"+ icons[i]+ "@";
			fa[i].icon  = icons[i];
			fa[i].int   = postText.search(fa[i].str);

			if(fa[i].int > -1 ) {
				fa[i].count = postText.match(new RegExp(fa[i].str,"g")).length;
				for(var j=0; j < fa[i].count; j++) {
					$(this).html($(this).html().replace(fa[i].str, "<i class='fa "+fa[i].icon+"'></i>"))
				}
			}
		}
	});


}(jQuery));
