const add = (n1:number, n2:number): number => {
    return n1+n2;
}

const printResult = (num:number) => {   // void : 이 함수에 의도적으로 반환문이 없다는 것을 의미
    console.log('Result: '+num);
}

printResult(add(5,12));

let combineValues: (a:number, b:number) => number;
combineValues = add;
// combineValues = 5;
// combineValues = printResult();
console.log(combineValues(8,8));