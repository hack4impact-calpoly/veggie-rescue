import './Transfering.css';

const carList = ['14’ Chevy Truck', 'Truck', 'Personal Vehicle'];
let weightList : string []= [];
for (let i = 0; i < carList.length; i++) {
  weightList.push("");
}

function createElements(n: number) {
  var elements = [];
  for (let i = 0; i < n; i++) {
    elements.push(<input type="text" className="numPounds"/>);
    elements.push(<div className="vehicleName">{carList[i]}</div>);
    elements.push(<br />);
  }
  return elements;
}

function sumbitWeight() {
    const weights = document.getElementsByClassName("numPounds");
    for (let i = 0; i < weights.length; i++) {
        weightList[i] = ((weights[i] as HTMLInputElement).value) as string;
    }
    console.log(weightList); // console logs weights typed in in the order of vehicles in Vehicle list
}

export default function Transferring() {
  return (
    <div>
      <div className="tPageString">
        How much weight do <br></br>you want to transfer?
      </div>
      <button className="submit" onClick={sumbitWeight}>Submit</button>
      <div>{createElements(carList.length)}</div>
    </div>
  );
}
