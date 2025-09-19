export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Pulse</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: 0 auto; padding: 20px; background-color: #fafafa;">
    <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
        <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
          <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%; animation: pulse 2s infinite;"></div>
        </div>
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">PULSE</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Real-time chat</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Welcome, ${name}!</h2>
        <p style="margin: 0 0 25px 0; color: #666; font-size: 15px;">You're all set to start chatting in real-time. Connect instantly with anyone, anywhere.</p>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 35px 0;">
          <a href="${clientURL}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 500; display: inline-block; font-size: 15px; transition: all 0.3s ease;">Start Chatting</a>
        </div>
        
        <p style="margin: 30px 0 0 0; color: #999; font-size: 13px; text-align: center;">Need help? Just reply to this email.</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 25px 0; color: #aaa; font-size: 12px;">
      <p style="margin: 0;">© 2025 Pulse. Made with ❤️</p>
    </div>
    
    <style>
      @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
    </style>
  </body>
  </html>
  `;
}
