import React, { useState, useEffect } from 'react';

const SlickSlider = (props) => {
  const [SliderComponent, setSliderComponent] = useState(null);

  useEffect(() => {
    // Dynamically import react-slick on client side only
    import('react-slick').then((module) => {
      setSliderComponent(() => module.default);
    });
  }, []);

  if (!SliderComponent) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <SliderComponent {...props} />;
};

export default SlickSlider;