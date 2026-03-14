import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUs from '../Components/ContactUs/ContactUs.jsx';
import { MemoryRouter } from 'react-router-dom';

test('renders the ContactUs component', () => {
  render(
    <MemoryRouter>
      <ContactUs />
    </MemoryRouter>
  );

  const chatHeading = screen.getByText(/Chat with us online/i);
  const helpDeskHeading = screen.getByText(/HelpDesk/i);
  const onlineBanking = screen.getByText(/Online Banking/i);
  const mobileBanking = screen.getByText(/Mobile Banking/i);
  const loanApproval = screen.getByText(/Loan Approval/i);
  const emailLink = screen.getByText(/in.service@natwestmarkets.com/i);

  expect(chatHeading).toBeInTheDocument();
  expect(helpDeskHeading).toBeInTheDocument();
  expect(onlineBanking).toBeInTheDocument();
  expect(mobileBanking).toBeInTheDocument();
  expect(loanApproval).toBeInTheDocument();
  expect(emailLink).toBeInTheDocument();

});
