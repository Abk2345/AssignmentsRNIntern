import React from 'react';
import { View, Dimensions } from 'react-native';
import PDFView from 'react-native-pdf';

const pdfUrl = 'https://example.com/sample.pdf'; // Replace with your PDF URL

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <PDFView
        source={{ uri: pdfUrl }}
        onLoad={() => console.log('PDF Loaded')}
        onError={(error) => console.error('PDF Error:', error)}
        style={{ flex: 1, width: Dimensions.get('window').width }}
        enablePaging
        enableAnnotationZoom
        fitPolicy={1} // Fit width
        horizontal={false}
      />
    </View>
  );
}
