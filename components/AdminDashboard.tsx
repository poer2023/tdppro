
import React, { useState } from 'react';
import { useData, useAuth, useSettings } from '../store';
import { BlogPost, Moment, Project, ShareItem, GalleryItem } from '../types';
import { 
  FileText, Image as ImageIcon, Database, 
  LogOut, Plus, Trash2, Edit2, Menu, X, 
  Briefcase, Link2, Camera, Layers, Play,
  LayoutTemplate
} from 'lucide-react';

type Tab = 'posts' | 'moments' | 'projects' | 'curated' | 'gallery' | 'hero' | 'data';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useSettings();
  const { 
    // Posts
    posts, addPost, updatePost, deletePost,
    // Moments
    moments, addMoment, updateMoment, deleteMoment,
    // Projects
    projects, addProject, updateProject, deleteProject,
    // Share Items
    shareItems, addShareItem, updateShareItem, deleteShareItem,
    // Gallery
    galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
    // Data
    movieData, updateMovieData,
    skillData, updateSkillData,
    gameData, updateGameData,
    routineData, updateRoutineData,
    stepsData, updateStepsData,
    photoStats, updatePhotoStats,
    // Hero
    heroImages, updateHeroImages
  } = useData();
  
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Edit States
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [editingMoment, setEditingMoment] = useState<Partial<Moment> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingShare, setEditingShare] = useState<Partial<ShareItem> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [newHeroImage, setNewHeroImage] = useState('');

  // --- Helpers ---
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const closeSidebar = () => setIsSidebarOpen(false);

  // --- Save Handlers ---
  const handleSavePost = () => {
    if (!editingPost?.title) return;
    const newPost: BlogPost = {
      id: editingPost.id || generateId(),
      title: editingPost.title || '',
      excerpt: editingPost.excerpt || '',
      category: editingPost.category || 'Life',
      date: editingPost.date || new Date().toLocaleDateString(),
      readTime: editingPost.readTime || '5 min read',
      imageUrl: editingPost.imageUrl || '',
      tags: editingPost.tags || [],
      type: 'article',
      likes: editingPost.likes || 0,
      comments: editingPost.comments || []
    };
    editingPost.id ? updatePost(newPost) : addPost(newPost);
    setEditingPost(null);
  };

  const handleSaveMoment = () => {
    if (!editingMoment?.content) return;
    const newMoment: Moment = {
      id: editingMoment.id || generateId(),
      content: editingMoment.content || '',
      date: editingMoment.date || 'Just now',
      images: editingMoment.images || [],
      tags: editingMoment.tags || [],
      type: 'moment',
      likes: editingMoment.likes || 0,
      comments: editingMoment.comments || []
    };
    editingMoment.id ? updateMoment(newMoment) : addMoment(newMoment);
    setEditingMoment(null);
  };

  const handleSaveProject = () => {
    if (!editingProject?.title) return;
    const newProject: Project = {
      id: editingProject.id || generateId(),
      title: editingProject.title || '',
      description: editingProject.description || '',
      imageUrl: editingProject.imageUrl || '',
      technologies: editingProject.technologies || [],
      demoUrl: editingProject.demoUrl,
      repoUrl: editingProject.repoUrl,
      date: editingProject.date || '2023',
      role: editingProject.role || 'Developer',
      year: editingProject.year || new Date().getFullYear().toString(),
      features: editingProject.features || [],
      stats: editingProject.stats || []
    };
    editingProject.id ? updateProject(newProject) : addProject(newProject);
    setEditingProject(null);
  };

  const handleSaveShare = () => {
    if (!editingShare?.title) return;
    const newShare: ShareItem = {
      id: editingShare.id || generateId(),
      title: editingShare.title || '',
      description: editingShare.description || '',
      url: editingShare.url || '',
      domain: editingShare.domain || new URL(editingShare.url || 'https://example.com').hostname,
      imageUrl: editingShare.imageUrl,
      date: editingShare.date || 'Just now',
      tags: editingShare.tags || [],
      type: 'share',
      likes: editingShare.likes || 0
    };
    editingShare.id ? updateShareItem(newShare) : addShareItem(newShare);
    setEditingShare(null);
  };

  const handleSaveGallery = () => {
    if (!editingGallery?.url) return;
    const newGallery: GalleryItem = {
      id: editingGallery.id || generateId(),
      type: editingGallery.type || 'image',
      url: editingGallery.url || '',
      thumbnail: editingGallery.thumbnail,
      title: editingGallery.title || 'Untitled',
      description: editingGallery.description,
      date: editingGallery.date || new Date().toISOString().split('T')[0],
      location: editingGallery.location,
      exif: editingGallery.exif
    };
    editingGallery.id ? updateGalleryItem(newGallery) : addGalleryItem(newGallery);
    setEditingGallery(null);
  };

  const handleAddHeroImage = () => {
      if(newHeroImage) {
          updateHeroImages([...heroImages, newHeroImage]);
          setNewHeroImage('');
      }
  };
  const handleRemoveHeroImage = (index: number) => {
      const newImages = [...heroImages];
      newImages.splice(index, 1);
      updateHeroImages(newImages);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-stone-900 dark:bg-black z-30 flex items-center justify-between px-4 shadow-md">
         <h1 className="font-serif text-xl text-white">CMS</h1>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in"
            onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-stone-900 dark:bg-black text-stone-300 flex flex-col h-full
        transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 overflow-y-auto
      `}>
        <div className="p-6 hidden md:block">
          <h1 className="font-serif text-xl text-white">Lumina CMS</h1>
        </div>
        <div className="h-16 md:hidden"></div>
        
        <nav className="flex-1 px-3 space-y-8 mt-4 md:mt-0">
          
          {/* CONTENT GROUP */}
          <div>
            <div className="px-4 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Content</div>
            <div className="space-y-1">
                <NavBtn active={activeTab === 'posts'} onClick={() => { setActiveTab('posts'); closeSidebar(); }} icon={<FileText size={18} />} label="Articles" />
                <NavBtn active={activeTab === 'moments'} onClick={() => { setActiveTab('moments'); closeSidebar(); }} icon={<ImageIcon size={18} />} label="Moments" />
                <NavBtn active={activeTab === 'curated'} onClick={() => { setActiveTab('curated'); closeSidebar(); }} icon={<Link2 size={18} />} label="Curated" />
                <NavBtn active={activeTab === 'projects'} onClick={() => { setActiveTab('projects'); closeSidebar(); }} icon={<Briefcase size={18} />} label="Projects" />
            </div>
          </div>

          {/* MEDIA GROUP */}
          <div>
             <div className="px-4 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Media</div>
             <div className="space-y-1">
                <NavBtn active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); closeSidebar(); }} icon={<Camera size={18} />} label="Gallery" />
                <NavBtn active={activeTab === 'hero'} onClick={() => { setActiveTab('hero'); closeSidebar(); }} icon={<LayoutTemplate size={18} />} label="Hero Images" />
             </div>
          </div>

          {/* DATA GROUP */}
          <div>
             <div className="px-4 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Quantified Self</div>
             <div className="space-y-1">
                <NavBtn active={activeTab === 'data'} onClick={() => { setActiveTab('data'); closeSidebar(); }} icon={<Database size={18} />} label="Life Log Data" />
             </div>
          </div>

        </nav>

        <div className="p-4 border-t border-stone-800 bg-stone-900 dark:bg-black">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-900/20 rounded-lg transition-colors"
          >
            <LogOut size={18} /> {t('Logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        min-h-screen transition-all duration-300
        pt-20 p-4 md:pt-8 md:p-8 md:ml-64
      `}>
        
        {/* --- ARTICLES --- */}
        {activeTab === 'posts' && (
          <SectionContainer title="Articles" onAdd={() => setEditingPost({})}>
            {editingPost ? (
              <EditForm 
                  title={editingPost.id ? 'Edit Article' : 'New Article'}
                  onSave={handleSavePost}
                  onCancel={() => setEditingPost(null)}
              >
                 <Input label="Title" value={editingPost.title} onChange={v => setEditingPost({...editingPost, title: v})} />
                 <TextArea label="Excerpt" value={editingPost.excerpt} onChange={v => setEditingPost({...editingPost, excerpt: v})} />
                 <div className="grid grid-cols-2 gap-4">
                    <Input label="Category" value={editingPost.category} onChange={v => setEditingPost({...editingPost, category: v})} />
                    <Input label="Read Time" value={editingPost.readTime} onChange={v => setEditingPost({...editingPost, readTime: v})} />
                 </div>
                 <Input label="Image URL" value={editingPost.imageUrl} onChange={v => setEditingPost({...editingPost, imageUrl: v})} />
              </EditForm>
            ) : (
                <ListContainer>
                    {posts.map(post => (
                        <ListItem key={post.id} title={post.title} subtitle={`${post.category} • ${post.date}`} onEdit={() => setEditingPost(post)} onDelete={() => deletePost(post.id)} />
                    ))}
                </ListContainer>
            )}
          </SectionContainer>
        )}

        {/* --- MOMENTS --- */}
        {activeTab === 'moments' && (
            <SectionContainer title="Moments" onAdd={() => setEditingMoment({})}>
                {editingMoment ? (
                    <EditForm title={editingMoment.id ? 'Edit Moment' : 'New Moment'} onSave={handleSaveMoment} onCancel={() => setEditingMoment(null)}>
                        <TextArea label="Content" value={editingMoment.content} onChange={v => setEditingMoment({...editingMoment, content: v})} />
                        <Input label="Images (Comma separated URLs)" value={editingMoment.images?.join(', ')} onChange={v => setEditingMoment({...editingMoment, images: v.split(',').map(s => s.trim()).filter(Boolean)})} />
                        <Input label="Tags (Comma separated)" value={editingMoment.tags?.join(', ')} onChange={v => setEditingMoment({...editingMoment, tags: v.split(',').map(s => s.trim()).filter(Boolean)})} />
                    </EditForm>
                ) : (
                    <div className="grid gap-4">
                        {moments.map(m => (
                            <div key={m.id} className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex justify-between items-start gap-4">
                                <div>
                                    <p className="text-stone-800 dark:text-stone-200 line-clamp-2">{m.content}</p>
                                    <span className="text-xs text-stone-400 mt-1 block">{m.date}</span>
                                </div>
                                <div className="flex gap-2">
                                    <ActionBtn onClick={() => setEditingMoment(m)} icon={<Edit2 size={16} />} />
                                    <ActionBtn onClick={() => deleteMoment(m.id)} icon={<Trash2 size={16} />} danger />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </SectionContainer>
        )}

        {/* --- PROJECTS --- */}
        {activeTab === 'projects' && (
            <SectionContainer title="Projects" onAdd={() => setEditingProject({})}>
                {editingProject ? (
                    <EditForm title={editingProject.id ? 'Edit Project' : 'New Project'} onSave={handleSaveProject} onCancel={() => setEditingProject(null)}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Title" value={editingProject.title} onChange={v => setEditingProject({...editingProject, title: v})} />
                            <Input label="Role" value={editingProject.role} onChange={v => setEditingProject({...editingProject, role: v})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Year" value={editingProject.year} onChange={v => setEditingProject({...editingProject, year: v})} />
                             <Input label="Date" value={editingProject.date} onChange={v => setEditingProject({...editingProject, date: v})} />
                        </div>
                        <TextArea label="Description" value={editingProject.description} onChange={v => setEditingProject({...editingProject, description: v})} />
                        <Input label="Image URL" value={editingProject.imageUrl} onChange={v => setEditingProject({...editingProject, imageUrl: v})} />
                        <div className="grid grid-cols-2 gap-4">
                             <Input label="Demo URL" value={editingProject.demoUrl} onChange={v => setEditingProject({...editingProject, demoUrl: v})} />
                             <Input label="Repo URL" value={editingProject.repoUrl} onChange={v => setEditingProject({...editingProject, repoUrl: v})} />
                        </div>
                        <Input label="Technologies (Comma separated)" value={editingProject.technologies?.join(', ')} onChange={v => setEditingProject({...editingProject, technologies: v.split(',').map(s => s.trim())})} />
                        <Input label="Features (Comma separated)" value={editingProject.features?.join(', ')} onChange={v => setEditingProject({...editingProject, features: v.split(',').map(s => s.trim())})} />
                    </EditForm>
                ) : (
                    <ListContainer>
                        {projects.map(p => (
                            <ListItem key={p.id} title={p.title} subtitle={p.role} onEdit={() => setEditingProject(p)} onDelete={() => deleteProject(p.id)} image={p.imageUrl} />
                        ))}
                    </ListContainer>
                )}
            </SectionContainer>
        )}

        {/* --- CURATED (SHARE ITEMS) --- */}
        {activeTab === 'curated' && (
            <SectionContainer title="Curated Links" onAdd={() => setEditingShare({})}>
                 {editingShare ? (
                    <EditForm title={editingShare.id ? 'Edit Share' : 'New Share'} onSave={handleSaveShare} onCancel={() => setEditingShare(null)}>
                        <Input label="Title" value={editingShare.title} onChange={v => setEditingShare({...editingShare, title: v})} />
                        <Input label="URL" value={editingShare.url} onChange={v => setEditingShare({...editingShare, url: v})} />
                        <TextArea label="Description" value={editingShare.description} onChange={v => setEditingShare({...editingShare, description: v})} />
                        <Input label="Domain (Optional)" value={editingShare.domain} onChange={v => setEditingShare({...editingShare, domain: v})} />
                        <Input label="Image URL (Optional)" value={editingShare.imageUrl} onChange={v => setEditingShare({...editingShare, imageUrl: v})} />
                        <Input label="Tags" value={editingShare.tags?.join(', ')} onChange={v => setEditingShare({...editingShare, tags: v.split(',').map(s => s.trim())})} />
                    </EditForm>
                 ) : (
                    <ListContainer>
                        {shareItems.map(s => (
                            <ListItem key={s.id} title={s.title} subtitle={s.domain} onEdit={() => setEditingShare(s)} onDelete={() => deleteShareItem(s.id)} />
                        ))}
                    </ListContainer>
                 )}
            </SectionContainer>
        )}

        {/* --- GALLERY --- */}
        {activeTab === 'gallery' && (
             <SectionContainer title="Gallery" onAdd={() => setEditingGallery({})}>
                {editingGallery ? (
                    <EditForm title={editingGallery.id ? 'Edit Item' : 'New Item'} onSave={handleSaveGallery} onCancel={() => setEditingGallery(null)}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Title" value={editingGallery.title} onChange={v => setEditingGallery({...editingGallery, title: v})} />
                             <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Type</label>
                                <select 
                                    className="w-full p-3 border rounded-lg bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none"
                                    value={editingGallery.type || 'image'}
                                    onChange={e => setEditingGallery({...editingGallery, type: e.target.value as 'image'|'video'})}
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                        </div>
                        <Input label="URL" value={editingGallery.url} onChange={v => setEditingGallery({...editingGallery, url: v})} />
                        {editingGallery.type === 'video' && (
                             <Input label="Thumbnail URL" value={editingGallery.thumbnail} onChange={v => setEditingGallery({...editingGallery, thumbnail: v})} />
                        )}
                        <TextArea label="Description" value={editingGallery.description} onChange={v => setEditingGallery({...editingGallery, description: v})} />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Date" value={editingGallery.date} onChange={v => setEditingGallery({...editingGallery, date: v})} />
                            <Input label="Location" value={editingGallery.location} onChange={v => setEditingGallery({...editingGallery, location: v})} />
                        </div>
                        
                        {/* Simple EXIF Editor */}
                        <div className="mt-4 border-t border-stone-200 dark:border-stone-800 pt-4">
                            <h4 className="text-sm font-bold mb-3 dark:text-stone-300">EXIF Data</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <Input label="Camera" value={editingGallery.exif?.camera} onChange={v => setEditingGallery({...editingGallery, exif: {...editingGallery.exif!, camera: v}})} />
                                <Input label="Lens" value={editingGallery.exif?.lens} onChange={v => setEditingGallery({...editingGallery, exif: {...editingGallery.exif!, lens: v}})} />
                                <Input label="Aperture" value={editingGallery.exif?.aperture} onChange={v => setEditingGallery({...editingGallery, exif: {...editingGallery.exif!, aperture: v}})} />
                                <Input label="ISO" value={editingGallery.exif?.iso} onChange={v => setEditingGallery({...editingGallery, exif: {...editingGallery.exif!, iso: v}})} />
                                <Input label="Shutter" value={editingGallery.exif?.shutter} onChange={v => setEditingGallery({...editingGallery, exif: {...editingGallery.exif!, shutter: v}})} />
                            </div>
                        </div>
                    </EditForm>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryItems.map(item => (
                            <div key={item.id} className="relative group rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-800 aspect-square">
                                <img src={item.type === 'video' ? item.thumbnail : item.url} className="w-full h-full object-cover" />
                                {item.type === 'video' && <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white"><Play size={12} /></div>}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => setEditingGallery(item)} className="p-2 bg-white rounded-full text-stone-900 hover:scale-110 transition-transform"><Edit2 size={16} /></button>
                                    <button onClick={() => deleteGalleryItem(item.id)} className="p-2 bg-rose-500 rounded-full text-white hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs truncate">
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </SectionContainer>
        )}

        {/* --- HERO IMAGES --- */}
        {activeTab === 'hero' && (
             <SectionContainer title="Hero Shuffle Grid" onAdd={() => {}}>
                 <div className="mb-6 flex gap-2">
                     <input 
                        className="flex-1 p-3 border rounded-lg bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                        placeholder="Paste image URL here..."
                        value={newHeroImage}
                        onChange={e => setNewHeroImage(e.target.value)}
                     />
                     <button onClick={handleAddHeroImage} className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 rounded-lg font-bold">Add</button>
                 </div>
                 <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                     {heroImages.map((src, idx) => (
                         <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square bg-stone-200 dark:bg-stone-800">
                             <img src={src} className="w-full h-full object-cover" />
                             <button onClick={() => handleRemoveHeroImage(idx)} className="absolute top-2 right-2 p-1 bg-rose-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                 <X size={14} />
                             </button>
                         </div>
                     ))}
                 </div>
             </SectionContainer>
        )}

        {/* --- DATA --- */}
        {activeTab === 'data' && (
             <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20 space-y-8">
                 <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Life Log Data</h2>

                 {/* Skills */}
                 <DataSection title="Skills" icon={<Layers size={18} />}>
                     <div className="space-y-3">
                        {skillData.map((skill, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Input value={skill.name} onChange={v => { const n = [...skillData]; n[idx].name = v; updateSkillData(n); }} />
                                <div className="w-24"><Input type="number" value={skill.level.toString()} onChange={v => { const n = [...skillData]; n[idx].level = Number(v); updateSkillData(n); }} /></div>
                            </div>
                        ))}
                     </div>
                 </DataSection>

                 {/* Game Radar */}
                 <DataSection title="Game Stats (Radar)" icon={<Database size={18} />}>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                         {gameData.map((g, idx) => (
                             <div key={idx} className="p-3 border rounded bg-stone-50 dark:bg-stone-900 dark:border-stone-800">
                                 <div className="text-xs font-bold mb-2 text-stone-500">{g.subject}</div>
                                 <Input type="number" label="Value" value={g.A.toString()} onChange={v => { const n = [...gameData]; n[idx].A = Number(v); updateGameData(n); }} />
                             </div>
                         ))}
                     </div>
                 </DataSection>

                 {/* Routine */}
                 <DataSection title="Weekly Routine (Pie)" icon={<Database size={18} />}>
                     <div className="space-y-3">
                         {routineData.map((r, idx) => (
                             <div key={idx} className="flex gap-2 items-center">
                                 <div className="w-6 h-6 rounded border border-stone-200" style={{backgroundColor: r.color}}></div>
                                 <Input value={r.name} onChange={v => { const n = [...routineData]; n[idx].name = v; updateRoutineData(n); }} />
                                 <div className="w-24"><Input type="number" value={r.value.toString()} onChange={v => { const n = [...routineData]; n[idx].value = Number(v); updateRoutineData(n); }} /></div>
                             </div>
                         ))}
                     </div>
                 </DataSection>

                  {/* Steps */}
                 <DataSection title="Daily Steps" icon={<Database size={18} />}>
                     <div className="grid grid-cols-7 gap-2">
                         {stepsData.map((s, idx) => (
                             <div key={idx} className="text-center">
                                 <div className="text-xs mb-1 text-stone-500">{s.day}</div>
                                 <Input type="number" value={s.steps.toString()} onChange={v => { const n = [...stepsData]; n[idx].steps = Number(v); updateStepsData(n); }} />
                             </div>
                         ))}
                     </div>
                 </DataSection>

                  {/* Photo Stats */}
                 <DataSection title="Photo Stats" icon={<Database size={18} />}>
                     <div className="grid grid-cols-7 gap-2">
                         {photoStats.map((s, idx) => (
                             <div key={idx} className="text-center">
                                 <div className="text-xs mb-1 text-stone-500">{s.day}</div>
                                 <Input type="number" value={s.count.toString()} onChange={v => { const n = [...photoStats]; n[idx].count = Number(v); updatePhotoStats(n); }} />
                             </div>
                         ))}
                     </div>
                 </DataSection>

                 {/* Movies */}
                 <DataSection title="Movies & Series" icon={<Database size={18} />}>
                     <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                         {movieData.map((m, idx) => (
                             <div key={idx} className="text-center p-2 border rounded dark:border-stone-800">
                                 <div className="text-xs font-bold mb-2">{m.month}</div>
                                 <div className="space-y-1">
                                    <Input type="number" label="Mov" value={m.movies.toString()} onChange={v => { const n = [...movieData]; n[idx].movies = Number(v); updateMovieData(n); }} />
                                    <Input type="number" label="Ser" value={m.series.toString()} onChange={v => { const n = [...movieData]; n[idx].series = Number(v); updateMovieData(n); }} />
                                 </div>
                             </div>
                         ))}
                     </div>
                 </DataSection>
             </div>
        )}

      </main>
    </div>
  );
};

// --- Subcomponents for Clean Layout ---

const NavBtn = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${active ? 'bg-sage-600 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'}`}
    >
        {icon} <span>{label}</span>
    </button>
);

const SectionContainer = ({ title, children, onAdd }: { title: string, children: React.ReactNode, onAdd: () => void }) => (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{title}</h2>
            <button 
                onClick={onAdd}
                className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 font-medium text-sm transition-opacity"
            >
                <Plus size={16} /> Add New
            </button>
        </div>
        {children}
    </div>
);

const ListContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="grid gap-3">{children}</div>
);

const ListItem = ({ title, subtitle, image, onEdit, onDelete }: { title: string, subtitle?: string, image?: string, onEdit: () => void, onDelete: () => void }) => (
    <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4 transition-colors">
        {image && <img src={image} className="w-10 h-10 rounded object-cover bg-stone-200" />}
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-stone-800 dark:text-stone-100 truncate">{title}</h3>
            {subtitle && <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 truncate">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
            <ActionBtn onClick={onEdit} icon={<Edit2 size={16} />} />
            <ActionBtn onClick={onDelete} icon={<Trash2 size={16} />} danger />
        </div>
    </div>
);

const ActionBtn = ({ onClick, icon, danger }: { onClick: () => void, icon: React.ReactNode, danger?: boolean }) => (
    <button 
        onClick={onClick}
        className={`p-2 rounded-lg transition-colors ${danger ? 'text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20' : 'text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
    >
        {icon}
    </button>
);

const EditForm = ({ title, children, onSave, onCancel }: { title: string, children: React.ReactNode, onSave: () => void, onCancel: () => void }) => (
    <div className="bg-white dark:bg-stone-900 p-6 rounded-xl shadow-sm border border-stone-200 dark:border-stone-800">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">{title}</h3>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
        </div>
        <div className="space-y-4">
            {children}
        </div>
        <div className="flex gap-3 pt-6 mt-2 border-t border-stone-100 dark:border-stone-800">
            <button onClick={onSave} className="flex-1 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-2.5 rounded-lg font-bold hover:opacity-90">Save Changes</button>
            <button onClick={onCancel} className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-6 py-2.5 rounded-lg font-medium hover:bg-stone-200 dark:hover:bg-stone-700">Cancel</button>
        </div>
    </div>
);

const Input = ({ label, value, onChange, type = "text" }: { label?: string, value?: string, onChange: (val: string) => void, type?: string }) => (
    <div>
        {label && <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{label}</label>}
        <input 
            type={type}
            className="w-full p-3 border rounded-lg bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500/20 transition-all text-sm"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
        />
    </div>
);

const TextArea = ({ label, value, onChange }: { label?: string, value?: string, onChange: (val: string) => void }) => (
    <div>
        {label && <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{label}</label>}
        <textarea 
            className="w-full p-3 border rounded-lg h-32 bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500/20 transition-all text-sm resize-none"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
        />
    </div>
);

const DataSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-stone-800 dark:text-stone-200 pb-4 border-b border-stone-100 dark:border-stone-800">
            {icon} {title}
        </h3>
        {children}
    </div>
);

export default AdminDashboard;
