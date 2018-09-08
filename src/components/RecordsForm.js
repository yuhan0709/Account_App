import React,{Component} from 'react';
import axios from 'axios';
class RecordsForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:"",
            title:"",
            amount:""
        }
    }
    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }
    handleChange(event){
        let name,obj;
        name = event.target.id;
        this.setState((
           obj = {},
           obj[name] = event.target.value,
           obj
        )) 
        console.log(event.target.value);
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post("https://5b73ef02a583740014190836.mockapi.io/amount/records",
            this.state)
        .then(Response=>{
            alert("添加成功");
            this.props.handleNewRecord(Response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        return(
        <form class="form-inline" onSubmit={this.handleSubmit.bind(this)}>
            <input type="date" className="form-control" onChange={this.handleChange.bind(this)} id="date" placeholder="Date" value={this.state.date} />
             &emsp;&emsp;
            {/* <input type="text" className="form-control" onChange={this.handleChange.bind(this)}  id="title" placeholder="Title" value={this.state.title} />
            &emsp;&emsp; */}
            <select className="form-control" onChange={this.handleChange.bind(this)}  id="title" value={this.state.title}>
                <option>请选择~</option>
                <option>收入</option>
                <option>支出</option>
            </select>
            &emsp;&emsp;
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} id="amount" placeholder="amount" value={this.state.amount} />
            &emsp;
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Submit</button>
        </form>
        )
    }
}
export default RecordsForm;