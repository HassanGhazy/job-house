import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import TitleWidget from '../global-widget/title-widget';
import { useEffect } from "react";

type Input = { center: { lat: number, lng: number } };
const MapComp = (props: Input) => {
    const center = props.center;
    useEffect(() => {

    }, [])

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            center={center}
        >
            <Marker
                position={center}
            />
        </GoogleMap>
    ));


    return <>
        <TitleWidget title="Our Location" />
        <MapWithAMarker
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </>;
}

export default MapComp;