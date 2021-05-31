// Methods intilasation
const methodEuler = document.getElementById("method-1");
const methodRunge = document.getElementById("method-2");
const methodIter = document.getElementById("method-3");

const resultButton = document.getElementById("result_button");
const resultValue = document.getElementById("value");
// Labels intilasation
const label_1 = document.getElementById("desc-1");
const label_2 = document.getElementById("desc-2");
const label_3 = document.getElementById("desc-3");
const label_4 = document.getElementById("desc-4");

const params = document.getElementById("params");

//redeclared all math functions
pow = (a, b) => Math.pow(a, b);
sqrt = (a) => Math.sqrt(a);
log = (a, b) => Math.log(a) / Math.log(b);
ln = (a) => Math.log(a);
e = () => Math.exp(1);
exp = (a) => Math.exp(a);
sin = (x) => Math.sin(x);
cos = (x) => Math.cos(x);

// Euler function
function euler(e) {
  e.preventDefault();
  const equation = document.getElementById("param-1").value;
  const y0 = parseFloat(document.getElementById("param-2").value);
  const step = parseFloat(document.getElementById("param-4").value);

  let section = document.getElementById("param-3").value;
  section = section.split(",").map((x) => Number(x));

  const sectionBegin = section[0];
  const sectionEnd = section[1];

  let curr_x = sectionBegin,
    curr_y = y0,
    hF,
    x_prev,
    y_prev;

  const f = (x, y) => eval(`${equation}`);

  do {
    x_prev = curr_x;
    y_prev = curr_y;
    hF = f(curr_x, curr_y) * step;
    console.log(curr_x, curr_y, hF);
    curr_x += step;
    curr_y += hF;
  } while (curr_x < sectionEnd);

  resultValue.innerText = `Ответ: x: ${x_prev}, y: ${y_prev}`;
}

// runge function
function runge(e) {
  e.preventDefault();
  const equation = document.getElementById("param-1").value;
  const y0 = parseFloat(document.getElementById("param-2").value);
  const step = parseFloat(document.getElementById("param-4").value);

  let section = document.getElementById("param-3").value;
  section = section.split(",").map((x) => Number(x));

  const sectionBegin = section[0];
  const sectionEnd = section[1];

  const f = (x, y) => eval(`${equation}`);
  let delX,
    xCurr = sectionBegin,
    yCurr = y0,
    k1,
    k2,
    k3,
    k4,
    i = 0,
    res = `<p>Ответ:</p>`;

  do {
    delX = xCurr + step / 2;
    k1 = f(xCurr, yCurr);
    k2 = f(delX, yCurr + (step / 2) * k1);
    k3 = f(delX, yCurr + (step / 2) * k2);
    k4 = f(xCurr + step, yCurr + step * k3);
    yCurr += (step / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    xCurr += step;
    i++;
    res += `<p>x${i} = ${xCurr} y${i} = ${yCurr}</p>`;
  } while (xCurr < sectionEnd);
  console.log(xCurr, yCurr);
  resultValue.innerHTML = res;
}

// Iter function
function iter(e) {
  e.preventDefault();
  const equation = document.getElementById("param-1").value;
  const step = parseFloat(document.getElementById("param-4").value);

  let section = document.getElementById("param-3").value;
  section = section.split(",").map((x) => Number(x));

  const sectionBegin = section[0];
  const sectionEnd = section[1];

  const f = (x) => eval(`${equation}`);
  let xCurr = sectionBegin,
    res = ``,
    i = 0;

  do {
    i++;
    res += `
    <p>x${i}=${xCurr} f(x${i})=${f(xCurr)}</p>
    `;
    xCurr += step;
  } while (xCurr < sectionEnd);
  resultValue.innerHTML = res;
  console.log(step, equation, sction);
}

// Adding event listeners on methods
methodEuler.addEventListener("click", () => {
  resultButton.addEventListener("click", euler);
});
methodRunge.addEventListener("click", () => {
  resultButton.addEventListener("click", runge);
});

methodIter.addEventListener("click", () => {
  resultButton.addEventListener("click", iter);
});
