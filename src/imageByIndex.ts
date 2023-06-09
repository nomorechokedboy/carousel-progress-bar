import image1 from "../assets/slide-1.jpg";
import image2 from "../assets/slide-2.jpg";
import image3 from "../assets/slide-3.jpg";
import image4 from "../assets/slide-4.jpg";

export const assets: string[] = [image1, image2, image3, image4];

const imageByIndex = (index: number): string => assets[index % assets.length];

export default imageByIndex;
