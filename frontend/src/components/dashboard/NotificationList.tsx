import React from "react";

interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
}

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white shadow rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Notificações Recentes</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Nenhuma notificação encontrada.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-3 rounded ${getNotificationStyle(notification.type)}`}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
