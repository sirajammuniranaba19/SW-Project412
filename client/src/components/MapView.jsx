import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Link } from 'react-router-dom'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

export default function MapView({ items=[] }) {
  const center = [23.7806, 90.4070];
  return (
    <div className="card">
      <MapContainer center={center} zoom={12} style={{height:420, borderRadius:8}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {items.map(p => {
          const lat = p.coordinates?.coordinates?.[1] || 23.78;
          const lng = p.coordinates?.coordinates?.[0] || 90.40;
          return (
            <Marker key={p._id} position={[lat,lng]}>
              <Popup>
                <div style={{minWidth:200}}>
                  <b>{p.title}</b><br/>
                  ${p.price || 0} • {p.rooms || 0} rooms<br/>
                  <Link to={`/property/${p._id}`}>View details</Link>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
