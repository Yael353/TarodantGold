function OutlineButton({ text = "Learn More" }) {
  return (
    <button
      className="relative bg-transparent text-gray-800 font-heading font-semibold py-2 px-8 
                  border-2 border-gray-300
                  transition-all duration-200
                  hover:border-gray-400
                  hover:bg-gray-50
                  active:bg-gray-100
                  rounded-md
                  shadow-sm hover:shadow-md"
    >
      {text}
    </button>
  );
}

export default OutlineButton;
