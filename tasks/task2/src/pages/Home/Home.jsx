import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Welcome to the Home Page</h1>
      <Link className="border border-1 rounded-xl bg-gray-100" to="/counter">
        Go to Counter
      </Link>
      <Link className="border border-1 rounded-xl bg-gray-100" to="/context">
        Go to Context
      </Link>
      <Link className="border border-1 rounded-xl bg-gray-100" to="/callback">
        Go to Callback
      </Link>
    </div>
  );
}
