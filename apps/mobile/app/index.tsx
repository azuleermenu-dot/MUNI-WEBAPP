import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { requireSupabase } from '../lib/supabase';

const cards=[['📅','Study Planner','Plan your study time'],['📝','Assignments','Track schoolwork'],['🎯','Exams','Prepare ahead'],['🧠','Flashcards','Review faster'],['❓','Quizzes','Test yourself'],['📚','Reviewers','Keep materials ready']];

export default function Home(){
  const [name,setName]=useState('Student');
  const [taskCount,setTaskCount]=useState(0);

  useEffect(()=>{
    let active=true;
    const supabase=requireSupabase();
    supabase.auth.getUser().then(async ({data})=>{
      if(!active)return;
      if(!data.user){router.replace('/login');return;}
      const profile=await supabase.from('profiles').select('full_name').eq('id',data.user.id).maybeSingle();
      if(profile.data?.full_name)setName(profile.data.full_name);
      const tasks=await supabase.from('tasks').select('id',{count:'exact',head:true}).eq('user_id',data.user.id).eq('completed',false);
      if(active)setTaskCount(tasks.count ?? 0);
    }).catch(()=>{ if(active) router.replace('/login'); });
    return()=>{active=false;};
  },[]);

  return <><StatusBar style="light"/><ScrollView style={s.page} contentContainerStyle={s.content}><View style={s.nav}><View style={s.logo}><Text style={s.logoText}>M</Text></View><Text style={s.brand}>MUNI</Text></View><Text style={s.school}>MINUYAN NATIONAL HIGH SCHOOL</Text><Text style={s.greeting}>Hi, {name.split(' ')[0]} 👋</Text><Text style={s.title}>Study smarter.</Text><Text style={s.title2}>Stay organized.</Text><Text style={s.copy}>Your study space for schedules, assignments, exams, flashcards, quizzes, and reviewers.</Text><View style={s.summary}><Text style={s.summaryNumber}>{taskCount}</Text><Text style={s.summaryLabel}>unfinished tasks</Text></View><Text style={s.section}>Everything you need</Text><View style={s.grid}>{cards.map(([i,t,d])=><Pressable style={s.card} key={t} onPress={()=>router.push('/planner')}><Text style={s.icon}>{i}</Text><Text style={s.cardTitle}>{t}</Text><Text style={s.cardCopy}>{d}</Text></Pressable>)}</View></ScrollView></>;
}
const s=StyleSheet.create({page:{backgroundColor:'#07111f'},content:{padding:22,paddingTop:48,paddingBottom:60},nav:{flexDirection:'row',alignItems:'center',gap:10},logo:{width:40,height:40,borderRadius:13,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},logoText:{fontSize:20,fontWeight:'900',color:'#07111f'},brand:{fontSize:22,fontWeight:'900',color:'#fff'},school:{marginTop:18,color:'#67e8f9',fontSize:11,fontWeight:'800',letterSpacing:1.2},greeting:{marginTop:36,color:'#94a3b8',fontSize:15,fontWeight:'700'},title:{marginTop:12,fontSize:43,fontWeight:'900',lineHeight:47,color:'#fff'},title2:{fontSize:43,fontWeight:'900',lineHeight:47,color:'#67e8f9'},copy:{fontSize:16,lineHeight:25,color:'#94a3b8',marginTop:18},summary:{backgroundColor:'#0b1929',borderRadius:18,padding:18,marginTop:22,borderWidth:1,borderColor:'#1e3148'},summaryNumber:{fontSize:28,fontWeight:'900',color:'#fff'},summaryLabel:{color:'#94a3b8',marginTop:3},section:{marginTop:32,marginBottom:14,color:'#fff',fontSize:19,fontWeight:'800'},grid:{gap:12},card:{backgroundColor:'#0b1929',borderRadius:20,padding:20,borderWidth:1,borderColor:'#1e3148'},icon:{fontSize:27},cardTitle:{fontSize:20,fontWeight:'800',marginTop:16,color:'#fff'},cardCopy:{marginTop:5,color:'#94a3b8'}});