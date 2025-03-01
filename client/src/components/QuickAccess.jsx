import { Phone, Shield, Map, Volume2, Camera, MessageSquare } from "lucide-react"

export default function QuickAccess({ triggerSOS }) {
  const quickActions = [
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Fake Call",
      color: "bg-blue-100 text-blue-700",
      action: () => console.log("Fake call triggered"),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      label: "SOS Alert",
      color: "bg-red-100 text-red-700",
      action: () => triggerSOS("Quick Access"),
    },
    {
      icon: <Map className="h-6 w-6" />,
      label: "Safe Route",
      color: "bg-green-100 text-green-700",
      action: () => console.log("Safe route requested"),
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      label: "Alarm",
      color: "bg-yellow-100 text-yellow-700",
      action: () => console.log("Alarm triggered"),
    },
    {
      icon: <Camera className="h-6 w-6" />,
      label: "Record",
      color: "bg-purple-100 text-purple-700",
      action: () => console.log("Recording started"),
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      label: "Message",
      color: "bg-pink-100 text-pink-700",
      action: () => console.log("Quick message sent"),
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>

      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} rounded-lg p-3 flex flex-col items-center justify-center transition-transform hover:scale-105`}
            onClick={action.action}
          >
            {action.icon}
            <span className="mt-2 text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

