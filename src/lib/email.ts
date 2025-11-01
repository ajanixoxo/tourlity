import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
  },
});

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
export async function sendOTPEmail(email: string, otp: string, userName: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Tourlity - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Email Verification</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Thank you for registering with Tourlity! To complete your registration, please verify your email address using the OTP below.
          </p>
          
          <div style="background: white; border: 2px dashed #FF6B6B; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Your Verification Code</h3>
            <div style="font-size: 32px; font-weight: bold; color: #FF6B6B; letter-spacing: 5px; font-family: monospace;">
              ${otp}
            </div>
            <p style="color: #999; font-size: 14px; margin: 15px 0 0 0;">
              This code will expire in 10 minutes
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you didn't create an account with Tourlity, please ignore this email.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #FF6B6B;">support@tourlity.com</a>
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}
export async function sendResetEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Tourlity - Password Reset',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">Password Reset Request</p>
  </div>

  <!-- Main Content -->
  <div style="padding: 30px; background: #f9f9f9;">
    <h2 style="color: #333; margin-bottom: 20px;">Hello ${email},</h2>

    <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
      We received a request to reset your password. Use the code below to proceed with resetting your Tourlity account password.
    </p>

    <!-- OTP Code Box -->
    <div style="background: white; border: 2px dashed #FF6B6B; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0;">
      <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Your Password Reset Code</h3>
      <div style="font-size: 32px; font-weight: bold; color: #FF6B6B; letter-spacing: 5px; font-family: monospace;">
        ${otp}
      </div>
      <p style="color: #999; font-size: 14px; margin: 15px 0 0 0;">
        This code will expire in 10 minutes.
      </p>
    </div>

    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
      If you did not request a password reset, please ignore this email or contact our support team if you have concerns.
    </p>

    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #999; font-size: 14px;">
        Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #FF6B6B;">support@tourlity.com</a>
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #333; padding: 20px; text-align: center; color: white;">
    <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
  </div>
</div>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}


// Send approval notification email
export async function sendApprovalEmail(email: string, userName: string, isApproved: boolean, reason?: string) {
  const subject = isApproved ? 'Tourlity - Account Approved!' : 'Tourlity - Account Status Update';
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, ${isApproved ? '#4CAF50' : '#FF6B6B'}, ${isApproved ? '#66BB6A' : '#FF8E8E'}); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">${isApproved ? 'Account Approved' : 'Account Status Update'}</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          ${isApproved ? `
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Great news! Your Tourlity account has been approved. You can now start using all the features available to you.
            </p>
            
            <div style="background: white; border: 2px solid #4CAF50; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">🎉 Welcome to Tourlity!</h3>
              <p style="color: #666; margin: 0;">
                Your account is now active and ready to use.
              </p>
            </div>
          ` : `
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              We regret to inform you that your account application has not been approved at this time.
            </p>
            
            ${reason ? `
              <div style="background: white; border: 2px solid #FF6B6B; border-radius: 10px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Reason:</h3>
                <p style="color: #666; margin: 0;">${reason}</p>
              </div>
            ` : ''}
          `}
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #FF6B6B;">support@tourlity.com</a>
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Approval email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending approval email:', error);
    return false;
  }
} 

// Send request edits email
export async function sendRequestEditsEmail(email: string, userName: string, reason: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Tourlity - Account Verification Requires Updates',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF8C00, #FFA500); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Account Updates Needed</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            We've reviewed your Tourlity account application and found that some updates are needed before we can proceed with approval.
          </p>
          
          <div style="background: white; border: 2px solid #FF8C00; border-radius: 10px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📝 Required Updates:</h3>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              ${reason}
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Please log into your account and update the required information. Once you've made the necessary changes, we'll review your application again.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #FF6B6B;">support@tourlity.com</a>
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Request edits email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending request edits email:', error);
    return false;
  }
}


// Send rejection email
export async function sendRejectionEmail(email: string, userName: string, reason?: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Tourlity - Account Application Status',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Application Update</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Thank you for your interest in Tourlity. After careful review, we regret to inform you that we cannot approve your account application at this time.
          </p>
          
          ${reason ? `
            <div style="background: white; border: 2px solid #FF6B6B; border-radius: 10px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Reason:</h3>
              <p style="color: #666; margin: 0; line-height: 1.6;">
                ${reason}
              </p>
            </div>
          ` : ''}
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions about this decision or would like to reapply in the future, please don't hesitate to contact our support team.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #FF6B6B;">support@tourlity.com</a>
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Rejection email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending rejection email:', error);
    return false;
  }
}

// Send booking confirmation email to guest
export async function sendBookingConfirmationEmailToGuest(
  email: string,
  guestName: string,
  tourTitle: string,
  confirmationNumber: string,
  startDate: string,
  endDate: string,
  amount: number,
  hostName: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Tourlity - Booking Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F26457, #FF8E8E); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Booking Confirmation</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${guestName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Congratulations! Your tour booking has been confirmed. We're excited to have you join us on this amazing adventure.
          </p>
          
          <div style="background: white; border: 2px solid #F26457; border-radius: 10px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 40%;">Tour:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${tourTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Host:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${hostName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Dates:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Confirmation Number:</td>
                <td style="padding: 8px 0; color: #F26457; font-weight: 700; font-size: 16px;">#${confirmationNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Amount Paid:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">$${amount.toFixed(2)}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fff3e0; border-left: 4px solid #F26457; padding: 15px; margin: 25px 0;">
            <p style="color: #666; margin: 0; line-height: 1.6;">
              <strong>📧 Next Steps:</strong><br>
              • Your booking ticket with QR code has been generated and is available in your dashboard.<br>
              • You can download your ticket anytime from "My Bookings" section.<br>
              • Please arrive on time with your ticket ready for check-in.<br>
              • If you have any questions, feel free to contact your host through the chat feature.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #F26457;">support@tourlity.com</a>
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully to guest:', email);
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email to guest:', error);
    return false;
  }
}

// Send booking confirmation email to host
export async function sendBookingConfirmationEmailToHost(
  email: string,
  hostName: string,
  tourTitle: string,
  guestName: string,
  guestEmail: string,
  confirmationNumber: string,
  startDate: string,
  endDate: string,
  amount: number
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Tourlity - New Booking Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4CAF50, #66BB6A); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">New Booking</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${hostName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Great news! You have received a new booking for your tour. The guest has completed their payment, and the booking is now confirmed.
          </p>
          
          <div style="background: white; border: 2px solid #4CAF50; border-radius: 10px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 40%;">Tour:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${tourTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Guest:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${guestName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Guest Email:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${guestEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Dates:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Confirmation Number:</td>
                <td style="padding: 8px 0; color: #4CAF50; font-weight: 700; font-size: 16px;">#${confirmationNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Amount:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">$${amount.toFixed(2)}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #e8f5e9; border-left: 4px solid #4CAF50; padding: 15px; margin: 25px 0;">
            <p style="color: #666; margin: 0; line-height: 1.6;">
              <strong>📝 Next Steps:</strong><br>
              • The booking has been added to your dashboard.<br>
              • You can contact the guest through the chat feature.<br>
              • Please confirm the meeting location and any additional details with the guest.<br>
              • Make sure you're prepared for the tour on the scheduled dates.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #4CAF50;">support@tourlity.com</a>
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully to host:', email);
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email to host:', error);
    return false;
  }
}