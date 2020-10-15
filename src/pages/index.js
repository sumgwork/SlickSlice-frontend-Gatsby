import React from 'react';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <p>Currently Slicing</p>
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <p>HotSlices</p>
  </div>
);

const Homepage = () => {
  console.log('home page');
  const { hotSlices, slicemasters } = useLatestData();
  console.log('hotSlices', hotSlices);
  console.log('slicemasters', slicemasters);

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
};

export default Homepage;
