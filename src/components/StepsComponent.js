import React from "react";

const StepsComponent = ({ steps }) => {
  return (
    <div>
      <h2>Response</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default StepsComponent;
