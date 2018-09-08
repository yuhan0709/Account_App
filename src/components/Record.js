import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
class Record extends Component{
    constructor(props){
        super(props)
        this.state={
            edit:false
        }
    }
    handleToggle(){
        this.setState({
            edit:true
        })
    }
    handleCancle(){
        this.setState({
            edit:false
        })
    }
    handleUpdate(e){
        e.preventDefault();
        const record = {
            date:this.refs.date.value,
            title:this.refs.title.value,
            amount:this.refs.amount.value,
        } 
        axios.put("https://5b73ef02a583740014190836.mockapi.io/amount/records/"+this.props.id,record)
        .then(Response=>{
            this.props.handleUpdateRecord(Response.data,this.props);
            alert("修改成功");
            this.setState({
                edit:false
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    handleDelete(e){
        e.preventDefault();
        axios.delete("https://5b73ef02a583740014190836.mockapi.io/amount/records/"+this.props.id).then(
            response=>{this.props.handleDeleteRecord(this.props);
            alert("删除成功！");}
        )
        .catch(err=>console.log(err));
    }
    recordRow(){
        return(
            <tr>
                <td>
                    {this.props.date}
                </td>
                <td>
                    {this.props.title}
                </td>
                <td>
                    {this.props.amount}
                </td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button className = "btn btn-danger mr-1" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }
    recordForm(){
        return(
            <tr>
            <td>
                <input type="text" className="form-control" defaultValue={this.props.date} ref="date" />
            </td>
            <td>
            <select className="form-control" ref="title" defaultValue={this.props.title}>
                <option>收入</option>
                <option>支出</option>
            </select>
            </td>
            <td>
                <input type="text" className="form-control" defaultValue={this.props.amount} ref="amount" />
            </td>
            <td>
                <button className="btn btn-info mr-1" onClick={this.handleUpdate.bind(this)}>Update</button>
                <button className = "btn btn-danger mr-1" onClick={this.handleCancle.bind(this)}>Cancle</button>
            </td>
        </tr>
        )
    }
    render(){
        if(this.state.edit){
            return this.recordForm()
        }else{
            return this.recordRow()
        }
    }
}
export default Record;
Record.propTypes = {
    id:PropTypes.string.isRequired,
    date:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    amount:PropTypes.string.isRequired
}