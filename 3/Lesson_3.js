/*
По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб.
Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111,
а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”.
 */
const fs = require('fs');
const ReadLine = require('readline');
const path = require('path');
const ACCESS_LOG = path.join(__dirname,'/access.log');
// const ACCESS_LOG = path.join(__dirname,'/access_large.log');
const IP = [
    '89.123.1.41',
    '34.48.240.111'
];



const rl = ReadLine.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
    crlfDelay: Infinity
});

const writeStreamArray = [];

IP.forEach((ip)=>{
    writeStreamArray[ip] = fs.createWriteStream(path.join(__dirname,ip + '_requests.log'),{
        encoding: 'utf-8',
        flags: 'a'
    });
});

rl.on('line',(line)=>{
    IP.forEach((ip)=>{
        let regExp = new RegExp(ip)
        let result = line.match(regExp);
        if (result) writeStreamArray[result[0]].write(result.input + '\n');
    });

});

// IP.forEach((ip)=>{
//     writeStreamArray[ip].end(()=>{
//         console.log(`Информация по IP ${ip} собрана`);
//     })
// });

rl.on('close',()=>{
    IP.forEach((ip)=>{
        writeStreamArray[ip].end(()=>{
            console.log(`Информация по IP ${ip} собрана`);
        })
    });
});



