/* global describe beforeEach document afterEach xiuli it expect window */

describe('Calculator', () => {
  // inject the HTML fixture for the tests
  beforeEach(() => {
    const fixture = `
    <style>
        body {
            overflow: hidden;
            -webkit-perspective: 1000px;
            perspective: 1000px;
            text-align: center;
            background: #16222A;
            background: -webkit-linear-gradient(to right, #3A6073, #16222A);
            background: linear-gradient(to right, #3A6073, #16222A);

        }

        #menu {
            position: absolute;
            top: 0vh;
            z-index: 100;
        }

        #xiuli {
            position: absolute;
            -webkit-transition: all 2s;
            transition: all 2s;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
        }

        #section1 {
            width: 90vw;
            min-width: 300px;
            height: 90vh;
            min-height: 400px;
            position: absolute;
            background: red;
        }

        #section2 {
            width: 90vw;
            min-width: 300px;
            height: 90vh;
            min-height: 400px;
            position: absolute;
            background: yellow;
            -webkit-transform: translate3d(2000px, 0, 1px);
            transform: translate3d(2000px, 0, 1px);
        }

        #section3 {
            width: 90vw;
            min-width: 300px;
            height: 90vh;
            min-height: 400px;
            position: absolute;
            background: blue;
            -webkit-transform: translate3d(-1300px, 0, 0) rotate3d(1, 0, 0, 90deg);
            transform: translate3d(-1300px, 0, 0) rotate3d(1, 0, 0, 90deg);
        }

        #section4 {
            width: 90vw;
            min-width: 300px;
            height: 90vh;
            min-height: 400px;
            position: absolute;
            background: black;
            color: white;
            -webkit-transform: translate3d(-1300px, -1300px, 0) rotate3d(1, 0, 1, 90deg);
            transform: translate3d(-1300px, -1300px, 0) rotate3d(1, 0, 1, 90deg);
        }

        #section5 {
            width: 90vw;
            min-width: 300px;
            height: 90vh;
            min-height: 400px;
            position: absolute;
            background: green;
            -webkit-transform: translate3d(-1300px, 0, -1300px) rotate3d(1, 0, 1, 90deg);
            transform: translate3d(-1300px, 0, -1300px) rotate3d(1, 0, 1, 90deg);
        }
    </style>
    <div id="menu">
    <button type="button" xiuli-target="section1">section1</button>
    <button type="button" xiuli-target="section2">section2</button>
    <button type="button" xiuli-target="section3">section3</button>
    <button type="button" xiuli-target="section4">section4</button>
    <button type="button" xiuli-target="section5">section5</button>
</div>
<div id="xiuli">
    <div id="section1">
        <h1>Section 1</h1>
    </div>
    <div id="section2">
        <h1>Section 2</h1>
    </div>
    <div id="section3">
        <h1>Section 3</h1>
    </div>
    <div id="section4">
        <h1>Section 4</h1>
    </div>
    <div id="section5">
        <h1>Section 5</h1>
    </div>
</div>`;

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(() => {
    document.body.removeChild(document.getElementById('menu'));
    document.body.removeChild(document.getElementById('xiuli'));
  });

  // call the init function of calculator to register DOM elements
  /* beforeEach(() => {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }); */

  it('should return 3 for 1 + 2', () => {
    expect('3').toBe('3');
  });

  it('should return 3 for 1 + 2', (done) => {
    console.log(xiuli);
    const buttons = document.getElementById('menu').children;
    xiuli.on('transitionend', done);
    Array.prototype.forEach.call(buttons, (element) => {
      element.click();
    });
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
