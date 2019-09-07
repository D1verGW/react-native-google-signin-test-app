/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, Text, TouchableOpacity} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const iosClientId = 'Your app google oauth key';

GoogleSignin.configure({
    scopes: [], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    iosClientId, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const App = () => {
    const [isSigned, setSigned] = React.useState(false);
    const [isSignInProcess, setSignInProcess] = React.useState(false);
    const [showingSignButton, setShowingSignButton] = React.useState(false);

    React.useEffect(() => {
        setShowingSignButton(!isSigned && !isSignInProcess);
    }, [isSigned, isSignInProcess]);

    React.useEffect(() => {
        GoogleSignin.restorePreviousSignIn()
            .then(() => setSigned(true))
            .catch(console.warn);
    }, []);

    const signIn = async () => {
        setSignInProcess(true);
        GoogleSignin.signIn()
            .then(() => {
                setSignInProcess(false);
                setSigned(true);
            })
            .catch((e) => {
                setSignInProcess(false);
                console.warn(e);
            });
    };

    const signOut = async () => {
        await GoogleSignin.signOut();
        setSigned(false);
    };

    return (
        <Fragment>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                {isSigned && (
                    <>
                        <Text>{'Already signed'}</Text>
                        <TouchableOpacity onPress={signOut}>
                            <Text>{'Sign out'}</Text>
                        </TouchableOpacity>
                    </>
                )}
                {isSignInProcess && <Text>{'Sign in process'}</Text>}
                {showingSignButton && (
                    <GoogleSigninButton
                        style={{width: 192, height: 48}}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn}
                        disabled={isSignInProcess}
                    />
                )}
            </SafeAreaView>
        </Fragment>
    );
};

export default App;
