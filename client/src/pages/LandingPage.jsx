import React from 'react'
import {Link} from "react-router"
import { Bell, MapPin, Phone, Shield, Users, Clock, BookOpen, AlertTriangle, Headphones } from "lucide-react"


const LandingPage = () => {
  const features1 = [
    {
      icon: <Bell className="h-10 w-10 text-pink-500" />,
      title: "Emergency SOS",
      description: "Send instant alerts to emergency contacts with your location with just one tap.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-pink-500" />,
      title: "Location Sharing",
      description: "Share your real-time location with trusted contacts when you're on the move.",
    },
    {
      icon: <Phone className="h-10 w-10 text-pink-500" />,
      title: "Fake Call",
      description: "Trigger a simulated incoming call to help you exit uncomfortable situations.",
    },
    {
      icon: <Shield className="h-10 w-10 text-pink-500" />,
      title: "Safe Route Planning",
      description: "Get directions that prioritize well-lit and populated areas for safer travel.",
    },
    {
      icon: <Users className="h-10 w-10 text-pink-500" />,
      title: "Community Alerts",
      description: "Receive and share safety alerts about incidents in your area.",
    },
    {
      icon: <Clock className="h-10 w-10 text-pink-500" />,
      title: "Safety Check-ins",
      description: "Set timers for automatic check-ins and alerts if you don't respond.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-pink-500" />,
      title: "Self-defense Tutorials",
      description: "Access video tutorials on basic self-defense techniques and safety tips.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-pink-500" />,
      title: "Incident Reporting",
      description: "Report and document incidents with photo, video, and audio evidence.",
    },
    {
      icon: <Headphones className="h-10 w-10 text-pink-500" />,
      title: "24/7 Helpline",
      description: "Connect with trained professionals for immediate assistance and guidance.",
    },
  ]
  // TOP 3 FEATURES
  const features = [
    {
      title: "Panic Gesture",
      description:
        "Woman will get fake call.",
      image: "/placeholder.svg?height=400&width=600",
      bullets: [
        "Detects unusual behavior in your vicinity",
        "Learns your routine for personalized protection",
        "Works offline for continuous protection",
      ],
    },
    {
      title: "Fake Call",
      description:
        "Fake call with vioce recodding. ",
      image: "/placeholder.svg?height=400&width=600",
      bullets: [
        "Crowdsourced safety information for any location",
        "Verified safety partners in over 150 countries",
        "Local emergency service integration",
      ],
    },
    {
      title: "Shake Detection",
      description:
        "Every woman's safety needs are unique. Our app creates a customized safety plan based on your lifestyle, daily routines, and specific concerns.",
      image: "/placeholder.svg?height=400&width=600",
      bullets: [
        "Tailored safety recommendations",
        "Adaptive security based on your changing needs",
        "Regular safety assessments and updates",
      ],
      title: "Timer Based ",
      description:
        "Every woman's safety needs are unique. Our app creates a customized safety plan based on your lifestyle, daily routines, and specific concerns.",
      image: "/placeholder.svg?height=400&width=600",
      bullets: [
        "Tailored safety recommendations",
        "Adaptive security based on your changing needs",
        "Regular safety assessments and updates",
      ],
    },
  ];

  return (
    <div className='h-[calc(100vh - 60px)]'>
      {/* *****************************************HERo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 to-purple-900/70 z-10" />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="block">One Tap for Safety,</span>
          <span className="block mt-2">Peace of Mind for Life.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          Empowering women with technology that provides peace of mind and real-time protection wherever you go.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
           to="/signup"
            
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
          >
            SignUP
          </Link>
          <Link
            to="/signup"
            className="bg-white hover:bg-gray-100 text-pink-600 font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
          >
           Login
          </Link>
        </div>
      </div>
    </section>

    {/* ****************************************** Feature */}
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Safety Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our app is designed with multiple layers of protection to keep you safe in any situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features1.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="mb-4 bg-pink-50 p-3 rounded-full inline-block">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* *****************************************************MAIN FEATURES TOP 3 */}
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our unique approach to women's safety combines technology, community, and education.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <span className="bg-pink-500 rounded-full p-1 mr-3 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      
      
    </div>
  )
}

export default LandingPage
