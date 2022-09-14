// const person: {
//     name: string,
//     age: number
// } = {
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'Maximilian',
//     age:30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2,'author']
// };

enum Role { ADMIN='ADMIN', READ_ONLY=100, AUTHOR=200};

const person = {
    name: 'Maximilian',
    age:30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

// person.role.push('admin');  // 푸시는 예외적으로 튜플에서 허용
// person.role[1] = 10;

// person.role = [0, 'admin', 'user']; // 재선언은 에러

let favoriteActivities: any[];
favoriteActivities = ['Sports',1];

console.log(person.name);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());    // !!! ERROR !!!
}