import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 Not FOund</h1>
          <p className="py-6">
            The page not founded
          </p>
          <button onClick={goToHome} className="btn btn-primary">Go to Main Menu</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
