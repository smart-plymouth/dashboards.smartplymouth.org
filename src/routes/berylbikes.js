import React from 'react';


const BerylBikes = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <>
      <div>Beryl Bikes!</div>
      <div>{ selectedDate.toString() }</div>
    </>
  )
}

export default BerylBikes;
