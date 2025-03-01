import React, {useRef, useState, useEffect} from 'react'
import { Pencil, RotateCcw } from "lucide-react"

const CanvasDetection = ({ triggerSOS }) => {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [hasDrawn, setHasDrawn] = useState(false)
    const [drawingTimeout, setDrawingTimeout] = useState(null)
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  
    // Initialize canvas
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
  
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
  
      // Set canvas style
      context.lineWidth = 4
      context.lineCap = "round"
      context.strokeStyle = "#db2777" // pink-600
  
      // Clear canvas
      context.fillStyle = "#fff"
      context.fillRect(0, 0, canvas.width, canvas.height)
  
      // Add instructions text
      context.fillStyle = "#9ca3af" // gray-400
      context.font = "14px sans-serif"
      context.textAlign = "center"
      context.fillText("Draw any pattern here for emergency", canvas.width / 2, canvas.height / 2)
  
      // Handle window resize
      const handleResize = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
  
        // Redraw canvas
        context.fillStyle = "#fff"
        context.fillRect(0, 0, canvas.width, canvas.height)
  
        if (!hasDrawn) {
          context.fillStyle = "#9ca3af"
          context.font = "14px sans-serif"
          context.textAlign = "center"
          context.fillText("Draw any pattern here for emergency", canvas.width / 2, canvas.height / 2)
        }
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [hasDrawn])
  
    // Start drawing
    const startDrawing = (e) => {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      const rect = canvas.getBoundingClientRect()
  
      // Get position
      let x, y
      if (e.type === "mousedown") {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      } else if (e.type === "touchstart") {
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      }
  
      // Start new path
      context.beginPath()
      context.moveTo(x, y)
  
      setIsDrawing(true)
      setHasDrawn(true)
      setLastPosition({ x, y })
  
      // Set timeout to trigger SOS after continuous drawing
      if (drawingTimeout) {
        clearTimeout(drawingTimeout)
      }
  
      const timeout = setTimeout(() => {
        triggerSOS("Canvas Drawing")
      }, 2000) // 3 seconds of continuous drawing
  
      setDrawingTimeout(timeout)
    }
  
    // Draw
    const draw = (e) => {
      if (!isDrawing) return
  
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      const rect = canvas.getBoundingClientRect()
  
      // Get position
      let x, y
      if (e.type === "mousemove") {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      } else if (e.type === "touchmove") {
        e.preventDefault() // Prevent scrolling
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      }
  
      // Calculate distance from last position
      const dx = x - lastPosition.x
      const dy = y - lastPosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)
  
      // Only draw if moved enough
      if (distance > 1) {
        context.lineTo(x, y)
        context.stroke()
        setLastPosition({ x, y })
      }
    }
  
    // Stop drawing
    const stopDrawing = () => {
      setIsDrawing(false)
  
      // Clear timeout
      if (drawingTimeout) {
        clearTimeout(drawingTimeout)
        setDrawingTimeout(null)
      }
    }
  
    // Clear canvas
    const clearCanvas = () => {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
  
      context.fillStyle = "#fff"
      context.fillRect(0, 0, canvas.width, canvas.height)
  
      setHasDrawn(false)
  
      // Add instructions text
      context.fillStyle = "#9ca3af"
      context.font = "14px sans-serif"
      context.textAlign = "center"
      context.fillText("Draw any pattern here for emergency", canvas.width / 2, canvas.height / 2)
    }
  
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Pencil className="h-5 w-5 mr-2 text-pink-600" />
            Emergency Drawing
          </h3>
          <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={clearCanvas}>
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
  
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-48 touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
  
        <p className="text-sm text-gray-500 mt-2 text-center">
          Draw continuously for 3 seconds to trigger emergency alert
        </p>
      </div>
    )
}

export default CanvasDetection
