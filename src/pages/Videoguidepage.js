import React from 'react';

const videos = [
  {
    title: "Video 1 Title",
    description: "This is a description for Video 1.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URLs
  },
  {
    title: "Video 2 Title",
    description: "This is a description for Video 2.",
    url: "https://www.youtube.com/embed/fydIRPMBZA8"
  },
  {
    title: "Video 3 Title",
    description: "This is a description for Video 3.",
    url: "//www.youtube.com/embed/HhpuXGuPQ1c?si=5mTqBGiwgtqm-288"
  }
];



const VideoGuide = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {videos.map((video, index) => (
        <div key={index} className="w-full max-w-4xl p-4 my-4 md:my-8">
          <iframe
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video" // This maintains a 16:9 aspect ratio
          ></iframe>
          <h2 className="text-2xl font-semibold mt-2">{video.title}</h2>
          <p className="text-md mt-1">{video.description}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoGuide;

