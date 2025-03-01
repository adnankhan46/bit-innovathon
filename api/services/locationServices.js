import axios from 'axios';

class LocationService {
  async getAddressFromCoordinates(latitude, longitude) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: { 'User-Agent': 'WomenSafetyApp/1.0' }
        }
      );

      return response.data?.display_name || `Latitude: ${latitude}, Longitude: ${longitude}`;
    } catch (error) {
      console.error('Error getting address:', error);
      return `Latitude: ${latitude}, Longitude: ${longitude}`;
    }
  }
}

export default new LocationService();
