export const sendToken = (user, statusCode, response, message) => {
   const token = user.getJWTToken();

   // Parse COOKIE_EXPIRE from environment variables and ensure it's a number
   const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10);

   if (isNaN(cookieExpireDays)) {
      throw new Error(
         'Invalid COOKIE_EXPIRE value. It should be a number representing days.',
      );
   }

   const options = {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000), // Calculate expiration date
      httpOnly: true,
   };

   response.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      message,
      token,
   });
};
