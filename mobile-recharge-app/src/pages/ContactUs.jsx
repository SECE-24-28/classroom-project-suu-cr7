import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Contact form:', data);
    alert('Message sent successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register('name')}
                placeholder="Your Name"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
                required
              />
              <input
                {...register('email')}
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
                required
              />
              <textarea
                {...register('message')}
                placeholder="Your Message"
                rows="5"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-secondary" size={24} />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-secondary" size={24} />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@mobilerecharge.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-secondary" size={24} />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Tech Street, Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;