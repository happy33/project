import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
  state = {
    comment : '',
    username : '',
    reply : '',
    replyname : '',
    replywho : '',
    comments : [
      {id:'1',username:'jack',comment:'such fun!',hasReply:[],isShow:true},
      {id:'2',username:'penny',comment:'go Maranda!',hasReply:[],isShow:true}
     ],
    isReply : false,
    commentsid: ''
  }
  //处理输入文本
  handleInput = e => {
    var stateName = e.target.name
    this.setState({
      [stateName] : e.target.value
    })
  }

  //提交新评论
  handleClick = () => {
    const new_Comments = [{
      id : Math.random(),
      username : this.state.username,
      comment : this.state.comment,
      hasReply : [],
    },...this.state.comments]
    this.setState({
      comments : new_Comments,
      comment : '',
      username : '',
    })
  }
  
  //点击回复按钮出现回复框
  handleReply = e => {
    var id = e.target.name
    var replyWho = e.target.dataset.replywho
    this.setState({
      isReply : true,
      commentsid : id,
      replywho : replyWho
    })
  }

  //提交新回复
  submitReply = () => {
    var arr = this.state.comments
    for(let i = 0; i < arr.length; i++){
      if(arr[i].id == this.state.commentsid){
        const new_Reply = {
          id: this.state.commentsid,
          username : this.state.comments[i].username,
          comment : this.state.comments[i].comment,
          hasReply:
            [...this.state.comments[i].hasReply,
              {
              replyid: Math.random(),
              replyname : this.state.replyname,
              reply : this.state.reply,
              replywho : this.state.replywho
              }
            ]
          }
        arr.splice(i,1,new_Reply)
        this.setState({
          comments : arr,
          replyname : '',
          reply : '',
          replywho : ''
        })
        console.log(this.state.comments)
        break
      }
    }
  }

  //折叠评论
  foldComment = e =>{
    
    var id = e.target.name
    var arr = this.state.comments
    console.log("ok",id,arr)
    for(let i = 0; i < arr.length; i++){
      if(arr[i].id == id){
        let fold = Object.assign(arr[i],{isShow:!this.state.comments[i].isShow})
        arr.splice(i,1,fold)
        this.setState({
          comments : arr
        })
      }
    }
  }

  render(){
    return(
      <div>
        <h4>发送新评论</h4>
        <input id="inputComment" placeholder="请输入你的评论" value={this.state.comment} onChange={this.handleInput} name='comment'/>
        <input id="inputName" placeholder="请输入你的姓名" value={this.state.username} onChange={this.handleInput} name='username'/>
        <br/>
        <button onClick={this.handleClick}>确认</button>
        <ul id="commentArea">
        {
          this.state.comments.map(
            item => <li key={item.id}>
              
              <h4>用户：{item.username}</h4>
              <p>评论：{item.comment}</p>
              <button onClick={this.handleReply} name={item.id} data-replywho={item.username}>回复</button>
              {(item.hasReply.length !== 0)?
                (!item.isShow)?
                  <button id="foldBtn" onClick={this.foldComment} name={item.id}>点击收起评论</button>
                  :<button id="foldBtn" onClick={this.foldComment} name={item.id}>点击展开评论</button>
                :null
                }
              {
                (item.hasReply.length !== 0)?
                  (!item.isShow)?
                    item.hasReply.map( 
                      i => <div id="replyComments" key={i.replyid}>
                            <h4>用户：{i.replyname}</h4>
                            <p>回复<b>{i.replywho}</b>：{i.reply}</p>
                            <button onClick={this.handleReply} name={item.id} data-replywho={i.replyname}>回复</button>
                            
                          </div>
                      )
                    :null
                  :null
              
              }
            </li>
          )
        }
        </ul>
        {this.state.isReply?
          <div id="replyArea">
            <h4>回复评论给{this.state.replywho}</h4>
            <input id="inputReply" placeholder="请输入你的回复" value={this.state.reply} onChange={this.handleInput} name='reply' />
            <input id="replyName" placeholder="请输入你的姓名" value={this.state.replyname} onChange={this.handleInput} name='replyname'/>
            <button id="submitReply" onClick={this.submitReply}>确认</button>
          </div>
          :null
        }
      </div>
    )
    
  }
}



  


ReactDOM.render(<App/>,document.getElementById('root'))
