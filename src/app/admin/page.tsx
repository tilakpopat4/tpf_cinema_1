"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mediaSource, setMediaSource] = useState("youtube");
  const [isPublishing, setIsPublishing] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Film");
  const [genre, setGenre] = useState("Drama");
  const [synopsis, setSynopsis] = useState("");
  
  const [directorName, setDirectorName] = useState("");
  const [directorPhotoUrl, setDirectorPhotoUrl] = useState("");
  
  const [landscapePosterUrl, setLandscapePosterUrl] = useState("");
  const [portraitPosterUrl, setPortraitPosterUrl] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  
  const [actorName, setActorName] = useState("");
  const [actorPhotoUrl, setActorPhotoUrl] = useState("");

  const [contentList, setContentList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch content on load or after publish
  const fetchContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('content').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setContentList(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeTab === "overview") {
      fetchContent();
    }
  }, [activeTab]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const castMembers = actorName ? [{ name: actorName, photo_url: actorPhotoUrl }] : [];
      
      const { data, error } = await supabase.from('content').insert([{
        title,
        type,
        genre,
        synopsis,
        director_name: directorName,
        director_photo_url: directorPhotoUrl,
        landscape_poster_url: landscapePosterUrl,
        portrait_poster_url: portraitPosterUrl,
        media_source: mediaSource,
        media_url: mediaUrl,
        cast_members: castMembers
      }]);

      if (error) {
        throw error;
      }

      alert("Content published successfully!");
      // Reset form
      setTitle("");
      setSynopsis("");
      setDirectorName("");
      setDirectorPhotoUrl("");
      setLandscapePosterUrl("");
      setPortraitPosterUrl("");
      setMediaUrl("");
      setActorName("");
      setActorPhotoUrl("");
      
      // Go back to overview
      setActiveTab("overview");
      
    } catch (error: any) {
      alert("Error publishing content: " + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

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
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
               <h3 className="text-xl font-bold text-white mb-2">Supabase Connected</h3>
               <p className="text-gray-400 mb-6">Navigate to the "+ New Content" tab to upload real data to your database.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-black/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Database Contents ({contentList.length})</h3>
                <button onClick={fetchContent} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors">Refresh</button>
              </div>
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-xs uppercase font-medium">
                  <tr>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Director</th>
                    <th className="px-6 py-3">Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center">Loading data from Supabase...</td></tr>
                  ) : contentList.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center">No content found in database.</td></tr>
                  ) : (
                    contentList.map((item) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{item.title}</td>
                        <td className="px-6 py-4">{item.type}</td>
                        <td className="px-6 py-4">{item.director_name}</td>
                        <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
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
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="e.g. Echoes of the Valley" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors">
                    <option value="Film">Film</option>
                    <option value="Web Series">Web Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Genre</label>
                  <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors">
                    <option value="Drama">Drama</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Docuseries">Docuseries</option>
                    <option value="Horror">Horror</option>
                    <option value="Action">Action</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Synopsis</label>
                  <textarea rows={4} value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="Brief description of the content..."></textarea>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              {/* Cast & Crew */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Cast & Crew</h3>
                <div className="space-y-6">
                  {/* Director */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                    <h4 className="text-accent-gold font-bold mb-4">Director / Creator</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Name</label>
                        <input type="text" value={directorName} onChange={(e) => setDirectorName(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="Director Name" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Photograph URL</label>
                        <input type="text" value={directorPhotoUrl} onChange={(e) => setDirectorPhotoUrl(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://..." />
                      </div>
                    </div>
                  </div>

                  {/* Cast List */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-accent-gold font-bold">Primary Actor</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Actor Name</label>
                        <input type="text" value={actorName} onChange={(e) => setActorName(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="Actor Name" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Photograph URL</label>
                        <input type="text" value={actorPhotoUrl} onChange={(e) => setActorPhotoUrl(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://..." />
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
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                    <h4 className="text-white font-bold mb-1">Landscape Poster URL</h4>
                    <p className="text-xs text-accent-gold font-bold mb-4">REQUIRED (16:9 Aspect Ratio)</p>
                    <input type="text" value={landscapePosterUrl} onChange={(e) => setLandscapePosterUrl(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://..." />
                  </div>

                  {/* Portrait Poster (2:3) */}
                  <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                    <h4 className="text-white font-bold mb-1">Portrait Poster URL</h4>
                    <p className="text-xs text-accent-gold font-bold mb-4">REQUIRED (2:3 Aspect Ratio)</p>
                    <input type="text" value={portraitPosterUrl} onChange={(e) => setPortraitPosterUrl(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-gold transition-colors" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              {/* Video Upload / Media Source */}
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
                    .MP4 URL
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
                
                <div className="mb-4">
                  <input type="text" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder={mediaSource === "youtube" ? "https://youtube.com/watch?v=..." : "https://.../video.mp4"} />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={handlePublish}
                  disabled={isPublishing || !title || !mediaUrl || !landscapePosterUrl}
                  className="px-6 py-2 rounded font-bold bg-accent-gold text-black hover:bg-yellow-600 transition-colors shadow-lg disabled:opacity-50"
                >
                  {isPublishing ? "Publishing..." : "Publish Content"}
                </button>
              </div>

            </form>
          </div>
        )}
        
      </div>
    </div>
  );
}
