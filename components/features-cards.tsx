"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}

const CardContent = () => {
  return <></>;
};

const data = [
  {
    category: "prendas de vestir",
    title: "tienda de ropa y accesorios",
    src: "https://plus.unsplash.com/premium_photo-1673125510222-1a51e3a8ccb0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent />,
  },
  {
    category: "mundo tech",
    title: "tienda de tecnologia",
    src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent />,
  },
  {
    category: "hogar",
    title: "tienda de muebles y decoracion",
    src: "https://images.unsplash.com/photo-1662254666007-3fc1a93e6a19?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent />,
  },

  {
    category: "juguetes",
    title: "tienda de juguetes",
    src: "https://images.unsplash.com/photo-1623939012339-5b3dc8eca7c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent />,
  },
  {
    category: "arte y manualidades",
    title: "tienda de arte y manualidades",
    src: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent />,
  },
  {
    category: "salud y belleza",
    title: "tienda de salud y belleza",
    src: "https://plus.unsplash.com/premium_photo-1678377959909-3542d8096fa5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent />,
  },
];
