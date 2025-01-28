import ErrorComponent from "./components/ErrorComponent";

export const metadata = {
  title: '404 - Page not found',
};

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-sky-700">404 - Page not found</h1>
      <ErrorComponent subject="page" />
    </div>
  );
}
