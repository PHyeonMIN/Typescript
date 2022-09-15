class Department {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log('Department: '+ this.name);
    }
}

const accounting = new Department('Accounting');
accounting.describe();

const accountingCopy = { name:'s', describe: accounting.describe }    // 클래스를 기반으로 하지않고 더미객체로서 생성
accountingCopy.describe();  // undefined