export class IncorrectArgsTypeError {
  constructor() {
    this.message = 'Incorrect arguments were passed';
    this.name = 'IncorrectArgumentTypeError';
  }

  toString() {
    return this.message;
  }
}
