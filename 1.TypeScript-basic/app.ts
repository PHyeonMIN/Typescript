const add = (n1:number, n2:number): number => {
    return n1+n2;
}

const printResult = (num:number) => {   // void : 이 함수에 의도적으로 반환문이 없다는 것을 의미
    console.log('Result: '+num);
}

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
    const result = n1+n2;
    const value = cb(result);
}


printResult(add(5,12));

let combineValues: (a:number, b:number) => number;
combineValues = add;
// combineValues = 5;
// combineValues = printResult();
console.log(combineValues(8,8));

addAndHandle(10,20,(result) => {
    console.log(result);
});