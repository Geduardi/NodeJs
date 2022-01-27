#!/C:/Program Files/nodejs/node
/*
В домашнем задании вам нужно будет применить полученные знания к программе, которую вы написали по итогам прошлого урока.

Для этого превратите её в консольное приложение, по аналогии с разобранным примером и добавьте следующие функции:
* Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите покидать текущую директорию,
но вам необходимо просмотреть файл, находящийся в другом месте;
* В содержимом директории переходить во вложенные каталоги;
* При чтении файлов искать в них заданную строку или паттерн.
 */


const fs = require(`fs`);
// const fs = require('fs/promises');
const path = require('path');
// const readLine = require('readline');
const inquire = require('inquirer');


// const yargs = require('yargs');
// const options = yargs
//     .usage('Usage: -p <path to the file>')
//     .options('p',{
//         alias: 'path',
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv;
//
// console.log(options.path);
// fs.readFile(options.path, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// })



// const rl = readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Введите путь до файла: ',(filePath) => {
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) console.log(err);
//         else console.log(data);
//     });
//
//     rl.close();
// } )

// const question = async (query) => new Promise(resolve => rl.question(query,resolve)); //todo Почему без resolve не сработает промис?
// (async ()=>{
//     const filePath = await question('Введите путь до файла: ');
//     // const fullPath = path.join(__dirname, filePath);
//     const fullPath = path.resolve(__dirname, filePath);
//
//     const data = await fs.readFile(fullPath, 'utf-8');
//     console.log(data)
//
//     rl.close();
// })();
const fileList = fs.readdirSync('./');
// const fileList = fs.readdirSync('./').filter((fileName) => fs.lstatSync(fileName).isFile());

inquire.prompt([
    {
        name: 'filename',
        type: 'list', //input,number,confirm,list,checkbox,password
        message: 'Выберете файл для чтения',
        choices: fileList,

    }
]).then(({fileName}) => {
    const fullPath = path.join(__dirname,fileName);
    const data = fs.readFileSync(fullPath,'utf-8');

    console.log(data);
});
