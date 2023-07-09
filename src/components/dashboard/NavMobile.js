import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import Background from '../../elements/Background';
import Logo from '../../elements/Logo';
import Header from '../../elements/Header';
import TextInput from '../../elements/TextInput';
import Button from '../../elements/Button';
import { useTheme } from 'react-native-paper';
import { setLoading } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function NavMobile({ navigation }) {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();

    return (
        <Background>
          
        </Background>
    )
}

const stylesR = (colors) => StyleSheet.create({
  
})