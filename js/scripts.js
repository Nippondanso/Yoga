window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Tabs
    //#region Tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //#endregion Tabs

    // Timer
    //#region Timer
    let deadline = new Date(2019,9,12,11,0,0,0);    

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            s = Math.floor((t / 1000) % 60),
            m = Math.floor((t / 1000 / 60) % 60),
            h = Math.floor((t / (1000 * 60 * 60) % 24)),
            d = Math.floor((t / (1000 * 60 * 60) / 24));

        return {
            'total': t,
            'days': d,
            'hours': h,
            'minutes': m,
            'seconds': s
        };
    }


    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);

            function addZeroToDate(enterData) {
                let result = enterData < 10 ? "0" + enterData : enterData;
                return result;
            }

            days.textContent = addZeroToDate(t.days);
            hours.textContent = addZeroToDate(t.hours);
            minutes.textContent = addZeroToDate(t.minutes);
            seconds.textContent = addZeroToDate(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = "00",
                    hours.textContent = "00",
                    minutes.textContent = "00",
                    seconds.textContent = "00"
            }
        }
    }

    setClock('timer', deadline);
    //#endregion Timer

    // Modal
    //#region  Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    //#endregion Modal
    


});