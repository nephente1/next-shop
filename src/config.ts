export const config = {
  apiUrl: process.env.NODE_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_API_URL 
    : 'https://twoja-domena.com',
};