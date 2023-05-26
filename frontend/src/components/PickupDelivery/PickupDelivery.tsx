/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';

const offStyle =
  'rounded-2xl w-60 h-80 mx-6 drop-shadow-lg my-5 text-5xl font-semibold bg-white transform active:translate-y-2 flex items-center space-between justify-center';
const onStyle =
  'rounded-2xl w-60 h-80 mx-6 drop-shadow-lg my-5 text-5xl text-amber-600 font-semibold bg-amber-100 border-4 border-amber-500 transform active:translate-y-2 flex items-center space-between justify-center';

interface Props {
  setPickupDeliveryObject: Function;
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setForceNext: Function;
}
interface PickupDeliveryObjectSchema {
  pickupOrDelivery: number;
  id: String;
  date: String;
  driver: String;
  vehicle: String;
  name: String;
  EntityType: String;
  LocationType: String;
  Demographic: String;
  Area: String;
  foodAllocation: Map<String, number>;
}

export default function PickupDelivery({
  setPickupDeliveryObject,
  PickupDeliveryObject,
  setForceNext
}: Props) {
  const [styleButton1, setStyleButton1] = useState<string>(offStyle);
  const [styleButton2, setStyleButton2] = useState<string>(offStyle);

  const initStyle = (isPickup: number) => {
    if (isPickup === 0) {
      setStyleButton1(offStyle);
      setStyleButton2(offStyle);
    } else if (isPickup === 1) {
      setStyleButton1(onStyle);
      setStyleButton2(offStyle);
    } else if (isPickup === 2) {
      setStyleButton1(offStyle);
      setStyleButton2(onStyle);
    }
  };

  useEffect(() => {
    initStyle(PickupDeliveryObject.pickupOrDelivery);
  });

  const changeStyle = (buttonToChange: number) => {
    if (buttonToChange === 1) {
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        pickupOrDelivery: 1
      });
      setStyleButton1(onStyle);
      setStyleButton2(offStyle);
    } else {
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        pickupOrDelivery: 2
      });
      setStyleButton2(onStyle);
      setStyleButton1(offStyle);
    }
    setForceNext(true);
  };

  return (
    <div className="flex mt-20">
      <div className="flex items-center space-between justify-center">
        <div className={styleButton1} onClick={() => changeStyle(1)}>
          Pickup
        </div>
        <div className={styleButton2} onClick={() => changeStyle(2)}>
          Delivery
        </div>
      </div>
    </div>
  );
}
