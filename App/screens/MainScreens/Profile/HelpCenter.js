import React, {useEffect, useState} from 'react'
import {View, Animated, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'



import Header from '../../../Component/Header'
import {Fonts, Colors, Metrics} from '../../../Themes'
import Button from '../../../Component/Button'


import {useAnimation} from '../../../assets/Animation/animation'

import Input from '../../../Component/Input';
import InputButton from '../../../Component/InputButton'
import RadioButtonModal from '../../../Component/RadioButtonModal'
import ErroAlert from '../../../Component/ErrorAlert'


import api from '../../../Services/API'

import {connect} from 'react-redux'
import UserAction from '../../../Redux/UserRedux'

const API = api.create()

HelpCenter = (props) => {

    const Animation = useAnimation({doAnimation: true, duration: 550})

    const [title, setTitle]= useState('')

    const [content, setContent]= useState('')
    const [errorIn, setErrorIn]= useState('')
    const [errorMessage, setErrorMessage]= useState('')
    const [ showErrorMessage, setShowErrorMessage ] = useState(false)
    const [selected, setSelected]= useState({})

    const [loading, setLoading]= useState(false)
    const [radioButtonModal, setRadioButtonModal]= useState(false)

    const handleSubmitQuestion = () => {
        if( !props.user ){
            setErrorMessage('التسجيل مطلوب لارسال طلب المساعدة')
            return setShowErrorMessage(true)
        }
        if(!selected._id && selected._id !== 0){
            setErrorMessage('يجب اختيار نوع المساعدة')
            return setShowErrorMessage(true)
        }
        if((title || '').length < 1){
            setErrorMessage('يجب كتابة عنوان الموضوع')
            return setShowErrorMessage(true)
        }
        if((content || '').length < 1){
            setErrorMessage('يجب كتابة الموضوع')
            return setShowErrorMessage(true)
        }

        setLoading(true)
        let arr = title.length > 0 ? {question: content, title: title, helpType: selected._id}: {question: content, helpType: selected._id}

        API.addNewUserQuestion(arr, props.user.token)
            .then(res => {
                setLoading(false)
                console.log('reesss', res)
                if(res && res.ok && res.data && !res.data.errors){
                    alert(res.data.message && res.data.message)
                    props.navigation.goBack()
                }
            }).catch(err => {setLoading(false);console.log('error', err)})
    }

    // useEffect(()=> {
    //     if(!props.user)
    //     alert("التسجيل مطلوب لارسال الاستفسار")
    // }, [])

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} >
            <View style={{flex: 1,}} >
                
                <Header headerTitle={'مركز المساعدة'} doAnimation={true} onBackPress={()=> props.navigation.goBack()} />


                <Text style={[Fonts.style.normal,{marginTop: 34, textAlign: 'right', paddingRight: 30}]} > {'أهلا بك عزيزي , كيف يمكننا مساعدتك ؟'} </Text>

                <InputButton width={150}  InputPlaceHolder={ selected && selected.userTypeName ? selected.userTypeName: 'نوع المساعدة'} containerStyle={{ marginTop: 37 }} onPress={()=> setRadioButtonModal(true)} />

                <Input onChangeText={(v) => setTitle(v)} inputValue={title} containerStyle={{marginTop: 15}} InputPlaceHolder={'عنوان الموضوع'} />


                <Input multiline={true} onChangeText={(v) => setContent(v)} inputValue={content} containerStyle={{marginTop: 37, paddingTop: 15, height: 100}} InputPlaceHolder={' الموضوع'} InputStyle={{}} />

                { radioButtonModal &&  <RadioButtonModal title={'نوع المساعدة'} onPress={(item)=> {setRadioButtonModal(false);setSelected(item)}} selectedOption={selected} doAnimation={true} data={[{_id: 0, userTypeName: 'اقتراح'}, {_id: 1, userTypeName: 'مشكلة'}, {_id: 2, userTypeName: 'رسالة'}]} isVisible={radioButtonModal} />}
                {showErrorMessage && <ErroAlert errorMessage={errorMessage} setAnimation={()=> setShowErrorMessage(false)} doAnimation={showErrorMessage} /> }

                <Button loading={loading} disabled={loading} containerStyle={{position: 'absolute', bottom: 90}} buttonText={'أرسال'} onPress={handleSubmitQuestion} />

            </View>
        </TouchableWithoutFeedback>
    )
}


const mapStateToProps = state => {
    console.log('state', state)
    return {
      user: state.user.user && state.user.user.user && state.user.user.user   ,
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(HelpCenter);
  