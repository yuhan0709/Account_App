import React,{Component} from 'react'
import Record from './Record'
import axios from 'axios';
import RecordsForm from './RecordsForm';
import AmountBox from './AmountBox'
class Records extends Component{
    constructor(props){
        super(props);
        this.state = {
            //正在加载
            isLoaded:false, 
            records:[
            ]
        }
    }
    componentDidMount(){
        //使用环境变量代替api地址。
        axios.get("https://5b73ef02a583740014190836.mockapi.io/amount/records")
        .then(Response=>{
            this.setState({
                records:Response.data,
                isLoaded:true
            })
            console.log(this.state.records);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    addRecord(record){
        console.log(record);
        this.setState({
            isLoaded:true,
            records:[
                ...this.state.records,
                record
            ]
        })
    }
    updateRecord(record,preRecord){
        const records = this.state.records;
        const newRecords = records.map(item=>{
            if(item.id != preRecord.id){
                return item;
            }else{
                return {
                    ...item,
                    ...record
                }
            }
        })
        console.log(newRecords);
        this.setState({
            records:newRecords
        })
    }
    deleteRecord(preRecord){
      const records = this.state.records;
      console.log(preRecord);
      const newRecords = records.filter((item)=>{
       return  item.id!=preRecord.id     
     })
      console.log(newRecords);
      this.setState({
          records:newRecords
      })
    }
    credits(){
        let credits = this.state.records.filter((record)=>{
            return record.title=="收入"
        })
        return credits.reduce((prev,curr)=>{
            return prev+Number.parseInt(curr.amount);
        },0)
    }
    debits(){
        let credits = this.state.records.filter((record)=>{
            return record.title=="支出"
        })
        return credits.reduce((prev,curr)=>{
            return prev+Number.parseInt(curr.amount);
        },0)
    }
    balance(){
        return this.credits()-this.debits()
    }
    render(){
        const {isLoaded,records} = this.state;
        let recordsComponent;
        if(!isLoaded){
            recordsComponent=<div>is Loading...</div>
        }else{
            recordsComponent=(
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr> 
                    </thead> 
                    <tbody>
                        {records.map((record)=>
                            <Record key={record.id} 
                            {...record} 
                            handleUpdateRecord={this.updateRecord.bind(this)}
                            handleDeleteRecord={this.deleteRecord.bind(this)}/>
                        )}
                    </tbody> 
                </table>
            )
        }
        return (
        <div>
            <h2>Records</h2>
            <div className="row mb-3">
                <AmountBox text="Credit" type="success" amount={this.credits()} />
                <AmountBox text="Debit" type="danger" amount={this.debits()} />
                <AmountBox text="Balance" type="info" amount={this.balance()} />
             </div>
            <RecordsForm handleNewRecord={this.addRecord.bind(this)} />
           {recordsComponent}
        </div>
        )
    }
}
export default Records