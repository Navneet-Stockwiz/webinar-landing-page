import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const ContactPopup = ({ open, onClose }) => {
  const handleCall = () => {
    window.open('tel:+918065919278');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/918905939199?text=Hello%2C%20I%20just%20visited%20your%20website%2C%20I%20am%20interested%20in%20joining%20the%20webinar.%20Please%20share%20the%20webinar%20joining%20details.%20Stockwiz%20https%3A%2F%2Falgo.stockwiz.in%2F');
  };

  const handleEmail = () => {
    window.open('mailto:help@stockwiz.in');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '16px',
          padding: '8px',
          maxWidth: '480px',
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
        </div>

        {/* Contact Options */}
        <div className="space-y-4">
          {/* Call */}
          <div 
            onClick={handleCall}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <PhoneIcon 
                  sx={{ 
                    fontSize: 24, 
                    color: '#407AFF' 
                  }} 
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Call</p>
                <p className="text-sm text-gray-600">+91 - 8065919278</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div 
            onClick={handleEmail}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <EmailIcon 
                  sx={{ 
                    fontSize: 24, 
                    color: '#407AFF' 
                  }} 
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-600">help@stockwiz.in</p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div 
            onClick={handleWhatsApp}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <WhatsAppIcon 
                  sx={{ 
                    fontSize: 24, 
                    color: '#407AFF' 
                  }} 
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">+91 - 8905939199</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
