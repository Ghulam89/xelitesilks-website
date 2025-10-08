import { BiCheckCircle } from "react-icons/bi";

const ReviewCard = ({ name, text, rating }) => {
  return (
    <div className="bg-white p-4 shadow-sm rounded border">
      <div className="flex items-center gap-1 font-bold text-gray-800 mb-1">
        {name}
        <BiCheckCircle className="h-4 w-4 text-black" />
      </div>

      {/* Dynamic star rating */}
      <div className="flex items-center space-x-1 text-yellow-500 mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>

      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
};

export default ReviewCard;
