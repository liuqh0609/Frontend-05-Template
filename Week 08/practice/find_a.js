// const findStr = (str) => {
//     if (!str || typeof str !== 'string') return false;
//     return str.indexOf('a');
// }

// const findStr = (str) => {
//     if (!str || typeof str !== 'string') return false;
//     const tmp = str.split('');
//     return tmp.includes('a');
// }

const findStr = (str) => {
    if (!str || typeof str !== 'string') return false;
    for (let item of str) {
        if (item === 'a')    return true; 
    }
    return false;
}

console.log(findStr('acab'));