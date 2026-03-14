import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {

    const lowercase = message.toLowerCase();


    if(lowercase.includes('Hello')){
        actions.handleHello();
    }

    if(lowercase.includes('home loans')){
        actions.handleHomeLoans();
    }
  };


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions
        });
      })}
    </div>
  );
};

export default MessageParser;

