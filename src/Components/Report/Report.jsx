// ReportPDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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

const ReportPDF = ({ reservations }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Informe de Reservas</Text>
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
