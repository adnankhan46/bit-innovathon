import React, {useState} from 'react'
import { Bell, User, Menu } from "lucide-react"
import CanvasDetection from '../components/CanvasDetection'
// import SOSButton from '../components/SOSButton'
import QuickAccess from '../components/QUickAccess'
import SafetyTimer from '../components/SafetyTimer'

const Home = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)

  // Trigger SOS from any component
  const triggerSOS = () => {
    console.log(`SOS triggered from`)
    setShowEmergencyModal(true)
    // In a real app, you would also:
    // 1. Send alerts to emergency contacts
    // 2. Share location with trusted contacts
    // 3. Potentially contact emergency services
  }

  // Handle location updates
  const handleLocationUpdate = (location) => {
    setCurrentLocation(location)
  }

  // Close emergency modal and send "I'm safe" message
  const sendImSafe = () => {
    console.log("User confirmed they are safe")
    setShowEmergencyModal(false)
    // In a real app, you would also:
    // 1. Send "I'm safe" messages to contacts who received the alert
    // 2. Log the event in the user's safety history
  }
  return (
    <div className='h-[calc(100vh - 60px)]'>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
               {/* Primary Safety Features */}
           {/* Primary Safety Features */}
           <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Emergency Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <SOSButton triggerSOS={triggerSOS} /> */}
                {/* <LocationTracker onLocationUpdate={handleLocationUpdate} /> */}
              </div> 
            </div>

              <CanvasDetection triggerSOS={triggerSOS} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SafetyTimer triggerSOS={triggerSOS} />
            </div>
          </div>
          
       </div>   
       {/* Secondary */}
       <div className="space-y-6">
            {/* <TrustedContacts />
            <RecentAlerts /> */}
          </div>  
{/* Additional */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
          <QuickAccess triggerSOS={triggerSOS} />
          {/* <SafetyResources /> */}
        </div>
      </main>
      </div>
    </div>
  )
}

export default Home
