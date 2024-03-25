import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, Dimensions, Image, View, Platform, StatusBar, Alert } from 'react-native';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { getStatusBarHeight } from 'react-native-status-bar-height';
// import NaverLogin, { NaverLoginResponse, GetProfileResponse } from '@react-native-seoul/naver-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function SignIn({navigation} : any) {

    const [kakaoToken, setKakaoToken] = useState('');
    const [naverToken, setNaverToken] = useState('');
    const [googleToken, setGoogleToken] = useState('');

    /* Kakao Login  */
    const signInWithKakao = async (): Promise<void> => {
        try {
            const token: KakaoOAuthToken = await login();
            const userInfo = await KakaoLogin.getProfile();
            const userAccessToken = await KakaoLogin.getAccessToken();
            const userEmail = userInfo.email;
            const userAge = userInfo.ageRange;
            const userProfileImg = userInfo.profileImageUrl;
            const userGender = userInfo.gender;
            const userNickNmae = userInfo.nickname;
            console.log('userEmail : ' + userEmail);
            console.log('userAge : ' + userAge);
            console.log('userProfileImg' + userProfileImg);
            console.log('userGender' + userGender);
            console.log('userNickNmae' + userNickNmae);
            console.log('userAccessToken' + userAccessToken);

            if (userAccessToken != undefined) {
                setKakaoToken(JSON.stringify(token));
                navigation.navigate("Tabs");
            }

        } catch (error : any) {
            Alert.alert(error);
        }
    }

    // const androidKeys = {
    //     consumerKey: "RXWXkXCQzKJEQMy5rEdW",
    //     consumerSecret: "omkincgN1v",
    //     appName: "com.awesomeproject"
    // };

    // const signInWithNaver = async(props:any):Promise<void> => {
    //     try{
    //         const {failureResponse, successResponse} = await NaverLogin.login(props);
    //         const token = successResponse;
    //         const userAccessToken = token!.accessToken;
    //         const userInfo = await NaverLogin.getProfile(userAccessToken);
    //         const userEmail = userInfo.response.email;
    //         const userAge = userInfo.response.birthyear;
    //         const userProfileImg = userInfo.response.profile_image;
    //         const userGender = userInfo.response.gender;
    //         const userNickNmae = userInfo.response.nickname;

    //         setNaverToken(JSON.stringify(token));
    //         if (userAccessToken) {
    //             navigation.navigate("Tabs");
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    
    /* Naver Login  */
    const signInWithNaver = async (): Promise<void> => {

        const consumerKey = 'rDpXWEFApuctbXVWBGHR';
        const consumerSecret = 'HllomabNlb';
        const appName = 'com.JUGOBADA';
        const serviceUrlScheme = 'org.reactjs.native.example.JUGOBADA'; 

        try{
            const {failureResponse, successResponse} = await NaverLogin.login({
                appName,
                consumerKey,
                consumerSecret,
                serviceUrlScheme
            });

            if (successResponse?.accessToken != undefined) {
                setNaverToken(successResponse?.accessToken)
                navigation.navigate("Tabs");
            }

            /* accessToken 유효시 getNaverProfile Method 호출 */
            const userProfile = getNaverProfile(successResponse?.accessToken)
            
        } catch (error : any) {
            Alert.alert(error);
        }
    }

    const getNaverProfile = async (props : any) => {

        try {
            /* 현재 API 동의항목 = 이메일, 이름  */
            const profileResult = await NaverLogin.getProfile(props);
            
        } catch (error : any) {
            Alert.alert(error);
        }

      };
    
     /* Google Login  */
    const signInWithGoogle = async (): Promise<void> => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const userIdToken = userInfo.idToken

            if (userIdToken != undefined) {
                setGoogleToken(JSON.stringify(userInfo.idToken));
                navigation.navigate("Tabs");
            }

            } catch (error : any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // 사용자가 로그인을 취소한 경우
                Alert.alert('로그인이 취소되었습니다.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // 다른 로그인 과정이 진행 중인 경우
                Alert.alert('로그인이 이미 진행 중입니다.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // 플레이 서비스를 사용할 수 없는 경우
                Alert.alert('Google Play 서비스를 사용할 수 없습니다.');
            } else {
                // 기타 오류
                Alert.alert('로그인 중 오류가 발생했습니다.');
                console.log(error);
            }
        }  
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1030905081792-uarc3glv0mfb4am4jr2qhn30b13lnmla.apps.googleusercontent.com'
        });
    }, []);

    
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <Image source={require('../../assets/loginTopImg.png')} style={styles.loginTopImg}/>
            <Image source={require('../../assets/loginMiddleImg.png')} style={styles.loginMiddleImg}/>
            <Image source={require('../../assets/backImg.png')} style={styles.backgroundImg}/>
            <View style={styles.btnStack}>
                <TouchableOpacity onPress={signInWithKakao} style={styles.kakaoLoginBtn}>
                    <View style={styles.loginView}>
                        <Image source={require('../../assets/KakaoImg.png')} />
                        <Text style={styles.text}>카카오로 로그인</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>signInWithNaver()} style={styles.naverLoginBtn}>
                    <View style={styles.loginView}>
                        <Image source={require('../../assets/NaverImg.png')} />
                        <Text style={styles.text}>네이버로  로그인</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={signInWithGoogle} style={styles.googleLoginBtn}>
                    <View style={styles.loginView}>
                        <Image source={require('../../assets/GoogleImg.png')} />
                        <Text style={styles.text}>구글로  로그인</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Tabs")} style={styles.moveHomeBtn}>
                    <View style={styles.loginView}>
                        <Text style={styles.text}>홈 화면으로 이동</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    
};

const FIGMA_WIDTH = 360
const FIGMA_HEIGHT = 760
const StatusBarHeight = getStatusBarHeight(true)

const marginTop = (value : any) => {
    const data = (( Dimensions.get('screen').height / FIGMA_HEIGHT) * value) + StatusBarHeight
    return data
}

const width = (value : any) => {
    const data = (( Dimensions.get('screen').width / FIGMA_WIDTH) * value)
    console.log(Dimensions.get('screen').width + '/' + Dimensions.get('screen').height)
    return data
}

const height = (value : any) => {
    const data = (( Dimensions.get('screen').height / FIGMA_HEIGHT) * value)
    return data
}


const styles = StyleSheet.create({
    SafeAreaView : {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor : 'white'
    },
    loginTopImg : {
        position : 'absolute',
        top :  marginTop(93),
        left : 21
    },
    loginMiddleImg : {
        position : 'absolute',
        top : marginTop(198),
        right : 21
    },
    backgroundImg : {
        position : 'absolute',
        width : width(400.74),
        height : height(453.49),
        bottom : 0,
        left : -57,
    },
    btnStack : {
        position : 'absolute',
        // top : 414,
        bottom : 180
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft : 10
    },
    loginView : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    kakaoLoginBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : '#FFDB00',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 10
    },
    naverLoginBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : '#03C75A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10,
        borderRadius : 10
    },
    googleLoginBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10,
        borderRadius : 10,
    },
    moveHomeBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 10,
        marginTop : 10
    },
    moveHomeText : {
        fontSize: 20,
        fontWeight: 'bold',
        color : 'white',
        marginTop : 10
    }

    
});
