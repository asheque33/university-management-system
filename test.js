function hof() {
  return function juniorFunc() {
    return 'I love Muhammad Pubh';
  };
}
console.log(hof);
console.log(hof().juniorFunc());
console.log(hof()());
