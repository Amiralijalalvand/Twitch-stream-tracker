// app/components/StreamerCard.tsx

import Image from "next/image";

interface StreamerCardProps {
  username: string;
  title: string;
  game: string;
  viewers: number;
  thumbnailUrl: string;
}

export default function StreamerCard({
  username,
  title,
  game,
  viewers,
  thumbnailUrl,
}: StreamerCardProps) {
  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-700
                    transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20"
    >
      <div className="relative">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={400}
          height={225}
          className="w-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          LIVE
        </div>
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {viewers.toLocaleString()} View
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold truncate text-white">{username}</h3>
        <p className="text-sm text-gray-300 truncate my-1">{title}</p>
        <p className="text-sm text-gray-400 font-semibold truncate">
          {game || "Just Chatting"}
        </p>
      </div>
    </div>
  );
}
