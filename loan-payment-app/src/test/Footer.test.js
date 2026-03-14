import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer/Footer.jsx'; // Adjust the import path as needed

describe('Footer Component', () => {
  it('renders the footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('banner');
    expect(footerElement).toBeInTheDocument();
  });

  it('displays the copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(`© ${new Date().getFullYear()} NatWest. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
  });

  it('displays social media icons', () => {
    render(<Footer />);
    const facebookIcon = screen.getByLabelText('Facebook');
    const twitterIcon = screen.getByLabelText('Twitter');
    const linkedInIcon = screen.getByLabelText('LinkedIn');
    const instagramIcon = screen.getByLabelText('Instagram');
    
    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(linkedInIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
  });

});
