class Department {
    // private readonly id: string;     // readonly : 특정 속성이 초기화되고나면 이후에는 변경 X
    // private name: string;
    protected employees: string[] = []; // protected : private와 다른 점은 이 클래스에서뿐만 아니라 이 클래스를 확장하는 모든 클래스에서 사용가능

    constructor(private readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string){
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;

    get mostRecentReport() {
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string){
        if(!value){
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }

    constructor(id:string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    addEmployee(name: string) {
        if(name==='Max'){
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string){
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}


const it = new ITDepartment('d1',['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// accounting.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment('d2',[]);
accounting.mostRecentReport = 'Year End Report';    // setter
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);           // getter
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = { name:'s', describe: accounting.describe }    // 클래스를 기반으로 하지않고 더미객체로서 생성
// accountingCopy.describe();  // undefined