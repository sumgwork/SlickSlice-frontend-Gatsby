const { useState, useEffect } = require('react');

const gql = String.raw; // only for syntax correction below

// _id instead of id because we are querying Sanity directly
// low quality image placeholder
const deets = `
name
_id 
image {
  asset {
    url
    metadata {
      lqip
    }
  }
}
`;

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
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Check for errors
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((error) => console.error(error));
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
