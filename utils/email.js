const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendPasswordResetEmail = async (email, resetToken, userName) => {
  const transporter = createTransporter();
  
  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
            }
            .container { 
                background: #ffffff; 
                border-radius: 8px; 
                padding: 40px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            }
            .header { 
                margin-bottom: 30px; 
            }
            .logo { 
                color: #2563eb; 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 10px; 
            }
            .title { 
                color: #333; 
                font-size: 24px; 
                margin-bottom: 20px; 
                margin-top: 0;
            }
            .button { 
                display: inline-block; 
                background: #2563eb !important; 
                color: #ffffff !important; 
                padding: 12px 30px; 
                text-decoration: none !important; 
                border-radius: 6px; 
                font-weight: 500; 
                margin: 20px 0; 
                border: none;
            }
            .button:hover {
                background: #1d4ed8 !important;
                color: #ffffff !important;
            }
            .button:visited {
                color: #ffffff !important;
            }
            .button:active {
                color: #ffffff !important;
            }
            .footer { 
                margin-top: 30px; 
                padding-top: 20px; 
                border-top: 1px solid #eee; 
                font-size: 14px; 
                color: #666; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">${process.env.APP_NAME || 'Your App'}</div>
                <h1 class="title">Reset Your Password</h1>
            </div>
            
            <p>Hi ${userName || 'there'},</p>
            
            <p>You recently requested to reset your password for your account. Click the button below to reset it.</p>
            
            <div>
                <a href="${resetURL}" class="button" style="background: #2563eb !important; color: #ffffff !important; text-decoration: none !important;">Reset Password</a>
            </div>
            
            <p><strong>This password reset link will expire in ${process.env.RESET_TOKEN_EXPIRE || 15} minutes.</strong></p>
            
            <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
            
            <p>If the button above doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetURL}</p>
            
            <div class="footer">
                <p>Thanks,<br>The ${process.env.APP_NAME || 'Your App'} Team</p>
                <p><small>This is an automated email. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${process.env.APP_NAME || 'Your App'}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `Password Reset Request - ${process.env.APP_NAME || 'Your App'}`,
    html: htmlTemplate,
    text: `
Hi ${userName || 'there'},

You recently requested to reset your password for your account. 

Click this link to reset your password: ${resetURL}

This password reset link will expire in ${process.env.RESET_TOKEN_EXPIRE || 15} minutes.

If you did not request a password reset, please ignore this email.

Thanks,
The ${process.env.APP_NAME || 'Your App'} Team
    `.trim(),
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = {
  sendPasswordResetEmail
};