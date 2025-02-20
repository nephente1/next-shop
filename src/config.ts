export const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://next-shop-kp.vercel.app/' : 'http://localhost:3000'),
};
