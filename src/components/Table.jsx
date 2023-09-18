import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import { Button, Col, Row } from 'react-bootstrap';

const Table = ({ columns, data, placeholder, btnDownloadList, btnAdd }) => {
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = data?.filter(
		item => item?.nombre && item?.nombre.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
        return (
            <>
            <Col md={4}>
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder={placeholder} />
            </Col>
            <Col md={4} className='offset-md-4'>
                <Row>
                    {btnDownloadList && (
                        <Col md={6}>
                            <Button className='px-5 py-2'>
                                    Descargar listado       
                            </Button>
                        </Col>
                    )}
                    {btnAdd && (    
                        <Col md={6}>
                            <Button className='px-5 py-2 bg-success'>
                                    Crear nuevo     
                            </Button>
                        </Col>
                    )}
                </Row>
            </Col>
            </>
		);
	}, [filterText, resetPaginationToggle]);
  return (
      <DataTable
            className='border'
			columns={columns}
			data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle}
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
		/>
  )
}

export default Table