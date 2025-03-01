import axios from 'axios';

class LocationService {
  constructor() {
    this.watchId = null;
    this.safeZones = [];
    this.currentPosition = null;
    this.inSafeZone = false;
    this.previousInSafeZone = false;
  }

  // Initialize location tracking
  async startTracking(onLocationChange) {
    if (!('geolocation' in navigator)) {
      console.error("Geolocation is not supported by this browser.");
      return false;
    }

    // Request permission before tracking
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      if (permissionStatus.state === 'denied') {
        console.error("Geolocation permission denied. Please enable location access.");
        return false;
      }
    } catch (error) {
      console.warn("Could not check geolocation permission:", error);
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        // Check if location is in a safe zone
        this.previousInSafeZone = this.inSafeZone;
        this.inSafeZone = this.checkIfInSafeZone();

        // Detect transition from safe to unsafe zone
        if (this.previousInSafeZone && !this.inSafeZone) {
          console.log("Warning: User has exited a safe zone");
        }

        if (onLocationChange) {
          onLocationChange(this.currentPosition, this.inSafeZone);
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    return true;
  }

  // Stop tracking location
  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Load safe zones from API or local storage
  async loadSafeZones() {
    try {
      const response = await axios.get('/api/safe-zones');
      this.safeZones = response.data;
      return this.safeZones;
    } catch (error) {
      console.error("Failed to load safe zones:", error);
      return [];
    }
  }

  // Add a new safe zone
  addSafeZone(name, latitude, longitude, radius) {
    const newZone = { name, latitude, longitude, radius };
    this.safeZones.push(newZone);
    return axios.post('/api/safe-zones', newZone);
  }

  // Check if current location is in any safe zone
  checkIfInSafeZone() {
    if (!this.currentPosition) return false;
    
    for (const zone of this.safeZones) {
      const distance = this.calculateDistance(
        this.currentPosition.latitude,
        this.currentPosition.longitude,
        zone.latitude,
        zone.longitude
      );
      
      if (distance <= zone.radius) {
        return true;
      }
    }
    
    return false;
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance; // in meters
  }

  // Get current location to send in emergency
  getCurrentLocation() {
    return this.currentPosition;
  }

  // Check if user just left a safe zone
  hasJustLeftSafeZone() {
    return this.previousInSafeZone && !this.inSafeZone;
  }
}

export default new LocationService();
