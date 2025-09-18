// app/page.tsx

"use client"; // این خط ضروری است تا بتوانیم از هوک‌های ری‌اکت استفاده کنیم

import { useEffect, useState } from "react";
import StreamerCard from "./components/StreamerCard"; // کامپوننت کارت را وارد می‌کنیم

// ساختار دیتا هر استریمر را تعریف می‌کنیم
interface Stream {
  id: string;
  user_name: string;
  title: string;
  game_name: string;
  viewer_count: number;
  thumbnail_url: string;
}

export default function HomePage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTwitchStreams = async () => {
      try {
        // به API Route خودمان درخواست می‌فرستیم
        const response = await fetch("/api/twitch");
        const data = await response.json();
        setStreams(data.streams || []);
      } catch (error) {
        console.error("Failed to fetch streams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTwitchStreams();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gray-900/70 backdrop-blur-lg shadow-md p-4 sticky top-0 z-50 border-b border-gray-800">
        <div className="container mx-auto text-right">
          <h1 className="text-3xl font-bold text-purple-400 tracking-wider">
            Arabic Streamers
          </h1>
          <p className="text-sm text-gray-400">مذيعو تويتش العرب</p>

          {/* --- بخش اضافه شده --- */}
          <p className="text-xs text-gray-500 mt-2 text-left">
            Developed by{" "}
            <a
              href="https://github.com/Amiralijalalvand" // <-- آدرس گیت‌هاب خود را اینجا قرار دهید
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-400 transition-colors"
            >
              amirali jalalvand
            </a>
          </p>
          {/* --- پایان بخش اضافه شده --- */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 text-right">
        <h2 className="text-2xl font-semibold mb-6 flex items-center justify-end">
          الآن مباشر
          <span className="w-3 h-3 bg-red-500 rounded-full ml-3 animate-pulse"></span>
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-400">جاري تحميل المذيعين...</p>
        ) : streams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {streams.map((stream) => (
              <a
                href={`https://twitch.tv/${stream.user_name}`}
                key={stream.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StreamerCard
                  username={stream.user_name}
                  title={stream.title}
                  game={stream.game_name}
                  viewers={stream.viewer_count}
                  thumbnailUrl={stream.thumbnail_url
                    .replace("{width}", "400")
                    .replace("{height}", "225")}
                />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            لا يوجد مذيعون عرب مباشرون حاليًا.
          </p>
        )}
      </main>
    </div>
  );
}
