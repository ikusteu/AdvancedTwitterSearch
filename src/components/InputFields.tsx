// import from node modules
import React from "react";

// component function
const InputFields: React.FC = () => {
  return (
    <section id="input-fields">
      <label htmlFor="post-content-filter">Filter by Post Content:</label>
      <input id="post-content-filter" type="text" />
      <label htmlFor="hashtag-filter">Filter by Hashtag:</label>
      <input id="hashtag-filter" type="text" />
      <label htmlFor="username-filter">Filter by Username:</label>
      <input id="username-filter" type="text" />
    </section>
  );
};

export default InputFields;
