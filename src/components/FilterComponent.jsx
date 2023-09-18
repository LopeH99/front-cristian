import { FormControl } from 'react-bootstrap'

const FilterComponent = ({onFilter, filterText, onClear, placeholder}) => {
  return (
      <FormControl type="text" size="lg" className='my-2' onChange={onFilter} value={filterText} placeholder={placeholder} />
  )
}

export default FilterComponent