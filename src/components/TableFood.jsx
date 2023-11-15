import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import moment from "moment";
import * as XLSX from 'xlsx';
const TableFood = ({menus}) => {
    const navigate = useNavigate();
    const [week, setWeek] = useState();
    const createExcelFile = () => {
        const formatMenus = menus.map(({id,created_at, updated_at, ...item}) => ({
            fecha: moment(item.fecha).format('DD-MM-YYYY'),
            ...item
        }));
        const ws = XLSX.utils.json_to_sheet(formatMenus);
        const columnWidths = [
            { wch: 10 },
            { wch: 30 },
            { wch: 30 },
            { wch: 12 },
            { wch: 10 },
            { wch: 10 },
        ];
        ws['!cols'] = columnWidths;
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Menus');
        XLSX.writeFile(wb, 'menus.xlsx');
    };
    return (
        <Container fluid>
            <Row className="mt-3">
                <Col md={3}>
                    {/* <Row>
                        <Col>Seleccionar semana</Col>
                        <Col>
                            <Form.Control
                            type="date"
                            placeholder="Semana"
                            value={week}
                            onChange={(event) => setWeek(event.target.value)}
                            />
                        </Col>
                    </Row> */}
                </Col>
                <Col md={3} className="offset-md-6">
                    <Row>
                        <Button className="col-md-12" onClick={()=>createExcelFile()}>Descargar listado</Button>
                        <Button className="col-md-12 mt-2 btn btn-success" onClick={()=>navigate('/registrar-menu')}>Registrar menu</Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={12}><h3>Periodo de la semana</h3></Col>
                        {menus?.map((menu, index) => (
                            <Col md={12} className="card p-3 my-3" key={index}>
                                <Row>
                                    <Col md={12} style={{textAlign: 'center', fontSize: 20}} ><b>{(moment(menu?.fecha).format('DD-MM-YYYY'))}</b></Col>
                                    <Col md={12}><b>Menú:</b> {menu?.menu}</Col>
                                    <Col md={12}><b>Ingredientes:</b> {menu?.ingredientes}</Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default TableFood
