import Busqueda from "./Busqueda";
import Filas from "./Filas";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { Container, Row, Col, Table } from "react-bootstrap";

function App() {
  const [DatosNumeros, setDatosNumeros] = useState([]);
  const { DateTime } = require("luxon");
  const NumeroIVA = (base, tipoIVA) => base * (tipoIVA / 100);
  const { datos, cargando } = useFetch(`${process.env.REACT_APP_API_URL}`);
  useEffect(() => {
    if (datos) {
      setDatosNumeros(datos.filter(datos => datos.tipo === "ingreso"));
    }
  }, [datos]);
  return (
    <Container as="section" fluid className="principal">
      <Row as="header" className="cabecera">
        <Col>
          <h2>Listado de ingresos</h2>
        </Col>
      </Row>
      <main>
        <Busqueda></Busqueda>
        <Table bordered hover striped className="listado">
          <thead className="thead-light">
            <tr>
              <th className="col-min">Num.</th>
              <th className="col-med">Fecha</th>
              <th className="col-concepto">Concepto</th>
              <th className="col-med">Base</th>
              <th className="col-max">IVA</th>
              <th className="col-med">Total</th>
              <th className="col-max">Estado</th>
              <th className="col-max">Vence</th>
            </tr>
          </thead>
          <Filas
            DateTime={DateTime}
            DatosNumeros={DatosNumeros}
            NumeroIVA={NumeroIVA} />
          <tfoot>
            <tr className="totales">
              <th className="text-right" colspan="3">Totales:</th>
              <td><span className="total-bases"></span>€</td>
              <td><span className="total-ivas"></span>€</td>
              <td><span className="total-totales"></span>€</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </main>
    </Container>
  );
}

export default App;
