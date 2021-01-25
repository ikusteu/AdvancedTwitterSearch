// import from node modules
import React from "react";
import { useQuery } from "@apollo/client";
import TEST_QUERY from "../api/testQuery.graphql";

// component funcion
const ApiTest: React.FC = () => {
  const { data } = useQuery(TEST_QUERY, {
    variables: {
      query: "twitterdev",
    },
  });

  console.log("kaj je s ovim");
  return (
    <div>
      <div>Hello</div>
      <div>Query Result:</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiTest;
