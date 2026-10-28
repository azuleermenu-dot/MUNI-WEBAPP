import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { requireSupabase } from '../lib/supabase';

export default function Login() {
  const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [showPassword,setShowPassword]=useState(false);const [busy,setBusy]=useState(false);
  async function signIn(){
    if(!email.trim()||!password)return Alert.alert('Missing information','Enter the email and password you used to create your MUNI account.');
    setBusy(true);
    try{const {error}=await requireSupabase().auth.signInWithPassword({email:email.trim().toLowerCase(),password});if(error){const msg=error.message.toLowerCase();if(msg.includes('invalid login credentials'))throw new Error('That email and password did not match. Check them and try again.');if(msg.includes('email not confirmed'))throw new Error('Confirm your email first, then return here to sign in.');throw error;}router.replace('/');}
    catch(error){Alert.alert('Could not sign in',error instanceof Error?error.message:'Please check your connection and try again.');}
    finally{setBusy(false);}
  }
  async function forgotPassword(){
    if(!email.trim())return Alert.alert('Enter your email','Type your account email above first, then tap Forgot password again.');
    Alert.alert('Reset your password','For the safest reset flow, open MUNI on the web and choose “Forgot password?” on the sign-in screen. We are finishing the secure app-to-email reset handoff.');
  }
  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS==='ios'?'padding':undefined}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <Pressable onPress={()=>router.replace('/')}><Text style={styles.back}>← Back to MUNI</Text></Pressable>
    <View style={styles.logo}><Text style={styles.logoText}>M</Text></View><Text style={styles.brand}>MUNI</Text><Text style={styles.school}>MINUYAN NATIONAL HIGH SCHOOL</Text>
    <Text style={styles.eyebrow}>YOUR STUDENT WORKSPACE</Text><Text style={styles.title}>Welcome{ '\n' }<Text style={styles.accent}>back.</Text></Text><Text style={styles.copy}>Pick up where you left off. Your next small step starts here.</Text>
    <Text style={styles.label}>Email address</Text><TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor="#74879c" autoComplete="email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} maxLength={254} returnKeyType="next"/>
    <Text style={styles.label}>Password</Text><View style={styles.passwordWrap}><TextInput style={styles.passwordInput} placeholder="Enter your password" placeholderTextColor="#74879c" autoComplete="password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} maxLength={128} onSubmitEditing={()=>void signIn()}/><Pressable onPress={()=>setShowPassword(v=>!v)}><Text style={styles.show}>{showPassword?'Hide':'Show'}</Text></Pressable></View>
    <Pressable onPress={()=>void forgotPassword()} style={styles.forgot}><Text style={styles.forgotText}>Forgot password?</Text></Pressable>
    <Pressable style={[styles.button,busy&&styles.disabled]} onPress={()=>void signIn()} disabled={busy}><Text style={styles.buttonText}>{busy?'Signing you in…':'Sign in'} <Text>→</Text></Text></Pressable>
    <View style={styles.divider}><View style={styles.rule}/><Text style={styles.dividerText}>NEW TO MUNI?</Text><View style={styles.rule}/></View>
    <Pressable style={styles.secondary} onPress={()=>router.push('/signup')}><Text style={styles.secondaryText}>Create a student account</Text></Pressable>
    <Text style={styles.legal}>By continuing, you agree to use MUNI respectfully.</Text>
  </ScrollView></KeyboardAvoidingView>;
}
const styles=StyleSheet.create({page:{flex:1,backgroundColor:'#07111f'},content:{padding:24,paddingTop:45,paddingBottom:50},back:{color:'#d7f49a',fontSize:13,fontWeight:'800',marginBottom:28},logo:{width:48,height:48,borderRadius:14,backgroundColor:'#d7f49a',alignItems:'center',justifyContent:'center'},logoText:{fontSize:25,fontWeight:'900',color:'#07111f'},brand:{color:'#fff',fontSize:26,fontWeight:'900',marginTop:9},school:{color:'#8ee7e5',fontSize:9,fontWeight:'800',letterSpacing:1,marginTop:3},eyebrow:{color:'#8ee7e5',fontSize:10,fontWeight:'900',letterSpacing:1.8,marginTop:36},title:{color:'#fff',fontSize:48,fontWeight:'900',letterSpacing:-1.5,marginTop:12,lineHeight:50},accent:{color:'#d7f49a'},copy:{color:'#9aabc0',fontSize:14,lineHeight:22,marginTop:13,marginBottom:26},label:{color:'#dce6f0',fontSize:12,fontWeight:'700',marginBottom:8,marginTop:8},input:{backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#2a4057',borderRadius:13,padding:15,color:'#fff',fontSize:14,marginBottom:13},passwordWrap:{flexDirection:'row',alignItems:'center',backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#2a4057',borderRadius:13,paddingRight:13,marginBottom:4},passwordInput:{flex:1,padding:15,color:'#fff',fontSize:14},show:{color:'#8ee7e5',fontWeight:'800',fontSize:12,padding:7},forgot:{alignSelf:'flex-end',paddingVertical:12},forgotText:{color:'#8ee7e5',fontSize:12,fontWeight:'700'},button:{backgroundColor:'#d7f49a',padding:16,borderRadius:13,alignItems:'center',marginTop:12},disabled:{opacity:.6},buttonText:{color:'#07111f',fontWeight:'900',fontSize:15},divider:{flexDirection:'row',alignItems:'center',gap:12,marginTop:25,marginBottom:14},rule:{height:1,backgroundColor:'#24374a',flex:1},dividerText:{color:'#74899e',fontSize:9,letterSpacing:1.5,fontWeight:'900'},secondary:{borderWidth:1,borderColor:'#30465d',padding:14,borderRadius:13,alignItems:'center'},secondaryText:{color:'#e5edf5',fontWeight:'800',fontSize:13},legal:{color:'#71869b',textAlign:'center',fontSize:11,lineHeight:18,marginTop:22}});
