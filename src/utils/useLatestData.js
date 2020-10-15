const { useState, useEffect } = require('react');

const useLatestData = () => {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
               query {
                 StoreSettings(id: "downtown"){
                   name
                   slicemaster {
                     name
                   }
                   hotSlices{
                     name
                   }
                 }
               }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Check for errors
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
