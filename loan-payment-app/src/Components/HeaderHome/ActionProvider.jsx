import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const handleHello = () => {
        const botMessage = createChatBotMessage(
            "Here's a nice dog picture for you!");

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
    }

    const handleHomeLoans = () => {
        const botMessage = createChatBotMessage("Apply for Home Loans");

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
    }

    const handlePersonalLoans = () => {
        const botMessage = createChatBotMessage("Apply for Personal Loans");

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
    }

    const handleCarLoans = () => {
        const botMessage = createChatBotMessage("Apply for Car Loans");

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
    }


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleHomeLoans,
            handleCarLoans,
            handlePersonalLoans
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;