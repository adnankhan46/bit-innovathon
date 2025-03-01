"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import axios from "axios"
import LocationService from "./LocationService"

export default function SOSButton() {
  const [isPressed, setIsPressed] = useState(false)
  const [pressTimer, setPressTimer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inSafeZone, setInSafeZone] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    LocationService.loadSafeZones().then(() => {
      LocationService.startTracking((position, safe) => {
        setInSafeZone(safe)
      })
    })
    return () => LocationService.stopTracking()
  }, [])

  const triggerSOS = async () => {
    setLoading(true)
    setMessage("")
    try {
      const location = LocationService.getCurrentLocation()
      if (!location) {
        setMessage("Unable to get your location. Please try again.")
        setLoading(false)
        return
      }

      await axios.post("/api/sos", {
        latitude: location.latitude,
        longitude: location.longitude,
        leftSafeZone: LocationService.hasJustLeftSafeZone()
      })

      setMessage("SOS alert sent successfully! Help is on the way.")
    } catch (error) {
      console.error("Failed to send SOS:", error)
      setMessage("Failed to send SOS. Please try again or call emergency services directly.")
    } finally {
      setLoading(false)
    }
  }

  const handleMouseDown = () => {
    setIsPressed(true)
    const timer = setTimeout(() => {
      triggerSOS()
      setIsPressed(false)
    }, 3000)
    setPressTimer(timer)
  }

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
    setIsPressed(false)
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Emergency SOS</h3>
      <button
        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isPressed ? "bg-red-700 scale-95 shadow-inner" : "bg-red-600 hover:bg-red-700"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={(e) => {
          e.preventDefault()
          handleMouseDown()
        }}
        onTouchEnd={(e) => {
          e.preventDefault()
          handleMouseUp()
        }}
        disabled={loading}
      >
        <div className="text-white flex flex-col items-center">
          <AlertTriangle className="h-12 w-12 mb-1" />
          <span className="font-bold text-sm">{loading ? "Sending..." : isPressed ? "HOLD..." : "PRESS & HOLD"}</span>
        </div>
      </button>
      {!inSafeZone && <div className="text-red-600 mt-3">You are outside a safe zone. Stay alert!</div>}
      {message && <div className="text-sm text-gray-600 mt-2">{message}</div>}
    </div>
  )
}
