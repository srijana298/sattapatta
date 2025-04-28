import { MessageCircle, X } from 'lucide-react';

const QuickMessageModal = ({ post, messageText, isLoading, onClose, onTextChange, onSend }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Send a Message</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-orange-50 rounded-lg p-3 mb-4">
          <p className="text-gray-700 mb-1">
            To: <span className="font-medium">{post.user.fullname}</span>
          </p>
          <p className="text-gray-600 text-sm">
            About: <span className="font-medium">"{post.title}"</span>
          </p>
        </div>

        <textarea
          className="w-full border border-gray-300 rounded-md p-3 mb-4 h-32 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-shadow"
          placeholder="Hi! I'm interested in learning about your skill swap offer..."
          value={messageText}
          onChange={(e) => onTextChange(e.target.value)}
          aria-label="Message text"
        ></textarea>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300 disabled:opacity-70"
            onClick={onSend}
            disabled={isLoading || !messageText.trim()}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 mr-1" />
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickMessageModal;
