import { useNavigate } from "react-router-dom";

const BackToHomeButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`btn btn-outline btn-primary flex items-center gap-2 ${className}`}
      onClick={() => navigate("/")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.75 19.25L3.5 12m0 0l7.25-7.25M3.5 12H20.5"
        />
      </svg>
      Back to Home
    </button>
  );
};

export default BackToHomeButton;
