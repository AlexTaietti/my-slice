export type PerlinTextProps = {
   fontSize: number;
   text: string;
};

export type ButtonsContainerProps = {
   demoLink: string;
   codeLink?: string;
   SpecialButton?: React.FC<{ handleClick?: () => void }>;
   specialButtonText?: string;
   specialButtonClickHandler?: () => void;
};

export type DeviceCarouselProps = {
   images: Array<string>;
   arrowColor: string;
   className?: string;
   deviceType: 'mobile' | 'desktop';
}

export type DeviceCarouselSizeData = {
   deviceHeight: string;
   screenTopMargin: string;
   screenLeftMargin: string;
   screenWidthPercentage: string;
   screenHeightPercentage: string;
}

export type DescriptionProps = {
   demoLink: string;
   codeLink?: string;
   info: {
      text: string;
      color?: string;
   };
   title: {
      text: string;
      color?: string;
   };
   SpecialButton?: React.FC<{ handleClick?: () => void }>;
   specialButtonText?: string;
   specialButtonClickHandler?: () => void;
};

export type Vec2D = { x: number, y: number };

export type Square = { width: number, height: number };

export type PerlinNoise3DFunction = (x: number, y: number, z: number) => number;