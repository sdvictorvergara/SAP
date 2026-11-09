import ServerCard from '../../components/ServerCard/ServerCard.jsx'
import ServiceGroups from '../../components/ServiceGroup/ServiceGroup.jsx'
import StatusSummary from '../../components/StatusSummary/StatusSummary.jsx'

export default function Home({ servers, setServers, services }) {
  return (
    <main className="page">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} setServers={setServers} />
      ))}
      <ServiceGroups servers={servers} services={services} />
      <StatusSummary servers={servers} services={services} />
    </main>
  )
}
