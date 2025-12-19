import { Bell, CheckCircle, AlertCircle, Gift } from 'lucide-react';
import { useRecharge } from '../context/RechargeContext';

const Notifications = () => {
  const { rechargeData } = useRecharge();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return CheckCircle;
      case 'offer': return Gift;
      case 'alert': return AlertCircle;
      default: return Bell;
    }
  };

  const getIconColor = (type) => {
    switch(type) {
      case 'success': return 'text-green-500';
      case 'offer': return 'text-blue-500';
      case 'alert': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Bell className="text-primary mr-3" size={32} />
          <h1 className="text-4xl font-bold text-primary">Notifications</h1>
        </div>
        
        <div className="space-y-4">
          {rechargeData.notifications.map(notification => {
            const IconComponent = getIcon(notification.type);
            return (
              <div key={notification.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <IconComponent className={getIconColor(notification.type)} size={24} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;