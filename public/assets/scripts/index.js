var Index = function () {

    return {
        initLayerSlider: function () {
            $('#layerslider').layerSlider({
                skin : 'fullwidth',
                thumbnailNavigation : 'hover',
                hoverPrevNext : false,
                responsive : false,
                responsiveUnder : 960,
                sublayerContainer : 960
            });
        },


        initCalendar: function (App) {
            if (!jQuery().fullCalendar) {
                return;
            }
            console.log(App);
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
                h = {
                    right: 'title',
                    center: '',
                    left: 'prev,next,today,month,agendaWeek,agendaDay'
                };
            }

            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                monthNames: ['Январь','Февраль','Март','Апрель','Май','οюнь','οюль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                monthNamesShort: ['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.'],
                dayNames: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
                dayNamesShort: ["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],
                buttonText: {
                    prev: "&nbsp;&#9668;&nbsp;",
                    next: "&nbsp;&#9658;&nbsp;",
                    prevYear: "&nbsp;&lt;&lt;&nbsp;",
                    nextYear: "&nbsp;&gt;&gt;&nbsp;",
                    today: "Сегодня",
                    month: "Месяц",
                    week: "Неделя",
                    day: "День"
                },
                disableDragging: false,
                header: {
                    left:   'title',
                    center: '',
                    right:  ''
                    //right:  'today prev,next'
                },
                editable: false,
                //events: [{
                //    title: 'Собые на весь день',
                //    start: new Date(y, m, 1),
                //    backgroundColor: "#de8b25"
                //}, {
                //    title: 'Обед',
                //    start: new Date(y, m, d, 12, 0),
                //    end: new Date(y, m, d, 14, 0),
                //    backgroundColor: 'grey',
                //    allDay: false
                //}]
            });
        }
    };

}();