window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Tabs
    //#region Tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
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
    let deadline = new Date(2020, 10, 12, 11, 0, 0, 0);

    let getTimeRemaining = (endTime) => {
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

            let addZeroToDate = (enterData) => {
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
                    inutes.textContent = "00",
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

    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    //#endregion Modal  

    //Form
    //#region Form
    let message = {
        loading: "Загрузка...",
        success: "Спасибо скоро мы с вами свяжемся",
        failure: "что-то пошло не так"
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendForm(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            // let request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            // let formData = new FormData(form);

            // let tempObj = {};
            // formData.forEach(function (value, key) {
            //     tempObj[key] = value;
            // });
            // let json = JSON.stringify(tempObj);

            // request.send(json);

            // request.addEventListener('readystatechange', function () {
            //     if (request.readyState < 4) {
            //         statusMessage.innerHTML = message.loading;
            //     } else if (request.readyState === 4 && request.status == 200) {
            //         statusMessage.innerHTML = message.success;
            //     } else {
            //         statusMessage.innerHTML = message.failure;
            //     }
            // });
            // for (let i = 0; i < input.length; i++) {
            //     input[i].value = '';
            // }

            let formData = new FormData(form);

            function postData(data) {

                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4 ) {
                            if (request.status == 200 && request.status < 300) {
                                resolve()
                            } else {
                                reject()
                            }
                        }
                    }

                    request.send(data);
                })
            } //end PostData

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput())
        });
    }
    sendForm(form);


    //#endregion Form

});