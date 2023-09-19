import PageContainer from "../components/PageContainer"
import ScheduleTable from "../components/ScheduleTable"

const Horarios = () => {
  return (
    <PageContainer title={"Horarios"} btnAdd={'/crear-horario'}>
      <ScheduleTable />
    </PageContainer>
  )
}

export default Horarios