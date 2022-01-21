/*
Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате «час-день-месяц-год».
Задача программы — создавать для каждого аргумента таймер с обратным отсчётом:
посекундный вывод в терминал состояния таймеров (сколько осталось).
По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы.
Важно, чтобы работа программы основывалась на событиях.
23-21-01-2022
* */

const EventEmitter = require('events');
const emitter = new EventEmitter;

class Timer {
    end = false;
    constructor(date) {
        this.endDate = date;
        let now = new Date();
        if ((this.endDate - now) > 0){
            this.years = this.endDate.getFullYear() - now.getFullYear();
            this.month = this.endDate.getMonth() - now.getMonth();
            this.days = this.endDate.getDate() - now.getDate();
            this.hours = this.endDate.getHours() - now.getHours();
            this.minutes = this.endDate.getMinutes() - now.getMinutes();
            this.seconds = this.endDate.getSeconds() - now.getSeconds();
            if (this.seconds < 0) {
                this.seconds+=60;
                this.minutes-=1
            }
            if (this.minutes < 0) {
                this.minutes+=60;
                this.hours-=1
            }
            if (this.hours < 0) {
                this.hours+=24;
                this.days-=1
            }
            if (this.days < 0) {
                this.days+=365;
                this.years-=1
            }

        } else {
            this.end = true;
            emitter.emit('end', 'Время наступило!');
        }

    }

    output(){
        let string = '';
        if (this.years) {string+=`${this.years} г. `}
        if (this.month) {string+=`${this.month} м. `}
        if (this.days) {string+=`${this.days} дн. `}
        if (this.hours) {string+=`${this.hours} ч. `}
        if (this.minutes) {string+=`${this.minutes} мин. `}
        if (this.seconds) {string+=`${this.seconds} с. `}

        return string;
    }


}

const inputDateArray = () => {
    let input = process.argv[2].split('-');
    input = input.map(str => parseInt(str));
    input[2]--;
    return input;
}

const run = async (dateArray) => {
    const timer = new Timer(new Date(dateArray[3],dateArray[2],dateArray[1], dateArray[0]));
    if (!timer.end) {
        console.log(timer.output());
        running = false;
        await new Promise(resolve => setTimeout(resolve, 1000));
        await run(dateArray);
    }

}



let timerIsRunning = true;

emitter.on('end', console.log);
emitter.on('run', run)


if (timerIsRunning){
    emitter.emit('run', inputDateArray())
}

