import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  dateRange: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
});

const ReportPDF = ({ reservations, startDate, endDate }) => (
  <Document>
    <Page size="A4" style={styles.page}>
    <Image src="https://firebasestorage.googleapis.com/v0/b/alegria-de-vivir-99.appspot.com/o/1716283046941-Logo_mancha_Alegria%20de%20vivir%2099%20abajo.png?alt=media&token=d9367704-e7eb-4654-a24c-dd945d7b1978" style={{ width: 50 }} />
      <Text style={styles.title}>Informe de Reservas</Text>
      <Text style={styles.dateRange}>Del {startDate} al {endDate}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Nombre</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Teléfono</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Comensales</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Lugar</Text></View>
        </View>
        {reservations.map((reservation) => (
          <View key={reservation._id} style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{reservation.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{reservation.phoneNumber}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{reservation.people}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{reservation.place}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
