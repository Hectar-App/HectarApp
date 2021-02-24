import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { connect } from 'react-redux';
import CardItem from '../../../Component/officeCard';
import FilterButton from '../../../Component/core/buttons/FilterButton';
import RealEstatList from '../../../Component/realEstateList';
import api  from '../../../Services/API'
import Header from '../../../Component/Header';
import {Fonts} from '../../../Themes'


class OfficeDetails extends React.Component {
  static contextType = ThemeContext;

  state ={
    realEstateListData: [],
    statuses: []
  }

  async componentDidMount(){
      try {
          //get realestate statuses
          let statusesReq = await fetch(`${api.apiURL}/realEstate/getRealEstateStatus`)
          let statuses = await statusesReq.json();
          this.setState({statuses});

          let url = `${api.apiURL}/get-realestate-agent-details?`;
          let office = this.props.navigation.getParam('officeDetails');
          if(office.user_id){
            url+=`userId=${office.user_id}`
          }else{
            url+=`placeId=${office.place_id}`
          }
          if(this.state.status){
            url+=`&type=${this.state.status}`
          }
          let properties = await fetch(url);
          let result =  await properties.json()
          this.setState({realEstateListData: result.properties})
          
      } catch (error) {
        console.log(error.message);  
          
      }

  }
  buttonPressed = ()=>{

  }
  backPressed = ()=>{
    this.props.navigation.goBack()
  }

  render() {
    const item = this.props.navigation.getParam('officeDetails')
    return (
        <View style={[styles.mainContainer]}>
            <Header
                 noBackButton={false}
                 headerTitle={item.name}
                 withSearch={false}
                 openSearch={false}
                 onBackPress={this.backPressed}
            />
            <View style={[styles.bodyConteiner]} >
            <CardItem
            onItemPress={selectedItem => props.onItemPress(selectedItem)}
            onFavPress={() => props.onFavPress(item)}
            doAnimation={true}
            showCounts={true}
            showContactButtons={true}
            selectedOffice={item}
            />
            <Text style={[styles.propertiesTitle]}>العقارات المتاحة ل{item.name}</Text>
            <View style={[styles.buttonGroup]}>
                <FilterButton  onPress={()=>{}} selected={true} label={"الكل"}></FilterButton>
                {this.state.statuses.map((status,index)=>{
                    return <FilterButton onPress={this.buttonPressed} label={status.nameAr}/>
                })}
            </View>
            <RealEstatList
                handleGetMoreDatat={this.handleGetMoreDatat}
                numberOfRealEstate={this.state.numberOfRealEstate}
                onItemPress={v => this.handleCardPress(v)}
                realestateData={this.state.realEstateListData}
                onMapButtonPress={this.handleViewPress}
            />

            </View>

        </View>
    )
  }
}


export default OfficeDetails;

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    bodyConteiner:{
        paddingTop: 10,
        paddingHorizontal: 5
    },
    buttonGroup:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        flexDirection: 'row-reverse',
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        marginTop: 5,
        shadowRadius: 15,
        shadowOpacity: 1,
        elevation: 2
    },
    propertiesTitle:{
        fontFamily: Fonts.style.normal.fontFamily,
        fontSize: 11,
        textAlign: 'right',
        alignSelf: 'flex-end',
        padding: 12,
        paddingVertical: 10
    }
})