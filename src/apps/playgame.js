import React from 'react';
import { useParams } from 'react-router-dom';
import { gamesData } from '../data';

const PlayPage = () => {
    const { slug } = useParams();
    const game = gamesData.find(g => g.slug === slug);

    if (!game) return <div>Game not found</div>;

    return (
        <div className="bg-[#121212] min-h-screen text-white">
            {/* Navigation Bar */}
            <div className="p-4 flex items-center border-b border-gray-800">
                <Link to="/" className="text-gray-400 hover:text-white mr-4">← Back</Link>
                <h1 className="text-xl font-bold">{game.title}</h1>
            </div>

            {/* Iframe / Game Player Area */}
            <div className="flex flex-col items-center justify-center py-10">
                <div className="w-[90%] max-w-5xl aspect-video bg-black rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-800">
                    {/* Replace this src with the actual game URL if you have one */}
                    <iframe
                        src={`https://now.gg/play/example/${game.id}`}
                        title={game.title}
                        className="w-full h-full"
                        frameBorder="0"
                    />
                </div>

                {/* Game Info Below Player */}
                <div className="w-[90%] max-w-5xl mt-8 p-6 bg-[#1F2937] rounded-2xl">
                    <h2 className="text-2xl font-bold mb-2">About {game.title}</h2>
                    <p className="text-gray-400">Experience {game.title} on now-gg.com. Play instantly in your browser with high performance.</p>
                </div>
            </div>
        </div>
    );
};

export default PlayPage;