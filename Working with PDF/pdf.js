import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Button } from 'react-native';
import Pdf from 'react-native-pdf';

export default class PDFExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'Portrait', // Default mode
        };
    }

    handleModeChange = (mode) => {
        this.setState({ mode });
    };

    render() {
        //online source
        // const source = { uri: 'https://www.africau.edu/images/default/sample.pdf', cache: true };
      
        //local source
        const source = require('./test.pdf');
        const { mode } = this.state;

        const isPortrait = mode === 'Portrait';
        const pdfWidth = isPortrait ? Dimensions.get('window').width : Dimensions.get('window').height;
        const pdfHeight = isPortrait ? Dimensions.get('window').height : Dimensions.get('window').width;
        console.log("Message: ", pdfHeight, pdfWidth);
        return (
            <View style={styles.container}>
                <View style={styles.modeButtons}>
                  <Button title="Landscape mode" onPress={()=>this.handleModeChange('Landscape')}></Button>
                </View>
                <Pdf
                    trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{ width: pdfWidth, height: pdfHeight }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    modeButtons: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
});
