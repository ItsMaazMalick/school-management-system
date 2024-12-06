import nodemailer from "nodemailer";

export const sendEmail = async ({
  email,
  data,
}: {
  email: string;
  data: any;
}) => {
  // Calculate the total price
  const totalPrice = data.cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  // Create a formatted HTML content for the email
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
      <h2 style="text-align: center; color: #333;">Order Summary</h2>
      
      <p style="font-size: 16px; color: #333;">Hi <strong>User</strong>,</p>
      <p style="font-size: 16px; color: #333;">Thank you for your order! Below is a summary of your purchase.</p>
      
      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: left;">Product Name</th>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: left;">Quantity</th>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${data.cartItems
            .map(
              (item: any) => `
              <tr>
                <td style="padding: 10px 0;">${item.name}</td>
                <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px 0; text-align: right;">$${item.price}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <div style="margin-top: 20px; text-align: right;">
        <h3 style="color: #333;">Total Price: $${totalPrice}</h3>
      </div>

      <p style="font-size: 16px; color: #333;">We will notify you once your order is processed. If you have any questions, feel free to contact us.</p>
      
      <p style="font-size: 16px; color: #333;">Thank you for choosing our shop!</p>
      <p style="font-size: 16px; color: #333; text-align: center;">Best regards, <br/> Mobile Shop</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Mobile Shop <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your Order Summary",
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
    return {
      status: 200,
      success: true,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};
