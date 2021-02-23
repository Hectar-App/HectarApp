import React from 'react';
import {Text} from 'react-native';
import { ThemeContext } from 'react-navigation';
import { connect } from 'react-redux';

class OfficeDetails extends React.Component{
    static contextType = ThemeContext;

    constructor(props){
        super(props);
        this.state = {
            officeDetails:null
        }
    }
    render(){
        return (
            <Text>dsdsd</Text>
        )
    }

}
const mapDispatchToProps = dispatch => ({
    getOffices: ({ lat, lng, radius, pageNumber }) => {
      dispatch(OfficesActions.getOffices(lat, lng, radius, pageNumber));
    },
  });
  
  const mapStateToProps = state => {
    return {
      offices: state.realEstateOffices.offices,
    };
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OfficeDetails);