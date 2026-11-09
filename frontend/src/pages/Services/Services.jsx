import ServiceGroups from '../../components/ServiceGroup/ServiceGroup.jsx'

export default function Services({ servers, services }) {
  return (
    <main className="page">
      <ServiceGroups servers={servers} services={services} />
    </main>
  )
}
