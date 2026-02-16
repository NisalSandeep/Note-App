import { useParams, useLocation, useNavigate } from "react-router-dom";

const NoteFormView = () => {
    const id = useParams().id;
    const location = useLocation();
    const navigate = useNavigate();
    const { title, content, category, createAt } = location.state || {};

    const categoryColors = {
        Work: 'bg-blue-500 text-white',
        Personal: 'bg-pink-500 text-white',
        Ideas: 'bg-purple-500 text-white',
        Study: 'bg-green-500 text-white',
        General: 'bg-amber-500 text-white'
    };

    const categoryColor = categoryColors[category] || categoryColors.General;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => navigate('/home')} 
                    className="mb-8 flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Notes
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-10 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`${categoryColor} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg`}>
                                {category || 'General'}
                            </span>
                            <div className="flex items-center gap-2 text-white/90">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span className="text-sm">{createAt || 'Unknown date'}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title || 'Untitled Note'}</h1>
                    </div>

                    {/* Content Section */}
                    <div className="p-10">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                                {content || 'No content available'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteFormView;