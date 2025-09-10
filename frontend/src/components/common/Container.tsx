
const Container = ({ 
    children, 
    className = "", 
    bgColor = "transparent",
    fullWidth = false
  }) => {
    return (
      <div className={`w-full ${bgColor}`}>
        <div className={`mx-auto ${fullWidth ? 'w-full' : 'max-w-[95%] sm:max-w-8xl'} ${className}`}>
          {children}
        </div>
      </div>
    );
  };
  
  export default Container;