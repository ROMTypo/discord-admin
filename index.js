var express=require("express");
var app=express();
var fs=require("fs");
var settings=JSON.parse(fs.readFileSync(__dirname+"/settings.json","utf8"));

app.use(express.static(__dirname+"/public"));
app.get("/api/graphs/guild/count",(req,res)=>{
  res.send(fs.readFileSync(__dirname+"/data/guild_graph.json","utf8"));
});
app.get("/api/graphs/command",(req,res)=>{
  res.send(fs.readFileSync(__dirname+"/data/cmd_graph.json","utf8"));
});

app.listen(settings.express.port,()=>{
  console.log("Web online at *:"+settings.express.port);
});

class Commands {
  constructor(){
    this.data={
      "guild":0,
      "command":0
    };
    this.cmds=[];
  }
  setGuilds(count){
    this.data.guild=count;
  }
  addGuild(){
    this.data.guild++;
  }
  setCommand(count){
    this.data.command=count;
  }
  addCommand(cmd){
    this.data.command++;
    if(!this.cmds.find(a=>a.name===cmd)){
      this.cmds.push({"name":cmd,"uses":0});
    }
    this.cmds[this.cmds.indexOf(this.cmds.find(a=>a.name===cmd))].uses++;
  }
  save(){
    var _data=JSON.parse(fs.readFileSync(__dirname+"/data/guild_graph.json","utf8"));
    this.data.time=new Date();
    _data.push(this.data);
    fs.writeFileSync(__dirname+"/data/guild_graph.json",JSON.stringify(_data));

    var _data=JSON.parse(fs.readFileSync(__dirname+"/data/cmd_graph.json","utf8"));
    _data.push({
      "time":new Date(),
      "data":this.cmds
    });
    fs.writeFileSync(__dirname+"/data/cmd_graph.json",JSON.stringify(_data));

    this.data={
      "guild":0,
      "command":0
    };
    this.cmds=[];
  }
}

module.exports=Commands;
