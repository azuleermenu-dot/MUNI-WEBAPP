import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { requireSupabase } from '../lib/supabase';

type Task={id:string;title:string;due_at:string|null;completed:boolean|null};

export default function Planner(){
  const [tasks,setTasks]=useState<Task[]>([]);
  const [title,setTitle]=useState('');
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const load=useCallback(async()=>{
    try{
      const supabase=requireSupabase();
      const {data:{user},error:authError}=await supabase.auth.getUser();
      if(authError||!user){router.replace('/login');return;}
      const {data,error:queryError}=await supabase.from('tasks').select('id,title,due_at,completed').eq('user_id',user.id).order('due_at',{ascending:true,nullsFirst:false});
      if(queryError)throw queryError;
      setTasks(data??[]);setError('');
    }catch(e){setError(e instanceof Error?e.message:'Could not load tasks.');}
    finally{setLoading(false);}
  },[]);
  useEffect(()=>{void load();},[load]);
  async function add(){
    if(!title.trim())return;
    setSaving(true);setError('');
    try{
      const supabase=requireSupabase();const {data:{user}}=await supabase.auth.getUser();
      if(!user)throw new Error('Please sign in again.');
      const {error:insertError}=await supabase.from('tasks').insert({user_id:user.id,title:title.trim(),kind:'assignment',completed:false});
      if(insertError)throw insertError;
      setTitle('');await load();
    }catch(e){setError(e instanceof Error?e.message:'Could not save task.');}
    finally{setSaving(false);}
  }
  async function toggle(task:Task){
    try{const supabase=requireSupabase();const {error:updateError}=await supabase.from('tasks').update({completed:!task.completed}).eq('id',task.id);if(updateError)throw updateError;await load();}
    catch(e){Alert.alert('Could not update task',e instanceof Error?e.message:'Please try again.');}
  }
  return <ScrollView style={s.page} contentContainerStyle={s.content}><Pressable onPress={()=>router.back()}><Text style={s.back}>← Back</Text></Pressable><Text style={s.eyebrow}>YOUR STUDENT WORKSPACE</Text><Text style={s.title}>Study planner</Text><Text style={s.subtitle}>Make the next step easier. Add tasks, then tap one to mark it done.</Text><View style={s.form}><TextInput value={title} onChangeText={setTitle} placeholder="e.g. Review biology chapter 2" placeholderTextColor="#7f91a5" style={s.input} maxLength={180} returnKeyType="done" onSubmitEditing={()=>void add()}/><Pressable disabled={saving||!title.trim()} onPress={()=>void add()} style={[s.add,saving&&s.disabled]}><Text style={s.addText}>{saving?'Saving…':'Add task'}</Text></Pressable></View>{!!error&&<Text style={s.error}>{error}</Text>}<View style={s.headingRow}><Text style={s.section}>My tasks</Text><Text style={s.count}>{tasks.filter(t=>!t.completed).length} left</Text></View>{loading?<ActivityIndicator color="#d7f49a" style={{marginTop:24}}/>:tasks.length===0?<View style={s.empty}><Text style={s.emptyIcon}>✦</Text><Text style={s.emptyTitle}>A fresh start.</Text><Text style={s.emptyText}>Your list is empty. Add one small task to get going.</Text></View>:tasks.map(task=><Pressable key={task.id} style={s.task} onPress={()=>void toggle(task)}><View style={[s.check,task.completed&&s.checked]}><Text style={s.checkText}>{task.completed?'✓':''}</Text></View><View style={{flex:1}}><Text style={[s.taskTitle,task.completed&&s.done]}>{task.title}</Text><Text style={s.due}>{task.due_at?new Date(task.due_at).toLocaleDateString():'No deadline set'}</Text></View></Pressable>)}<Pressable style={s.home} onPress={()=>router.replace('/')}><Text style={s.homeText}>Back to MUNI home</Text></Pressable></ScrollView>;
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#07111f'},content:{padding:22,paddingTop:55,paddingBottom:60},back:{color:'#d7f49a',fontSize:15,fontWeight:'700',marginBottom:32},eyebrow:{color:'#8ee7e5',fontSize:10,fontWeight:'900',letterSpacing:1.8},title:{fontSize:38,fontWeight:'900',letterSpacing:-1.5,color:'#f5f8fc',marginTop:12},subtitle:{color:'#9aabc0',fontSize:15,lineHeight:23,marginTop:12},form:{marginTop:26,gap:10},input:{backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#263b50',borderRadius:14,paddingHorizontal:15,paddingVertical:15,color:'#fff',fontSize:15},add:{backgroundColor:'#d7f49a',borderRadius:14,padding:15,alignItems:'center'},disabled:{opacity:.55},addText:{color:'#07111f',fontWeight:'900'},error:{color:'#fca5a5',marginTop:14,lineHeight:20},headingRow:{marginTop:34,marginBottom:13,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},section:{color:'#fff',fontSize:20,fontWeight:'800'},count:{color:'#8ee7e5',fontSize:12},empty:{backgroundColor:'#0c1b2c',borderRadius:20,padding:24,alignItems:'center',borderWidth:1,borderColor:'#1d3045',marginTop:8},emptyIcon:{fontSize:28,color:'#d7f49a'},emptyTitle:{color:'#fff',fontSize:18,fontWeight:'800',marginTop:10},emptyText:{color:'#9aabc0',textAlign:'center',lineHeight:21,marginTop:7},task:{flexDirection:'row',alignItems:'center',gap:13,backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#1d3045',borderRadius:16,padding:15,marginTop:9},check:{width:28,height:28,borderRadius:9,borderWidth:1,borderColor:'#496078',alignItems:'center',justifyContent:'center'},checked:{backgroundColor:'#d7f49a',borderColor:'#d7f49a'},checkText:{color:'#07111f',fontWeight:'900'},taskTitle:{color:'#f5f8fc',fontSize:14,fontWeight:'700'},done:{textDecorationLine:'line-through',color:'#8194a9'},due:{color:'#8194a9',fontSize:11,marginTop:5},home:{marginTop:28,padding:15,alignItems:'center'},homeText:{color:'#9aabc0',fontWeight:'700'}});