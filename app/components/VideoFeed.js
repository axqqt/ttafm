"use client"

export default function VideoFeed({ videos }) {
    return (
      <div>
        {videos.map((video) => (
          <div key={video.id}>
            <video src={video.url} controls />
            <p>{video.description}</p>
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              {video.linkText}
            </a>
          </div>
        ))}
      </div>
    );
  }