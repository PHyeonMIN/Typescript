abstract class Department {
    static fiscalYear = 2020;
    // private readonly id: string;     // readonly : 특정 속성이 초기화되고나면 이후에는 변경 X
    // private name: string;
    protected employees: string[] = []; // protected : private와 다른 점은 이 클래스에서뿐만 아니라 이 클래스를 확장하는 모든 클래스에서 사용가능

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
        console.log(Department.fiscalYear);
    }

    static createEmployee(name: string){
        return {name: name};
    }

    abstract describe(this: Department) : void;

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

    describe(): void {
        console.log('IT Department - ID: '+this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

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

    private constructor(id:string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if(AccountingDepartment.instance){
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }


    describe() {
        console.log('Accounting Department - ID: '+ this.id);
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

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1',['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// accounting.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2',[]);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

accounting.mostRecentReport = 'Year End Report';    // setter
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);           // getter
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name:'s', describe: accounting.describe }    // 클래스를 기반으로 하지않고 더미객체로서 생성
// accountingCopy.describe();  // undefined