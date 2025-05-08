import React, { useState } from 'react';

interface Photo {
  id: number;
  src: string;
  caption: string;
  rotation: number;
}

const PhotoGallery: React.FC = () => {
  // Sample photos - replace with actual photos
  const photos: Photo[] = [
    {
      id: 1,
      src: "img/3.jpeg",
      caption: "The sky looked pretty… but not as pretty as our smiles here!",
      rotation: -2
    },
    {
      id: 2,
      src: "img/7.jpeg",
      caption: "When we went stargazing and laughed all night!",
      rotation: 3
    },
    {
      id: 3,
      src: "img/6.jpeg",
      caption: "Remember this adventure? So many stories!",
      rotation: -1
    },
    {
      id: 4,
      src: "img/5.jpeg",
      caption: "This smile? Only she can bring it out of me!",
      rotation: 2
    },
    {
      id: 5,
      src: "img/9.jpeg",
      caption: "Two cute idiots, one perfect memory!",
      rotation: -3
    },
    {
      id: 6,
      src: "img/8.jpeg",
      caption: "Always there for each other, through thick and thin",
      rotation: 1
    }
  ];
  
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };
  
  const closeLightbox = () => {
    setSelectedPhoto(null);
  };
  
  return (
    <section id="photos" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bubbly text-center mb-3 text-birthday-pink">Our Precious Memories</h2>
        <p className="text-xl font-handwritten text-center mb-10 text-gray-600">Every moment with you becomes a treasure...</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="polaroid relative cursor-pointer" 
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              onClick={() => openLightbox(photo)}
            >
              <div className="washi-tape"></div>
              <div className="washi-tape"></div>
              <img 
                src={photo.src} 
                alt="Friendship memory" 
                className="w-full h-64 object-cover"
              />
              <p className="mt-4 text-center font-handwritten text-gray-700">{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src} 
              alt="Enlarged view" 
              className="max-w-full max-h-[70vh] mx-auto"
            />
            <p className="mt-4 text-center font-handwritten text-lg text-gray-700">
              {selectedPhoto.caption}
            </p>
            <button 
              className="mt-4 block mx-auto px-6 py-2 bg-birthday-pink rounded-full font-bubbly hover:bg-pink-400 transition"
              onClick={closeLightbox}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-5xl animate-float" style={{animationDelay: '0.5s'}}>🎁</div>
      <div className="absolute bottom-10 left-10 text-5xl animate-float" style={{animationDelay: '1.2s'}}>🎂</div>
    </section>
  );
};

export default PhotoGallery;
