import { ClassLogger, Logger, DisableMethodLogger } from '../src';

@ClassLogger()
class StudentComponent {

  name: string;
  debt: number;
  avgGrade: number;
  examsNumber = 0;

  constructor(name: string, debt: number, avgGrade: number, examsNumber: number) {
    console.log(`Hi ${name}`);

    this.name = name;
    this.debt = debt;
    this.avgGrade = avgGrade;
    this.examsNumber = examsNumber;
  }

  @Logger()
  addExam(grade: number): void {
    if (grade < 0 || grade > 100) {
       console.log('invalid grade');
       return;
    }

    this.avgGrade = (this.avgGrade * this.examsNumber + grade) / ++this.examsNumber;
  }

  fine(percentage: number): void {
    this.debt *= 1.1;
  }

  @DisableMethodLogger()
  grantScholarship(dollars: number): void {
    this.debt += dollars;
  }
}

const stud = new StudentComponent('John Doe', 1000, 98, 3);
stud.addExam(200);
stud.addExam(90);