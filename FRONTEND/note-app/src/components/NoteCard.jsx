import { Link } from "react-router-dom";

const NoteCard = ({ id, title, content, category, createAt, onDelete }) => {
  // Color schemes for different categories
  const colorSchemes = {
    Work: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      badge: 'bg-blue-500 text-white',
      hover: 'hover:border-blue-300'
    },
    Personal: {
      bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
      border: 'border-pink-200',
      badge: 'bg-pink-500 text-white',
      hover: 'hover:border-pink-300'
    },
    Ideas: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-200',
      badge: 'bg-purple-500 text-white',
      hover: 'hover:border-purple-300'
    },
    Study: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      badge: 'bg-green-500 text-white',
      hover: 'hover:border-green-300'
    },
    General: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      border: 'border-amber-200',
      badge: 'bg-amber-500 text-white',
      hover: 'hover:border-amber-300'
    }
  };

  const scheme = colorSchemes[category] || colorSchemes.General;

  const data = {
    id,
    title,
    content,
    category,
    createAt
  };

  // Truncate text
  const truncateText = (text, maxLength = 10) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <li className={`${scheme.bg} border-2 ${scheme.border} ${scheme.hover} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
      <div className="p-6 flex flex-col h-full">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`${scheme.badge} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
            {category || 'General'}
          </span>
          <span className="text-xs text-gray-500">{createAt}</span>
        </div>

        {/* Title */}
        <Link to={`/notes/${id}`} state={data} className="block mb-4 group cursor-pointer">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight" title={title}>
            {title || 'Untitled'}
          </h2>
        </Link>

        {/* Content Preview */}
        {content && (
          <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3 flex-grow" title={content}>
            {content}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
          <Link to={`/notes/edit/${id}`} state={data} className="flex-1">
            <button 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-blue-50 text-blue-600 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-blue-200 cursor-pointer"
              title="Edit"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit
            </button>
          </Link>
          <button 
            onClick={() => onDelete(id, title)}
            className="px-4 py-3 bg-white hover:bg-red-50 text-red-600 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-red-200 cursor-pointer"
            title="Delete"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteCard;
