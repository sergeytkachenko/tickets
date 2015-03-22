var Index = function () {

    return {
        
        //Revolution Slider
        initRevolutionSlider: function () {
            var api;
			
				 //setTimeout("", 1000);
				 //jQuery('#revolutionul').show();
				 
api =  jQuery('.fullwidthabnner').revolution(
	                {
	                    delay:2000,
	                    startheight:380,
	                    startwidth:1150,

	                    hideThumbs:10,

	                    thumbWidth:100,                         // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
	                    thumbHeight:50,
	                    thumbAmount:5,

	                    navigationType:"bullet",                // bullet, thumb, none
	                    navigationArrows:"solo",                // nexttobullets, solo (old name verticalcentered), none

	                    navigationStyle:"round",                // round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


	                    navigationHAlign:"center",              // Vertical Align top,center,bottom
	                    navigationVAlign:"bottom",              // Horizontal Align left,center,right
	                    navigationHOffset:0,
	                    navigationVOffset:20,

	                    soloArrowLeftHalign:"left",
	                    soloArrowLeftValign:"center",
	                    soloArrowLeftHOffset:20,
	                    soloArrowLeftVOffset:0,

	                    soloArrowRightHalign:"right",
	                    soloArrowRightValign:"center",
	                    soloArrowRightHOffset:20,
	                    soloArrowRightVOffset:0,

	                    touchenabled:"on",                      // Enable Swipe Function : on/off
	                    onHoverStop:"on",                       // Stop Banner Timet at Hover on Slide on/off

	                    stopAtSlide:-1,
	                    stopAfterLoops:-1,

	                    hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
						hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
						hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

	                    shadow:1,                               //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
	                    fullWidth:"on"                          // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	                });
        },


		initCalendar: function () {
			if (!jQuery().fullCalendar) {
				return;
			}

			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();

			var h = {};

			if ($('#calendar').width() <= 400) {
				$('#calendar').addClass("mobile");
				h = {
					left: 'title, prev, next',
					center: '',
					right: 'today,month,agendaWeek,agendaDay'
				};
			} else {
				$('#calendar').removeClass("mobile");
				if (App.isRTL()) {
					h = {
						right: 'title',
						center: '',
						left: 'prev,next,today,month,agendaWeek,agendaDay'
					};
				} else {
					h = {
						left: 'title',
						center: '',
						right: 'prev,next,today,month,agendaWeek,agendaDay'
					};
				}
			}

			$('#calendar').fullCalendar('destroy'); // destroy the calendar
			$('#calendar').fullCalendar({ //re-initialize the calendar
				disableDragging: false,
				header: h,
				editable: true,
				events: [{
					title: 'All Day Event',
					start: new Date(y, m, 1),
					backgroundColor: App.getLayoutColorCode('yellow')
				}, {
					title: 'Long Event',
					start: new Date(y, m, d - 5),
					end: new Date(y, m, d - 2),
					backgroundColor: App.getLayoutColorCode('green')
				}, {
					title: 'Repeating Event',
					start: new Date(y, m, d - 3, 16, 0),
					allDay: false,
					backgroundColor: App.getLayoutColorCode('red')
				}, {
					title: 'Repeating Event',
					start: new Date(y, m, d + 4, 16, 0),
					allDay: false,
					backgroundColor: App.getLayoutColorCode('green')
				}, {
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: false,
				}, {
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					backgroundColor: App.getLayoutColorCode('grey'),
					allDay: false,
				}, {
					title: 'Birthday Party',
					start: new Date(y, m, d + 1, 19, 0),
					end: new Date(y, m, d + 1, 22, 30),
					backgroundColor: App.getLayoutColorCode('purple'),
					allDay: false,
				}, {
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					backgroundColor: App.getLayoutColorCode('yellow'),
					url: 'http://google.com/',
				}
				]
			});
		},

    };
}();