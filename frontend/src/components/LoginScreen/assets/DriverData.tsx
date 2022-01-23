interface drivers {
  id: string;
  name: string;
  isLoggedIn: boolean;
  clock_in: string;
  clock_out: string;
  pin: string;
}

const DriverData: drivers[] = [
  {
    id: '1',
    name: 'diana',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: '1111'
  },
  {
    id: '1',
    name: 'carl',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: '2222'
  },
  {
    id: '1',
    name: 'maggie',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: '3333'
  }
];
export default DriverData;
