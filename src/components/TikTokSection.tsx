import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';

interface TikTokVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  likes: string;
  comments: string;
  shares: string;
  thumbnail: string;
  avatar: string;
  username: string;
  isPlaying: boolean;
}

const TikTokSection = () => {
  const [videos, setVideos] = useState<TikTokVideo[]>([
    {
      id: '1',
      title: 'Видео материал',
      description: 'Красивите ни Maine Coon котки играят в градината 🐱 #MaineCoon #RadanovPride #КотешкаЛюбов #България',
      duration: '0:45',
      likes: '12.4K',
      comments: '892',
      shares: '234',
      thumbnail: '/src/assets/model-cat-1.jpg',
      avatar: '/src/assets/istockphoto-1092493548-612x612.jpg',
      username: 'radanovpridemainecoon',
      isPlaying: false
    },
    {
      id: '2',
      title: 'Видео материал',
      description: 'Малките котенца растат бързо! Вижте как се развиват нашите бебета 💕 #MaineCoonKittens #CatBreeder #България',
      duration: '1:12',
      likes: '8.7K',
      comments: '456',
      shares: '189',
      thumbnail: '/src/assets/model-cat-2.jpg',
      avatar: '/src/assets/istockphoto-1092493548-612x612.jpg',
      username: 'radanovpridemainecoon',
      isPlaying: false
    },
    {
      id: '3',
      title: 'Видео материал',
      description: 'Грижата за Maine Coon котките - всичко което трябва да знаете 🏠 #CatCare #MaineCoon #RadanovPride',
      duration: '2:34',
      likes: '15.2K',
      comments: '1.2K',
      shares: '567',
      thumbnail: '/src/assets/model-cat-3.jpg',
      avatar: '/src/assets/istockphoto-1092493548-612x612.jpg',
      username: 'radanovpridemainecoon',
      isPlaying: false
    },
    {
      id: '4',
      title: 'Видео материал',
      description: 'Време за игра! Нашите котки обичат да се забавляват 🎾 #PlayTime #MaineCoon #HappyCats #България',
      duration: '0:58',
      likes: '9.8K',
      comments: '623',
      shares: '298',
      thumbnail: '/src/assets/featured-cat-1.jpg',
      avatar: '/src/assets/istockphoto-1092493548-612x612.jpg',
      username: 'radanovpridemainecoon',
      isPlaying: false
    },
    {
      id: '5',
      title: 'Видео материал',
      description: 'Красотата на Maine Coon породата - величествени и грациозни 👑 #MaineCoonBeauty #CatBreeder #RadanovPride',
      duration: '1:45',
      likes: '18.9K',
      comments: '1.8K',
      shares: '789',
      thumbnail: '/src/assets/featured-cat-2.jpg',
      avatar: '/src/assets/istockphoto-1092493548-612x612.jpg',
      username: 'radanovpridemainecoon',
      isPlaying: false
    },
    {
      id: '6',
      title: 'Видео материал',
      description: 'Срещете нашите родители - здрави и красиви Maine Coon котки 🌟 #BreedingCats #MaineCoon #България',
      duration: '3:21',
      likes: '22.1K',
      comments: '2.3K',
      shares: '1.1K',
      thumbnail: '/src/assets/hero-maine-coon.jpg',
      avatar: '/src/assets/istockphoto-1092493548-612x612.jpg',
      username: 'radanovpridemainecoon',
      isPlaying: false
    }
  ]);

  const handlePlayToggle = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, isPlaying: !video.isPlaying }
        : { ...video, isPlaying: false }
    ));
  };

  const handleLike = (videoId: string) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        const currentLikes = parseFloat(video.likes.replace('K', '')) * 1000;
        const newLikes = currentLikes + 1;
        const formattedLikes = newLikes >= 1000 ? `${(newLikes / 1000).toFixed(1)}K` : newLikes.toString();
        return { ...video, likes: formattedLikes };
      }
      return video;
    }));
  };

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Нашите TikTok Видеа
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Последвайте ни в TikTok за ежедневни моменти с нашите красиви Maine Coon котки
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          {videos.map((video) => (
            <div key={video.id} className="relative group">
              {/* Video Card */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[9/16] cursor-pointer hover:scale-105 transition-transform duration-300">
                {/* Thumbnail */}
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                {!video.isPlaying && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                    onClick={() => handlePlayToggle(video.id)}
                  >
                    <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all duration-200">
                      <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/50 to-transparent">
                  {/* User Info */}
                  <div className="flex items-center mb-2">
                    <img 
                      src={video.avatar} 
                      alt={video.username}
                      className="w-8 h-8 rounded-full border-2 border-white mr-2"
                    />
                    <span className="text-white text-sm font-semibold">@{video.username}</span>
                  </div>

                  {/* Description */}
                  <p className="text-white text-xs mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleLike(video.id)}
                        className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{video.likes}</span>
                      </button>
                      <div className="flex items-center space-x-1 text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{video.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white">
                        <Share className="w-4 h-4" />
                        <span className="text-xs">{video.shares}</span>
                      </div>
                    </div>
                    <button className="text-white hover:text-gray-300 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="https://www.tiktok.com/@radanovpridemainecoon?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            Последвайте ни в TikTok
          </a>
          <p className="text-gray-400 text-sm mt-4">
            @radanovpridemainecoon - Ежедневни моменти с нашите Maine Coon котки
          </p>
        </div>
      </div>
    </section>
  );
};

export default TikTokSection; 