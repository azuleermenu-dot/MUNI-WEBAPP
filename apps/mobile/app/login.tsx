import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { requireSupabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function signIn() {
    if (!email || !password) return Alert.alert('Missing information', 'Enter your email and password.');
    setBusy(true);
    try {
      const { error } = await requireSupabase().auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace('/');
    } catch (error) {
      Alert.alert('Sign in failed', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return <View style={styles.page}>
    <View style={styles.logo}><Text style={styles.logoText}>M</Text></View>
    <Text style={styles.brand}>MUNI</Text>
    <Text style={styles.school}>MINUYAN NATIONAL HIGH SCHOOL</Text>
    <Text style={styles.title}>Welcome back.</Text>
    <Text style={styles.copy}>Sign in to continue your study plan.</Text>
    <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#64748b" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#64748b" secureTextEntry value={password} onChangeText={setPassword}/>
    <Pressable style={styles.button} onPress={signIn} disabled={busy}><Text style={styles.buttonText}>{busy ? 'Signing in…' : 'Sign in'}</Text></Pressable>
  </View>;
}

const styles=StyleSheet.create({page:{flex:1,backgroundColor:'#07111f',padding:24,justifyContent:'center'},logo:{width:54,height:54,borderRadius:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},logoText:{fontSize:27,fontWeight:'900',color:'#07111f'},brand:{color:'#fff',fontSize:30,fontWeight:'900',marginTop:12},school:{color:'#67e8f9',fontSize:10,fontWeight:'800',letterSpacing:1,marginTop:4},title:{color:'#fff',fontSize:38,fontWeight:'900',marginTop:55},copy:{color:'#94a3b8',fontSize:16,marginTop:8,marginBottom:26},input:{backgroundColor:'#0b1929',borderWidth:1,borderColor:'#1e3148',borderRadius:14,padding:16,color:'#fff',marginBottom:12,fontSize:16},button:{backgroundColor:'#fff',padding:17,borderRadius:14,alignItems:'center',marginTop:6},buttonText:{color:'#07111f',fontWeight:'900',fontSize:16}});