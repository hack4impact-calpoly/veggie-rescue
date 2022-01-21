
import { useState } from 'react';
import './LoginScreen.css';


function LoginScreen() {
  const [asterix, setAsterix] = useState('');
  const [pin, setPin] = useState('');

  const onClick = ({currentTarget}: React.MouseEvent<HTMLButtonElement>) =>{
    setPin(pin + currentTarget.value)
    setAsterix(asterix + '*')
  }
  return (
    <div className="container">
      <div className="logo"><img src="https://i.postimg.cc/wMV7LQPW/veggie-rescue.png" alt="veggie rescue logo" /></div>
      <span style={{fontFamily:"Roboto"}}>Enter your 4 digit pin</span>
      <div className="pinDisplay">
      <span style={{display:"flex", padding:"0px"}}>{asterix}</span>
      <span>_ _ _ _</span>
      </div>
    <div className="grid-container">
      <div className="grid-item" ><button className="grid-btn" onClick={onClick} value='1'>1</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='2'>2</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='3'>3</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='4'>4</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='5'>5</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='6'>6</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='7'>7</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='8'>8</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='9'>9</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='del'>:)</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='0'>0</button></div>
      <div className="grid-item"><button className="grid-btn" onClick={onClick} value='submit'>X</button></div>
    </div>
    </div>
  );
}

export default LoginScreen;
