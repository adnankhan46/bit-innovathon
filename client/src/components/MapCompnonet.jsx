import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const MapComponent = ({ location }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={15} center={location} mapContainerStyle={{ height: "400px", width: "100%" }}>
      <Marker position={location} />
    </GoogleMap>
  );
};

export default MapComponent;
