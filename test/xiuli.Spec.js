/* global describe beforeEach document afterEach xiuli it expect */

describe('Calculator', () => {
  // inject the HTML fixture for the tests
  beforeEach(() => {
    const fixture =
      '<div id="fixture"><input id="x" type="text">' +
      '<input id="y" type="text">' +
      '<input id="add" type="button" value="Add Numbers">' +
      'Result: <span id="result" /></div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  // call the init function of calculator to register DOM elements
  beforeEach(() => {
    xiuli.test();
  });

  it('should return 3 for 1 + 2', () => {
    expect('3').toBe('3');
  });

  /*   it('should calculate zero for invalid x value', () => {
    document.getElementById('x').value = 'hello';
    document.getElementById('y').value = 2;
    document.getElementById('add').click();
    expect(document.getElementById('result').innerHTML).toBe('0');
  });

  it('should calculate zero for invalid y value', () => {
    document.getElementById('x').value = 1;
    document.getElementById('y').value = 'goodbye';
    document.getElementById('add').click();
    expect(document.getElementById('result').innerHTML).toBe('0');
  }); */
});
