import PropTypes from "prop-types";
import { DateTime } from "luxon";

const Filas = ({ datos, resultados, numeroIVA, datovencimiento, datosDelVencimiento }) => {
  let datosMostrar = [];
  if (resultados.length !== 0) {
    datosMostrar = resultados;
  } else {
    datosMostrar = datos;
  }
  return (
    datosMostrar.length !== 0 && datosMostrar.map((factura) => (
      <tr key={factura.id} className="factura">
        <td className="numero">{factura.numero}</td>
        <td className="fecha">{DateTime.fromMillis(+factura.fecha).toLocaleString()}</td>
        <td className="concepto">{factura.concepto}</td>
        <td><span className="base">{factura.base.toFixed(2)}</span>€</td>
        <td><span className="cantidad-iva">{numeroIVA(factura.base, factura.tipoIva)}</span>€
          (<span className="tipo-iva">{factura.tipoIva}</span>%)</td>
        <td><span className="total">{(factura.base + numeroIVA(factura.base, factura.tipoIva)).toFixed(2)}</span>€</td>
        <td className={`estado ${factura.abonada ? "table-success" : "table-danger"}`}>{factura.abonada ? "Abonada" : "Pendiente"}</td>
        <td className={`vencimiento ${(!datovencimiento(DateTime.local(), factura.vencimiento) && !factura.abonada) ? "table-danger" : "table-success"}`}>
          {factura.abonada ? "-" : datosDelVencimiento(factura.vencimiento)}
        </td>
      </tr>
    ))
  );
};

Filas.propTypes = {
  datos: PropTypes.array.isRequired,
  resultados: PropTypes.array,
  numeroIVA: PropTypes.func.isRequired,
  datovencimiento: PropTypes.func.isRequired,
  datosDelVencimiento: PropTypes.func.isRequired
};
export default Filas;
