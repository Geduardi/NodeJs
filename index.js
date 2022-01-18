const color = require('colors');

let min = Number(process.argv[2]);
let max = Number(process.argv[3]);

if (isNaN(min)||isNaN(max)){return console.log(color.red('!!!Нужно ввести два числа!!!'))};

if (min > max){
    [min,max] = [max,min];
}

let counter = 0;
for (let i = min; i <= max; i++) {
    let isSimple = true;
    if (i > 2 && i % 2 != 0)
    {
        for (let j = 3; j*j <= i ; j=j+2)
        {
            if (i%j==0)
            {
                isSimple = false;
                break;
            }
        }
    }
    else if (i != 2) isSimple = 0;
    if (isSimple == true) {
        switch (counter++ % 3){
            case 0:
                console.log(color.green(i));
                break;
            case 1:
                console.log(color.yellow(i));
                break;
            case 2:
                console.log(color.red(i));
                break;
        }
    }
}

if (counter == 0){console.log(color.red('В этом диапазоне нет простых чисел'))};
