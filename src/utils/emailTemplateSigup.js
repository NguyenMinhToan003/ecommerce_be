export const generateSignupEmailTemplate = (data) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #333; text-align: center;">Welcome to Ecommerce Website</h1>
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
      <h2 style="color: #333;">Hi ${data.name},</h2>
      <p>Thank you for signing up with Ecommerce Website. Below are your account details:</p>
      <ul>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Address:</strong> ${data.address}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Gender:</strong> ${
					data.gender === 0 ? 'Male' : 'Female'
				}</li>
      </ul>
      <p style="text-align: center;"><a href="${
				process.env.URL_FRONTEND
			}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Website</a></p>
    </div>
    <p style="text-align: center; margin-top: 20px;">Thank you once again!</p>
  </div>
`;
