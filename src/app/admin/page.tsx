"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mediaSource, setMediaSource] = useState("mp4");

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Admin Header */}
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-accent-gold font-medium">TPF Cinemas Management System</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium rounded-md transition-colors ${activeTab === "overview" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 font-medium rounded-md transition-colors ${activeTab === "upload" ? "bg-accent-gold text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              + New Content
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm font-medium uppercase mb-2">Total Films</h3>
                <p className="text-4xl font-bold text-white">42</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm font-medium uppercase mb-2">Total Series</h3>
                <p className="text-4xl font-bold text-white">8</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm font-medium uppercase mb-2">Avg Viewers / Week</h3>
                <p className="text-4xl font-bold text-white">4,205</p>
              </div>
              <div className="bg-gradient-to-br from-accent-gold/20 to-transparent border border-accent-gold/30 rounded-xl p-6">
                <h3 className="text-accent-gold text-sm font-medium uppercase mb-2">Avg Viewers / Month</h3>
                <p className="text-4xl font-bold text-white">18,450</p>
              </div>
            </div>

            {/* Content List Mock */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-black/50">
                <h3 className="text-lg font-bold text-white">Recent Uploads</h3>
              </div>
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-xs uppercase font-medium">
                  <tr>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Director/Creator</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">Echoes of the Valley</td>
                    <td className="px-6 py-4">Film</td>
                    <td className="px-6 py-4">Aarav Sharma</td>
                    <td className="px-6 py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">Published</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-accent-gold hover:text-white transition-colors">Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">Shadows of the City</td>
                    <td className="px-6 py-4">Series (Season 1)</td>
                    <td className="px-6 py-4">Riya Singh</td>
                    <td className="px-6 py-4"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">Draft</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-accent-gold hover:text-white transition-colors">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Form Tab */}
        {activeTab === "upload" && (
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Upload New Content</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Basic Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                  <input type="text" className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="e.g. Echoes of the Valley" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                  <select className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors">
                    <option>Film</option>
                    <option>Web Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Genre</label>
                  <select className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors">
                    <option>Drama</option>
                    <option>Thriller</option>
                    <option>Comedy</option>
                    <option>Docuseries</option>
                    <option>Horror</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Synopsis</label>
                  <textarea rows={4} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="Brief description of the content..."></textarea>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              {/* Cast & Crew (NEW) */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Cast & Crew</h3>
                <div className="space-y-6">
                  {/* Director */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                    <h4 className="text-accent-gold font-bold mb-4">Director</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Name</label>
                        <input type="text" className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="Director Name" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Photograph URL</label>
                        <input type="text" className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://..." />
                      </div>
                    </div>
                  </div>

                  {/* Cast List */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-accent-gold font-bold">Cast Members</h4>
                      <button type="button" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors">+ Add Actor</button>
                    </div>
                    {/* Mock first actor input */}
                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/10">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Actor Name</label>
                        <input type="text" className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="Actor Name" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Photograph URL</label>
                        <input type="text" className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              {/* POSTER UPLOADS */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Visual Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Landscape Poster (16:9) */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h4 className="text-white font-bold mb-1">Landscape Poster</h4>
                    <p className="text-xs text-accent-gold font-bold mb-2">REQUIRED (16:9 Aspect Ratio)</p>
                    <p className="text-xs text-gray-500 mb-4 px-4">Used for Hero banners and the background of the Video Player.</p>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm transition-colors w-full">
                      Choose 16:9 Image
                    </button>
                  </div>

                  {/* Portrait Poster (2:3) */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h4 className="text-white font-bold mb-1">Portrait Poster</h4>
                    <p className="text-xs text-accent-gold font-bold mb-2">REQUIRED (2:3 Aspect Ratio)</p>
                    <p className="text-xs text-gray-500 mb-4 px-4">Used for grid layouts on the Browse and My List pages.</p>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm transition-colors w-full">
                      Choose 2:3 Image
                    </button>
                  </div>

                </div>
              </div>

              <hr className="border-white/10 my-8" />

              {/* Video Upload / Media Source (NEW) */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Media Source</h3>
                
                <div className="flex gap-4 mb-6">
                  <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
                    <input 
                      type="radio" 
                      name="mediaSource" 
                      className="text-accent-gold focus:ring-accent-gold" 
                      checked={mediaSource === "mp4"}
                      onChange={() => setMediaSource("mp4")}
                    />
                    Upload .MP4 File
                  </label>
                  <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
                    <input 
                      type="radio" 
                      name="mediaSource" 
                      className="text-accent-gold focus:ring-accent-gold" 
                      checked={mediaSource === "youtube"}
                      onChange={() => setMediaSource("youtube")}
                    />
                    YouTube Unlisted Link
                  </label>
                </div>

                {/* File Upload UI */}
                {mediaSource === "mp4" && (
                  <div className="bg-black border-2 border-dashed border-white/20 rounded-lg p-10 text-center hover:border-accent-gold transition-colors cursor-pointer mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white font-medium mb-1">Click to upload .MP4 file</p>
                    <p className="text-sm text-gray-500">Max size: 5GB. H.264 codec recommended.</p>
                  </div>
                )}
                
                {/* YouTube Link UI */}
                {mediaSource === "youtube" && (
                  <div className="mb-4">
                    <input type="text" className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://youtube.com/watch?v=..." />
                    <p className="text-sm text-gray-500 mt-2">Paste a public or unlisted YouTube video URL.</p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button type="button" className="px-6 py-2 rounded font-medium text-white hover:bg-white/5 transition-colors">Save as Draft</button>
                <button 
                  type="button" 
                  onClick={async () => {
                    // This is where Supabase Integration happens
                    // const { data, error } = await supabase.from('content').insert([{ title, genre, type, synopsis }]);
                    alert("Ready to publish! Need Supabase URL in .env.local to complete transaction.");
                  }}
                  className="px-6 py-2 rounded font-bold bg-accent-gold text-black hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  Publish Content
                </button>
              </div>

            </form>
          </div>
        )}
        
      </div>
    </div>
  );
}
