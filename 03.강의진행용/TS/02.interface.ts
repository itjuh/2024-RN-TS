// 변수 인터페이스 정의
interface Cat{
    species:string;
    age?:number;
    [color:number]:string;
}

let cat:Cat = {
    species:'삼색고양이',
    1: 'brown',
    2: 'black',
    3: 'white',
}
// 리터럴을 이용한 변수 인스턴스 정의
type Score = 'A'|'B'|'C'|'D';

interface Student{
    name:string;
    classNum:number;
    [grade:number]:Score;
    // 인덱스는 리터럴형식일 수 없음
}

let student:Student = {
    name:'안주현',
    classNum:3,
    1:'C',
    2:'A',
    // 3:'b', 
}

// 함수 인터페이스 정의
interface CallMyName{
    (name:string):void;
}

const callMyName:CallMyName = (name)=>{
    console.log('반가워 ',name,'아~');
}

callMyName('주현'); // 반가워 주현아~

// 클래스 인터페이스 정의 implement 사용
interface Member{
    name: string;
    grade: number;
    profileImg: string;
    email: string;
}

class MarketMember implements Member{
    name;
    profileImg;
    email;
    grade = 5;
    constructor(n:string, img:string, m: string){
        this.name = n;
        this.profileImg = img;
        this.email = m;
    }
}

let member1:Member = new MarketMember('안주현','','jh.2144.9679@gmail.com');