const findStr = (str) => {
    let flag = false;
    for (let c of str) {
        if (c === 'a') {
            flag = true;
        } else if (c === 'b' && flag) {
            return true;
        } else {
            flag = false;
        }
    }
    return false;
}

console.log(findStr('acab'));
