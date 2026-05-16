import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const webinarText =
  'Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F';

const Contact = () => {
  const handleCall = () => {
    window.open('tel:+918065919278');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/918905939199?text=${webinarText}`);
  };

  const handleWhatsApp2 = () => {
    window.open(`https://wa.me/917850934748?text=${webinarText}`);
  };

  const handleEmail = () => {
    window.open('mailto:help@stockwiz.in');
  };

  return (
    <div className="max-w-md mx-auto px-4 space-y-3">
      {/* Call Contact */}
      <div 
        onClick={handleCall}
        className="flex items-center justify-between bg-[#F4F7FF] border border-[#E1E9FF] rounded-lg p-4 cursor-pointer hover:bg-[#EBF2FF] transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <PhoneIcon 
              sx={{ 
                fontSize: 20, 
                color: '#407AFF' 
              }} 
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Call</p>
            <p className="text-xs text-gray-600">+91 - 8065919278</p>
          </div>
        </div>
        <ChevronRightIcon 
          sx={{ 
            fontSize: 20, 
            color: '#9CA3AF' 
          }} 
        />
      </div>

      {/* WhatsApp Contact */}
      <div 
        onClick={handleWhatsApp}
        className="flex items-center justify-between bg-[#F4F7FF] border border-[#E1E9FF] rounded-lg p-4 cursor-pointer hover:bg-[#EBF2FF] transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <WhatsAppIcon 
              sx={{ 
                fontSize: 20, 
                color: '#407AFF' 
              }} 
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">WhatsApp</p>
            <p className="text-xs text-gray-600">+91 - 8905939199</p>
          </div>
        </div>
        <ChevronRightIcon 
          sx={{ 
            fontSize: 20, 
            color: '#9CA3AF' 
          }} 
        />
      </div>

      <div 
        onClick={handleWhatsApp2}
        className="flex items-center justify-between bg-[#F4F7FF] border border-[#E1E9FF] rounded-lg p-4 cursor-pointer hover:bg-[#EBF2FF] transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <WhatsAppIcon 
              sx={{ 
                fontSize: 20, 
                color: '#407AFF' 
              }} 
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">WhatsApp</p>
            <p className="text-xs text-gray-600">+91 - 7850934748</p>
          </div>
        </div>
        <ChevronRightIcon 
          sx={{ 
            fontSize: 20, 
            color: '#9CA3AF' 
          }} 
        />
      </div>

      {/* Email Contact */}
      <div 
        onClick={handleEmail}
        className="flex items-center justify-between bg-[#F4F7FF] border border-[#E1E9FF] rounded-lg p-4 cursor-pointer hover:bg-[#EBF2FF] transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <EmailIcon 
              sx={{ 
                fontSize: 20, 
                color: '#407AFF' 
              }} 
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Email</p>
            <p className="text-xs text-gray-600">help@stockwiz.in</p>
          </div>
        </div>
        <ChevronRightIcon 
          sx={{ 
            fontSize: 20, 
            color: '#9CA3AF' 
          }} 
        />
      </div>
    </div>
  );
};

export default Contact;
