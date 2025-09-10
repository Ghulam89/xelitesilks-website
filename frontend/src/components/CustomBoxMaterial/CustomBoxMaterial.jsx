import React from "react";
import Tabs from "../common/Tabs";
import CustomBoxCard from "../common/CustomBoxCard";
import Box1 from '../../assets/images/boxMaterial/rigid-box.webp';
import Box2 from '../../assets/images/boxMaterial/corrugated2.webp';
import Box3 from '../../assets/images/boxMaterial/kraft.webp';
import Box4 from '../../assets/images/boxMaterial/cardboard.webp';
import Box5 from '../../assets/images/boxMaterial/blak-linen-boxes.webp';
import Box6 from '../../assets/images/boxMaterial/white-linen-boxes.webp';
const CustomBoxMaterial = () => {
  const customBox = [
    {
      id: 1,
      title: "Rigid Boxes",
      subTitle: "Strong Boxes for Special Things: Rigid Boxes Explained!",
      description:
        "Rigid boxes are like super strong and unbreakable homes for extraordinary things. The manufacturers make these boxes using special materials to keep toys, makeup, and nice things protected. Additionally, people use printed rigid boxes to make things look extra special by painting them with cool colors and designs.",
      image:
        Box1,
      buttonUrl: "#",
    },
    {
      id: 2,
      title: "Corrugated Boxes",
      subTitle: "Super Boxes: How Corrugated Magic Keeps Things Safe!",
      description:
        "Corrugated boxes are special types of containers made from a material called corrugated cardboard. Essentially, these boxes consist of three layers. The inner layer, known as corrugation, adds strength and durability to the box. Perfect for mailing and shipping, they make sure your items reach their destination in great shape. Trust corrugated boxes for a safe and secure journey!",
      image:
        Box2,
      buttonUrl: "#",
    },
    {
      id: 3,
      title: "Kraft Boxes",
      subTitle: "Go Green with Kraft Boxes!",
      description:
        "Make a smart choice with Kraft boxes—good for your stuff and good for the environment! These boxes are strong containers for packing things, and they’re made from a special paper called kraft paper. These boxes are handy for packing lots of different things, showing that they work well for many uses.",
      image:
       Box3,
      buttonUrl: "#",
    },
    {
      id: 4,
      title: "Cardboard Boxes",
      subTitle:
        "Magic of Cardboard: Versatile Containers for Retail Packaging!",
      description:
        "Cardboard boxes are like strong, big containers made out of thick paper. They’re used for packing and carrying lots of different things. They come in all shapes and sizes, like small ones for holding toys or big ones. These boxes are perfect for packaging your items and making them look neat on the shelves. They keep your products safe and make your shop look great!",
      image:
        Box4,
      buttonUrl: "#",
    },
    {
      id: 4,
      title: "Black Linen Boxes",
      subTitle:
        "Fancy Boxes: Cool Black Linen Style!",
      description:
        "Get sleek Black Linen boxes for your special items! These boxes look cool and feel smooth. They come in black color. These boxes are eco-friendly helping to keep the Earth healthy. Perfect for keeping your things safe and looking fancy. You can choose black Linen boxes for a stylish way to store and protect your stuff!",
      image:
        Box5,
      buttonUrl: "#",
    },
    {
      id: 4,
      title: "White Linen Boxes Boxes",
      subTitle:
        "Classic Elegance: White Linen Boxes!",
      description:
        "White Linen boxes are bright and feel soft. Perfect for keeping your stuff safe and looking neat. They come in bright white color. You can choose white Linen boxes for a cool way to store and protect your things! These boxes are eco-friendly helping to keep the Earth healthy.",
      image:
        Box6,
      buttonUrl: "#",
    },
  ];

  const data = customBox.map((box) => ({
    title: box.title,
    content: <CustomBoxCard {...box} />,
  }));

  return (
    <div className="sm:max-w-6xl max-w-[95%] mx-auto">
      <div className="text-center pt-6">
        <h2  className="sm:text-[35px] text-[25px]     font-sans   font-[600] text-[#333333] ">
          Custom Box Material Guide: Finding the Perfect Fit
        </h2>
        <p className="pt-3 text-sm">
          Let’s explore the Types of Materials for Your Unique Packaging.
        </p>
      </div>
      <div className="my-10">
        <Tabs defaultTab={"Rigid Boxes"} className={' border-[#F7F7F7] border'} tabs={data} />
      </div>
    </div>
  );
};

export default CustomBoxMaterial;
