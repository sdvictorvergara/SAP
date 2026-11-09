import ServiceGroups from '../../components/ServiceGroup/ServiceGroup.jsx'

export default function Services({ servers }) {
  return (
    <main className="page">
      <ServiceGroups servers={servers} />
    </main>
  )
}
