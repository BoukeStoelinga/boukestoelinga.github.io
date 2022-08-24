const changeBackground = (event) => {
  for (let menuItem of menuItems) {
    menuItem.id = "";
  }
  if (event.target.tagName === "A") {
    console.log("isa");
    event.target.parentNode.id = "active-menu-item";
  } else {
    event.target.id = "active-menu-item";
  }
};
const menuItems = document.getElementsByClassName("menu-item");
for (let menuItem of menuItems) {
  // console.log(menuItem)
  menuItem.addEventListener("click", changeBackground);
}


const setAngle = function (newAngle) {
  rod.style.transform = `rotate(${newAngle}rad)`;
};
const setReferenceAngle = function(newAngle){
  referenceRod.style.transform = `rotate(${newAngle}rad)`;
}
const getAngle = () => {
  const matrixNumbers =
    getComputedStyle(rod).transform.match(/[-+]?[0-9]*\.?[0-9]+/g);
  const angle = math.atan2(matrixNumbers[1], matrixNumbers[0]);
  return angle;
};



const rungeKuttaFourStep = (state, input, timestep) => {
  const K1 = derivativeFunction(state, input);
  const K2 = derivativeFunction(
    math.add(
      state,
      K1.map((a) => (a * timestep) / 2)
    ),
    input
  );
  const K3 = derivativeFunction(
    math.add(
      state,
      K2.map((a) => a * (timestep / 2))
    ),
    input
  );
  const K4 = derivativeFunction(
    math.add(
      state,
      K3.map((a) => a * timestep)
    ),
    input
  );
  let answer = math.add(
    state,
    math.add(K1, K2, K2, K3, K3, K4).map((a) => (a * timestep) / 6)
  );

  return answer;
};
const derivativeFunction = function (states, input) {
  // console.log(states)
  const m1 = 5;
  const g = 9.81;
  const l1 = 1;
  const I1 = (1 / 3) * m1 * l1 * l1;
  const result = [0, 0];
  result[0] = states[1];
  result[1] =
    (((m1 * g * l1) / 2) * math.sin(states[0]) * (l1 / 2)) / I1 -
    0.3 * states[1] +
    input;

  return result;
};
const getReference = () => {
  return +referenceSlider.value
};
const getKp = ()=>{
  return +Kpelement.value
}
const getKd = ()=>{
  return +Kdelement.value
}
const getKi = ()=>{
  return +Kielement.value
}
const executeIntegration = function () {
  timestep = 5 / 1000;
  running = true;
  lastState = [getAngle(), 0];
  let i = 0;
  let input = 0;
  let reference = getReference();
  let Kp = getKp()
  let Ki = getKi()
  let Kd = getKd()
  let error = 0
  let errorHistory = [0]
  let proportional = 0
  let errorDerivative = 0
  let derivative = 0
  const runFunc = () => {
    reference = getReference();
    setReferenceAngle(reference)
    error = reference-lastState[0]
    errorHistory.push(error)
    if(errorHistory.length>500){
      errorHistory.shift()
    }

    errorDerivative =(errorHistory[errorHistory.length-1]- errorHistory[errorHistory.length-2])/timestep
    errorIntegral = errorHistory.length*timestep*errorHistory.reduce((a,b)=>a+b)
    Kp = getKp()
    Ki = getKi()
    Kd = getKd()

    proportional = Kp*error
    derivative = Kd*errorDerivative
    integral = Ki*errorIntegral
    input = proportional+derivative+integral
    
    console.log(input)
    let newState = rungeKuttaFourStep(lastState, input, timestep);

    setAngle(newState[0]);

    lastState = newState;
  };
  setInterval(runFunc, 5);
};

const rod = document.getElementById("rodid");
const referenceRod = document.getElementById("referencerodid");
const canvas = document.getElementsByClassName("canvas")[0];
const referenceSlider = document.getElementById('reference')
const Kpelement = document.getElementById('Kp')
const Kdelement = document.getElementById('Kd')
const Kielement = document.getElementById('Ki')
executeIntegration();
