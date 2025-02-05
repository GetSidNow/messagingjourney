import React, { useState, useEffect } from 'react';
import { MessageSquare, Hotel, Key, Home, CheckSquare, Heart } from 'lucide-react';

// Confetti animation component
const Confetti = () => {
  const colors = ['#FFD700', '#FF69B4', '#4169E1', '#32CD32', '#FF4500'];
  const pieces = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 2 + Math.random() * 2;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${randomX}%`,
              backgroundColor: randomColor,
              animation: `confetti ${randomDuration}s ease-out ${randomDelay}s`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
};

const MessagePreview = ({ message, isReceived, animate }) => (
  <div 
    className={`flex ${isReceived ? 'justify-start' : 'justify-end'} mb-4 
      ${animate ? 'animate-bounce-in' : ''}`}
  >
    <div className={`max-w-xs p-3 rounded-lg transform transition-all duration-300 hover:scale-102
      ${isReceived 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tl-none' 
        : 'bg-gradient-to-r from-gray-100 to-gray-200 rounded-tr-none'
      }`}>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const StageIcon = ({ stage, isActive }) => {
  const icons = {
    0: MessageSquare,  // Booking confirmation
    1: Hotel,          // Pre-arrival
    2: Key,            // Check-in
    3: Home,           // In-stay
    4: CheckSquare,    // Check-out
    5: Heart           // Post-stay feedback
  };
  
  const Icon = icons[stage];
  
  return (
    <div className={`p-2 rounded-full transition-all duration-300 transform
      ${isActive ? 'scale-110 bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}
    `}>
      <Icon size={20} />
    </div>
  );
};

const InteractiveJourney = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hover, setHover] = useState(null);
  
  const stages = [
    {
      title: 'Guest has booked',
      actions: ['Welcome message', "FAQ's"],
      emoji: '🎉',
      message: "Hey John! Thanks for booking with us. Your confirmation email is on its way. Want to make the most of your stay? We're here to help with activity planning, local tips, and anything else you need.",
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Pre-arrival',
      actions: ['Early online check in', 'Guest inquiries', 'Hotel amenities', 'Upselling', 'Things to do'],
      emoji: '✈️',
      message: "Hi John! We look forward to welcoming you to the Lex Hotel. Feel free to text us here if there is anything we can do before, during or after your stay. As a friendly reminder, check-in time is 3pm. If you plan to arrive on the later side, please let us know so we can prepare as well as possible for you.\n\nWarm regards,\nGuest Experience Team"
    },
    {
      title: 'Arrival',
      actions: ['Hotel Amenities', 'Digital Keys'],
      emoji: '🔑',
      message: "Hi John! Welcome to Lex Hotel. Our wifi password is 'LexGuest2024'\n\nWe're excited to have you with us and look forward to doing whatever we can to help make this a very special visit.\n\nWarm regards,\nGuest Experience Team"
    },
    {
      title: 'In-stay',
      actions: ['Issue handling', 'Restaurant Reservation', 'Spa Booking', 'Staff forwarding', 'Issue Handling', 'Room Service'],
      emoji: '🌟',
      message: "It's a pleasure having you here at Lex Hotel. We just wanted to follow up and ensure everything you need is in the suite and to your expectation. If anything is missing or have some concerns, please do not hesitate to let us know."
    },
    {
      title: 'Departure',
      actions: ['Online checkout', 'Late checkout'],
      emoji: '👋',
      message: "Dear John, we hope you enjoyed your stay with us. Your checkout time is 11 AM. Would you like to request a late checkout or assistance with your luggage?"
    },
    {
      title: 'Post-departure',
      actions: ['Feedback Gathering', 'Online Review Requests', 'Loyalty signups', 'Discount offers'],
      emoji: '💝',
      message: "It was a pleasure having you with us here at Lex Hotel. We take enormous pride in what we do and thrive on guest feedback. Please click below to share your quick thoughts: [Review Link]\n\nThank you so much,\nRobert, General Manager"
    }
  ];

  useEffect(() => {
    setShowMessage(false);
    setShowConfetti(true);
    const messageTimer = setTimeout(() => setShowMessage(true), 300);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    
    return () => {
      clearTimeout(messageTimer);
      clearTimeout(confettiTimer);
    };
  }, [currentStage]);

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg relative overflow-hidden">
      {/* GuestTouch Branding */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          GuestTouch <span className="text-blue-500">Messaging</span> Platform
        </h1>
        <div className="text-gray-600">All In One Guest Messaging Platform</div>
      </div>
      
      {showConfetti && <Confetti />}
      
      {/* Progress bar with floating animation */}
      <div className="mb-12 relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
          />
        </div>
        
        <div className="absolute top-0 w-full flex justify-between transform -translate-y-1/2">
          {stages.map((stage, index) => (
            <button
              key={index}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onClick={() => {
                setCurrentStage(index);
                setShowConfetti(true);
              }}
              className="group relative"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                ${index <= currentStage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                ${index === currentStage ? 'ring-4 ring-blue-200 animate-pulse' : ''}
                ${hover === index ? 'transform scale-110' : ''}
                hover:shadow-lg cursor-pointer`}
              >
                <StageIcon stage={index} isActive={index <= currentStage} />
              </div>
              
              {/* Floating tooltip */}
              <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                transition-all duration-300 pointer-events-none
                ${hover === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  {stages[index].title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content grid with hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="text-center transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
              {stages[currentStage].emoji} {stages[currentStage].title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stages[currentStage].actions.map((action, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 
                  transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1
                  cursor-pointer"
              >
                <p className="text-gray-700 font-medium text-center">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated message preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3 scale-105"/>
          <div className="relative bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"/>
                <span className="text-sm font-medium text-gray-700">Lex Hotel</span>
              </div>
              <span className="text-xs text-gray-500">now</span>
            </div>
            
            <div className="space-y-4">
              {showMessage && (
                <MessagePreview
                  message={stages[currentStage].message}
                  isReceived={true}
                  animate={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated navigation buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
          disabled={currentStage === 0}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:-translate-x-1
            ${currentStage === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'}`}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentStage(Math.min(stages.length - 1, currentStage + 1))}
          disabled={currentStage === stages.length - 1}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:translate-x-1
            ${currentStage === stages.length - 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'}`}
        >
          Next →
        </button>
      </div>

      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

export default InteractiveJourney;