import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Home Loans",
      handler: props.actionProvider.handleHomeLoans,
      id: 1,
    },
    { 
        text: "Personal Loans",
        handler: props.actionProvider.handlePersonalLoans,
        id: 2 
    },
    { 
        text: "Car Loans", 
        handler: props.actionProvider.handleCarLoans, 
        id: 3 
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
