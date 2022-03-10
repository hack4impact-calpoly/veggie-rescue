export const vehicles = [
  {
    id: '1',
    name: '14ft chevy truck',
    img: 'https://i.postimg.cc/R0YyQtbM/van.png',
    currentPickups: [],
    currentDropoffs: [],
    totalWeight: 20
  },
  {
    id: '2',
    name: '18ft chevy truck',
    img: 'https://i.postimg.cc/6p9k9tvN/boxtruck.png',
    currentPickups: [],
    currentDropoffs: [],
    totalWeight: 0
  },
  {
    id: '3',
    name: 'honda',
    img: 'https://i.postimg.cc/0NjhwnnW/truck.png',
    currentPickups: [
      {
        id: '1',
        date: '2022-01-20T07:35:13.314Z',
        driver: 'becky',
        vehicle: 'honda',
        name: 'catlin ranch',
        donorLocationType: 'farmers market',
        donorEntityType: 'farm',
        foodType: 'produce',
        area: 'syv',
        lbsPickedUp: 300
      }
    ],
    currentDropoffs: [],
    totalWeight: 300
  },
  {
    id: '6',
    name: 'personal vehicle',
    img: 'https://i.postimg.cc/jSZG2mHn/car.png',
    currentPickups: [],
    currentDropoffs: [],
    totalWeight: 0
  }
];

export const vehicle = {
  id: '3',
  name: 'honda',
  img: 'car',
  currentPickups: [
    {
      id: '1ees',
      date: '2022-01-20T07:35:13.314Z',
      driver: 'becky',
      vehicle: 'honda',
      name: 'catlin ranch',
      donorLocationType: 'farmers market',
      donorEntityType: 'farm',
      foodType: 'produce',
      area: 'carpenteria',
      lbsPickedUp: 11
    },
    {
      id: '1xyz',
      date: '2022-01-20T07:35:13.314Z',
      driver: 'becky',
      vehicle: 'honda',
      name: 'moua farms',
      donorLocationType: 'farmers market',
      donorEntityType: 'farm',
      foodType: 'produce',
      area: 'syv',
      lbsPickedUp: 10
    }
  ],
  currentDropoffs: [
    {
      id: '123sd',
      date: '2022-01-20T07:35:13.314Z',
      driver: 'becky',
      vehicle: 'honda',
      name: 'bridge house',
      recipientEntityType: 'shelter',
      demographic: 'homeless',
      foodType: 'produce',
      area: 'syv',
      lbsDroppedOff: 10
    },
    {
      id: '123sd',
      date: '2022-01-20T07:35:13.314Z',
      driver: 'becky',
      vehicle: 'honda',
      name: 'buelton senior center',
      recipientEntityType: 'senior center',
      demographic: 'seniors',
      foodType: 'produce',
      area: 'syv',
      lbsDroppedOff: 18
    }
  ],
  totalWeight: 300
};

export const deliverySchema = [
  {
    id: '1',
    name: 'people helping people',
    recipientEntityType: 'community kitchen',
    demographic: 'low income',
    foodType: ['baked goods'],
    area: 'ventura'
  }
];

export const pickupSchema = [
  {
    id: '1',
    name: 'ebbys farm',
    donorLocationType: 'farmers market',
    donorEntityType: 'farm',
    foodType: ['produce', 'packaged'],
    area: 'syv'
  },
  {
    name: 'catlin ranch',
    donorLocationType: 'farmers market',
    donorEntityType: 'farm',
    foodType: ['produce'],
    area: 'ventura county',
    id: 'elIDOJd'
  },
  {
    name: 'red horizon farm',
    donorLocationType: 'gleaning',
    donorEntityType: 'restauraunt',
    foodType: ['produce', 'transportation'],
    area: 'lompoc',
    id: 'k47kQwt'
  },
  {
    name: "bob's well bread",
    donorLocationType: 'other',
    donorEntityType: 'restauraunt',
    foodType: ['produce'],
    area: 'ventura county',
    id: '301MTMi'
  },
  {
    name: "Bobby's",
    donorLocationType: 'Food truck',
    donorEntityType: 'blah',
    foodType: ['blah', 'blah'],
    area: 'Goleta',
    id: 'd93iJ7n'
  }
];

export const logs = [
  {
    id: '', //dp mpt meed id
    date: '02-Jan-21',
    driver: 'Becky',
    vehicle: 'Van',
    name: "Ebby's Organic Farm",
    foodType: 'Produce',
    lbsPickedUp: 10,
    locationType: 'Farmers Market',
    donorEntityType: 'Farm',
    area: 'SB/Goleta',
  },
];