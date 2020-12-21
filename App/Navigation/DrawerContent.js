import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { colors } from '../assets/styles/colors';
import { connect } from 'react-redux';
import translations from 'langs'
import { _baseapi, } from '../redux/Api/Api';
import { isEmpty } from 'lodash';
import { logout } from 'redux-actions'
import RNRestart from 'react-native-restart';
import Communications from 'react-native-communications';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

// const timeStampInMs = parseInt(current_time = new Date().getTime() / 1000);

/****
 * Icons SVG
 */
import BalanceSvg from 'assets/svg/Balance'
import SettingsSvg from 'assets/svg/Settings'
import ContactusSvg from 'assets/svg/Contactus'
import LogoutSvg from 'assets/svg/Logout'
import MytripsSvg from 'assets/svg/Mytrips'
import WorldSvg from 'assets/svg/World'

class MenuDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user:null, 
            selected_screen: '',
            token:null,
            expiresIn:null
         };
        this.Logout = this.Logout.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.balance !== undefined){
            this.setState({ user: { ...this.state.user, balance: Number(nextProps.profile.balance) } })
        }
        if(nextProps.profile.success){
            this.setState({ user: nextProps.profile.user })
            this.setState({ loadingEdit:nextProps.profile.loading, message:null })
        }
    }

    async componentWillMount(){
        
        if(this.props.signin.user){
            this.setState({ user:this.props.signin.user })
        }
        try{
            let user = await AsyncStorage.getItem('user')
            if(user !== null){
                let userObj = JSON.parse(user)
                this.setState({ user: userObj })
                // console.log('@user', JSON.parse(user));
            }else{
            }
        }catch(err){
            console.error('Error Menu.js While get Token from storage')
        }

    }



    async Logout(){
        const { token } = this.state.user
        _baseapi.setHeader('Authorization', `Bearer ${token}`)
        this.setState({ loadingLogout: true })
        const res = await _baseapi.post('user/logout')
        this.setState({ loadingLogout: false })

        console.log('@res', res)
        if(res.ok){
            if(res.data.success){
                this.props.logout();
                try{
                    this.setState({ loadingLogout: true })
                    let removedUser = await AsyncStorage.removeItem('user')
                    let removedToken = await AsyncStorage.removeItem('token')
                    this.setState({ loadingLogout: false })
                    if(isEmpty(removedUser) && isEmpty(removedToken)){
                        await RNRestart.Restart()
                    }
                }catch(err){
                    console.error('An Error In Menu Drawer while loggin you out \n ', err)
                }
            }else{
                Alert.alert('',res.data.message,[{ text: translations('ok'), onPress: () => 0 }])
            }
        }else{

            if(res.status === 401){
                Alert.alert(
                    'Alert',
                    'Token Used',
                    [{text: 'OK', onPress: async() => {
                        this.props.logout()
                        let removedUser = await AsyncStorage.removeItem('user')
                        let removedToken = await AsyncStorage.removeItem('token')
                        if(isEmpty(removedUser) && isEmpty(removedToken)){
                            await RNRestart.Restart()
                        }
                    }}],
                    {cancelable: false},
                );
            }
            // Alert.alert('',res.data.message || '404',[{ text: translations('ok'), onPress: () => 0 }])

        }
    };
    async componentDidMount(){
      let user = await this._checkAuth()
      if(!isEmpty(user)){
          this.setState({ user: JSON.parse(user) })
      }else{
          // user yok
      }
    };

    _checkAuth = async() => await AsyncStorage.getItem('user')


    render() {
        let name = this.state.user ? this.state.user.name : ''
        let balance = this.state.user && this.state.user.balance !== undefined && Number(this.state.user.balance) || ''
        return (
            <View style={[styles.container, { borderWidth:1, }]}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Settings')}
                >
                <View style={styles.viewUserInfo}>
                    <View style={styles.userImageBg}>
                        <Image
                            style={styles.userImageImage}
                            source={ this.state.user && this.state.user.personal_photo && { uri: this.state.user.personal_photo } || require('../assets/imgs/ico_home_menu_user_defaultM.png')}
                        />
                    </View>
                    <View style={styles.viewUserTextInfo}>
                        <Text style={styles.userName}>{translations('welcome')}</Text>
                        <Text style={styles.userNameDate}>
                            {name ? name : ''}
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>


                <View style={styles.viewUserInfoBorder} />
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.menuListButton,
                            { backgroundColor:
                                    (this.state.selected_screen === 'add-trips') ?
                                        '#f3f3f3' : 'transparent',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        maxWidth: '100%',
                                     }
                        ]}
                        onPress={() => {
                            this.props.navigation.navigate('Home')
                            this.props.navigation.closeDrawer()
                        }}
                    >
                        <WorldSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} />
                        <Text style={styles.menuListText} >{translations('search_trips')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuListButton,
                            { backgroundColor:
                                    (this.state.selected_screen === 'your-trips') ?
                                        '#f3f3f3' : 'transparent',
                                        flexDirection:'row',
                                        alignItems:'flex-end',
                                        maxWidth: '100%',
                                    }
                        ]}
                        onPress={() => this.props.navigation.navigate('Trips')}
                    >
                        <MytripsSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} />
                        <Text style={styles.menuListText} >{translations('your_trips')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuListButton,
                            {
                                maxWidth: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent:'space-between',
                                backgroundColor: (this.state.selected_screen === 'balance') ? '#f3f3f3' : 'transparent'
                            }
                        ]}
                        disabled
                    >
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                        <BalanceSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} />
                        <Text style={styles.menuListText} > {translations('balance')}</Text>
                        </View>
                        <View style={{ alignItems:'flex-end' }}>
                        <Text style={[styles.menuListText,{ 
                                color: colors.green, 
                                textAlign: 'right', 
                                flex:1,
                                fontSize: 17, 
                                fontWeight: balance >= 0 ? 'bold' : '300', 
                                paddingEnd:20,
                                color: balance >= 0 ? colors.green : 'red'
                                }]} >
                        {Number(balance)} {translations('currency')}
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuListButton,
                            { backgroundColor:
                                    (this.state.selected_screen === 'settings') ?
                                        '#f3f3f3' : 'transparent',
                                        flexDirection:'row',
                                        alignItems:'flex-end',
                                        maxWidth: '100%',
                                    }
                        ]}
                        onPress={() => this.props.navigation.navigate('Notifications')}
                    >
                        {/* <SettingsSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} /> */}
                        <MaterialIcon name={'notifications'} size={25} color={colors.green} />
                    <Text style={styles.menuListText} >{translations('notifications')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuListButton,
                            { backgroundColor:
                                    (this.state.selected_screen === 'settings') ?
                                        '#f3f3f3' : 'transparent',
                                        flexDirection:'row',
                                        alignItems:'flex-end',
                                        maxWidth: '100%',
                                    }
                        ]}
                        onPress={() => this.props.navigation.navigate('Settings')}
                    >
                        <SettingsSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} />
                        <Text style={styles.menuListText} >{translations('settings')}</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={[styles.menuListButton,
                            { backgroundColor:
                            (this.state.selected_screen === 'legal') ?
                                '#f3f3f3' : 'transparent',
                                flexDirection:'row',
                                alignItems:'flex-end',
                                maxWidth: '100%',
                            }
                        ]}
                        onPress={() => this.props.navigation.navigate('Contact')}
                    >
                        <ContactusSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} />
                        <Text style={styles.menuListText} >{translations('contact_us')}</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={[styles.menuListButton,
                            { backgroundColor:
                                (this.state.selected_screen === 'logout') ?
                                    '#f3f3f3' : 'transparent',
                                    flexDirection:'row',
                                    alignItems:'flex-end',
                                    maxWidth: '100%',
                                    }
                        ]}
                        onPress={this.Logout}
                    >
                        <LogoutSvg style={{ maxWidth:20, maxHeight:20, resizeMode:'contain' }} fill={colors.green} />
                        <Text style={styles.menuListText} >{translations('logout')}</Text>
                        <View style={{ width: 11 }}/>
                        { this.state.loadingLogout && <ActivityIndicator color={colors.green} size={'small'} /> }
                    </TouchableOpacity>
                </View>

                    {/* <TouchableOpacity 
                        onPress={() => Communications.web('https://www.sair.sa')}
                    style={{ 
                        position: 'absolute', 
                        bottom: 70, 
                        left:0, 
                        right:0, 
                        height:40, 
                        justifyContent:'center',
                        alignItems: 'center',
                        }}>
                        <Text style={{
                            fontFamily:'Effra-Medium',
                            color: colors.green,
                            fontWeight:'400',
                            fontSize: 16
                        }}>{translations('be_captin')}</Text>
                         </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    viewUserInfo: {
        marginTop: 48,
        marginStart: 30,
        marginEnd: 16,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewUserTextInfo: {
        marginStart: 16,
        marginEnd: 16,
        alignSelf: 'center',
        justifyContent:'center'
    },
    userImageBg: {
        width: 68,
        height: 68,
        borderColor:'#f3f3f3',
        borderWidth:1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 34
    },
    userImageImage: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        resizeMode: 'cover'
    },
    userName: {
        color: '#b7b7b7',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Effra-Medium',
        alignSelf:'flex-start'
    },
    userNameDate: {
        color: '#b5d98a',
        fontSize: 19,
        marginTop: 8,
        fontFamily: 'Effra-Medium',
        alignSelf:'flex-start',
        height: 40
    },
    viewUserInfoBorder: {
        backgroundColor: '#ffffff',
        height: 1
    },
    menuListButton: {
        paddingTop: 17,
        paddingStart: 35,
        paddingEnd: 35,
        paddingBottom: 17
    },
    menuListText: {
        color: '#565656',
        fontSize: 15,
        fontFamily: 'Effra-Medium',
        alignSelf: 'flex-start',
        fontWeight: '500',
        marginStart: 11
    }
});

const mapStateToProps = state => {
    return {
        signin: state.signin,
        profile: state.updateProfile
    }
}
export default connect(mapStateToProps, { logout })(MenuDrawer);
