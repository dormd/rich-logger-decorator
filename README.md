# rich-logger-decorator
Rich Logger Typescript Decorator for Easy Coding &amp; Debugging

## Installation
`npm i rich-logger-decorator`

## Basic usage
In this example we will use only the ClassLogger decorator in order to log all the class methods.
```Typescript
import { ClassLogger } from 'rich-logger-decorator';

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

  addExam(grade: number): void {
    if (grade < 0 || grade > 100) {
       console.log('invalid grade');
       return;
    }

    this.avgGrade = (this.avgGrade * this.examsNumber + grade) / ++this.examsNumber;
  }

  fine(): void {
    this.debt *= 1.1;
  }

  grantScholarship(dollars: number): void {
    this.debt += dollars;
  }
}

const stud = new StudentComponent('John Doe', 1000, 98, 3);
stud.addExam(200);
stud.addExam(90);
stud.grantScholarship(1000);
stud.fine();
```

The console looks like:

![console output](https://github.com/dormd/rich-logger-decorator/blob/master/examples/output/class-logger.png?raw=true)

## Mixed decorators and options
In this example we use the ClassLogger and DiableMethodLogger decorators with the default options and the MethodLogger decorator with custom options.
```Typescript
import { ClassLogger, Logger, DisableMethodLogger } from 'rich-logger-decorator';

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

  addExam(grade: number): void {
    if (grade < 0 || grade > 100) {
       console.log('invalid grade');
       return;
    }

    this.avgGrade = (this.avgGrade * this.examsNumber + grade) / ++this.examsNumber;
  }

  @Logger({
    withClassProperties: ['debt'],
    withTime: true,
    logFunction: console.error
  })
  fine(): void {
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
stud.grantScholarship(1000);
stud.fine();
```

The console looks like that:

![console output](https://github.com/dormd/rich-logger-decorator/blob/master/examples/output/mixed.png?raw=true)

## @Logger decorator
The Logger is the main decorator. If we want to be precise, this is a decorator factory because this function is getting an argument and returns a function, but it is not the subject. The Logger decorator needs to be on top of the function you want to log. The log messages will be printed before the function will start and after the function will end. This decorator can get options that defines the behavior of the flow and, eventually, affecting the log messages.
When the options do not supply, the defaultFunctionLoggerOptions object is used by the decorator. The options are defined by the FunctionLoggerOptions interface


### FunctionLoggerOptions
This is the interface of the Logger decorator options argument.

**Function logger options interface**

As you can see the interface contains some properties.
withArgs — this property can be boolean or array of strings. When the value is false, the arguments and their values will not be a part of the log message. When the value is true, all the argument and their values will be a part of the log message. When the value is array of strings, the arguments, that their names contained in the array, will be a part of the log message.
withTime — when the value is true, the time will be a part of the log message.
withClassProperties — when the value is true and the function is a method of a class, the class properties and their values will be part of the log message. This option can be an array of the properties names of the class (will behave like ‘withArgs’, just for class properties).
logFunction —a function that replace the traditional console.log. This function will be called with the log message in the start and the end of the original function.
formatAndLogFunction — a function that gets the resulted string of the decorator flow and logs the customized message. This function gets the time, class name (if exist), function name, start/end log, strings array of the arguments and their values and strings array of the class properties and their values.

All of the options are optional.

**DefaultFunctionLoggerOptions**

defaultFunctionLoggerOptions is an object with default values for LoggerOptions. The default values are:
withArgs — true
withTime — true
withClassProperties — false
logFunction — the console.log function
formatAndLogFunction —no default value. When the value doesn’t exist, the default behavior happened (see next in the examples).


## @ClassLogger decorator
The ClassLogger using by classes. When you put the decorator on top of the class definition, all the methods in the class are logged automatically. This is so convenient to put the decorator and watch the magic happened. 
As the Logger decorator, the decorator can get options that defines the behavior of the flow and eventually affects the log messages.
When the options do not supplied, the defaultClassLoggerOptions used by the decorator. The options are defined by the ClassLoggerOptions interface.

### ClassLoggerOptions
This is the interface of the ClassLogger decorator options argument.

**Class logger options interface**

As you can see the interface contains some properties.
methodOptions —the options for the methods of the decorated class.  Same as the options of the Logger function decorator. 
loggedMethodsNames — array of method’s names that being logged. When the option is undefined, all the class methods are logged.

All of the options are optional.

**DefaultClassLoggerOptions**

defaultClassLoggerOptions is an object with default values for ClassLoggerOptions. The default values are:
methodOptions —same as defaultLoggerOptions of the function decorator.
loggedMethodsNames — undefined (so all the class methods will be logged)

## Additional decorators
For more convienieng usage we will see two more decorators that make our life easier.

### @DisableLogger decorator
When you are using the ClassLogger decorator (without the methods array option), all the class methods will be logged. In order to disable specific method for being logged, you can put the DisableLogger decorator before the method definition. This is clearer way to prevent the logger behavior than the method array option, because of the second one restricts us to write the method name in the array.

### @LoggerWithoutArgs decorator
This decorator is a syntactic sugar of the Logger decorator with withArgs option of false. Namely, the argument and theirs values will not be part of the log message. If another options will be provided, the decorator will use them, except for the withArgs option.
