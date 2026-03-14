import React, { useState} from 'react'

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a request to your backend API to initiate a password reset
    // In a real application, you would make an HTTP request here.
    // For this example, we'll just simulate a successful request.
    try {
      // Simulate API request
      await resetPasswordRequest(email);

      // Display a success message to the user
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      // Handle errors and display appropriate error messages to the user
      setMessage('An error occurred. Please try again later.');
    }
  };
  return (
    <div style={{paddingTop:'100px'}}>
        <h2>Forgot Password</h2>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <button type="submit">Send Email</button>
      </form>
    </div>
  )
}
// Simulate an API request for password reset
const resetPasswordRequest = async (email) => {
    // In a real application, you would make an HTTP request to your server
    // to initiate the password reset process.
    // This function can return a Promise that resolves when the request is complete.
    return new Promise((resolve, reject) => {
      // Simulate a successful request (resolve) for this example
      setTimeout(() => {
        resolve();
      }, 2000); // Simulating a 2-second delay
    });
  };