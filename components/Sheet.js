import React, { useState, useEffect } from "react";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { StyleSheet, View, ScrollView,Dimensions } from 'react-native';
import { SplashScreen } from '../screens/SplashScreen'
import { Google } from './Google'

const {width : WIDTH} = Dimensions.get('window')

export const Sheet = (props) => {

    const { name }  = props
    const [TableHead, setTableHead] = useState(null)
    const [tableData, settableData] = useState(null)
    const widthArr = [WIDTH - WIDTH/2, WIDTH - WIDTH/2, WIDTH - WIDTH/5, WIDTH - WIDTH/2]
    const [LoadingState, setLoadingState] = useState(false)

    useEffect(() =>{
      getTableData(props.name)
    },[])

    const getTableData = async (name) =>{
      const tableData = [];
      var data = await Google.getTable(name)
      for (let i = 1; i < data[name].length; i += 1) {
        const rowData = [];
        for (let j = 0; j < data[name][i].length; j += 1) {
          rowData.push(data[name][i][j]);
        }
        tableData.push(rowData);
      }
      setTableHead(data[name][0])
      settableData(tableData);
      setLoadingState(true)
    }
  
    if(LoadingState){
      return (
          <View style={styles.container}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  <Row data={TableHead} widthArr={widthArr} style={styles.header} textStyle={styles.textHeader}/>
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                      tableData.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={widthArr}
                          style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                          textStyle={styles.text}
                        />
                      ))
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )
      }
      else{
        return (
          <View style={styles.container}>
            <SplashScreen/>
          </View>
        )
      }
  }


  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      paddingLeft: 16,
      paddingRight:16,
      paddingBottom:10,
      backgroundColor: '#fff' 
    },

    header: { 
      height: 50, 
      backgroundColor: '#1A1260' 
    },

    textHeader: {
      fontSize: 25,
      color: '#fff',
      textAlign: 'center', 
      fontFamily: 'Nithan'
    },

    text: {
      fontSize: 25,
      textAlign: 'center', 
      fontFamily: 'Nithan'
    },

    dataWrapper: { 
      marginTop: -1 
    },

    row: { 
      height: 40, 
      backgroundColor: '#E7E6E1' 
    }
  });